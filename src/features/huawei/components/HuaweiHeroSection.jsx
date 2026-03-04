import SolarMaxLogo from "../../../assets/Group.png";
import Huawei from "../../../assets/icons/huawei.png";

const defaultDevices = [
  { id: 1, title: "1 - Inverter", imageSrc: "" },
  { id: 2, title: "2 - Optimizer", imageSrc: "" },
  { id: 3, title: "3 - Lưu trữ", imageSrc: "" },
  { id: 4, title: "4 - Lưới điện", imageSrc: "" },
];


export default function HuaweiHeroSection({ data }) {
  const heroSrc = data?.heroImageSrc || fallbackHeroSvg;
  const devices = data?.devices?.length ? data.devices : defaultDevices;
  const title =
    data?.title || "Gói giải pháp điện mặt trời mang đẳng cấp Huawei";

  return (
    <section className="
        w-full
        flex flex-col
        items-center
        gap-[24px]
        md:gap-[39px]
      ">

      <div className="w-full max-w-[1280px] h-[118px] md:h-[90px] flex flex-col items-center justify-center gap-[24px]">
        <div className="flex items-center justify-center gap-[15px] w-[230px] h-[28px] md:w-[231px] md:h-[28px]">
          <img
            src={SolarMaxLogo}
            alt="SolarMax"
            className="object-contain w-[110px] h-[19.078px] md:w-[111px]"
          />

          <img
            src={Huawei}
            alt="Huawei"
            className="object-contain w-[105px] h-[28px]"
          />
        </div>

        <h1 className="typo-page-title leading-[140%] text-center text-white">
          {title}
        </h1>
      </div>

      <div className="w-full h-[197px] md:h-[740px]">
        <img
          src={heroSrc}
          alt="Huawei solar solution"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1280px] flex flex-wrap justify-center gap-6 md:gap-6">
          {devices.map((item) => (
            <div
              key={item.id}
              className="w-[176.5px] h-[176.5px] md:w-[300.5px] md:h-[300.5px] bg-black rounded-[12px] p-4 md:p-6 flex flex-col items-start gap-[10px]"
            >
              <div className="text-white text-base md:text-base font-semibold">
                {item.title}
              </div>
              <div className="w-full flex justify-center">
                <img
                  src={item.imageSrc || fallbackDeviceSvg}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[123.5px] md:h-[227.5px] object-contain pb-[16px] md:pb-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
