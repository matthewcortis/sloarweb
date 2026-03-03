import { bannerSaleData } from "../../../services/banner.js";
import BannerSale from "./banners/BannerSale.jsx";
import HybridBanner from "./MoTa.jsx";
import { hybridData, moTaGioiThieu } from "../../../services/mota.js";
import InfoCard from "../../../utils/GioiThieuCard.jsx";
import { useNavigate } from "react-router-dom";
export default function BannerSaleSupport() {
  const navigate = useNavigate();

  const renderBoldInlineText = (text) => {
    if (!text) return null;

    const parts = text.split(/(\*\*.*?\*\*)/g);

    return (
      <>
        {parts.map((part, index) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={index} className="font-semibold text-[#1D1D1F]">
              {part.replace(/\*\*/g, "")}
            </strong>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    );
  };

  const introData = {
    ...hybridData.moTaGioiThieu,
    description: renderBoldInlineText(hybridData?.moTaGioiThieu?.description),
  };
  const introLink = hybridData?.moTaGioiThieu?.link || "/gioi-thieu";

  return (
    <section className="w-full">
      <div className="px-0 xl:px-[80px]">
        <BannerSale data={bannerSaleData} />
      </div>

      <div className="flex justify-center pt-[40px] xl:px-[80px] ">
        <div
          className="
            w-full
            bg-white
            rounded-[12px]
            xl:pb-[40px]
          "
        >
          <div className="flex px-4 flex-col items-center mx-auto max-w-[1280px]">
            <div className="block md:hidden w-full">
              <HybridBanner
                data={introData}
                titleColor="#1D1D1F"
                desColor="#4A4A4A"
                onMoreClick={() => navigate(introLink)}
              />
            </div>

            <div className="hidden md:block w-full">
              <HybridBanner
                data={{ ...introData, description: "" }}
                titleColor="#1D1D1F"
                desColor="#4A4A4A"
                onMoreClick={() => navigate(introLink)}
              />

              <div className="w-full px-[24px] text-center">
                <div className="typo-longform mx-auto max-w-[900px] text-[#4A4A4A] space-y-[18px] md:space-y-[20px]">
                  <p>
                    Với <strong>hơn 10 năm kinh nghiệm</strong> trong lĩnh vực năng lượng tái
                    tạo tại thị trường Việt Nam, SolarMax đã ghi dấu ấn qua nhiều dự án
                    <br className="hidden md:block" /> trọng điểm như:
                  </p>
                  <p className="font-semibold text-[#3D3D3D]">
                    Điện mặt trời Easup 600 MW, Điện mặt trời Phong Phú 50 MW, Điện mặt
                    trời Trúc Sơn 50 MW.
                  </p>
                  <p>
                    Năm 2021, SolarMax gia nhập thị trường điện mặt trời áp mái dân dụng.
                    Tính đến nay, SolarMax đã thành công đưa vào vận hành
                    <br className="hidden md:block" />
                    <strong> hơn 1,000 dự án dân dụng có công suất từ 5kW đến 500 kW.</strong>
                  </p>
                  <p>
                    Ngay từ những ngày đầu thành lập, SolarMax hướng đến giải pháp đảm bảo
                    chất lượng sản phẩm vượt trội và
                    <strong>
                      {" "}
                      dịch vụ thi công
                      <br className="hidden md:block" />
                      theo tiêu chuẩn châu Âu - 10 năm không cần bảo trì.
                    </strong>{" "}
                    Hiện tại, SolarMax đang áp dụng tiêu chuẩn cốt lõi sau:
                  </p>
                </div>
              </div>
            </div>
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
    </section>
  );
}
