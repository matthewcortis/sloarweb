import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { thietBiThuongHieuData } from "../../../assets/data/thietbi";
import DeviceCard from "../components/ThietBiCard.jsx";
import { fetchThietBiByGroup } from "../api/thietBiApi";
import { DEVICE_SECTIONS } from "../hooks/useThietBiSections";
import { mapVatTuToDevice } from "../utils/thietBiMapper";

export default function ThietBi_ThuongHieuPage() {
  const [searchParams] = useSearchParams();
  const groupParam = searchParams.get("group") || "";
  const selectedGroup = useMemo(() => {
    if (groupParam) return groupParam;
    return DEVICE_SECTIONS[0]?.code || "";
  }, [groupParam]);
  const selectedTitle = useMemo(() => {
    const found = DEVICE_SECTIONS.find(
      (section) => section.code === selectedGroup
    );
    return found?.title || "";
  }, [selectedGroup]);
  const selectedBrand = useMemo(() => {
    const found = thietBiThuongHieuData.find(
      (item) => item.groupCode === selectedGroup
    );
    return found || thietBiThuongHieuData[0] || null;
  }, [selectedGroup]);
  const descriptionBlocks = useMemo(() => {
    if (!selectedBrand) return [];
    const raw = selectedBrand.description;
    if (Array.isArray(raw)) {
      return raw.filter((text) => text && text.trim());
    }
    if (typeof raw === "string" && raw.trim()) {
      return [raw];
    }
    return [];
  }, [selectedBrand]);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [errorDevices, setErrorDevices] = useState(null);
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
    let isMounted = true;

    const fetchDevices = async () => {
      setLoadingDevices(true);
      setErrorDevices(null);

      try {
        if (!selectedGroup) {
          if (isMounted) setDevices([]);
          return;
        }

        const results = await fetchThietBiByGroup(selectedGroup);
        if (!isMounted) return;

        const mapped = Array.isArray(results)
          ? results.map(mapVatTuToDevice)
          : [];
        setDevices(mapped);
      } catch (fetchError) {
        console.error("Failed to load device list", fetchError);
        if (isMounted) {
          setErrorDevices(fetchError);
          setDevices([]);
        }
      } finally {
        if (isMounted) {
          setLoadingDevices(false);
        }
      }
    };

    fetchDevices();

    return () => {
      isMounted = false;
    };
  }, [selectedGroup]);

  useEffect(() => {
    updateDots();
  }, [devices]);

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
    <main className="w-full min-h-screen py-[24px] lg:py-[40px]">
      <div className="px-[16px] lg:px-[297px]">
        <div className="flex flex-col gap-[32px]">
          {selectedBrand ? (
            <section key={selectedBrand.id} className="w-full">
              <div className="flex flex-col gap-[12px]">
                <h1
                  className="text-[32px] font-semibold text-[#111111]"
                  style={{
                    fontFamily: "SF Pro Display, sans-serif",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {selectedBrand.title}
                </h1>
                <div className="flex flex-col gap-3">
                  {descriptionBlocks.map((text, index) => (
                    <p
                      key={`${selectedBrand.id}-desc-${index}`}
                      className="text-[16px] text-[#242425]"
                      style={{
                        fontFamily: "SF Pro Display, sans-serif",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-[16px] flex flex-col gap-[16px]">
                {selectedBrand.images.map((image) => (
                  <div
                    key={image.id}
                    className="w-full h-[183.02px] lg:h-[424px] overflow-hidden rounded-[12px]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <section className="mt-[32px] bg-[#F6F6F6]">
        <div className="px-[16px] lg:px-[80px] py-[24px] lg:py-[40px]">
          <div className="w-full max-w-[1232px] mx-auto">
            <h2 className="text-[20px] md:text-[24px] font-semibold text-[#111111]">
              Danh mục thiết bị{selectedTitle ? `: ${selectedTitle}` : ""}
            </h2>

            {loadingDevices ? (
              <div className="mt-6 text-sm text-gray-500">
                Đang tải danh sách thiết bị...
              </div>
            ) : errorDevices ? (
              <div className="mt-6 text-sm text-gray-500">
                Lỗi tải dữ liệu thiết bị
              </div>
            ) : devices.length > 0 ? (
              <div className="mt-6">
                <div
                  ref={listRef}
                  className="flex gap-[24px] overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0 md:snap-none"
                >
                  {devices.map((item) => (
                    <div key={item.id} className="snap-start">
                      <DeviceCard ThietBiCard={item} />
                    </div>
                  ))}
                </div>

                {dots > 1 ? (
                  <div className="mt-4 flex justify-center gap-2 md:hidden">
                    {Array.from({ length: dots }).map((_, index) => (
                      <span
                        key={`device-dot-${index}`}
                        className={`h-[8px] w-[8px] rounded-full ${
                          index === activeDot
                            ? "bg-[#111111]"
                            : "bg-[#D1D5DB]"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="mt-6 text-sm text-gray-500">
                Chưa có thiết bị trong danh mục này.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
