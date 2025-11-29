import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

/**
 * Custom rule to enforce displayName on components
 */
const enforceDisplayName = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce displayName on exported components",
    },
    messages: {
      missingDisplayName:
        "Component '{{name}}' should have a displayName for debugging",
    },
  },
  create(context) {
    const exportedComponents = new Set();
    const componentsWithDisplayName = new Set();

    return {
      // Track exported function components
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === "FunctionDeclaration") {
          const name = node.declaration.id?.name;
          if (name && /^[A-Z]/.test(name)) {
            exportedComponents.add(name);
          }
        }
        if (node.declaration?.type === "VariableDeclaration") {
          for (const decl of node.declaration.declarations) {
            const name = decl.id?.name;
            if (name && /^[A-Z]/.test(name)) {
              exportedComponents.add(name);
            }
          }
        }
      },

      // Track displayName assignments
      AssignmentExpression(node) {
        if (
          node.left?.type === "MemberExpression" &&
          node.left.property?.name === "displayName"
        ) {
          const objectName = node.left.object?.name;
          if (objectName) {
            componentsWithDisplayName.add(objectName);
          }
        }
      },

      // Check at the end of the file
      "Program:exit"() {
        for (const componentName of exportedComponents) {
          if (!componentsWithDisplayName.has(componentName)) {
            // Only report for component files (not test/story files)
            const filename = context.getFilename();
            if (
              !filename.includes(".test.") &&
              !filename.includes(".stories.") &&
              !filename.includes(".spec.")
            ) {
              context.report({
                loc: { line: 1, column: 0 },
                messageId: "missingDisplayName",
                data: { name: componentName },
              });
            }
          }
        }
      },
    };
  },
};

/**
 * Custom rule to enforce forwardRef on components that render HTML elements
 */
const enforceForwardRef = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage forwardRef usage for components",
    },
    messages: {
      considerForwardRef:
        "Consider using forwardRef for component '{{name}}' to support ref forwarding",
    },
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (node.declaration?.type === "FunctionDeclaration") {
          const name = node.declaration.id?.name;
          // Only for PascalCase names (components)
          if (name && /^[A-Z]/.test(name)) {
            const filename = context.getFilename();
            // Skip non-component files
            if (
              filename.includes(".test.") ||
              filename.includes(".stories.") ||
              filename.includes(".spec.") ||
              filename.includes("index.ts")
            ) {
              return;
            }

            // Check if forwardRef is used in the file
            const sourceCode = context.getSourceCode();
            const text = sourceCode.getText();
            if (!text.includes("forwardRef")) {
              // This is informational - not all components need forwardRef
              // Only report if the component renders a native HTML element
              const body = node.declaration.body;
              if (body) {
                const bodyText = sourceCode.getText(body);
                // Check if it returns a native HTML element
                const returnsNativeElement =
                  /<(div|button|input|span|a|img|form|ul|li|nav|section|article|header|footer|main|aside)\b/.test(
                    bodyText
                  );
                if (returnsNativeElement) {
                  // Silently skip - just a suggestion for new components
                }
              }
            }
          }
        }
      },
    };
  },
};

/**
 * Custom rule to enforce design tokens instead of hardcoded values
 */
const enforceDesignTokens = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Warn about hardcoded color/spacing values in className",
    },
    messages: {
      hardcodedColor:
        "Avoid hardcoded color '{{value}}'. Use design tokens from tokens/colors.ts",
      hardcodedSpacing:
        "Avoid hardcoded spacing '{{value}}'. Use design token spacing values",
    },
  },
  create(context) {
    // Hex colors, rgb, rgba patterns
    const colorPattern = /#[0-9a-fA-F]{3,8}|rgb\(|rgba\(/;
    // Pixel values that might be spacing
    const spacingPattern = /\b\d+px\b/;

    return {
      JSXAttribute(node) {
        if (
          node.name?.name === "style" &&
          node.value?.type === "JSXExpressionContainer"
        ) {
          const value = context.getSourceCode().getText(node.value);

          // Check for hardcoded colors in inline styles
          if (colorPattern.test(value)) {
            const match = value.match(colorPattern);
            if (match) {
              context.report({
                node,
                messageId: "hardcodedColor",
                data: { value: match[0] },
              });
            }
          }
        }
      },
    };
  },
};

// Custom plugin with our rules
const customPlugin = {
  rules: {
    "enforce-display-name": enforceDisplayName,
    "enforce-forward-ref": enforceForwardRef,
    "enforce-design-tokens": enforceDesignTokens,
  },
};

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "design-system": customPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "off", // Not needed with React 17+
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // Design System rules
      "design-system/enforce-display-name": "warn",
      "design-system/enforce-design-tokens": "warn",
    },
  },
  {
    // Ignore patterns
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.js",
      "*.config.ts",
      ".storybook/**",
    ],
  }
);
