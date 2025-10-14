"use client";

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

/**
 * Interface for Button component props
 *
 * Extends ButtonHTMLAttributes to inherit all native button properties:
 * - Event handlers: onClick, onMouseOver, onFocus, etc.
 * - Accessibility: aria-label, aria-describedby, role, etc.
 * - Form properties: disabled, form, formAction, etc.
 * - Standard HTML attributes: id, data-*, className, etc.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant for the button
   * - primary: Main call-to-action, sage green background
   * - secondary: Secondary action, dusty rose background
   * - accent: Attention-grabbing action, mustard yellow background
   * - ghost: Minimal style with no background, just text
   * - outline: Border style with transparent background
   */
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
}

/**
 * Reusable Button component with consistent styling and behavior
 *
 * Features:
 * - Multiple visual variants matching the design system color palette
 * - Smooth transitions using custom easing functions
 * - Accessible by default (proper button semantics)
 * - Fully customizable via className prop
 * - Responsive spacing using fluid design tokens
 * - Uses OKLCH colors for perceptually uniform appearance
 */
export const Button = ({
  variant = "primary", // Visual style variant
  children, // Button content (text, icons, etc.)
  type = "button", // Default to "button" to prevent form submission
  className, // Additional CSS classes for customization
  ...props // All other button props (onClick, disabled, etc.)
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        // Base styles applied to all button variants
        // Uses fluid spacing and custom easing for smooth interactions
        "rounded-md cursor-pointer inline-flex items-center justify-center px-m py-s transition-all duration-300 ease-[--ease-out-quart] text-headline-5 font-semibold font-cabinet-grotesk disabled:opacity-50 disabled:cursor-not-allowed",

        // Primary variant: Main call-to-action button
        // Sage green background - calm, natural, professional
        variant === "primary" &&
          "bg-primary-700 text-white hover:bg-primary-500 active:bg-primary-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",

        // Secondary variant: Secondary actions
        // Dusty rose background - soft, approachable, warm
        variant === "secondary" &&
          "bg-secondary-600 text-white hover:bg-secondary-500 active:bg-secondary-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-500",

        // Accent variant: Attention-grabbing actions
        // Mustard yellow background - energetic, optimistic, highlights CTAs
        variant === "accent" &&
          "bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",

        // Ghost variant: Minimal style for subtle actions
        // No background, just text with hover underline effect
        variant === "ghost" &&
          "text-foreground-800 hover:text-foreground-950 hover:underline decoration-2 underline-offset-4",

        // Outline variant: Border style with transparent background
        // Subtle border, fills on hover for nice interaction
        variant === "outline" &&
          "border-2 border-primary-500 text-primary-700 hover:bg-primary-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",

        // Custom classes passed via props (highest specificity)
        className
      )}
      {...props} // Spread all remaining props to native button element
    >
      {children}
    </button>
  );
};
