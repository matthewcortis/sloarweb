import iconChart from "../../../assets/icons/Frame 4765.png";
import iconRoof from "../../../assets/icons/Frame 4766.png";
import iconStructure from "../../../assets/icons/Frame 4767.png";
import iconBattery from "../../../assets/icons/battery-empty-1--phone-mobile-charge-device-electricity-empty-power-battery.png";
import iconMedal from "../../../assets/icons/battery-empty-2--phone-mobile-charge-device-electricity-empty-power-battery.png";

const aboutItems = [
  {
    id: 1,
    icon: iconChart,
    text: "Giải pháp SolarMax bám sát\nbiểu đồ và thói quen sử dụng\nđiện của khách hàng",
  },
  {
    id: 2,
    icon: iconRoof,
    text: "Mái tôn, Mái ngói: 100% sử\ndụng thanh full-rail, thay vì sử\ndụng mini-rail",
  },
  {
    id: 3,
    icon: iconStructure,
    text: "Mái bằng: 100% thiết kế 3D\nkhung thép trước khi thi công.",
  },
  {
    id: 4,
    icon: iconBattery,
    text: "Tủ điện:\nRộng - Đẹp - Bền",
  },
  {
    id: 5,
    icon: iconMedal,
    text: "Tấm quang năng, biến tần và\npin lưu trữ top 3 thế giới",
  },
];

export default function VeChungToiSection() {
  return (
    <div className="px-[9px] xl:px-[80px] pb-[80px] pt-[24px]">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1
            className="text-[24px] md:text-[32px] font-semibold text-[#1D1D1F]"
            style={{ fontFamily: "SF Pro Display" }}
          >
            Về chúng tôi
          </h1>

          <div
            className="mt-4 max-w-[846px] text-[14px] md:text-[16px] leading-[22px] md:leading-[24px] text-[#4A4A4A] space-y-3"
            style={{ fontFamily: "SF Pro Display" }}
          >
            <p>
              Với <strong>hơn 10 năm kinh nghiệm</strong> trong lĩnh vực năng
              lượng tái tạo tại thị trường Việt Nam, SolarMax đã ghi dấu ấn qua
              nhiều dự án trọng điểm như:
            </p>
            <p className="font-semibold text-[#3D3D3D]">
              Điện mặt trời Easup 600 MW, Điện mặt trời Phong Phú 50 MW, Điện mặt
              trời Trúc Sơn 50 MW.
            </p>
            <p>
              Năm 2021, SolarMax gia nhập thị trường điện mặt trời áp mái dân
              dụng. Tính đến nay, SolarMax đã thành công đưa vào vận hành
              <strong> hơn 1,000 dự án dân dụng có công suất từ 5kW đến 500 kW</strong>.
            </p>
            <p>
              Ngay từ những ngày đầu thành lập, SolarMax hướng đến giải pháp đảm
              bảo chất lượng sản phẩm vượt trội và
              <strong> dịch vụ thi công theo tiêu chuẩn châu Âu - 10 năm không cần bảo trì</strong>.
              Hiện tại, SolarMax đang áp dụng tiêu chuẩn cốt lõi sau:
            </p>
          </div>

          <div className="mt-8 w-full flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] md:gap-[24px] md:w-[846px] md:h-[336px]">
              {aboutItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full md:w-[266px] md:h-[156px] bg-[#F6F6F6] rounded-[12px] p-[16px] flex flex-col items-center justify-center gap-[16px] text-center"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="w-[40px] h-[40px] object-contain"
                  />
                  <p className="text-[13px] md:text-[14px] font-semibold text-[#4A4A4A] whitespace-pre-line">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
