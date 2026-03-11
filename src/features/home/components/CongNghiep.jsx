import { useRef, useEffect, useState, useCallback } from "react";
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { solarData } from "../../../services/congnghiep.js";
import { CongNghiepCard } from "../../../shared/components/cards";
import { fetchQuangCaoByViTri } from "../api/quangCaoApi";

const CONG_NGHIEP_AD_POSITION = "WEB_BIEN_PHAP_THI_CONG_CONG_NGHIEP";

const mapQuangCaoToCards = (items = []) => {
  const activeItems = items.filter(
    (item) =>
      item?.hoatDong === true &&
      item?.trangThai === 1 &&
      typeof item?.tepTin?.duongDan === "string" &&
      item.tepTin.duongDan.length > 0
  );

  return activeItems.map((item, index) => ({
    id: item?.id ?? `quang-cao-${index}`,
    image: item.tepTin.duongDan,
    items: [],
  }));
};

export default function CongNghiep() {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);
  const [cards, setCards] = useState(solarData);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const cardWidth = 290 + 16; // card + gap

  /* ================= AUTO SCROLL ================= */
  const stopAutoScroll = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current || cards.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const slider = sliderRef.current;
      if (!slider || isDownRef.current) return;

      indexRef.current++;

      slider.scrollTo({
        left: indexRef.current * cardWidth,
        behavior: "smooth",
      });

      if (indexRef.current >= cards.length - 1) {
        indexRef.current = -1;
      }
    }, 3000);
  }, [cards.length, cardWidth]);

  /* ================= DRAG ================= */
  const onMouseDown = useCallback((e) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const slider = sliderRef.current;
    if (!slider) return;

    stopAutoScroll();
    isDownRef.current = true;

    slider.classList.add("cursor-grabbing");
    slider.classList.remove("snap-x", "snap-mandatory");

    startXRef.current = e.pageX;
    scrollLeftRef.current = slider.scrollLeft;
  }, [stopAutoScroll]);

  const onMouseMove = useCallback((e) => {
    if (!isDownRef.current) return;

    e.preventDefault();
    const walk = (e.pageX - startXRef.current) * 0.8;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    isDownRef.current = false;
    slider.classList.remove("cursor-grabbing");
    slider.classList.add("snap-x", "snap-mandatory");

    indexRef.current = Math.round(slider.scrollLeft / cardWidth);

    startAutoScroll();
  }, [cardWidth, startAutoScroll]);

  useEffect(() => {
    let isActive = true;

    const loadCongNghiepImages = async () => {
      try {
        const items = await fetchQuangCaoByViTri({
          viTri: CONG_NGHIEP_AD_POSITION,
          page: 0,
          size: 20,
        });
        const mappedCards = mapQuangCaoToCards(items);
        if (isActive && mappedCards.length > 0) {
          setCards(mappedCards);
        }
      } catch (error) {
        console.error("Khong tai duoc danh sach WEB_BIEN_PHAP_THI_CONG_1", error);
      }
    };

    loadCongNghiepImages();

    return () => {
      isActive = false;
    };
  }, []);

  /* ================= GLOBAL LISTENER ================= */
  useEffect(() => {
    const onMove = (e) => isDownRef.current && onMouseMove(e);
    const onUp = () => isDownRef.current && onMouseUp();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [onMouseMove, onMouseUp]);

  /* ================= INIT ================= */
  useEffect(() => {
    indexRef.current = 0;
    const slider = sliderRef.current;
    if (slider) slider.scrollTo({ left: 0, behavior: "auto" });

    startAutoScroll();
    return stopAutoScroll;
  }, [cards.length, startAutoScroll, stopAutoScroll]);

  return (
    <div className="px-0 xl:px-[80px] pt-0 lg:pt-[20px]">
      {/* MÔ TẢ */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <MoTa data={hybridData.moTaCongNghiep} />
      </div>

      {/* SLIDER */}
      <div
        ref={sliderRef}
        className="
                  mt-[24px] md:mt-6
                  relative
                  -mr-[16px] xl:-mr-[80px]
                  w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
                  overflow-x-auto
                  select-none cursor-grab
                  snap-x snap-mandatory
                  no-scrollbar
                "
        onMouseDown={onMouseDown}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={onMouseUp}
        onTouchStart={stopAutoScroll}
        onTouchEnd={startAutoScroll}
      >
        <div className="flex gap-4 py-4 w-max">
          {cards.map((card) => (
            <div key={card.id} className="snap-start">
              <CongNghiepCard image={card.image} items={card.items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
