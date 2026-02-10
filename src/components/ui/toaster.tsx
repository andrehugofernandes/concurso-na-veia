"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast
            key={id}
            variant={variant}
            // No variant default, aplicar borda/acento do tema atual via CSS vars
            className={
              variant === "destructive"
                ? undefined
                : "border-[var(--primary)] hover:border-[var(--primary-hover)] transition-colors bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg text-popover-foreground"
            }
            {...props}
          >
            {/* Barra lateral de acento quando não for destructive */}
            {variant !== "destructive" && (
              <div className="absolute left-0 top-0 h-full w-1 bg-[var(--primary)]" aria-hidden />
            )}
            <div className="grid gap-1 ">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
