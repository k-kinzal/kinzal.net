/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

// image on vite-imagetools
declare module '*.jpg?format=png;webp;avif' {
    // ["png path", "webp path", "avif path"]
    const v: [string, string, string]
    export default v
}
// thumbnail on vite-imagetools
declare module '*.jpg?ar=1:1&h=100;200;300&format=png&srcset&fit=cover' {
    const v: string
    export default v
}
declare module '*.jpg?ar=1:1&h=100;200;300&format=webp&srcset&fit=cover' {
    const v: string
    export default v
}
declare module '*.jpg?ar=1:1&h=100;200;300&format=avif&srcset&fit=cover' {
    const v: string
    export default v
}
