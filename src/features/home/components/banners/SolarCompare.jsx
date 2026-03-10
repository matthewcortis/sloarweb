import { useEffect, useState } from "react";
import banner from "../../../../assets/anhbiabanner.jpg";
import SoSanhHyOn from "../SoSanhHyOn";
import { fetchMienByTenMien } from "../../../../services/mienApi";
import {
  getCurrentDomain,
  resolveByDomainCandidates,
} from "../../../../shared/utils/domain";

const fetchDomainBanner = async (domain) => {
  const imageUrl = await resolveByDomainCandidates(domain, async (domainCandidate) => {
    const mien = await fetchMienByTenMien({
      tenMien: domainCandidate,
      page: 0,
      size: 6,
    });
    return `${mien?.tepTin?.duongDan ?? ""}`.trim();
  });

  return imageUrl || "";
};

export default function SolarCompare() {
  const [bannerSrc, setBannerSrc] = useState(banner);

  useEffect(() => {
    let isActive = true;

    const loadBanner = async () => {
      try {
        const domain = getCurrentDomain();
        if (!domain) return;

        const imageUrl = await fetchDomainBanner(domain);
        if (isActive && imageUrl) {
          setBannerSrc(imageUrl);
        }
      } catch (error) {
        console.error("Khong tai duoc anh banner theo ten mien", error);
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
        <div className="flex flex-col-reverse lg:flex-row items-stretch sm:rounded-[14px] sm:overflow-hidden shadow-none sm:shadow-[0_30px_70px_-50px_rgba(0,0,0,0.35)]">
          {/* Khối bên trái */}
          <div className="flex-1">
            <SoSanhHyOn />
          </div>

          {/* Khối bên phải */}
          <div className="relative w-full lg:w-[542px] aspect-square">
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
