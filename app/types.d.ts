// echo-js module declaration
declare module "echo-js" {
  interface EchoOptions {
    offset?: number;
    offsetVertical?: number;
    offsetHorizontal?: number;
    offsetTop?: number;
    offsetBottom?: number;
    offsetLeft?: number;
    offsetRight?: number;
    throttle?: number;
    debounce?: boolean;
    unload?: boolean;
    callback?: (element: HTMLElement, op: string) => void;
  }

  interface Echo {
    init(options?: EchoOptions): void;
    render(): void;
    detach(element: HTMLElement): void;
  }

  type EchoFactory = (window: Window) => Echo;

  const echoFactory: EchoFactory;
  export default echoFactory;
}

// Extend JSX.IntrinsicElements to allow lazyload attribute on img
declare namespace React {
  interface ImgHTMLAttributes<T> {
    lazyload?: string;
  }
}
