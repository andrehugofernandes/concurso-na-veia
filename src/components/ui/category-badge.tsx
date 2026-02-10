"use client";

import { Badge } from "@/components/ui/badge";
import { hexToRgba } from "@/lib/color";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  color?: string | null;
  className?: string;
  title?: string;
}

/**
 * Category badge with tone-on-tone style based on HEX color.
 * Uses solid text color, translucent border/background for soft appearance.
 */
export function CategoryBadge({ name, color, className, title }: CategoryBadgeProps) {
  const border = hexToRgba(color ?? undefined, 0.4);
  const bg = hexToRgba(color ?? undefined, 0.10);
  const text = color ?? "#475569"; // slate-600 fallback

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs",
        className
      )}
      style={{
        borderColor: border,
        backgroundColor: bg,
        color: text
      }}
      title={title ?? name}
    >
      {name}
    </Badge>
  );
}
