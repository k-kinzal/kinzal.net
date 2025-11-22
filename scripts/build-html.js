const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const appDir = path.resolve(__dirname, '../app');
const rootDir = path.resolve(__dirname, '../');

// Configure template settings to match Gruntfile
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
_.templateSettings.evaluate = /{{([\s\S]+?)}}/g; // Wait, Gruntfile said 'handlebars-like-delimiters'
// Grunt-template with 'handlebars-like-delimiters' usually maps:
// interpolate: /{{([\s\S]+?)}}/g
// evaluate: /{{([\s\S]+?)}}/g
// But standard lodash uses <%= %> for interpolate and <% %> for evaluate.
// If both are {{ }}, how does it distinguish?
// Usually interpolate is {{= value }} and evaluate is {{ code }}.
// Let's check the HTML:
// {{ if (key==='original') { }} -> evaluate
// {{- path }} -> escape? or interpolate?
// {{- year }} -> interpolate?
// The Gruntfile used `grunt-template`.
// Let's look at the HTML again.
// {{- year }}
// {{- path }}
// {{ }) }}
// It seems {{- is escape/interpolate?
// And {{ is evaluate?
// Actually, `grunt-template` custom delimiters usually work like this.
// Let's try to match the regex.

// Based on common usage:
// Evaluate: {{ ... }}
// Interpolate: {{- ... }} (escaped?) or {{= ... }}?
// The HTML uses {{- ... }}.
// So we need to set interpolate to match {{- ... }}.
// And evaluate to match {{ ... }} but NOT {{- ... }}.

_.templateSettings = {
    evaluate: /{{(?!\-)([\s\S]+?)}}/g,
    interpolate: /{{-([\s\S]+?)}}/g
};

// Read index.html
let templateContent = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');

// Adjust paths for Vite (moving from app/ to root)
// We need to prefix relative paths with 'app/'
// But we must be careful not to break http:// links or {{ }} tags.

// Replace build:css block
// Keep Google Fonts, remove others (imported in main.js)
templateContent = templateContent.replace(
    /<!-- build:css[\s\S]*?<!-- endbuild -->/g,
    `<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Raleway:200'>`
);

// Replace build:js block with main.js
templateContent = templateContent.replace(
    /<!-- build:js[\s\S]*?<!-- endbuild -->/g,
    `<script type="module" src="app/scripts/main.js"></script>`
);

// Fix other paths (images, etc)
templateContent = templateContent
    .replace(/href="images\//g, 'href="app/images/')
    .replace(/src="images\//g, 'src="app/images/');

// Also fix the dynamic image paths in JS/HTML?
// <img data-echo="//kinzal.imgix.net/images/{{- key }}/{{- path }}
// This is absolute URL, so no change needed.
// <img src="images/empty.png"
// -> src="app/images/empty.png" (Handled above)

const template = _.template(templateContent, { imports: { _: _ } });

function getImages(subDir) {
    const dir = path.join(appDir, 'images', subDir);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).reverse().filter(f => !f.startsWith('.'));
}

const pages = [
    { file: 'index.html', key: 'original', imageDir: 'original' },
    { file: 'original.html', key: 'original', imageDir: 'original' },
    { file: 'scrap.html', key: 'scrap', imageDir: 'scrap' }
];

pages.forEach(page => {
    const data = {
        year: (new Date()).getFullYear(),
        key: page.key,
        images: () => getImages(page.imageDir)
    };

    try {
        const html = template(data);
        fs.writeFileSync(path.join(rootDir, page.file), html);
        console.log(`Generated ${page.file}`);
    } catch (e) {
        console.error(`Error generating ${page.file}:`, e);
        process.exit(1);
    }
});
