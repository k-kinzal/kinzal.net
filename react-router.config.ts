import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
  prerender: ["/", "/original.html", "/scrap.html"],
} satisfies Config;
