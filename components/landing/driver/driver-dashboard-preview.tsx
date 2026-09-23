import { BriefcaseBusiness, LayoutDashboard, ListChecks } from "lucide-react";

import { TegatLogo } from "@/components/svg/logo";

export function DriverDashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-[#073fa7] p-6 pb-0 shadow-[0_24px_70px_rgba(7,63,167,.18)]">
      <div className="flex min-h-[470px] overflow-hidden rounded-t-2xl bg-white">
        <aside className="hidden w-32 shrink-0 border-r border-slate-100 px-4 py-7 sm:block">
          <TegatLogo size={28} />
          <div className="mt-9 space-y-3 text-[9px] text-slate-400">
            <div className="flex items-center gap-2">
              <ListChecks className="size-3" /> GET STARTED
            </div>
            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2 py-2 font-semibold text-blue-700">
              <LayoutDashboard className="size-3" /> Overview
            </div>
            <div className="flex items-center gap-2 px-2">
              <BriefcaseBusiness className="size-3" /> Job Request
            </div>
          </div>
        </aside>
        <div className="flex-1 bg-slate-50 px-5 py-7 sm:px-7">
          <div className="rounded-lg bg-white p-3 text-[9px] text-slate-400">
            Search here...
          </div>
          <p className="mt-7 text-xs font-semibold text-slate-900">
            Good afternoon, Chidinma 👋
          </p>
          <p className="mt-1 text-[9px] text-slate-500">
            You’re almost done! Here’s what is left to access Tegat.
          </p>
          <div className="mt-6 rounded-xl bg-blue-600 p-5 text-white shadow-lg">
            <p className="text-[9px] font-medium uppercase">Overall progress</p>
            <p className="mt-2 text-2xl font-semibold">80%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-4/5 rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Ongoing project", "0"],
              ["Trust score", "0"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[8px] text-slate-400 uppercase">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-28 rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[9px] font-semibold text-slate-800">
              Upcoming jobs
            </p>
            <div className="mt-6 h-2 w-2/3 rounded-full bg-slate-100" />
            <div className="mt-3 h-2 w-1/2 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
