"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 transition-all duration-150 ${
        hoverable ? "hover:border-[var(--color-border-strong)] hover:shadow-sm" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
