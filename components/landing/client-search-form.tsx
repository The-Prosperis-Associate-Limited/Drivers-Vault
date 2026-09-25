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
    <div className="min-h-[460px] rounded-3xl bg-white p-6 shadow-[0_16px_45px_rgba(2,24,76,.18)] sm:p-8">
      <div className="space-y-4">
        {FIELDS.map((field) => (
          <div key={field.label}>
            <label className="mb-2 block text-sm leading-5 font-medium text-[#344054]">
              {field.label}
            </label>
            <Select defaultValue={field.placeholder}>
              <SelectTrigger className="h-10 w-full rounded-lg border-[#D0D5DD] bg-white px-3 text-base leading-6 text-[#667085] shadow-none">
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
        className="mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#00359E] text-base leading-6 font-semibold text-white transition-colors hover:bg-[#002f8d]"
      >
        Search
      </Link>
    </div>
  );
}
