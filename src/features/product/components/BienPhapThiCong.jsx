import { useEffect, useMemo, useRef, useState } from "react";
import CongNghiepCard from "../../../utils/CongNhiepCard.jsx";
import congNghiepImage from "../../../assets/congnghiep.png";
import { fetchQuangCaoByViTri } from "../../home/api/quangCaoApi";

const MAI_TON_AD_POSITION = "WEB_BIEN_PHAP_THI_MAI_TON";
const MAI_NGOI_AD_POSITION = "WEB_BIEN_PHAP_THI_CONG_MAI_NGOI";
const MAI_BANG_AD_POSITION = "WEB_BIEN_PHAP_THI_CONG_MAI_BANG";

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
    {
    id: "mai-bang",
    title: "Giải pháp cho mái bằng",
    description: [
      "100% là thiết kế 3D trước khi thi công giúp: Thứ nhất, tối ưu chi phí vật tư thép. ",
      "Thứ hai, ưu tiên thiết kế hành lang hỗ trợ bảo trì tấm Pin",
    ],
    items: defaultCards,
  },
	];

const mapQuangCaoToCards = (items = []) => {
  const activeItems = items.filter(
    (item) =>
      item?.hoatDong === true &&
      item?.trangThai === 1 &&
      typeof item?.tepTin?.duongDan === "string" &&
      item.tepTin.duongDan.length > 0
  );

  return activeItems.map((item, index) => ({
    id: item?.id ?? `mai-ton-${index}`,
    image: item.tepTin.duongDan,
    items: [],
  }));
};

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
          listClassName || "h-[279px] md:h-[322px]",
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
  const [maiTonCards, setMaiTonCards] = useState(null);
  const [maiNgoiCards, setMaiNgoiCards] = useState(null);
  const [maiBangCards, setMaiBangCards] = useState(null);

  const hasMaiTonCategory = useMemo(
    () => categories.some((category) => category?.id === "mai-ton"),
    [categories]
  );
  const hasMaiNgoiCategory = useMemo(
    () => categories.some((category) => category?.id === "mai-ngoi"),
    [categories]
  );
  const hasMaiBangCategory = useMemo(
    () => categories.some((category) => category?.id === "mai-bang"),
    [categories]
  );

  useEffect(() => {
    if (!hasMaiTonCategory && !hasMaiNgoiCategory && !hasMaiBangCategory) {
      setMaiTonCards(null);
      setMaiNgoiCards(null);
      setMaiBangCards(null);
      return;
    }

    let isActive = true;

    const loadCardsByPosition = async ({ viTri, onResolved, onReset, errorLabel }) => {
      if (!viTri) return;

      try {
        const items = await fetchQuangCaoByViTri({
          viTri,
          page: 0,
          size: 20,
        });
        const mappedCards = mapQuangCaoToCards(items);
        if (isActive && mappedCards.length > 0) {
          onResolved(mappedCards);
          return;
        }
      } catch (error) {
        console.error(errorLabel, error);
      }

      if (isActive) {
        onReset(null);
      }
    };

    if (hasMaiTonCategory) {
      loadCardsByPosition({
        viTri: MAI_TON_AD_POSITION,
        onResolved: setMaiTonCards,
        onReset: setMaiTonCards,
        errorLabel: "Khong tai duoc danh sach WEB_BIEN_PHAP_THI_CONG_1",
      });
    } else {
      setMaiTonCards(null);
    }

    if (hasMaiNgoiCategory) {
      loadCardsByPosition({
        viTri: MAI_NGOI_AD_POSITION,
        onResolved: setMaiNgoiCards,
        onReset: setMaiNgoiCards,
        errorLabel: "Khong tai duoc danh sach WEB_BIEN_PHAP_THI_CONG_2",
      });
    } else {
      setMaiNgoiCards(null);
    }

    if (hasMaiBangCategory) {
      loadCardsByPosition({
        viTri: MAI_BANG_AD_POSITION,
        onResolved: setMaiBangCards,
        onReset: setMaiBangCards,
        errorLabel: "Khong tai duoc danh sach WEB_BIEN_PHAP_THI_CONG_3",
      });
    } else {
      setMaiBangCards(null);
    }

    return () => {
      isActive = false;
    };
  }, [hasMaiTonCategory, hasMaiNgoiCategory, hasMaiBangCategory]);

  const resolvedCategories = useMemo(
    () =>
      categories.map((category) => {
        if (
          category?.id === "mai-ton" &&
          Array.isArray(maiTonCards) &&
          maiTonCards.length > 0
        ) {
          return {
            ...category,
            items: maiTonCards,
          };
        }

        if (
          category?.id === "mai-ngoi" &&
          Array.isArray(maiNgoiCards) &&
          maiNgoiCards.length > 0
        ) {
          return {
            ...category,
            items: maiNgoiCards,
          };
        }

        if (
          category?.id === "mai-bang" &&
          Array.isArray(maiBangCards) &&
          maiBangCards.length > 0
        ) {
          return {
            ...category,
            items: maiBangCards,
          };
        }

        return category;
      }),
    [categories, maiTonCards, maiNgoiCards, maiBangCards]
  );

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
      <h2 className="typo-section-title text-[#111111]">
        {title}
      </h2>

      <div className="mt-4 flex flex-col gap-6">
        {resolvedCategories.map((category) => {
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
                    <h3 className="typo-subtitle text-[#111111]">
                      {category.title}
                    </h3>
                  ) : null}
                  {descriptionLines.length > 0 ? (
                    <div className="typo-body-base text-[#4B5563] flex flex-col gap-1">
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
