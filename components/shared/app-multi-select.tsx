"use client";

import { ChevronDown, X, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { SelectOption } from "./app-select";

interface Props {
  label?: string;
  options: SelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
}

export const AppMultiSelect = function ({
  label,
  options,
  value = [],
  onValueChange,
  placeholder = "Select options",
  error,
  disabled,
  containerClassName,
}: Props) {
  const inputId = label?.toLowerCase().replace(/\s+/g, "-");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (disabled) return;
    setOpen(true);
    setSearch("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const toggle = (option: SelectOption) => {
    const next = value.includes(option.value)
      ? value.filter((v) => v !== option.value)
      : [...value, option.value];
    onValueChange?.(next);
  };

  const removeTag = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(value.filter((v) => v !== val));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.([]);
  };

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <div ref={containerRef} className="relative">
        {/* Trigger row */}
        <div
          className={cn(
            "border-input bg-background flex min-h-11 flex-wrap items-center gap-1.5 rounded-md border px-3 py-2 shadow-xs transition-[color,box-shadow]",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3",
            error && "border-destructive focus-within:ring-destructive/20",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onClick={handleOpen}
        >
          {/* Selected tags */}
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="bg-brand/10 text-brand flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
            >
              {opt.label}
              {!disabled && (
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    removeTag(opt.value, e);
                  }}
                  className="hover:text-brand/60 flex items-center"
                  aria-label={`Remove ${opt.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}

          {/* Search input */}
          <input
            ref={inputRef}
            id={inputId}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!open) setOpen(true);
            }}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            disabled={disabled}
            autoComplete="off"
            className="placeholder:text-muted-foreground min-w-20 flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
          />

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-0.5">
            {value.length > 0 && !disabled && (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearAll(e);
                }}
                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center rounded-sm"
                aria-label="Clear all"
              >
                <X className="size-3.5" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "text-muted-foreground size-4 shrink-0 transition-transform duration-150",
                open && "rotate-180",
              )}
            />
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="border-foreground/10 bg-popover text-popover-foreground absolute z-50 mt-1.5 w-full rounded-md border shadow-md">
            <ul className="no-scrollbar max-h-72 overflow-y-auto overscroll-contain p-1">
              {filtered.length === 0 ? (
                <li className="text-muted-foreground py-2 text-center text-sm">
                  No options found.
                </li>
              ) : (
                filtered.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <li
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        toggle(option);
                      }}
                      className={cn(
                        "relative flex cursor-pointer flex-col rounded-sm py-1.5 pr-8 pl-2 text-sm select-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      {option.label}
                      {option.description && (
                        <span className="text-muted-foreground text-xs">
                          {option.description}
                        </span>
                      )}
                      {isSelected && (
                        <span className="absolute right-2 flex size-4 items-center justify-center">
                          <Check className="size-3.5" />
                        </span>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
