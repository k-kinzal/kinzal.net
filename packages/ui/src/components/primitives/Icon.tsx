import { type LucideIcon, type LucideProps } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Props for the Icon component.
 */
export interface IconProps extends LucideProps {
  /**
   * The Lucide icon component to render.
   */
  icon: LucideIcon;
}

/**
 * Wrapper for Lucide icons with consistent styling.
 *
 * @remarks
 * Renders a Lucide icon with aria-hidden by default (decorative).
 * Icons are hidden from screen readers as they are typically decorative
 * when used alongside text or within buttons with aria-labels.
 *
 * @example
 * ```tsx
 * import { Star } from "lucide-react";
 * <Icon icon={Star} className="w-6 h-6" />
 * ```
 */

export function Icon({ icon: IconComponent, className, ...props }: IconProps) {
  return <IconComponent className={cn("shrink-0", className)} aria-hidden="true" {...props} />;
}

Icon.displayName = "Icon";
