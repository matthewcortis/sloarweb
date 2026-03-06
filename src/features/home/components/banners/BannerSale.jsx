import { useEffect, useState } from "react";
import { fetchQuangCaoImageUrlByViTri } from "../../api/quangCaoApi";
import { useSalePhone } from "../../../../hooks/useSalePhone";

const HOME_BANNER_3_POSITION = "WEB_HOME_BANNER_3";

export default function BannerSale({ data }) {
  const { salePhoneTel, salePhoneLabel } = useSalePhone({
    fallbackPhone: data?.phone,
  });

  const bannerData = {
    background: data?.background ?? "",
    staffImage: data?.staffImage ?? "",
    description: data?.description ?? "",
    title: data?.title ?? "",
    name: data?.name ?? "",
    phone: salePhoneTel || data?.phone || "",
    phoneLabel: salePhoneLabel || data?.phoneLabel || "",
  };
  const show = true;
  const [backgroundImage, setBackgroundImage] = useState(bannerData.background);

  useEffect(() => {
    let isActive = true;

    const loadBanner = async () => {
      try {
        const imageUrl = await fetchQuangCaoImageUrlByViTri({
          viTri: HOME_BANNER_3_POSITION,
          page: 0,
          size: 20,
        });
        if (isActive && imageUrl) {
          setBackgroundImage(imageUrl);
        }
      } catch (error) {
        console.error("Khong tai duoc banner WEB_HOME_BANNER_3", error);
      }
    };

    loadBanner();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="relative w-full overflow-visible">
      {/* ================= MOBILE ================= */}
      <div
        className="
          sm:hidden
          flex items-center justify-center
          h-[clamp(220px,58vw,300px)]
          px-4
          overflow-hidden
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="mx-auto flex h-full w-full max-w-[720px] items-center gap-[clamp(8px,3vw,16px)]">
          {/* Ảnh nhân viên */}
          <img
            src={bannerData.staffImage}
            alt="Nhân viên tư vấn"
            loading="lazy"
            decoding="async"
            className="w-[clamp(108px,35vw,154px)] h-auto max-h-[92%] object-contain shrink-0"
          />

          {/* Nội dung */}
          <div
            className="
              flex-1 min-w-0 max-w-[420px]
              flex flex-col justify-center
              gap-[clamp(8px,2.2vw,14px)]
              text-white
            "
          >
            <p className="text-[clamp(14px,3.6vw,16px)] leading-snug opacity-90">
              {bannerData.description}
            </p>

            <h3 className="text-[clamp(14px,3.6vw,18px)] font-semibold leading-tight">
              {bannerData.title}
            </h3>

            <p className="text-[clamp(14px,3.6vw,16px)] leading-snug">
              {bannerData.name}
            </p>

            <a
              href={`tel:${bannerData.phone}`}
              className="
                mt-1
                flex items-center justify-center
                w-full h-[clamp(34px,8.8vw,40px)]
                rounded-full
                bg-red-600
                text-[clamp(14px,3.8vw,16px)] font-semibold
              "
            >
              📞 {bannerData.phoneLabel}
            </a>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden sm:block relative w-full h-[clamp(260px,30vw,360px)] overflow-visible">
        {/* CỤM ẢNH + CONTENT */}
        <div
          className={`
            absolute left-1/2 top-1/2 z-20 w-full max-w-[1320px] px-[clamp(14px,2.8vw,40px)]
            -translate-x-1/2 flex items-center justify-center gap-[clamp(8px,1.5vw,24px)]
            transition-all duration-700 ease-out
            ${show ? "-translate-y-[55%] opacity-100" : "-translate-y-[45%] opacity-0"}
          `}
        >
          {/* Ảnh nhân viên */}
          <img
            src={bannerData.staffImage}
            alt="Nhân viên tư vấn"
            loading="lazy"
            decoding="async"
            className="w-[clamp(168px,18vw,260px)] h-auto max-h-[clamp(300px,34vw,430px)] object-contain shrink-0"
          />

          {/* Nội dung */}
          <div
            className={`
              max-w-[920px] w-[min(58vw,920px)] flex flex-col gap-[clamp(8px,1.4vw,14px)] text-white
              transition-all duration-700 ease-out delay-100
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <p className="text-[clamp(14px,1.45vw,16px)] leading-snug opacity-90">{bannerData.description}</p>

            <h3 className="font-semibold text-[clamp(16px,1.7vw,20px)] leading-tight">{bannerData.title}</h3>

            <p className="text-[clamp(14px,1.45vw,16px)] leading-relaxed">{bannerData.name}</p>

            <a
              href={`tel:${bannerData.phone}`}
              className={`
                mt-2 w-fit px-[clamp(16px,2vw,24px)] py-[clamp(8px,1vw,10px)] rounded-full bg-red-600 text-[clamp(14px,1.4vw,16px)] font-semibold
                transition-all duration-700 ease-out delay-300
                hover:scale-105 hover:shadow-lg
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              📞 {bannerData.phoneLabel}
            </a>
          </div>
        </div>

        {/* Background banner */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
    </div>
  );
}
