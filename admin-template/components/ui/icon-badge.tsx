"use client";

import { cn } from "@/lib/utils";

interface IconBadgeProps {
  children: React.ReactNode;
  color: "orange" | "green" | "purple" | "blue" | "red";
  className?: string;
}

/**
 * Icon container for stat cards with tone-on-tone style and dark mode support.
 */
export function IconBadge({ children, color, className }: IconBadgeProps) {
  const colorMap: Record<IconBadgeProps["color"], string> = {
    orange: "text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/30",
    green: "text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/30",
    purple: "text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30",
    blue: "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30",
    red: "text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30",
  };

  return (
    <span className={cn("h-10 w-10 rounded-md flex items-center justify-center ring-1 ring-current/20", colorMap[color], className)}>
      {children}
    </span>
  );
}
