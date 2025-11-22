const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const appDir = path.resolve(__dirname, '../app');
const imagesDir = path.join(appDir, 'images');
const iconPath = path.join(imagesDir, 'icon.png');

if (!fs.existsSync(iconPath)) {
    console.error('Icon not found:', iconPath);
    process.exit(1);
}

const sizes = [
    { width: 32, name: 'favicon.png' },
    { width: 57, name: 'icon-57.png' },
    { width: 76, name: 'icon-76.png' },
    { width: 120, name: 'icon-120.png' },
    { width: 152, name: 'icon-152.png' },
    { width: 256, name: 'icon-256.png' }
];

sizes.forEach(size => {
    sharp(iconPath)
        .resize(size.width)
        .toFile(path.join(imagesDir, size.name))
        .then(() => console.log(`Generated ${size.name}`))
        .catch(err => console.error(`Error generating ${size.name}:`, err));
});
