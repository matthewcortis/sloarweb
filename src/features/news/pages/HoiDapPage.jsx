import { useEffect, useState } from "react";
import { fetchHoiDap } from "../../home/api/baiVietApi";
import QAItem from "../components/HoiDapCard.jsx";

export default function HoiDapPage() {
  const [items, setItems] = useState([]);
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadHoiDap = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchHoiDap({ page: 0, size: 100 });
        const data = Array.isArray(response) ? response : [];

        if (!isMounted) return;
        setItems(data);

        const htmlMap = {};
        await Promise.all(
          data.map(async (item) => {
            const url = item?.noiDung?.duongDan;
            if (!url) return;

            try {
              const res = await fetch(url);
              const text = await res.text();
              htmlMap[item.id] = text;
            } catch (contentError) {
              console.error("Load content failed", contentError);
              htmlMap[item.id] = "Không tải được nội dung.";
            }
          })
        );

        if (isMounted) {
          setContents(htmlMap);
        }
      } catch (fetchError) {
        console.error("Failed to load hoi dap page", fetchError);
        if (isMounted) {
          setItems([]);
          setContents({});
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

  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px] pt-[24px]">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="typo-page-title text-[#1D1D1F] text-left md:text-center">
          Hỏi &amp; đáp
        </h1>

        <div className="mt-6 flex flex-col items-center gap-4">
          {loading && (
            <p className="text-[16px] text-[#667085]">Đang tải hỏi đáp...</p>
          )}
          {!loading && error && (
            <p className="text-[16px] text-[#B42318]">
              Không thể tải hỏi đáp. Vui lòng thử lại sau.
            </p>
          )}
          {!loading && !error && !hasItems && (
            <p className="text-[16px] text-[#667085]">Chưa có hỏi đáp.</p>
          )}
          {hasItems &&
            items.map((item, index) => (
              <QAItem
                key={item?.id ?? index}
                title={resolveHoiDapTitle(item)}
                content={contents[item.id] || "Đang cập nhật..."}
              />
            ))}
        </div>
      </div>
    </div>
  );
} 
