import flagIcon from "../../../assets/icons/Frame 41.png";
import sunIcon from "../../../assets/icons/sun.png";
import moonIcon from "../../../assets/icons/new moon.png";

export default function VeChungToiPartnersMission({
  partners = [],
  missions = [],
}) {
  return (
    <div className="pb-[80px]">
      <div className="w-full md:h-[185px] md:bg-[#F6F6F6] md:py-[39px]">
        <div className="max-w-[1280px] mx-auto px-[9px] xl:px-0 flex flex-col items-center gap-[16px] md:gap-[24px] md:h-full md:justify-center">
          <h2 className="typo-block-title text-[#1D1D1F] text-center">
            Đối tác thương hiệu của SolarMax
          </h2>

          <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center gap-[10px] md:gap-[24px]">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="group relative flex items-center justify-center w-[150px] h-[74px] md:w-[136px] md:h-[36px]"
                style={{
                  animation: `brandFloat 6s ease-in-out ${index * 0.18}s infinite`,
                }}
              >
                <span className="pointer-events-none absolute inset-x-[14%] top-1/2 h-[24px] -translate-y-1/2 bg-[radial-gradient(circle,rgba(34,197,94,0.18)_0%,rgba(34,197,94,0)_70%)] opacity-0 blur-[8px] transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-[2px] left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#00A651] transition-all duration-300 group-hover:w-[64%]" />
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="relative z-[1] w-[122px] h-[46px] md:w-[112px] md:h-[30px] object-contain opacity-90 saturate-90 grayscale-[12%] transition-all duration-300 group-hover:opacity-100 group-hover:saturate-100 group-hover:grayscale-0 group-hover:scale-[1.05] group-hover:-translate-y-[2px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[9px] xl:px-[80px]">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center">
          <h2 className="typo-block-title mt-8 text-[#1D1D1F] text-center">
            Sứ mệnh - Mục tiêu - Giá trị
          </h2>

          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 gap-[16px] md:gap-[24px] justify-items-center">
            {missions.map((item) => (
              <div
                key={item.id}
                className="w-full md:w-[267px] md:h-[177px] bg-[#F6F6F6] rounded-[12px] p-[16px] flex flex-col items-center justify-center gap-[10px] text-center"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-[32px] h-[32px] object-contain"
                />
                <div className="text-[16px] md:text-[16px] text-[#1D1D1F] whitespace-pre-line">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes brandFloat {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            [style*="brandFloat"] {
              animation: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export const defaultMissionIcons = {
  flag: flagIcon,
  target: sunIcon,
  core: moonIcon,
};
