# @kinzal-net/ui

A flexible design system built with React and Tailwind CSS.

## Features

- **24 Reusable Components**: Primitives, typography, layout, navigation, feedback, data display, and media components
- **Dark Mode Support**: Built-in theme switching with system preference detection
- **Accessible**: WCAG 2.1 compliant components with aria attributes
- **TypeScript**: Full type definitions with JSDoc documentation
- **Tailwind CSS**: Customizable via Tailwind configuration

## Installation

```bash
npm install @kinzal-net/ui
```

## Setup

1. Import the styles in your app entry point:

```tsx
import "@kinzal-net/ui/styles";
```

2. Wrap your app with ThemeProvider (optional, for theme switching):

```tsx
import { ThemeProvider } from "@kinzal-net/ui";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Components

### Primitives

| Component | Description |
|-----------|-------------|
| **Button** | Primary interactive element for actions |
| **Icon** | Wrapper for Lucide icons with consistent styling |
| **IconButton** | Circular button for icon-only actions |
| **Link** | Styled anchor element with variants |

### Typography

| Component | Description |
|-----------|-------------|
| **Heading** | Semantic headings (h1-h6) with independent visual sizing |
| **Text** | Body text component with size and variant options |

### Layout

| Component | Description |
|-----------|-------------|
| **Container** | Centered content wrapper with max-width |
| **Grid** | CSS Grid container with column presets |
| **Stack** | Flexbox container for vertical/horizontal layouts |

### Navigation

| Component | Description |
|-----------|-------------|
| **Navbar** | Fixed, sticky, or static navigation header |
| **NavBrand** | Brand/logo section within Navbar |
| **NavLink** | Navigation links with active state |
| **Breadcrumb** | Hierarchical navigation with customizable separator |
| **TabList** | Tab navigation container with default and pill variants |
| **TabItem** | Individual tab within TabList |
| **Pagination** | Page navigation with numbered items |

### Feedback

| Component | Description |
|-----------|-------------|
| **Footer** | Fixed, sticky, or static page footer |
| **Spinner** | Loading indicator with accessibility support |
| **Badge** | Label or status indicator |
| **Alert** | Contextual message with semantic variants |

### Data Display

| Component | Description |
|-----------|-------------|
| **Card** | Flexible container for grouped content |
| **Avatar** | User image with fallback initials |
| **Divider** | Visual separator for content sections |

### Media

| Component | Description |
|-----------|-------------|
| **Image** | Enhanced img element with object-fit control |
| **AspectRatio** | Container maintaining aspect ratios |

## Usage Examples

### Button

```tsx
import { Button } from "@kinzal-net/ui";

// Primary action
<Button variant="primary" onClick={handleSubmit}>Submit</Button>

// Secondary action
<Button variant="secondary" size="sm">Cancel</Button>

// Outline button
<Button variant="outline">Learn More</Button>
```

### Navigation

```tsx
import { Navbar, NavBrand, NavLink } from "@kinzal-net/ui";

<Navbar className="h-16 px-4">
  <div className="h-full flex items-center justify-between">
    <NavBrand href="/" className="text-xl font-bold">
      Site Name
    </NavBrand>
    <nav className="flex items-center gap-1">
      <NavLink href="/" active className="px-4 py-2">
        Home
      </NavLink>
      <NavLink href="/about" className="px-4 py-2">
        About
      </NavLink>
    </nav>
  </div>
</Navbar>
```

### Layout

```tsx
import { Stack, Grid, Container } from "@kinzal-net/ui";

<Container>
  <Stack direction="horizontal" gap="lg" align="center">
    <span>Item 1</span>
    <span>Item 2</span>
  </Stack>

  <Grid cols={3} gap="md">
    <div>Card 1</div>
    <div>Card 2</div>
    <div>Card 3</div>
  </Grid>
</Container>
```

### IconButton with Icon

```tsx
import { IconButton, Icon } from "@kinzal-net/ui";
import { Twitter, Facebook, Search } from "lucide-react";

// Social share buttons
<Stack direction="horizontal" gap="sm">
  <IconButton aria-label="Share on Twitter" variant="ghost">
    <Icon icon={Twitter} size={20} />
  </IconButton>
  <IconButton aria-label="Share on Facebook" variant="ghost">
    <Icon icon={Facebook} size={20} />
  </IconButton>
</Stack>

// Search button
<IconButton aria-label="Search" variant="secondary">
  <Icon icon={Search} size={20} />
</IconButton>
```

### Image Gallery with AspectRatio

```tsx
import { Grid, AspectRatio, Image } from "@kinzal-net/ui";

<Grid cols={3} gap="md">
  {images.map((image) => (
    <AspectRatio key={image.id} ratio="square">
      <Image
        src={image.src}
        alt={image.alt}
        className="w-full h-full"
      />
    </AspectRatio>
  ))}
</Grid>
```

### Typography

```tsx
import { Heading, Text } from "@kinzal-net/ui";

<Heading level={1} size="2xl">Page Title</Heading>
<Heading level={2} size="lg">Section Title</Heading>
<Text size="md">Regular paragraph text.</Text>
<Text size="sm" variant="muted">Secondary information.</Text>
```

### Card with Badge

```tsx
import { Card, Badge, Heading, Text } from "@kinzal-net/ui";

<Card padding="md">
  <Badge variant="primary" className="mb-2">New</Badge>
  <Heading level={3} size="md">Card Title</Heading>
  <Text variant="muted">Card description goes here.</Text>
</Card>
```

### Breadcrumb Navigation

```tsx
import { Breadcrumb, BreadcrumbItem } from "@kinzal-net/ui";

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/gallery">Gallery</BreadcrumbItem>
  <BreadcrumbItem current>Artwork</BreadcrumbItem>
</Breadcrumb>
```

### Tabs

```tsx
import { TabList, TabItem, TabPillItem } from "@kinzal-net/ui";

// Default tabs
<TabList>
  <TabItem active>Overview</TabItem>
  <TabItem>Features</TabItem>
  <TabItem>Pricing</TabItem>
</TabList>

// Pill tabs
<TabList variant="pills">
  <TabPillItem active>All</TabPillItem>
  <TabPillItem>Photos</TabPillItem>
  <TabPillItem>Videos</TabPillItem>
</TabList>
```

### Pagination

```tsx
import { Pagination, PaginationItem, PaginationEllipsis } from "@kinzal-net/ui";

<Pagination>
  <PaginationItem disabled>Previous</PaginationItem>
  <PaginationItem active>1</PaginationItem>
  <PaginationItem>2</PaginationItem>
  <PaginationItem>3</PaginationItem>
  <PaginationEllipsis />
  <PaginationItem>10</PaginationItem>
  <PaginationItem>Next</PaginationItem>
</Pagination>
```

### Feedback Components

```tsx
import { Alert, Spinner, Avatar } from "@kinzal-net/ui";

// Alerts
<Alert variant="info">Information message.</Alert>
<Alert variant="success">Success message.</Alert>
<Alert variant="warning">Warning message.</Alert>
<Alert variant="error">Error message.</Alert>

// Loading spinner
<Spinner size="md" label="Loading content..." />

// Avatar with fallback
<Avatar src="/user.jpg" alt="User Name" size="md" fallback="UN" />
```

## Complete Page Example

```tsx
import {
  ThemeProvider,
  Navbar,
  NavBrand,
  NavLink,
  Container,
  Stack,
  Grid,
  AspectRatio,
  Image,
  Footer,
  IconButton,
  Icon,
  useTheme,
} from "@kinzal-net/ui";
import { Sun, Moon } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon icon={isDark ? Sun : Moon} size={20} />
    </IconButton>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* Navigation */}
      <Navbar position="fixed" className="h-16 px-4">
        <div className="h-full flex items-center justify-between">
          <NavBrand href="/" className="text-xl font-bold">
            Portfolio
          </NavBrand>
          <nav className="flex items-center gap-1">
            <NavLink href="/" active className="px-4 py-2">
              Home
            </NavLink>
            <NavLink href="/gallery" className="px-4 py-2">
              Gallery
            </NavLink>
            <NavLink href="/about" className="px-4 py-2">
              About
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </Navbar>

      {/* Main Content */}
      <Container className="pt-20 pb-16">
        <Stack gap="xl">
          <h1>Welcome to My Portfolio</h1>

          {/* Image Gallery */}
          <Grid cols={3} gap="md">
            {images.map((img) => (
              <AspectRatio key={img.id} ratio="square">
                <Image src={img.src} alt={img.alt} className="w-full h-full" />
              </AspectRatio>
            ))}
          </Grid>
        </Stack>
      </Container>

      {/* Footer */}
      <Footer position="fixed" className="h-12 px-4">
        <div className="h-full flex items-center justify-center">
          <span className="text-sm">© 2024 Portfolio. All rights reserved.</span>
        </div>
      </Footer>
    </ThemeProvider>
  );
}
```

## Theming

The design system supports light and dark modes:

```tsx
import { useTheme } from "@kinzal-net/ui";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  );
}
```

## Accessibility

All components follow accessibility best practices:

- **IconButton**: Always provide `aria-label` for screen readers
- **Image**: Provide `alt` text for meaningful images
- **NavLink**: Uses `aria-current="page"` for active state
- **Icon**: Hidden from screen readers by default (decorative)
- **Spinner**: Includes `role="status"` and `aria-label` for loading state
- **Alert**: Uses `role="alert"` for important messages
- **Breadcrumb**: Wrapped in `<nav aria-label="Breadcrumb">` with proper `aria-current`
- **TabItem**: Uses `aria-selected` for active state
- **Avatar**: Properly labeled with `alt` text or hidden if decorative
- **prefers-reduced-motion**: Animations are disabled for users who prefer it

## Development

```bash
# Install dependencies
npm install

# Run Storybook for development
npm run storybook

# Run unit tests
npm run test

# Run visual regression tests
npm run test:vrt

# Build the library
npm run build
```

## API Consistency

### Variant Props

Button and Link components share consistent variant naming:
- `primary`: High emphasis, main actions
- `secondary`: Medium emphasis, secondary actions
- `ghost`: Low emphasis, tertiary actions
- `outline` (Button only): Medium emphasis with border

### Gap Scale

Stack and Grid use a unified gap scale:
- `none`: 0px
- `xs`: 4px
- `sm`: 8px
- `md`: 16px (default)
- `lg`: 24px
- `xl`: 32px

### Size Props

Button, IconButton, and Link support consistent sizing:
- `sm`: Compact
- `md`: Default
- `lg`: Large

## License

MIT
