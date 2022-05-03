import fs from "fs";
import glob from "glob";

let paths = glob.sync('static/images/*/*').reverse().map((p, i) => {
    let found = p.match(/^static\/images\/([^\/]+)\/.*?\.(?:jpg|jpeg|png|gif)$/);
    if (!found || found.length !== 2) {
        throw new Error(`unexpected file path: ${p}: ${JSON.stringify(found)}`);
    }

    return {
        key: p.replace(/^static\/images/, '').replace(/\..+$/, ''),
        path: found[0],
        category: found[1],
        index: String(i).padStart(3, '0')
    }
});

let file = `
${ paths.map(({path, index}) => `import _${index} from '../../../${path}?format=png;webp;avif';` ).join('\n') }
${ paths.map(({path, index}) => `import _thumb_png_${index} from '../../../${path}?ar=1:1&h=100;200;300&format=png&srcset&fit=cover';`).join('\n') }
${ paths.map(({path, index}) => `import _thumb_webp_${index} from '../../../${path}?ar=1:1&h=100;200;300&format=webp&srcset&fit=cover';`).join('\n') }
${ paths.map(({path, index}) => `import _thumb_avif_${index} from '../../../${path}?ar=1:1&h=100;200;300&format=avif&srcset&fit=cover';`).join('\n') }
import _ogp from "../../../static/ogp.png?width=1200&height=630&format=png&fit=cover";

export type MIMEType = "image/jpg" | "image/png" | "image/avif" | "image/webp";
export const ImageCategory = {
    ORIGINAL: "original",
    SCRAP: "scrap",
} as const;
export type ImageCategory = typeof ImageCategory[keyof typeof ImageCategory];
export type ImageID = ${ paths.map(({key}) => `"${key}"`).join(' | ') };

export interface Image {
    src?: string,
    srcset?: string,
    type: MIMEType
}

export interface Thumbnail {
    defaults: Image,
    responsives: Image[]
}

export interface Item {
    key: ImageID,
    category: ImageCategory,
    defaults: Image,
    responsives: Image[]
    thumbnail: Thumbnail,
}

export let ogp: Image = {
    src: _ogp,
    type: "image/png"
};

export let items: {[key in ImageID]: Item} = {
${ paths.map(({key, category, index}) => `    "${key}": {"key":"${key}","category":"${category}","defaults":{"src":_${index}[0],"type":"image/png"},"responsives":[{"src":_${index}[1],"type":"image/webp"},{"src":_${index}[2],"type":"image/avif"}],"thumbnail":{"defaults":{"srcset":_thumb_png_${index},"type":"image/png"},"responsives":[{"srcset":_thumb_webp_${index},"type":"image/webp"},{"srcset":_thumb_avif_${index},"type":"image/avif"}]}},`).join('\n') }
};
`

console.log(file.trim())
