import { useRef, useState, useEffect } from "react";
import ProductCard from "../../product/components/SolarCard.jsx";
import SolarCardShimmer from "../../product/components/SolarCardShimmer.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSalePhone } from "../../../shared/hooks";
import { resolveProductsCarouselTheme } from "../../../theme/styles/productsCarouselThemes.js";

export default function ProductsCarousel({
  products = [],
  loading = false,
  viewMode = "carousel", // "carousel" | "grid"
  theme = "default",
  cardBgColor,
  mainColor,
  textColor,
  saveColor,
  saveIconColor,
  hideDetailsOnMobile = false,
  scrollContainerClassName = "",
}) {
  const { salePhoneTel } = useSalePhone();
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const resolvedTheme = resolveProductsCarouselTheme(theme);
  const resolvedCardBgColor = cardBgColor ?? resolvedTheme.cardBgColor;
  const resolvedMainColor = mainColor ?? resolvedTheme.mainColor;
  const resolvedTextColor = textColor ?? resolvedTheme.textColor;
  const resolvedSaveColor = saveColor ?? resolvedTheme.saveColor;
  const resolvedSaveIconColor = saveIconColor ?? resolvedTheme.saveIconColor;

  // drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* ===== Intersection Observer ===== */
  useEffect(() => {
    if (viewMode !== "carousel") return;
    if (loading) return;

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".carousel-item");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6 }
    );

    items.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [products, loading, viewMode]);

  /* =======================
     GRID MODE
  ======================= */
  if (viewMode === "grid") {
    return (
      <div className="w-full flex justify-center">
        <div
          className="
            w-full
            max-w-[1280px]
            grid
            grid-cols-2
            lg:grid-cols-4
            auto-rows-fr
            items-stretch

            gap-x-4
            gap-y-4
            md:gap-y-6
          "
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full"
                >
                  <SolarCardShimmer />
                </div>
              ))
            : products.map((item) => (
                <div
                  key={item.id}
                  className={hideDetailsOnMobile ? "w-full min-w-0" : "w-full flex justify-center"}
                >
                  <ProductCard
                    data={item}
                    cardBgColor={resolvedCardBgColor}
                    mainColor={resolvedMainColor}
                    textColor={resolvedTextColor}
                    saveColor={resolvedSaveColor}
                    saveIconColor={resolvedSaveIconColor}
                    contactPhoneTel={salePhoneTel}
                    hideDetailsOnMobile={hideDetailsOnMobile}
                    className={hideDetailsOnMobile ? "w-full max-w-none min-w-0" : ""}
                  />
                </div>
              ))}
        </div>
      </div>
    );
  }

  /* =======================
     CAROUSEL MODE
  ======================= */

  /* ===== Mouse drag ===== */
  const onMouseDown = (e) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    isDown.current = true;
    containerRef.current.classList.add("cursor-grabbing");
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown.current = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };

  const onMouseUp = () => {
    isDown.current = false;
    containerRef.current.classList.remove("cursor-grabbing");
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const scrollByOneItem = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const firstItem = container.querySelector(".carousel-item");
    const itemWidth = firstItem?.getBoundingClientRect().width ?? 300;
    const styles = window.getComputedStyle(container);
    const gapValue = styles.columnGap || styles.gap || "16px";
    const gap = Number.parseFloat(gapValue) || 16;

    container.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full relative">
      {/* Desktop prev/next buttons */}
      <button
        type="button"
        aria-label="Xem sản phẩm trước"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollByOneItem(-1);
        }}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-black/5 hover:bg-white"
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-900" />
      </button>

      <button
        type="button"
        aria-label="Xem sản phẩm tiếp theo"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          scrollByOneItem(1);
        }}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md ring-1 ring-black/5 hover:bg-white"
      >
        <ChevronRightIcon className="h-5 w-5 text-gray-900" />
      </button>

      <div
        ref={containerRef}
        className={`
          flex
          gap-4
          w-full
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          no-scrollbar
          cursor-grab
          select-none
          ${scrollContainerClassName}
        `}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="
                  carousel-item
                  snap-center
                  shrink-0
                  w-[clamp(232px,84vw,302px)]
                  md:w-[clamp(260px,32vw,302px)]
                "
              >
                <SolarCardShimmer />
              </div>
            ))
          : products.map((item, i) => (
              <div
                key={item.id}
                data-index={i}
                className="
                  carousel-item
                  snap-center
                  shrink-0
                  w-[clamp(232px,84vw,302px)]
                  md:w-[clamp(260px,32vw,302px)]
                "
              >
                <ProductCard
                  data={item}
                  cardBgColor={resolvedCardBgColor}
                  mainColor={resolvedMainColor}
                  textColor={resolvedTextColor}
                  saveColor={resolvedSaveColor}
                  saveIconColor={resolvedSaveIconColor}
                  contactPhoneTel={salePhoneTel}
                  hideDetailsOnMobile={hideDetailsOnMobile}
                  className="w-full max-w-none"
                />
              </div>
            ))}
      </div>

      {/* dots mobile */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center gap-2 mt-[24px] md:hidden">
          {products.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                current === i
                  ? "bg-gray-800 scale-125"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
