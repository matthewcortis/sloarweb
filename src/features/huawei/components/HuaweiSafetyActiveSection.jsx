import homemobile from "../../../assets/homemoblie.png";
import homedesktop from "../../../assets/homedesktop.png";

const statCards = [
  { highlight: "Hơn 2 năm", label: "Ra mắt sản phẩm" },
  { highlight: ">1,2 triệu pcs", label: "Battery pack" },
  { highlight: ">1,8 triệu pcs", label: "Battery cell" },
];

export default function HuaweiSafetyActiveSection() {
  return (
    <section className="w-full flex flex-col items-center gap-[24px] md:gap-[40px]">
      <div className="w-full max-w-[1300px] mx-auto flex flex-col items-center gap-[20px] md:gap-[32px]">
        <div className="text-white text-center text-[20px] md:text-[32px] font-semibold leading-[1.2] max-w-[860px]">
          <p>Tỏa sáng trong an toàn chủ động</p>
          <p>Đảm bảo sự an toàn cho sự hợp tác bền vững lâu dài</p>
        </div>

        <div className="w-full">
          <img
            src={homemobile}
            alt="Mô hình nhà an toàn"
            className="w-full h-auto object-contain md:hidden"
          />
          <img
            src={homedesktop}
            alt="Mô hình nhà an toàn"
            className="hidden md:block w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="w-full max-w-[1300px] mx-auto">
        <div className="grid grid-cols-3 gap-[8px] md:gap-[24px]">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="h-[88px] md:h-[120px] bg-black rounded-[12px] flex flex-col items-center justify-center gap-[6px] text-center"
            >
              <div className="text-[#EE4037] text-[16px] md:text-[20px] font-semibold">
                {card.highlight}
              </div>
              <div className="text-white text-[16px] md:text-[16px] font-medium">
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
