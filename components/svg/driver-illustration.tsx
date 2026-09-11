import Image from "next/image";

/*
  In the design the panel is the full height of the screen under the header, not
  a card sized to its illustration — so the height is set here rather than left
  to the content. `min-h`, not `h`, because the signup form is taller than 80vh
  on a short viewport and the panel should match it rather than be overrun.

  Decorative and the tallest thing on the page, so it is dropped below lg rather
  than shrunk.
*/
export const DriverIllustration = function () {
  return (
    <div className="bg-brand hidden min-h-[80vh] w-full items-center justify-center overflow-hidden rounded-3xl p-8 lg:flex xl:p-12">
      <Image
        src="/driver-auth.svg"
        alt=""
        width={559}
        height={606}
        priority
        className="h-full max-h-[560px] w-full object-contain"
      />
    </div>
  );
};
