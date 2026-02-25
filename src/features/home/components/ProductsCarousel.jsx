import { useRef, useState, useEffect } from "react";
import ProductCard from "../../product/components/SolarCard.jsx";
import SolarCardShimmer from "../../product/components/SolarCardShimmer.jsx";

export default function ProductsCarousel({
  products = [],
  loading = false,
  viewMode = "carousel", // "carousel" | "grid"
  cardBgColor = "#FFFFFF",
  mainColor = "#00A859",
  textColor = "#000000ff",
  saveColor = "#E6F4ED",
  hideDetailsOnMobile = false,
  scrollContainerClassName = "",
}) {
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
            md:grid-cols-3
            xl:grid-cols-4
            auto-rows-fr
            items-stretch

            gap-x-4
            gap-y-6
          "
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SolarCardShimmer key={i} />
              ))
            : products.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex justify-center"
                >
                  <ProductCard
                    data={item}
                    cardBgColor={cardBgColor}
                    mainColor={mainColor}
                    textColor={textColor}
                    saveColor={saveColor}
                    hideDetailsOnMobile={hideDetailsOnMobile}
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

  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* ===== Intersection Observer ===== */
  useEffect(() => {
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
  }, [products, loading]);

  /* ===== Mouse drag ===== */
  const onMouseDown = (e) => {
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

  return (
    <div className="w-full">
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
                  min-w-[260px]
                  md:min-w-[300px]
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
                  min-w-[260px]
                  md:min-w-[300px]
                "
              >
                <ProductCard
                  data={item}
                  cardBgColor={cardBgColor}
                  mainColor={mainColor}
                  textColor={textColor}
                  saveColor={saveColor}
                  hideDetailsOnMobile={hideDetailsOnMobile}
                  className="w-[312px] sm:w-[302px]"
                />
              </div>
            ))}
      </div>

      {/* dots mobile */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center gap-2 mt-3 md:hidden">
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
