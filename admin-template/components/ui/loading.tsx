// Server Component - não requer "use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface LoadingProps {
  className?: string
  count?: number
  type?: "card" | "list" | "text" | "avatar"
}

/**
 * Componente de loading para ser usado como fallback em Suspense
 * @param props Propriedades do componente
 * @returns Componente de loading
 */
export function Loading({
  className,
  count = 3,
  type = "card"
}: LoadingProps) {
  const items = Array.from({ length: count }, (_, i) => i)

  if (type === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {items.map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    )
  }

  if (type === "avatar") {
    return (
      <div className={cn("flex items-center space-x-4", className)}>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {items.map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default: card
  return (
    <div className={cn("grid gap-6", className)}>
      {items.map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-40 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}
