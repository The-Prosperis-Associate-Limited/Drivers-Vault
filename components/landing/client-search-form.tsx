"use client";

import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELDS = [
  {
    label: "Category",
    placeholder: "Corporate Driver",
    options: ["Corporate Driver", "Private Driver", "Executive Driver"],
  },
  {
    label: "State, Country",
    placeholder: "Kwara, Nigeria",
    options: ["Kwara, Nigeria", "Lagos, Nigeria", "Abuja, Nigeria"],
  },
  {
    label: "Local Government",
    placeholder: "Olorunda",
    options: ["Olorunda", "Ilorin West", "Ikeja"],
  },
  {
    label: "Salary Budget",
    placeholder: "₦201k – ₦250k",
    options: ["₦150k – ₦200k", "₦201k – ₦250k", "₦251k – ₦350k"],
  },
];

export function ClientSearchForm() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_16px_45px_rgba(2,24,76,.18)] sm:rounded-3xl sm:p-7">
      <div className="space-y-3 sm:space-y-4">
        {FIELDS.map((field) => (
          <div key={field.label}>
            <label className="mb-1.5 block text-[11px] font-medium text-slate-600">
              {field.label}
            </label>
            <Select defaultValue={field.placeholder}>
              <SelectTrigger className="h-10 w-full rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-600 shadow-none sm:h-11 sm:text-xs">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <Link
        href="/marketplace/search"
        className="mt-4 flex h-10 w-full items-center justify-center rounded-lg bg-[#073fa7] text-[11px] font-semibold text-white transition-colors hover:bg-[#06368f] sm:mt-5 sm:h-11 sm:text-xs"
      >
        Search
      </Link>
    </div>
  );
}
