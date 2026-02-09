import { useRef } from "react";
import CongNghiepCard from "../../../utils/CongNhiepCard.jsx";
import congNghiepImage from "../../../assets/congnghiep.png";

const defaultCards = [
  {
    id: 1,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 2,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 3,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 4,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  }, {
    id: 5,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 6,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 7,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 8,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
];

const defaultCategories = [
  {
    id: "mai-ton",
    title: "Giải pháp cho mái tôn",
    description: [
      "Solarmax sử dụng 100% full rail nhôm dài 4,2m.",
      "Không sử dụng minirail, thanh bắt Z cho mái tôn.",
    ],
    items: defaultCards,
  },
    {
    id: "mai-ngoi",
    title: "Giải pháp cho mái ngói",
    description: [
      "Solarmax sử dụng 100% full rail nhôm dài 4,2m.",
      "Không sử dụng minirail, thanh bắt Z cho mái ngói.",
    ],
    items: defaultCards,
  },
];

function ScrollableCardList({
  items,
  renderItem,
  listClassName,
  gapClassName,
  ariaLabel = "mục",
}) {
  const listRef = useRef(null);

  const getGap = (container) => {
    if (!container || typeof window === "undefined") return 16;
    const styles = window.getComputedStyle(container);
    const gapValue = parseFloat(styles.columnGap || styles.gap || "0");
    return Number.isNaN(gapValue) ? 16 : gapValue;
  };

  const handleScrollNext = () => {
    if (!listRef.current) return;
    const container = listRef.current;
    const firstCard = container.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect?.().width ?? 0;
    const gap = getGap(container);
    const scrollAmount = cardWidth ? cardWidth + gap : container.clientWidth * 0.8;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScrollPrev = () => {
    if (!listRef.current) return;
    const container = listRef.current;
    const firstCard = container.firstElementChild;
    const cardWidth = firstCard?.getBoundingClientRect?.().width ?? 0;
    const gap = getGap(container);
    const scrollAmount = cardWidth ? cardWidth + gap : container.clientWidth * 0.8;
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative mt-4">
      <div
        ref={listRef}
        className={[
          "flex w-full overflow-x-auto scroll-smooth no-scrollbar",
          gapClassName || "gap-4 md:gap-3",
          listClassName || "h-[329px] md:h-[372px]",
        ].join(" ")}
      >
        {items?.map((item, index) => renderItem(item, index))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[120px] lg:block">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,#FFFFFF_100%)]" />
      </div>
      <button
        type="button"
        onClick={handleScrollPrev}
        className="absolute left-4 top-1/2 hidden h-[36px] w-[36px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E5E5E5] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] lg:flex"
        aria-label={`Cuộn danh sách ${ariaLabel} sang trái`}
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
        aria-label={`Cuộn danh sách ${ariaLabel}`}
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
  );
}

export default function BienPhapThiCong({
  title = "Biện pháp thi công",
  categories = defaultCategories,
  renderItem,
}) {
  const defaultRenderItem = (item) => (
    <CongNghiepCard
      key={item.id}
      image={item.image}
      items={item.items}
      variant="responsive"
    />
  );

  return (
    <section className="w-full">
      <h2 className="text-[20px] md:text-[24px] font-semibold text-[#111111]">
        {title}
      </h2>

      <div className="mt-4 flex flex-col gap-6">
        {categories.map((category) => {
          const descriptionLines = Array.isArray(category.description)
            ? category.description
            : category.description
            ? [category.description]
            : [];
          const resolvedRenderItem =
            category.renderItem || renderItem || defaultRenderItem;
          const ariaLabel = category.ariaLabel || category.title || title;

          return (
            <div key={category.id} className="w-full">
              {(category.title || descriptionLines.length > 0) && (
                <div className="flex flex-col gap-2">
                  {category.title ? (
                    <h3 className="text-[14px] md:text-[16px] font-semibold text-[#111111]">
                      {category.title}
                    </h3>
                  ) : null}
                  {descriptionLines.length > 0 ? (
                    <div className="text-[12px] md:text-[13px] text-[#4B5563] flex flex-col gap-1">
                      {descriptionLines.map((line, index) => (
                        <p key={`${category.id}-desc-${index}`}>{line}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}

              <ScrollableCardList
                items={category.items}
                renderItem={resolvedRenderItem}
                listClassName={category.listClassName}
                gapClassName={category.gapClassName}
                ariaLabel={ariaLabel}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
