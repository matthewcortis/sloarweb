import { useEffect, useState } from "react";
import { fetchHoiDap } from "../../home/api/baiVietApi";
import QAItem from "../components/HoiDapCard.jsx";

export default function HoiDapPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadHoiDap = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchHoiDap({ page: 0, size: 100 });
        if (isMounted) {
          setItems(Array.isArray(response) ? response : []);
        }
      } catch (fetchError) {
        console.error("Failed to load hoi dap page", fetchError);
        if (isMounted) {
          setItems([]);
          setError(fetchError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHoiDap();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasItems = items.length > 0;

  const pickString = (...values) =>
    values.find(
      (value) => typeof value === "string" && value.trim().length > 0
    ) || "";

  const resolveHoiDapTitle = (item) =>
    pickString(
      item?.tieuDe,
      item?.tieuDeBaiViet,
      item?.title,
      item?.ten,
      item?.cauHoi
    ) || "Hỏi đáp";

  const resolveHoiDapContent = (item) =>
    pickString(
      item?.moTa,
      item?.moTaNgan,
      item?.traLoi,
      item?.tomTat,
      typeof item?.noiDung === "string" ? item.noiDung : ""
    );

  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px] pt-[24px]">
      <div className="max-w-[1280px] mx-auto">
        <h1
          className="text-[24px] md:text-[32px] font-semibold text-[#1D1D1F] text-left md:text-center"
          style={{ fontFamily: "SF Pro Display" }}
        >
          Hỏi &amp; đáp
        </h1>

        <div className="mt-6 flex flex-col items-center gap-4">
          {loading && (
            <p className="text-[14px] text-[#667085]">Đang tải hỏi đáp...</p>
          )}
          {!loading && error && (
            <p className="text-[14px] text-[#B42318]">
              Không thể tải hỏi đáp. Vui lòng thử lại sau.
            </p>
          )}
          {!loading && !error && !hasItems && (
            <p className="text-[14px] text-[#667085]">Chưa có hỏi đáp.</p>
          )}
          {hasItems &&
            items.map((item, index) => (
              <QAItem
                key={item?.id ?? index}
                title={resolveHoiDapTitle(item)}
                content={resolveHoiDapContent(item) || "Đang cập nhật."}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
