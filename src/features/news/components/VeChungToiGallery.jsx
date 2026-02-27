import { useEffect, useMemo, useState } from "react";

export default function VeChungToiGallery({ slides = [], stats = [] }) {
  const safeSlides = useMemo(
    () =>
      Array.isArray(slides) && slides.length
        ? slides
        : [{ id: 1, image: "", caption: "" }],
    [slides]
  );
  const safeStats = Array.isArray(stats) ? stats : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [safeSlides.length]);

  return (
    <div className="px-[9px] xl:px-[80px] pb-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center gap-[12px]">
          <div className="relative w-full md:w-[850px] aspect-[361/180.5] md:aspect-auto md:h-[456px] rounded-[12px] overflow-hidden">
            {safeSlides.map((slide, index) => (
              <img
                key={slide.id ?? index}
                src={slide.image}
                alt={slide.caption || "SolarMax gallery"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div
              className="pointer-events-none absolute inset-0 rounded-[12px] md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 42.77%, rgba(0, 0, 0, 0.7) 100%)",
              }}
            />
          </div>

          <p className="w-full md:w-[850px] text-left text-[16px] md:text-[16px] text-[#4A4A4A]">
            {safeSlides[activeIndex]?.caption}
          </p>
        </div>

        <div className="mt-4 w-full md:w-[850px] bg-[#F6F6F6] rounded-[12px] md:h-[112px] py-[24px] px-0 md:p-[24px]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[47px] md:gap-[24px] place-items-center">
            {safeStats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center gap-1"
              >
                <div className="text-[18px] md:text-[20px] font-semibold text-[#1D1D1F]">
                  {stat.value}
                </div>
                <div className="text-[16px] md:text-[16px] text-[#4A4A4A]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
