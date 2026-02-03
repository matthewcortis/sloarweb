import { bannerSaleData } from "../../../services/banner.js";
import BannerSale from "./banners/BannerSale.jsx";
import HybridBanner from "../components/MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { moTaGioiThieu } from "../../../services/mota.js";
import InfoCard from "../../../utils/GioiThieuCard.jsx";

export default function BannerSaleSupport() {
  const renderBoldInlineText = (text) => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
      <>
        {parts.map((part, index) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={index} className="font-semibold text-gray-900">
              {part.replace(/\*\*/g, "")}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="px-[16px] xl:px-[80px]">
      <BannerSale data={bannerSaleData} />

      {/* ===== WHITE LAYOUT ===== */}
      <div className="flex justify-center mt-10">
        <div
          className="
            w-full
            bg-white
            rounded-[6px]
            py-[60px]
          "
        >
          {/* Hybrid banner */}
          <div className="flex flex-col items-center mx-auto max-w-[1280px]">
            <HybridBanner
              data={{
                ...hybridData.moTaGioiThieu,
                description: renderBoldInlineText(
                  hybridData.moTaGioiThieu.description
                ),
              }}
            />
          </div>

          {/* Grid InfoCard */}
          <div

            className="
                mt-10
                grid
                grid-cols-2        /* 👈 mobile: 2 card */
                sm:grid-cols-2     /* tablet: 2 card */
                lg:grid-cols-3     /* desktop: giữ nguyên 3 card */
                gap-x-6
                gap-y-6
                auto-rows-auto
                justify-items-center
                max-w-[864px]
                mx-auto
            "
          >

            {moTaGioiThieu.map((item) => (
              <InfoCard
                key={item.id}
                image={item.image}
                text={item.text}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ===== END WHITE LAYOUT ===== */}
    </div>
  );
}
