import { CLIENT_USE_CASES } from "./content";
import { GridPattern } from "../shared/grid-pattern";

export function ClientUseCases() {
  return (
    <section className="bg-[#f2f5fb] px-2 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto overflow-hidden rounded-2xl bg-[#073fa7] px-5 py-9 text-white sm:rounded-3xl sm:px-12 sm:py-12 lg:min-h-[520px] lg:px-16">
        <GridPattern className="opacity-30" />
        <div className="relative">
          <p className="w-fit rounded-full bg-[#052f7e] px-3 py-2 text-[9px] font-semibold tracking-wide sm:px-4 sm:text-[11px]">
            USE CASES
          </p>
          <h2 className="mt-5 max-w-lg text-[1.4rem] leading-tight font-semibold tracking-[-0.035em] sm:mt-6 sm:text-4xl">
            However you move, we have drivers for you.
          </h2>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:h-56 lg:grid-cols-3">
            {CLIENT_USE_CASES.map(
              ({ icon: Icon, title, description, position }) => (
                <article key={title} className={position}>
                  <div className="grid size-10 place-items-center rounded-full bg-white text-blue-700 sm:size-12">
                    <Icon className="size-4 sm:size-5" />
                  </div>
                  <h3 className="mt-4 text-xs font-semibold tracking-wide sm:text-sm">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-blue-50/80 sm:text-sm sm:leading-6">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
