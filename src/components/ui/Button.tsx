"use client";

import React, { forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm active:scale-[0.98] focus-visible:ring-primary/40",
  secondary:
    "bg-surface-container-high text-on-surface hover:bg-surface-container-highest active:scale-[0.98] focus-visible:ring-primary/30",
  outline:
    "border border-[var(--color-border)] bg-surface text-on-surface hover:bg-surface-container-low hover:border-[var(--color-border-strong)] active:scale-[0.98] focus-visible:ring-primary/30",
  ghost:
    "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low active:scale-[0.98] focus-visible:ring-primary/20",
  danger:
    "bg-error/10 text-error hover:bg-error hover:text-white border border-error/20 active:scale-[0.98] focus-visible:ring-error/30",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs font-semibold rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm font-semibold rounded-xl gap-2",
  lg: "px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-sans select-none transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    const variantClass = variantStyles[variant];
    const sizeClass = sizeStyles[size];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="material-symbols-outlined animate-spin text-[1.15em] shrink-0" aria-hidden="true">
            progress_activity
          </span>
        ) : (
          leftIcon && <span className="shrink-0 flex items-center">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 flex items-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
