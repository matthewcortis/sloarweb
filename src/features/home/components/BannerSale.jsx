import { bannerSaleData } from "../../../services/banner.js";
import BannerSaleHero from "./banners/BannerSale.jsx";
import HybridBanner from "./MoTa.jsx";
import { hybridData, moTaGioiThieu } from "../../../services/mota.js";
import InfoCard from "../../../utils/GioiThieuCard.jsx";
import { useNavigate } from "react-router-dom";
export default function BannerSaleSupport() {
  const navigate = useNavigate();
  const introLink = hybridData?.moTaGioiThieu?.link || "/gioi-thieu";
  const mobileCardOrder = [1, 2, 3, 5, 4, 6];
  const mobileCards = mobileCardOrder
    .map((id) => moTaGioiThieu.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <section className="w-full">
      <div className="px-0 sm:px-4 lg:px-8 xl:px-[80px]">
        <BannerSaleHero data={bannerSaleData} />
      </div>

      <div className="flex justify-center pt-[32px] sm:pt-[40px] px-4 sm:px-6 lg:px-8 xl:px-[80px]">
        <div
          className="
            w-full
            xl:bg-white
            xl:rounded-[12px]
            xl:pb-[40px]
          "
        >
          <div className="flex px-0 sm:px-2 lg:px-4 flex-col items-center mx-auto max-w-[1280px]">
            <div className="block md:hidden w-full">
              <div className="w-full">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="typo-section-title text-[#1D1D1F]">
                    Về chúng tôi
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate(introLink)}
                    className="text-red-500 font-semibold underline decoration-red-500 underline-offset-2 whitespace-nowrap"
                  >
                    Tìm hiểu thêm
                  </button>
                </div>

                <div className="typo-longform mt-[24px] text-[#4A4A4A] space-y-[24px]">
                  <p>
                    Với <strong>hơn 10 năm kinh nghiệm</strong> trong lĩnh vực năng lượng tái
                    tạo tại thị trường Việt Nam, SolarMax đã ghi dấu ấn qua nhiều dự án
                    trọng điểm như:
                  </p>
                  <p className="font-semibold text-[#3D3D3D]">
                    Điện mặt trời Easup 600 MW, Điện mặt trời Phong Phú 50 MW, Điện mặt
                    trời Trúc Sơn 50 MW.
                  </p>
                  <p>
                    Năm 2021, SolarMax gia nhập thị trường điện mặt trời áp mái dân dụng.
                    Tính đến nay, SolarMax đã thành công đưa vào vận hành
                    <strong> hơn 1,000 dự án dân dụng có công suất từ 5kW đến 500 kW.</strong>
                  </p>
                  <p>
                    Ngay từ những ngày đầu thành lập, SolarMax hướng đến giải pháp đảm bảo
                    chất lượng sản phẩm vượt trội và
                    <strong>
                      {" "}
                      dịch vụ thi công theo tiêu chuẩn châu Âu - 10 năm không cần bảo trì.
                    </strong>{" "}
                    Hiện tại, SolarMax đang áp dụng tiêu chuẩn cốt lõi sau:
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-full">
              <HybridBanner
                data={{ ...hybridData.moTaGioiThieu, description: "" }}
                titleColor="#1D1D1F"
                desColor="#4A4A4A"
                onMoreClick={() => navigate(introLink)}
              />

              <div className="w-full px-[24px] text-center mt-[24px]">
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

          <div className="mt-[24px] grid grid-cols-2 gap-x-[14px] sm:gap-x-[20px] gap-y-[20px] sm:gap-y-[24px] px-0 md:hidden">
            {mobileCards.map((item) => {
              const isLogoOnly = !item.text;

              return (
                <div
                  key={item.id}
                  className={`min-h-[140px] flex flex-col gap-3 ${
                    isLogoOnly
                      ? "items-center justify-center"
                      : "items-start justify-start"
                  }`}
                >
                  <img
                    src={item.image}
                    alt=""
                    className={
                      isLogoOnly
                        ? "w-full max-w-[130px] h-[72px] object-contain"
                        : "w-[40px] h-[40px] object-contain shrink-0"
                    }
                  />

                  {item.text && (
                    <p
                      className="
                        text-[#48484D]
                        text-[16px]
                        font-semibold
                        leading-[24px]
                        tracking-[0]
                        text-left
                        whitespace-pre-line
                        break-words
                      "
                    >
                      {item.text}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid InfoCard - desktop/tablet */}
          <div
            className="
                mt-[24px] md:mt-10
                hidden md:grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-[16px]
                md:gap-[24px]
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
