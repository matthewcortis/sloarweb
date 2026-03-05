import { useEffect, useState } from "react";
import SolarComparison from "../components/banners/SolarCompare";
import HybridProducts1Pha from "../components/Hybrid1Pha.jsx";
import HybridProducts3Pha from "../components/Hybrid3Pha.jsx";
import Banner from "../components/banners/BannerHomePage.jsx";
import { bannerData } from "../../../services/banner.js";
import OngridProducts1Pha from "../components/Ongrid1Pha.jsx";
import OngridProducts3Pha from "../components/Ongrid3Pha.jsx";
import Huawei from "../components/Huawei.jsx";
import CongNghiep from "../components/CongNghiep.jsx";
import BannerSaleSupport from "../components/BannerSale.jsx";
import MeGaStory from "../components/MegaStory.jsx";
import HoiDapSection from "../components/HoiDap.jsx";
import { fetchQuangCaoImageUrlByViTri } from "../api/quangCaoApi";

const HOME_BANNER_1_POSITION = "WEB_HOME_BANNER_1";
const HOME_BANNER_2_POSITION = "WEB_HOME_BANNER_2";

export default function Home() {
  const [homeBanner1Image, setHomeBanner1Image] = useState(bannerData.banner1.image);
  const [homeBanner2Image, setHomeBanner2Image] = useState(bannerData.banner2.image);

  useEffect(() => {
    let isActive = true;

    const loadBannerByPosition = async ({ viTri, onResolved, errorLabel }) => {
      try {
        const imageUrl = await fetchQuangCaoImageUrlByViTri({
          viTri,
          page: 0,
          size: 20,
        });
        if (isActive && imageUrl) {
          onResolved(imageUrl);
        }
      } catch (error) {
        console.error(errorLabel, error);
      }
    };

    loadBannerByPosition({
      viTri: HOME_BANNER_1_POSITION,
      onResolved: setHomeBanner1Image,
      errorLabel: "Khong tai duoc banner WEB_HOME_BANNER_1",
    });

    loadBannerByPosition({
      viTri: HOME_BANNER_2_POSITION,
      onResolved: setHomeBanner2Image,
      errorLabel: "Khong tai duoc banner WEB_HOME_BANNER_2",
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <>
      <main className="w-full px-4 xl:px-0 lg:mt-10">
        <SolarComparison />
    
        <div className="mt-[39px] lg:mt-[80px]">
          <HybridProducts1Pha />
        </div>
        <div className="mt-[39px] lg:mt-[80px]">
          <HybridProducts3Pha />
        </div>
        <div className="-mx-4 mt-[39px] lg:mt-[10px]">
          <Banner
            image={homeBanner1Image}
            onClick={() => window.location.href = bannerData.banner1.link}
          />
        </div>
        <div className="mt-[39px] lg:mt-[80px]">
          <OngridProducts1Pha />
        </div>

        <div className="mt-[39px] lg:mt-[80px]">
          <OngridProducts3Pha />
        </div>

        <div className="-mx-4 mt-[39px] lg:mt-[80px]">

          <Banner
            image={homeBanner2Image}
            onClick={() => window.location.href = bannerData.banner2.link}
          />
        </div>
        <div className="-mx-4 bg-[#1D1D1F] px-4 pt-[39px] pb-[40px] lg:pt-[80px] lg:pb-[40px] xl:mx-0 xl:px-0">
          <Huawei />
        </div>
        <div className="mt-[39px] lg:mt-[30px]">
               <CongNghiep />
          </div>
   
        <div className="-mx-4 mt-[39px] lg:mt-[80px]">
          <BannerSaleSupport />
        </div>
        <div className=" mt-[39px] lg:mt-[30px]">
          <MeGaStory />
        </div>
          <div className=" mt-[39px] lg:mt-[80px]">
           <HoiDapSection />
        </div>
        
      </main>
    </>
  );
}
