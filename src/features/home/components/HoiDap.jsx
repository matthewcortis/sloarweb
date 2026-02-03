import HybridBanner from "./MoTa.jsx";
import { hoiDapData } from "../../../services/mega.js";
import { hybridData } from "../../../services/mota.js";
import QAItem from "../../news/components/HoiDapCard.jsx";

export default function HoiDapSection() {
    return (
        <div className="px-[16px] xl:px-[80px] pb-[80px]">
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
                <div
                    className="
            flex
            flex-col
            items-center
            gap-4
            mt-6
          "
                >
                    {hoiDapData.map((item) => (
                        <QAItem
                            key={item.id}
                            title={item.title}
                            content={item.content}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
