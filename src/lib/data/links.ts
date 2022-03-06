export interface Link {
    title: string
    url: string
    rel: "external" | ""
    active: boolean
}

export let links = [
    {title: 'Original', url: '/', rel: "", active: false},
    {title: 'Scrap', url: '/scrap', rel: "", active: false},
    {title: 'About me', url: 'https://about.me/kinzal', rel: "external", active: false},
] as Link[];