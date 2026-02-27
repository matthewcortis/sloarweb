import controlIcon from "../../../assets/icons/robot.png";
import gridOnIcon from "../../../assets/icons/set.png";
import gridOffIcon from "../../../assets/icons/noset.png";
import sunIcon from "../../../assets/icons/sun.png";
import moonIcon from "../../../assets/icons/new moon.png";
import pinFullIcon from "../../../assets/icons/pin1.png";
import pinLowIcon from "../../../assets/icons/battery-empty-1--phone-mobile-charge-device-electricity-empty-power-battery.png";

const commonRows = [
  {
    iconSrc: controlIcon,
    text: "Vận hành tự động 100% không cần can thiệp",
  },
  {
    iconSrc: gridOnIcon,
    text: "Hoạt động song song cùng điện lưới",
  },
  {
    iconSrc: sunIcon,
    text: "Ưu tiên sử dụng tối đa điện mặt trời, nếu thiếu, tự động huy động điện lưới",
  },
];

const compareRows = [
  {
    left: {
      iconSrc: pinLowIcon,
      text: "Điện mặt trời dư được tự động sạc vào pin lưu trữ và xả ra khi thiếu nắng",
    },
    right: {
      iconSrc: pinFullIcon,
      text: "Không có pin lưu trữ, gây lãng phí điện mặt trời dư",
    },
  },
  {
    left: {
      iconSrc: gridOnIcon,
      text: "Sử dụng được khi mất điện",
    },
    right: {
      iconSrc: gridOffIcon,
      text: "Không sử dụng được khi mất điện",
    },
  },
  {
    left: {
      iconSrc: moonIcon,
      text: "Sử dụng được vào ban đêm",
    },
    right: {
      iconSrc: sunIcon,
      text: "Chỉ sử dụng được khi có nắng",
    },
  },
];

export default function SoSanhHyOn() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[846px] bg-[#FFFFFFF] border border-[#E5E7EB] rounded-none md:rounded-l-[12px] px-[13px] md:px-6 pt-8 pb-4 md:py-10 flex flex-col gap-4 md:gap-6 text-[#2B2B2B]">
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="typo-page-title md:text-[32px] text-left md:text-center max-w-[700px] md:mx-auto">
            So sánh điện mặt trời Hy-Brid và điện mặt trời On-Grid
          </h3>

          <div className="typo-title grid grid-cols-2 text-center">
            <div className="flex flex-col gap-1">
              <span>Hy-Brid</span>
              <span className="text-[#2B2B2B]">
                (có pin lưu trữ)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span>On-Grid</span>
              <span className="text-[#2B2B2B]">
                (không pin lưu trữ)
              </span>
            </div>
          </div>
        </div>

        <div className="typo-body flex flex-col border-t border-[#D1D5DB] divide-y divide-[#D1D5DB] md:divide-y-0 text-[#4B5563]">
          {commonRows.map(({ iconSrc, text }) => (
            <div
              key={text}
              className="max-w-[720px] mx-auto w-full flex items-start md:items-center justify-start md:justify-center gap-3 md:gap-4 py-2.5 md:py-3 text-left md:text-center"
            >
              <img
                src={iconSrc}
                alt=""
                className="h-6 w-6 md:h-7 md:w-7 object-contain shrink-0 mt-0.5 md:mt-0"
              />
              <p className="leading-[120%]">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="typo-body flex flex-col border-t border-[#D1D5DB] md:border-t-0 divide-y divide-[#D1D5DB] md:divide-y-0 md:gap-4 pt-0 md:pt-1 text-[#4B5563]">
          {compareRows.map((row) => (
            <div
              key={row.left.text}
              className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 py-2.5 md:py-0"
            >
              <div className="flex items-start gap-3">
                <img
                  src={row.left.iconSrc}
                  alt=""
                  className="h-6 w-6 md:h-7 md:w-7 object-contain shrink-0 mt-0.5"
                />
                <p className="text-left leading-[120%] md:leading-[125%]">
                  {row.left.text}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <img
                  src={row.right.iconSrc}
                  alt=""
                  className="h-6 w-6 md:h-7 md:w-7 object-contain shrink-0 mt-0.5"
                />
                <p className="text-left leading-[120%] md:leading-[125%]">
                  {row.right.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
