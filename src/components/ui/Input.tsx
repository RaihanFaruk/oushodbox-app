"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightAction, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="font-sans text-xs font-semibold text-on-surface">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-on-surface-variant">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-surface text-on-surface font-sans text-sm rounded-xl border transition-all duration-150 placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:bg-surface-container-low ${
              leftIcon ? "pl-9" : "pl-3.5"
            } ${rightAction ? "pr-10" : "pr-3.5"} py-2.5 ${
              error
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-[var(--color-border)] hover:border-[var(--color-border-strong)] focus:border-primary focus:ring-primary/20"
            } ${className}`}
            {...props}
          />
          {rightAction && (
            <div className="absolute right-2.5 flex items-center">
              {rightAction}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-error font-medium">{error}</span>}
        {!error && hint && <span className="text-xs text-on-surface-variant">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
