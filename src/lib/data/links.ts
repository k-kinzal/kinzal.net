export interface Link {
    title: string
    url: string
    rel: "external" | ""
}

export let links = [
    {title: 'Original', url: '/', rel: ""},
    {title: 'Scrap', url: '/scrap', rel: ""},
    {title: 'About me', url: 'https://about.me/kinzal', rel: "external"},
] as Link[];