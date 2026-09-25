import Image from "next/image";

export function DriverDashboardPreview() {
  return (
    <div className="flex w-full justify-center lg:justify-end">
      <Image
        src="/landing-page/work-respect.svg"
        alt="Driver dashboard showing earnings and upcoming jobs"
        width={554}
        height={780}
        className="h-auto w-full max-w-[554px]"
        sizes="(min-width: 1024px) 44vw, (min-width: 640px) 75vw, calc(100vw - 32px)"
      />
    </div>
  );
}
