import flagIcon from "../../../assets/icons/Frame 41.png";
import sunIcon from "../../../assets/icons/sun.png";
import moonIcon from "../../../assets/icons/new moon.png";

export default function VeChungToiPartnersMission({
  partners = [],
  missions = [],
}) {
  return (
    <div className="px-[9px] xl:px-[80px] pb-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <h2
          className="text-[18px] md:text-[24px] font-semibold text-[#1D1D1F] text-center"
          style={{ fontFamily: "SF Pro Display" }}
        >
          Đối tác thương hiệu của SoLarMax
        </h2>

        <div className="mt-4 w-full flex flex-wrap md:flex-nowrap items-center justify-center gap-[16px] md:gap-[24px] min-h-[76px] md:h-[185px] md:py-[39px]">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center"
            >
              <img
                src={partner.image}
                alt={partner.name}
                className="w-[123px] h-[45px] object-contain"
              />
            </div>
          ))}
        </div>

        <h2
          className="mt-8 text-[18px] md:text-[24px] font-semibold text-[#1D1D1F] text-center"
          style={{ fontFamily: "SF Pro Display" }}
        >
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
              <div className="text-[13px] md:text-[14px] text-[#1D1D1F] whitespace-pre-line">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const defaultMissionIcons = {
  flag: flagIcon,
  target: sunIcon,
  core: moonIcon,
};
