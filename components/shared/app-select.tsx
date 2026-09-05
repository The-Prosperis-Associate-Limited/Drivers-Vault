"use client";

import { ChevronDown, X, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  options: SelectOption[];
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
}

export const AppSelect = function ({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  error,
  disabled,
  containerClassName,
}: Props) {
  const inputId = label?.toLowerCase().replace(/\s+/g, "-");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === value) ?? null;

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Close on outside click
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

  const handleSelect = (option: SelectOption) => {
    onValueChange?.(option.value);
    setOpen(false);
    setSearch("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onValueChange?.(null);
    setSearch("");
  };

  const displayValue = open ? search : (selectedOption?.label ?? "");

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <div ref={containerRef} className="relative">
        {/* Input row */}
        <div
          className={cn(
            "border-input bg-background flex h-11 items-center rounded-md border px-3 shadow-xs transition-[color,box-shadow]",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3",
            error && "border-destructive focus-within:ring-destructive/20",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onClick={handleOpen}
        >
          <input
            ref={inputRef}
            id={inputId}
            value={displayValue}
            onChange={(e) => {
              setSearch(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={handleOpen}
            placeholder={!open && !selectedOption ? placeholder : ""}
            disabled={disabled}
            aria-invalid={!!error}
            autoComplete="off"
            className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
          />

          <div className="flex items-center gap-0.5">
            {selectedOption && !disabled && (
              <Button
                variant="ghost"
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground flex size-5 items-center justify-center rounded-sm"
              >
                <X className="size-3.5" />
              </Button>
            )}
            <ChevronDown
              className={cn(
                "text-muted-foreground size-4 transition-transform duration-150",
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
                filtered.map((option) => (
                  <li
                    key={option.value}
                    onMouseDown={(e) => {
                      // onMouseDown + preventDefault prevents input blur before click registers
                      e.preventDefault();
                      handleSelect(option);
                    }}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm select-none",
                      "hover:bg-accent hover:text-accent-foreground",
                      option.value === value &&
                        "bg-accent/50 text-accent-foreground",
                    )}
                  >
                    {option.label}
                    {option.value === value && (
                      <span className="absolute right-2 flex size-4 items-center justify-center">
                        <Check className="size-3.5" />
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
};
