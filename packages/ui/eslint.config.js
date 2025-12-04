import rootConfig from "../../eslint.config.js";
import tseslint from "typescript-eslint";

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
    },
  },
  create(context) {
    // Hex colors, rgb, rgba patterns
    const colorPattern = /#[0-9a-fA-F]{3,8}|rgb\(|rgba\(/;

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

// Custom plugin with UI-specific rules
const designSystemPlugin = {
  rules: {
    "enforce-display-name": enforceDisplayName,
    "enforce-design-tokens": enforceDesignTokens,
  },
};

export default tseslint.config(
  ...rootConfig,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "design-system": designSystemPlugin,
    },
    rules: {
      // Design System specific rules
      "design-system/enforce-display-name": "warn",
      "design-system/enforce-design-tokens": "warn",
    },
  },
  {
    // Additional ignore patterns for this package
    ignores: ["dist/**", "node_modules/**", ".storybook/**", "storybook-static/**"],
  }
);
