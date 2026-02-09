import { useRef } from "react";
import DeviceCard from "./ThietBiCard.jsx";
import { thietBi } from "../../../services/data.js";
export default function DeviceCategorySection({
  title = "Danh mục thiết bị chính",
  badgeText,
  products = thietBi,
  variant = "full", 
}) {
  const resolvedBadge = badgeText ?? `${products.length} thiết bị`;
  const isContained = variant === "contained";
  const listRef = useRef(null);

  const handleScrollNext = () => {
    if (!listRef.current) return;
    const container = listRef.current;
    const firstCard = container.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect?.().width ?? 0;
    const gap = 16; // gap-4
    const scrollAmount = cardWidth ? cardWidth + gap : container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScrollPrev = () => {
    if (!listRef.current) return;
    const container = listRef.current;
    const firstCard = container.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect?.().width ?? 0;
    const gap = 16; // gap-4
    const scrollAmount = cardWidth ? cardWidth + gap : container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  return (
    <section className={isContained ? "w-full" : "w-full px-[16px] xl:px-[80px]"}>
      <div className={isContained ? "w-full" : "max-w-[1280px] mx-auto"}>
        <div className="flex items-center gap-4 h-[38px]">
          <h2 className="text-[20px] md:text-[24px] font-semibold text-[#111111]">
            {title}
          </h2>
          <span
            className="h-[32px] min-w-[100px] px-[10px] inline-flex items-center justify-center rounded-[6px] bg-[#F1F1F2] text-[12px] font-medium text-[#2A2A2A]"
          >
            {resolvedBadge}
          </span>
        </div>
      </div>

      <div
        className={
          isContained
            ? "relative mt-4"
            : `
              relative
              -mr-[16px] xl:-mr-[80px]
              w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
              mt-4
            `
        }
      >
        <div
          ref={listRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2"
        >
          {products.map((item) => (
            <DeviceCard key={item.id} ThietBiCard={item} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[120px] lg:block">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,#FFFFFF_100%)]" />
        </div>
        <button
          type="button"
          onClick={handleScrollPrev}
          className="absolute left-4 top-1/2 hidden h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:flex"
          aria-label="Cuộn danh sách thiết bị sang trái"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#2A2A2A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleScrollNext}
          className="absolute right-4 top-1/2 hidden h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:flex"
          aria-label="Cuộn danh sách thiết bị"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#2A2A2A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
