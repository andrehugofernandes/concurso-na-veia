"use client";

import { useId, useState, forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  error?: string | null;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  surfaceClassName?: string;
  contentLeftClassName?: string;
};

type AnimatedTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string | null;
    containerClassName?: string;
    textareaClassName?: string;
    labelClassName?: string;
    surfaceClassName?: string;
    contentLeftClassName?: string;
  };

const LABEL_TRANSITION = {
  duration: 0.2,
  ease: "easeInOut" as const,
};

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      label,
      icon,
      trailing,
      error,
      className,
      containerClassName,
      inputClassName,
      labelClassName,
      surfaceClassName,
      contentLeftClassName,
      disabled,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const inputId = useMemo(
      () => props.id || `animated-input-${reactId}`,
      [props.id, reactId],
    );
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    // Controlled vs uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue !== null && `${currentValue}`.length > 0;
    const isFloating = isFocused || hasValue;

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    const leftClass = contentLeftClassName ?? "left-3";
    const labelLeftPosition = icon ? "left-8" : leftClass;
    const surface = surfaceClassName ?? "bg-white dark:bg-slate-900";

    return (
      <div className={cn("space-y-1 overflow-visible", containerClassName)}>
        <div
          className={cn(
            "relative flex items-center overflow-visible",
            className,
          )}
        >
          {/* Ícone à esquerda */}
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
              {icon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused && !hasValue ? props.placeholder : " "}
            className={cn(
              "peer w-full rounded-md border bg-white dark:bg-slate-900 px-3 py-3 text-base outline-none transition-colors focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:border-primary",
              "border-gray-200 dark:border-slate-600",
              "text-gray-900 dark:text-slate-100",
              isFocused && !hasValue
                ? "placeholder:text-gray-400 dark:placeholder:text-slate-500"
                : "placeholder-transparent",
              icon && "pl-10",
              trailing && "pr-12",
              disabled && "opacity-60 cursor-not-allowed",
              error && "border-red-500 focus:border-red-500",
              inputClassName,
            )}
            style={
              { "--tw-ring-color": "var(--primary-hex)" } as React.CSSProperties
            }
            {...props}
          />

          {/* Label que vira badge ao flutuar */}
          <motion.label
            htmlFor={inputId}
            className={cn(
              "pointer-events-none absolute origin-left text-base",
              labelLeftPosition,
              surface,
              labelClassName,
            )}
            initial={false}
            animate={
              isFloating
                ? {
                    top: 0,
                    y: "-50%",
                    scale: 0.75,
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 2,
                    paddingBottom: 2,
                  }
                : {
                    top: "50%",
                    y: "-50%",
                    scale: 1,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }
            }
            transition={LABEL_TRANSITION}
            style={{ zIndex: 50 }}
          >
            <span
              className={cn(
                "inline-block rounded px-2 transition-colors",
                isFloating
                  ? cn("border border-primary text-primary", surface)
                  : "border-transparent text-gray-500 dark:text-slate-400",
              )}
            >
              {label}
            </span>
          </motion.label>

          {/* Trailing (ex: botão mostrar/ocultar senha) */}
          {trailing && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-400">
              {trailing}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

AnimatedInput.displayName = "AnimatedInput";

export const AnimatedTextarea = forwardRef<
  HTMLTextAreaElement,
  AnimatedTextareaProps
>(
  (
    {
      label,
      error,
      className,
      containerClassName,
      textareaClassName,
      labelClassName,
      surfaceClassName,
      contentLeftClassName,
      disabled,
      value,
      defaultValue,
      onFocus,
      onBlur,
      onChange,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const textareaId = useMemo(
      () => props.id || `animated-textarea-${reactId}`,
      [props.id, reactId],
    );
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue !== null && `${currentValue}`.length > 0;
    const isFloating = isFocused || hasValue;

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    };

    const leftClass = contentLeftClassName ?? "left-3";
    const surface = surfaceClassName ?? "bg-white dark:bg-slate-900";
    const restingTop = "0.75rem";

    return (
      <div className={cn("space-y-1 overflow-visible", containerClassName)}>
        <div className={cn("relative overflow-visible", className)}>
          <textarea
            id={textareaId}
            ref={ref}
            disabled={disabled}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused && !hasValue ? props.placeholder : " "}
            className={cn(
              "peer w-full rounded-md border bg-white dark:bg-slate-900 px-3 py-3 text-base outline-none transition-colors focus:ring-offset-4 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-primary focus:border-primary",
              "border-gray-200 dark:border-slate-600",
              "text-gray-900 dark:text-slate-100",
              isFocused && !hasValue
                ? "placeholder:text-gray-400 dark:placeholder:text-slate-500"
                : "placeholder-transparent",
              disabled && "opacity-60 cursor-not-allowed",
              error && "border-red-500 focus:border-red-500",
              textareaClassName,
            )}
            {...props}
          />

          <motion.label
            htmlFor={textareaId}
            className={cn(
              "pointer-events-none absolute origin-left text-base",
              leftClass,
              surface,
              labelClassName,
            )}
            initial={false}
            animate={
              isFloating
                ? {
                    top: 0,
                    y: "-50%",
                    scale: 0.75,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 2,
                    paddingBottom: 2,
                  }
                : {
                    top: restingTop,
                    y: 0,
                    scale: 1,
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }
            }
            transition={LABEL_TRANSITION}
            style={{ zIndex: 50 }}
          >
            <span
              className={cn(
                "inline-block rounded px-1 transition-colors",
                isFloating
                  ? cn("border border-primary text-primary", surface)
                  : "border-transparent text-gray-500 dark:text-slate-400",
              )}
            >
              {label}
            </span>
          </motion.label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

AnimatedInput.displayName = "AnimatedInput";
AnimatedTextarea.displayName = "AnimatedTextarea";
