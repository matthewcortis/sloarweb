import fusionSolarImage from "../../../assets/huaweisolar.png";

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
      <div className="w-full max-w-[1300px] mx-auto">
        <div className="md:hidden w-full bg-[#1D1D1F] rounded-[12px] px-[16px] py-[16px]">
         
        </div>
        <div className="relative w-full h-[262px] md:h-[640px] rounded-[12px] overflow-hidden">
          <img
            src={fusionSolarImage}
            alt="Giải pháp điện mặt trời FushionSolar"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="hidden md:block absolute inset-0 bg-black/25" />
          <div className="hidden md:flex relative z-10 h-full w-full flex-col justify-center gap-[8px] px-[109px] py-[254px]">
            <div className="max-w-[312px] flex flex-col gap-[8px]">
             
            </div>
          </div>
        </div>
      </div>

      <h2 className="typo-section-title md:text-[32px] text-white text-center max-w-[520px] md:max-w-none">
        An toàn nâng cao 5 lớp, bảo vệ gia đình bạn mỗi ngày
      </h2>

      <div className="w-full max-w-[1300px] mx-auto">
        <div className="flex flex-col items-center md:items-stretch md:flex-row gap-[16px]">
          {safetyItems.map((item) => (
            <div
              key={item}
              className="md:flex-1 w-full h-[40px] md:h-[129px] bg-[#2B2B2B] rounded-[12px] px-[80px] py-[8px] md:px-[16px] md:py-[24px] flex flex-row md:flex-col items-center justify-center gap-[8px] md:gap-[16px]"
            >
              <ShieldIcon className="h-[24px] w-[24px] text-white/80" />
              <p className="typo-title text-white text-center">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
