import houseImage1 from "../../../assets/home1.png";
import houseImage2 from "../../../assets/home2.png";
import backgroundHuawei from "../../../assets/backgroudhuawei.jpg";

const roofItems = [
  {
    title: "Mái nhà không Optimizer",
    specs: ["Optimizers có thể kết nối các tấm pin PV Quay về các hướng khác nhau với . cùng một chuỗi tấm pin để tăng công suất lắp đặt"],
    image: houseImage1,
  },
  {
    title: "Mái nhà có Optimizer",
    specs: [
      "Các tấm pin PV có thể được lắp đặt ở những khu vực có bóng râm mà không ảnh hướng đến hiệu suất năng lượng do bất tương hợp",
    
    ],
    image: houseImage2,
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
    <section className="w-full flex justify-center">
      <div className="relative w-full max-w-[1280px] md:min-h-[669px] bg-[#1F1F21] md:bg-transparent rounded-[12px] overflow-hidden  md:px-[60px] pb-[39px] md:py-[60px] flex flex-col items-center gap-[24px] md:gap-[39px]">
        <img
          src={backgroundHuawei}
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 h-full w-full object-cover"
        />

        <h2 className="relative z-10 text-white text-center text-[21px] md:text-[28px] font-semibold leading-[1] max-w-[361px] md:max-w-[760px]">
          Công suất lắp đặt tấm quang điện có thể lên gấp 2 - 3 lần để tăng doanh thu
        </h2>

        <div className="relative z-10 w-full max-w-[361px] md:w-[779px] md:max-w-[779px] md:h-[296px] md:mx-auto grid grid-cols-2 gap-[16px] md:gap-[24px]">
          {roofItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-[8px] md:h-full md:justify-between"
            >
              <div className="text-white text-[16px] md:text-[18px] font-semibold leading-[1.2]">
                {item.title}
              </div>
              <div className="text-white/80 text-[16px] md:text-[16px] leading-[1.4]">
                {item.specs.map((spec) => (
                  <div key={spec}>{spec}</div>
                ))}
              </div>
              <div className="w-full mt-[6px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[177px] h-[177px] md:w-[276px] md:h-[163px] object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-[361px] h-[199px] md:h-auto md:max-w-none bg-black rounded-[12px] p-[16px] flex flex-row gap-[8px] md:gap-[20px]">
          {benefitItems.map((benefit) => (
            <div
              key={benefit.id}
              className="w-[104px] h-[167px] md:w-auto md:h-auto md:flex-1 flex flex-col items-center text-center gap-[8px]"
            >
              <div className="h-[26px] w-[26px] rounded-full bg-[#F2B43C] text-black text-[16px] font-semibold flex items-center justify-center">
                {benefit.id}
              </div>
              <p className="text-white text-[16px] md:text-[16px] leading-[1.4]">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
