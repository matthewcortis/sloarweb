import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceCard from "../components/ThietBiCard.jsx";
import { useThietBiSections } from "../hooks/useThietBiSections";

function BrandProductRow({ groupKey, products }) {
  const listRef = useRef(null);
  const [dots, setDots] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const updateDots = () => {
    const container = listRef.current;
    if (!container) return;
    const { scrollWidth, clientWidth, scrollLeft } = container;
    if (!clientWidth) {
      setDots(0);
      setActiveDot(0);
      return;
    }

    const pages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
    const pageIndex = Math.round(scrollLeft / clientWidth);
    setDots(pages);
    setActiveDot(Math.min(pages - 1, Math.max(0, pageIndex)));
  };

  useEffect(() => {
    updateDots();
  }, [products]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => updateDots();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={listRef}
        className="flex gap-[24px] overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0 md:min-h-[536px] md:snap-none"
      >
        {products.map((item) => (
          <div key={item.id} className="snap-start">
            <DeviceCard ThietBiCard={item} />
          </div>
        ))}
      </div>

      {dots > 1 ? (
        <div className="mt-4 flex justify-center gap-2 md:hidden">
          {Array.from({ length: dots }).map((_, index) => (
            <span
              key={`${groupKey}-dot-${index}`}
              className={`h-[8px] w-[8px] rounded-full ${
                index === activeDot ? "bg-[#111111]" : "bg-[#D1D5DB]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ThietBiPage() {
  const { sections, loading, error } = useThietBiSections();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Đang tải danh sách thiết bị...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Lỗi tải dữ liệu thiết bị
        </p>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen px-[10px] lg:px-[80px] py-[24px] lg:py-[32px]">
      <div className="flex flex-col gap-[48px]">
        {sections.map((section) => (
          <section key={section.code} className="w-full">
            <div className="w-full max-w-[1232px] mx-auto">
              <div className="flex items-center justify-between gap-4">
                <h2
                  className="text-[24px] md:text-[32px] font-semibold text-[#111111]"
                  style={{
                    fontFamily: "SF Pro Display, sans-serif",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {section.title}
                </h2>
                <button
                  type="button"
                  className="text-[14px] font-medium text-[#E53935]"
                  onClick={() =>
                    navigate(`/device/thuong-hieu?group=${section.code}`)
                  }
                >
                  Tìm hiểu thêm
                </button>
              </div>

              {section.brandGroups.length > 0 ? (
                <div className="mt-4 flex flex-col gap-8">
                  {section.brandGroups.map((group) => (
                    <div key={group.key} className="flex flex-col gap-6">
                      <div className="w-full rounded-[12px] bg-[#F6F6F6] px-[16px] md:px-[39px] py-[16px] md:py-0 md:min-h-[122px] flex flex-col md:flex-row md:items-center gap-[16px] md:gap-[66px] xl:gap-[107px]">
                        {group.logo ? (
                          <img
                            src={group.logo}
                            alt={group.name}
                            className="w-[127px] h-[39px] object-contain"
                          />
                        ) : (
                          <span
                            className="text-[16px] font-semibold text-[#111111]"
                            style={{ fontFamily: "SF Pro Display, sans-serif" }}
                          >
                            {group.name}
                          </span>
                        )}

                        <p
                          className="text-[16px] font-normal text-[#242425]"
                          style={{
                            fontFamily: "SF Pro Display, sans-serif",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                          }}
                        >
                          {group.description}
                        </p>
                      </div>

                      <BrandProductRow
                        groupKey={group.key}
                        products={group.products}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-6 text-sm text-gray-500">
                  Chưa có thiết bị trong danh mục này.
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
