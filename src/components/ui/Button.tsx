import React, { forwardRef } from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", type = "button", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses =
      variant === "secondary"
        ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
        : variant === "ghost"
        ? "bg-transparent text-slate-900 hover:bg-slate-100"
        : "bg-slate-900 text-white hover:bg-slate-800";

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseClasses} ${variantClasses} ${className ?? ""}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
