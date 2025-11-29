import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const cardVariants = cva(
  "rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-background shadow-sm",
        outline: "bg-transparent border border-border",
        ghost: "bg-transparent",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

/**
 * Props for the Card component.
 */
export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Props for CardHeader component.
 */
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * Props for CardBody component.
 */
export type CardBodyProps = HTMLAttributes<HTMLDivElement>;

/**
 * Props for CardFooter component.
 */
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card container component with compound subcomponents.
 *
 * @remarks
 * A flexible container for grouping related content.
 * Supports different visual styles and padding options.
 * Use Card.Header, Card.Body, and Card.Footer for structured layouts.
 *
 * @example
 * ```tsx
 * // Simple card
 * <Card>
 *   <Heading level={3}>Card Title</Heading>
 *   <Text>Card content goes here.</Text>
 * </Card>
 *
 * // Compound card with structured sections
 * <Card padding="none">
 *   <Card.Header>
 *     <Heading level={3}>Title</Heading>
 *   </Card.Header>
 *   <Card.Body>
 *     <Text>Main content here.</Text>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 *
 * // Outline card
 * <Card variant="outline" padding="lg">
 *   <Text>Bordered card content</Text>
 * </Card>
 * ```
 */
const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardRoot.displayName = "Card";

/**
 * Card header section.
 *
 * @example
 * ```tsx
 * <Card.Header>
 *   <Heading level={3}>Card Title</Heading>
 * </Card.Header>
 * ```
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-4 py-3 border-b border-border", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

/**
 * Card body section for main content.
 *
 * @example
 * ```tsx
 * <Card.Body>
 *   <Text>Main content here.</Text>
 * </Card.Body>
 * ```
 */
const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = "CardBody";

/**
 * Card footer section for actions.
 *
 * @example
 * ```tsx
 * <Card.Footer>
 *   <Button variant="primary">Submit</Button>
 *   <Button variant="ghost">Cancel</Button>
 * </Card.Footer>
 * ```
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-4 py-3 border-t border-border",
          "flex items-center gap-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter";

// Compound component pattern
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

Card.displayName = "Card";

export { cardVariants };
