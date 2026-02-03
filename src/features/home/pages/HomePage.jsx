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
export default function Home() {
  return (
    <>
      <main className="w-full">
        <SolarComparison />
        <HybridProducts1Pha />
        <HybridProducts3Pha />
        <Banner
          image={bannerData.banner1.image}
          onClick={() => window.location.href = bannerData.banner1.link}
        />
        <OngridProducts1Pha />
        <OngridProducts3Pha />
        <Banner
          image={bannerData.banner2.image}
          onClick={() => window.location.href = bannerData.banner2.link}
        />
        <Huawei />
        <CongNghiep />
        <BannerSaleSupport />
        <MeGaStory />
        <HoiDapSection />
      </main>




    </>
  );
}
