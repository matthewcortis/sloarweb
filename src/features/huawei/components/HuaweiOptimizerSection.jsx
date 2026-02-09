import houseImage from "../../../assets/home.png";

const roofItems = [
  {
    title: "Mái nhà không Optimizer",
    specs: ["Công suất: 8 kWp", "Cấu hình: Inverter", "Tấm quang điện: 24"],
    image: houseImage,
  },
  {
    title: "Mái nhà có Optimizer",
    specs: [
      "Công suất: 20 kWp",
      "Cấu hình: Inverter + Optimizer",
      "Tấm quang điện: 60",
    ],
    image: houseImage,
  },
];

const benefitItems = [
  {
    id: "2",
    text:
      "Optimizers có thể kết nối các tấm pin PV quay về các hướng khác nhau với cùng 1 chuỗi tấm pin để tăng công suất lắp đặt",
  },
  {
    id: "1",
    text:
      "Các tấm pin PV có thể được lắp đặt ở những khu vực có bóng râm mà không ảnh hưởng đến hiệu suất năng lượng do bất tương hợp",
  },
  {
    id: "3",
    text: "Optimizer hỗ trợ thiết kế chuỗi dài và ngắn",
  },
];

export default function HuaweiOptimizerSection() {
  return (
    <section className="w-full flex justify-center font-sf">
      <div className="w-full max-w-[1280px] md:min-h-[669px] bg-[#1F1F21] rounded-[12px] px-[16px] md:px-[60px] pb-[39px] md:py-[60px] flex flex-col items-center gap-[24px] md:gap-[39px]">
        <h2 className="text-white text-center text-[21px] md:text-[28px] font-semibold leading-[1] max-w-[361px] md:max-w-[760px]">
          Công suất lắp đặt tấm quang điện có thể lên gấp 2 - 3 lần để tăng doanh thu
        </h2>

        <div className="w-full max-w-[361px] md:max-w-none grid grid-cols-2 gap-[16px] md:gap-[32px]">
          {roofItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-[8px]"
            >
              <div className="text-white text-[13px] md:text-[18px] font-semibold leading-[1.2]">
                {item.title}
              </div>
              <div className="text-white/80 text-[11px] md:text-[14px] leading-[1.4]">
                {item.specs.map((spec) => (
                  <div key={spec}>{spec}</div>
                ))}
              </div>
              <div className="w-full mt-[6px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-full max-w-[361px] md:max-w-none bg-black rounded-[12px] p-[16px] flex flex-col md:flex-row gap-[8px] md:gap-[20px]">
          {benefitItems.map((benefit) => (
            <div
              key={benefit.id}
              className="flex-1 flex flex-col items-center text-center gap-[8px]"
            >
              <div className="h-[26px] w-[26px] rounded-full bg-[#F2B43C] text-black text-[12px] font-semibold flex items-center justify-center">
                {benefit.id}
              </div>
              <p className="text-white text-[11px] md:text-[13px] leading-[1.4]">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
