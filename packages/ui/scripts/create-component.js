#!/usr/bin/env node

/**
 * Component Generator Script
 *
 * Creates a new component with all required files following Design System conventions:
 * - Component file with forwardRef, displayName, and CVA
 * - Test file with standard test structure
 * - Stories file for Storybook
 *
 * Usage:
 *   node scripts/create-component.js <ComponentName> <category>
 *
 * Example:
 *   node scripts/create-component.js Modal feedback
 *   node scripts/create-component.js DataTable data-display
 *
 * Categories:
 *   primitives, layout, navigation, feedback, data-display, typography, media
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VALID_CATEGORIES = [
  "primitives",
  "layout",
  "navigation",
  "feedback",
  "data-display",
  "typography",
  "media",
];

const componentName = process.argv[2];
const category = process.argv[3];

if (!componentName) {
  console.error("Error: Component name is required");
  console.error("Usage: node scripts/create-component.js <ComponentName> <category>");
  process.exit(1);
}

if (!category || !VALID_CATEGORIES.includes(category)) {
  console.error(`Error: Valid category is required. Options: ${VALID_CATEGORIES.join(", ")}`);
  process.exit(1);
}

if (!/^[A-Z][a-zA-Z]*$/.test(componentName)) {
  console.error("Error: Component name must be PascalCase (e.g., Button, IconButton)");
  process.exit(1);
}

const componentDir = join(__dirname, "../src/components", category);
const componentFile = join(componentDir, `${componentName}.tsx`);
const testFile = join(componentDir, `${componentName}.test.tsx`);
const storyFile = join(componentDir, `${componentName}.stories.tsx`);

// Check if component already exists
if (existsSync(componentFile)) {
  console.error(`Error: Component ${componentName} already exists at ${componentFile}`);
  process.exit(1);
}

// Ensure directory exists
if (!existsSync(componentDir)) {
  mkdirSync(componentDir, { recursive: true });
}

// Generate component file
const componentTemplate = `import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const ${componentName.toLowerCase()}Variants = cva(
  [
    // Base styles
    "",
  ],
  {
    variants: {
      variant: {
        default: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Props for the ${componentName} component.
 */
export interface ${componentName}Props
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${componentName.toLowerCase()}Variants> {}

/**
 * ${componentName} component.
 *
 * @remarks
 * TODO: Add component description.
 *
 * @example
 * \`\`\`tsx
 * <${componentName}>Content</${componentName}>
 * \`\`\`
 */
export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${componentName.toLowerCase()}Variants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${componentName}.displayName = "${componentName}";

export { ${componentName.toLowerCase()}Variants };
`;

// Generate test file
const testTemplate = `import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { ${componentName} } from "./${componentName}";

describe("${componentName}", () => {
  it("renders children correctly", () => {
    render(<${componentName}>Test content</${componentName}>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    render(<${componentName} data-testid="${componentName.toLowerCase()}">Content</${componentName}>);
    const element = screen.getByTestId("${componentName.toLowerCase()}");
    expect(element).toBeInTheDocument();
  });

  it("applies size variants", () => {
    const { rerender } = render(
      <${componentName} size="sm" data-testid="${componentName.toLowerCase()}">
        Content
      </${componentName}>
    );
    expect(screen.getByTestId("${componentName.toLowerCase()}")).toBeInTheDocument();

    rerender(
      <${componentName} size="lg" data-testid="${componentName.toLowerCase()}">
        Content
      </${componentName}>
    );
    expect(screen.getByTestId("${componentName.toLowerCase()}")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <${componentName} className="custom-class" data-testid="${componentName.toLowerCase()}">
        Content
      </${componentName}>
    );
    expect(screen.getByTestId("${componentName.toLowerCase()}")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <${componentName} ref={ref}>Content</${componentName}>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<${componentName}>Content</${componentName}>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
`;

// Generate story file
const storyTemplate = `import type { Meta, StoryObj } from "@storybook/react";
import { ${componentName} } from "./${componentName}";

const meta: Meta<typeof ${componentName}> = {
  title: "${getCategoryTitle(category)}/${componentName}",
  component: ${componentName},
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    children: "${componentName} content",
  },
};

export const Small: Story = {
  args: {
    children: "Small ${componentName}",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large ${componentName}",
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <${componentName} size="sm">Small</${componentName}>
      <${componentName} size="md">Medium</${componentName}>
      <${componentName} size="lg">Large</${componentName}>
    </div>
  ),
};
`;

function getCategoryTitle(cat) {
  const titles = {
    primitives: "Primitives",
    layout: "Layout",
    navigation: "Navigation",
    feedback: "Feedback",
    "data-display": "Data Display",
    typography: "Typography",
    media: "Media",
  };
  return titles[cat] || cat;
}

// Write files
writeFileSync(componentFile, componentTemplate);
console.log(`Created: ${componentFile}`);

writeFileSync(testFile, testTemplate);
console.log(`Created: ${testFile}`);

writeFileSync(storyFile, storyTemplate);
console.log(`Created: ${storyFile}`);

// Update index.ts export
const indexPath = join(__dirname, "../src/index.ts");
const indexContent = readFileSync(indexPath, "utf-8");

const exportLine = `export { ${componentName}, type ${componentName}Props } from "./components/${category}/${componentName}";`;

if (!indexContent.includes(exportLine)) {
  // Find the appropriate section to add the export
  const categoryComment = getCategoryComment(category);
  const lines = indexContent.split("\n");
  let insertIndex = lines.length - 1;

  // Find the section for this category
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`// ${categoryComment}`)) {
      // Find the end of this section (next comment or end)
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith("//") && !lines[j].includes(categoryComment)) {
          insertIndex = j;
          break;
        }
        if (j === lines.length - 1) {
          insertIndex = j + 1;
        }
      }
      break;
    }
  }

  lines.splice(insertIndex, 0, exportLine);
  writeFileSync(indexPath, lines.join("\n"));
  console.log(`Updated: ${indexPath}`);
}

function getCategoryComment(cat) {
  const comments = {
    primitives: "Primitives",
    layout: "Layout",
    navigation: "Navigation",
    feedback: "Feedback",
    "data-display": "Data Display",
    typography: "Typography",
    media: "Media",
  };
  return comments[cat] || cat;
}

console.log(`
Component ${componentName} created successfully!

Next steps:
1. Edit the component file to add your implementation
2. Update the test file with specific test cases
3. Customize the stories for Storybook
4. Run 'npm run quality' to verify everything works
`);
