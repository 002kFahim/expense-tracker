import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "food"
    | "transport"
    | "shopping"
    | "entertainment"
    | "health"
    | "education"
    | "bills"
    | "others";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      food: "bg-orange-100 text-orange-800",
      transport: "bg-blue-100 text-blue-800",
      shopping: "bg-pink-100 text-pink-800",
      entertainment: "bg-purple-100 text-purple-800",
      health: "bg-green-100 text-green-800",
      education: "bg-indigo-100 text-indigo-800",
      bills: "bg-red-100 text-red-800",
      others: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
