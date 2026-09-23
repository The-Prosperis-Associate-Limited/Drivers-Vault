import { BriefcaseBusiness, LayoutDashboard, Users } from "lucide-react";

import { TegatLogo } from "@/components/svg/logo";

export function ClientDashboardPreview() {
  return (
    <div className="overflow-hidden rounded-[22px] bg-[#073fa7] p-3 pb-0 shadow-[0_24px_70px_rgba(7,63,167,.18)] sm:rounded-[30px] sm:p-6 sm:pb-0">
      <div className="flex min-h-[390px] overflow-hidden rounded-t-xl bg-white sm:min-h-[485px] sm:rounded-t-2xl">
        <aside className="hidden w-32 shrink-0 border-r border-slate-100 px-4 py-7 sm:block">
          <TegatLogo size={28} />
          <div className="mt-9 space-y-3 text-[9px] text-slate-400">
            <div className="flex items-center gap-2 rounded-md bg-blue-50 px-2 py-2 font-semibold text-blue-700">
              <LayoutDashboard className="size-3" /> Overview
            </div>
            <div className="flex items-center gap-2 px-2">
              <Users className="size-3" /> My Drivers
            </div>
            <div className="flex items-center gap-2 px-2">
              <BriefcaseBusiness className="size-3" /> Request
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1 bg-slate-50 px-3 py-5 sm:px-7 sm:py-7">
          <div className="rounded-lg bg-white p-3 text-[9px] text-slate-400">
            Search here...
          </div>
          <p className="mt-7 text-xs font-semibold text-slate-900">
            Welcome back, yourcompany
          </p>
          <p className="mt-1 text-[9px] text-slate-500">
            Here’s what is happening across your account.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ["Active drivers", "0"],
              ["Open requests", "1"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[8px] text-slate-400 uppercase">{label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
            <p className="text-[9px] font-semibold text-slate-800">
              Your hired drivers
            </p>
            <div className="mt-3 space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="grid size-7 place-items-center rounded-full bg-emerald-700 text-[7px] font-semibold text-white">
                    MA
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[9px] font-semibold text-slate-800">
                      Musa Abdulkarim
                    </p>
                    <p className="text-[7px] text-slate-400">
                      Executive Driver
                    </p>
                  </div>
                  <span className="text-[7px] font-medium text-emerald-600">
                    ACTIVE
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
