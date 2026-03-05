import fusionSolarDesktopImage from "../../../assets/huaweisolar.png";
import fusionSolarMobileImage from "../../../assets/huaweibanner.jpg";

const safetyItems = [
  "Bảo vệ cáp cell",
  "Bảo vệ điện",
  "Bảo vệ trong kiến trúc",
  "An toàn chủ động",
  "Bảo vệ khẩn cấp",
];

function ShieldIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.5l6 2.5v5.8c0 3.9-2.6 7.4-6 8.7-3.4-1.3-6-4.8-6-8.7V6l6-2.5z" />
      <path d="M9.5 12.3l1.7 1.7 3.3-3.3" />
    </svg>
  );
}

export default function HuaweiFusionSolarSection() {
  return (
    <section className="w-full flex flex-col items-center gap-[24px] md:gap-[32px]">
      <div className="w-full max-w-[1300px] mx-auto rounded-[12px] overflow-hidden bg-[#1D1D1F]">
        <div className="md:hidden w-full px-[16px] py-[16px]">
          <div className="flex flex-col gap-[8px]">
            <p className="font-['SF_Pro_Display'] text-white text-[16px] font-normal leading-[100%] tracking-[0]">
              Giải pháp điện mặt trời FushionSolar
            </p>
            <p className="font-['SF_Pro_Display'] text-white text-[21px] font-semibold leading-[100%] tracking-[0]">
              Cải tiến vượt trội
            </p>
          </div>
        </div>
        <div className="relative w-full h-[262px] md:h-[640px]">
          <img
            src={fusionSolarMobileImage}
            alt="Giải pháp điện mặt trời FusionSolar"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover md:hidden"
          />
          <img
            src={fusionSolarDesktopImage}
            alt="Giải pháp điện mặt trời FusionSolar"
            loading="lazy"
            decoding="async"
            className="hidden h-full w-full object-contain md:block"
          />
        </div>
      </div>

      <h2 className="typo-section-title md:text-[32px] text-white text-center w-full max-w-[361px] leading-[130%] md:max-w-none">
        An toàn nâng cao 5 lớp, bảo vệ gia đình bạn mỗi ngày
      </h2>

      <div className="w-full max-w-[361px] md:max-w-[1300px] mx-auto">
        <div className="flex flex-col items-center md:items-stretch md:flex-row gap-[16px]">
          {safetyItems.map((item) => (
            <div
              key={item}
              className="md:flex-1 w-full h-[40px] md:h-[129px] bg-[#2B2B2B] rounded-[12px] px-[16px] py-[8px] md:px-[16px] md:py-[24px] flex flex-row md:flex-col items-center justify-center gap-[12px] md:gap-[16px]"
            >
              <ShieldIcon className="h-[24px] w-[24px] text-white/80" />
              <p className="typo-title w-[160px] text-white text-left md:w-auto md:text-center">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
