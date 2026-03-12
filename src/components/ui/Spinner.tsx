import React from "react";

type SpinnerProps = {
  size?: number;
  className?: string;
};

export default function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-slate-200 border-t-slate-900 ${
        className ?? ""
      }`}
      style={{ width: size, height: size }}
    />
  );
}
