import { useEffect, useState } from "react";
import HybridBanner from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { fetchHoiDap } from "../api/baiVietApi";
import QAItem from "../../news/components/HoiDapCard.jsx";

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

export default function HoiDapSection() {
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
                console.error("Failed to load hoi dap", fetchError);
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

    return (
        <div className="px-0 xl:px-[80px] pb-[80px]">
            {/* Banner */}
            <div className="flex flex-col items-center max-w-[1280px] mx-auto">
                <HybridBanner data={hybridData.moTaHoiDap} />
            </div>

            {/* Q&A list */}
            <div
                className="
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
            >
                <div className="flex flex-col items-center gap-4 mt-6">
                    {loading && (
                        <p className="text-[14px] text-[#667085]">
                            Đang tải hỏi đáp...
                        </p>
                    )}
                    {!loading && error && (
                        <p className="text-[14px] text-[#B42318]">
                            Không thể tải hỏi đáp. Vui lòng thử lại sau.
                        </p>
                    )}
                    {!loading && !error && !hasItems && (
                        <p className="text-[14px] text-[#667085]">
                            Chưa có hỏi đáp.
                        </p>
                    )}
                    {hasItems &&
                        items.map((item, index) => (
                            <QAItem
                                key={item?.id ?? index}
                                title={resolveHoiDapTitle(item)}
                                content={
                                    resolveHoiDapContent(item) || "Đang cập nhật."
                                }
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
