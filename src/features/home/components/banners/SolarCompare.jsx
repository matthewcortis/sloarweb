import { useEffect, useState } from "react";
import banner from "../../../../assets/baner.png";
import SoSanhHyOn from "../SoSanhHyOn";
import { fetchQuangCaoImageUrlByViTri } from "../../api/quangCaoApi";

const HOME_HEADER_AD_POSITION = "WEB_HOME_HEADER";

export default function SolarCompare() {
  const [bannerSrc, setBannerSrc] = useState(banner);

  useEffect(() => {
    let isActive = true;

    const loadBanner = async () => {
      try {
        const imageUrl = await fetchQuangCaoImageUrlByViTri({
          viTri: HOME_HEADER_AD_POSITION,
          page: 0,
          size: 20,
        });
        if (isActive && imageUrl) {
          setBannerSrc(imageUrl);
        }
      } catch (error) {
        console.error("Khong tai duoc banner WEB_HOME_HEADER", error);
      }
    };

    loadBanner();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="w-full mt-0 sm:mt-[16px] xl:px-[80px]">
      <div className="w-[calc(100%+2rem)] -mx-4 max-w-none sm:mx-auto sm:w-full sm:max-w-[1280px]">
        <div className="flex flex-col-reverse lg:flex-row items-stretch sm:rounded-[14px] sm:overflow-hidden shadow-[0_30px_70px_-50px_rgba(0,0,0,0.35)]">
          {/* Khối bên trái */}
          <div className="flex-1 bg-white">
            <SoSanhHyOn />
          </div>

          {/* Khối bên phải */}
          <div className="relative w-full lg:w-[542px] h-[340px] sm:h-[420px] lg:h-[542px]">
            <img
              src={bannerSrc}
              alt="Solar compare banner"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setBannerSrc(banner)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/5 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
