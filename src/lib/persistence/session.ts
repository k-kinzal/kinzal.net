import {browser} from "$app/env";

export class Session<T> {
    readonly default: T;
    private data: T;

    constructor(v: T) {
        this.data = this.default = v;
    }

    get(key: string): T {
        if (browser) {
            let v = JSON.parse(sessionStorage.getItem(key));
            if (v) {
                this.data = v;
            }
        }
        return this.data;
    }

    set(key: string, v: T) {
        if (browser) {
            sessionStorage.setItem(key, JSON.stringify(v));
        }
        this.data = v;
    }
}