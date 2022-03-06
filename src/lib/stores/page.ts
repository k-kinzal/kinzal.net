import {browser} from "$app/env";
import {writable} from "svelte/store";
import type {Page} from "@sveltejs/kit";
import {Session} from "$lib/persistence/session";

export interface PageState {
    scrollPosition: number
}

let createPageStore = () => {
    let def = {
        scrollPosition: 0
    };
    let { subscribe, update } = writable<PageState>(def);
    let session = new Session<PageState>(def);
    return {
        subscribe: subscribe,
        load: (page: Page) => {
            update((_) => {
                return session.get(page.url.toString());
            });
        },
        update: (page: Page, {scrollPosition}) => {
            update((value: PageState) => {
                value.scrollPosition = scrollPosition;
                session.set(page.url.toString(), value);
                return value;
            });
        }
    }
}
export let page = createPageStore();