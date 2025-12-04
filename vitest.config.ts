import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./app/tests/setup.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./app"),
      "virtual:image-variants": resolve(__dirname, "./app/tests/mocks/image-variants.ts"),
      "virtual:image-list": resolve(__dirname, "./app/tests/mocks/image-list.ts"),
    },
  },
});
