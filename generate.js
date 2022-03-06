import fs from "fs";

let paths1 = fs.readdirSync('static/images/original').map(src => `/images/original/${src}`).reverse();
let paths2 = fs.readdirSync('static/images/scrap').map(src => `/images/scrap/${src}`).reverse();
let file = `
import img from "../../../static/ogp.png?width=1200&height=630&format=png&fit=cover";
export let ogp = img;

${ paths1.map((path, i) => `import img1${`${i+1}`.padStart(3,'0')} from '../../../static${path}?format=png;webp;avif';`).join('\n') }
${ paths2.map((path, i) => `import img2${`${i+1}`.padStart(3,'0')} from '../../../static${path}?format=png;webp;avif';`).join('\n') }
${ paths1.map((path, i) => `import thp1${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=png&srcset&fit=cover';`).join('\n') }
${ paths1.map((path, i) => `import thw1${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=webp&srcset&fit=cover';`).join('\n') }
${ paths1.map((path, i) => `import tha1${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=avif&srcset&fit=cover';`).join('\n') }
${ paths2.map((path, i) => `import thp2${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=png&srcset&fit=cover';`).join('\n') }
${ paths2.map((path, i) => `import thw2${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=webp&srcset&fit=cover';`).join('\n') }
${ paths2.map((path, i) => `import tha2${`${i+1}`.padStart(3,'0')} from '../../../static${path}?ar=1:1&h=100;200;300&format=avif&srcset&fit=cover';`).join('\n') }

export interface Thumbnail {
    png: string,
    webp: string,
    avif: string,
}

export interface Image {
    category: "original" | "scrap",
    src: string,
    png: string,
    webp: string,
    avif: string,
    thumbnai: Thumbnail,
}

export let images = [
${ paths1.map((src, i) => `    {"category":"original","src":"${src.replace(/\..*$/,'')}","png":img1${`${i+1}`.padStart(3,'0')}[0],"webp":img1${`${i+1}`.padStart(3,'0')}[1],"avif":img1${`${i+1}`.padStart(3,'0')}[2],"thumbnail":{"png":thp1${`${i+1}`.padStart(3,'0')},"webp":thw1${`${i+1}`.padStart(3,'0')},"avif":tha1${`${i+1}`.padStart(3,'0')}}},`).join('\n') }
${ paths2.map((src, i) => `    {"category":"scrap","src":"${src.replace(/\..*$/,'')}","png":img2${`${i+1}`.padStart(3,'0')}[0],"webp":img2${`${i+1}`.padStart(3,'0')}[1],"avif":img2${`${i+1}`.padStart(3,'0')}[2],"thumbnail":{"png":thp2${`${i+1}`.padStart(3,'0')},"webp":thw2${`${i+1}`.padStart(3,'0')},"avif":tha2${`${i+1}`.padStart(3,'0')}}},`).join('\n') }
] as Image[];

let mapping = {
${ paths1.map((src, i) => `    "${src.replace(/\..*$/,'')}": ${i},` ).join('\n') }
${ paths2.map((src, i) => `    "${src.replace(/\..*$/,'')}": ${i + paths1.length},` ).join('\n') }
}

export let prev = (src: string) => {
    let index = mapping[src];
    if (index === null || index === 0) {
        return null
    }
    let image = images[index - 1];
    return mapping[image.src] < index ? image : null;
}
export let next = (src: string) => {
    let index = mapping[src];
    if (index === null || index === images.length - 1) {
        return null
    }
    let image = images[index + 1];
    return mapping[image.src] > index ? image : null;
}
`

console.log(file.trim())
