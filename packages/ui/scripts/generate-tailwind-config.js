#!/usr/bin/env node

/**
 * Generate Tailwind Config from Design Tokens
 *
 * This script reads design tokens from src/tokens/ and generates
 * a tailwind.config.tokens.js file that can be imported into
 * the main Tailwind config.
 *
 * Usage:
 *   node scripts/generate-tailwind-config.js
 *
 * This ensures that Tailwind classes stay in sync with design tokens.
 * Run this script after modifying any token files.
 */

import { writeFileSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import tokens dynamically using Node.js
async function loadTokens() {
  // Read and parse token files
  const colorsPath = join(__dirname, "../src/tokens/colors.ts");
  const spacingPath = join(__dirname, "../src/tokens/spacing.ts");
  const typographyPath = join(__dirname, "../src/tokens/typography.ts");
  const radiiPath = join(__dirname, "../src/tokens/radii.ts");
  const shadowsPath = join(__dirname, "../src/tokens/shadows.ts");
  const zIndexPath = join(__dirname, "../src/tokens/zIndex.ts");
  const breakpointsPath = join(__dirname, "../src/tokens/breakpoints.ts");

  // Simple parser for TypeScript const exports
  function parseTokenFile(content) {
    // Remove TypeScript-specific syntax
    const cleaned = content
      .replace(/\/\*\*[\s\S]*?\*\//g, "") // Remove JSDoc comments
      .replace(/\/\/.*$/gm, "") // Remove single-line comments
      .replace(/as const/g, "") // Remove 'as const'
      .replace(/export (const|type|interface)/g, "const") // Simplify exports
      .replace(/: typeof \w+/g, "") // Remove type annotations
      .replace(/: \w+(\[\])?/g, ""); // Remove type annotations

    const tokens = {};

    // Extract object assignments
    const objectRegex = /const (\w+) = ({[\s\S]*?});/g;
    let match;
    while ((match = objectRegex.exec(cleaned)) !== null) {
      const [, name, value] = match;
      try {
        // Clean up the object string for JSON parsing
        const jsonString = value
          .replace(/'/g, '"')
          .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
          .replace(/(\w+):/g, '"$1":'); // Quote keys

        tokens[name] = JSON.parse(jsonString);
      } catch {
        // If JSON parsing fails, try eval (only for known safe patterns)
        try {
          tokens[name] = eval(`(${value})`);
        } catch {
          console.warn(`Could not parse: ${name}`);
        }
      }
    }

    return tokens;
  }

  const colors = parseTokenFile(readFileSync(colorsPath, "utf-8"));
  const spacing = parseTokenFile(readFileSync(spacingPath, "utf-8"));
  const typography = parseTokenFile(readFileSync(typographyPath, "utf-8"));
  const radii = parseTokenFile(readFileSync(radiiPath, "utf-8"));
  const shadows = parseTokenFile(readFileSync(shadowsPath, "utf-8"));
  const zIndex = parseTokenFile(readFileSync(zIndexPath, "utf-8"));
  const breakpoints = parseTokenFile(readFileSync(breakpointsPath, "utf-8"));

  return { colors, spacing, typography, radii, shadows, zIndex, breakpoints };
}

async function generateConfig() {
  const tokens = await loadTokens();

  // Build Tailwind config object
  const config = {
    colors: {
      primary: tokens.colors?.colors?.primary || {},
      background: tokens.colors?.colors?.background || {},
      foreground: tokens.colors?.colors?.foreground || {},
      border: tokens.colors?.colors?.border || {},
      status: tokens.colors?.colors?.status || {},
    },
    spacing: tokens.spacing?.spacing || {},
    fontSize: tokens.typography?.fontSize || {},
    fontWeight: tokens.typography?.fontWeight || {},
    fontFamily: tokens.typography?.fontFamily || {},
    borderRadius: tokens.radii?.radii || {},
    boxShadow: tokens.shadows?.shadows || {},
    zIndex: tokens.zIndex?.zIndex || {},
    screens: Object.fromEntries(
      Object.entries(tokens.breakpoints?.breakpoints || {}).map(
        ([key, value]) => [key, `${value}px`]
      )
    ),
  };

  const output = `/**
 * Auto-generated Tailwind config from design tokens.
 * DO NOT EDIT MANUALLY - run 'npm run generate:tokens' to regenerate.
 *
 * Generated at: ${new Date().toISOString()}
 */

/** @type {import('tailwindcss').Config['theme']} */
export const tokenTheme = ${JSON.stringify(config, null, 2)};
`;

  const outputPath = join(__dirname, "../tailwind.config.tokens.js");
  writeFileSync(outputPath, output);

  console.log(`Generated: ${outputPath}`);
  console.log("\nTo use in tailwind.config.ts:");
  console.log(`
import { tokenTheme } from './tailwind.config.tokens';

export default {
  theme: {
    extend: {
      ...tokenTheme,
    },
  },
};
`);
}

generateConfig().catch(console.error);
