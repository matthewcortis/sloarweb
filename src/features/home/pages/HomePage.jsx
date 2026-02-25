import { useEffect, useRef, useState } from "react";
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
import { PhoneIcon } from "@heroicons/react/24/solid";
import { fetchQuangCaoImageUrlByViTri } from "../api/quangCaoApi";

const HOME_BANNER_1_POSITION = "WEB_HOME_BANNER_1";
const HOME_BANNER_2_POSITION = "WEB_HOME_BANNER_2";

export default function Home() {
  const [showContact, setShowContact] = useState(false);
  const [homeBanner1Image, setHomeBanner1Image] = useState(bannerData.banner1.image);
  const [homeBanner2Image, setHomeBanner2Image] = useState(bannerData.banner2.image);
  const topSentinelRef = useRef(null);
  const CONTACT_PHONE = "+84 (95) 492-0242";
  const CONTACT_PHONE_TEL = "+84954920242";

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("IntersectionObserver" in window && topSentinelRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowContact(!entry.isIntersecting);
        },
        { root: null, rootMargin: "240px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(topSentinelRef.current);
      return () => observer.disconnect();
    }

    const getScrollTop = () =>
      window.pageYOffset ||
      document.documentElement?.scrollTop ||
      document.body?.scrollTop ||
      0;

    const onScroll = () => {
      setShowContact(getScrollTop() > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
      <main className="w-full px-4 xl:px-0">
        <span
          ref={topSentinelRef}
          aria-hidden="true"
          className="block h-px w-full"
        />
        <SolarComparison />
    
        <HybridProducts1Pha />
        <HybridProducts3Pha />
        <div className="-mx-4 xl:mx-0">
          <Banner
            image={homeBanner1Image}
            onClick={() => window.location.href = bannerData.banner1.link}
          />
        </div>
        <OngridProducts1Pha />
        <OngridProducts3Pha />
        <div className="-mx-4 xl:mx-0">
          
          <Banner
            image={homeBanner2Image}
            onClick={() => window.location.href = bannerData.banner2.link}
          />
        </div>
        <div className="-mx-4 xl:mx-0">
          <Huawei />
        </div>
        <CongNghiep />
        <div className="-mx-4 xl:mx-0">
          <BannerSaleSupport />
        </div>
        <MeGaStory />
        <HoiDapSection />
      </main>

      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        aria-label={`Liên hệ tư vấn trực tiếp: ${CONTACT_PHONE}`}
        className={`contact-fab fixed bottom-5 right-4 z-50 flex items-center gap-3 rounded-full px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-500 ease-out sm:bottom-6 sm:right-6 ${
          showContact
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.16)] motion-reduce:transform-none motion-reduce:transition-none`}
      >
        <span className="text-sm font-semibold text-gray-800">
          Liên hệ tư vấn trực tiếp
        </span>
        <span className="contact-fab__icon flex h-10 w-10 items-center justify-center rounded-full bg-[#E34B4B] text-white shadow-[0_6px_16px_rgba(227,75,75,0.4)]">
          <PhoneIcon className="h-5 w-5" />
        </span>
      </a>
    </>
  );
}
