import {
  Battery0Icon,
  Battery100Icon,
  BoltIcon,
  BoltSlashIcon,
  CpuChipIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const commonRows = [
  {
    Icon: CpuChipIcon,
    text: "Vận hành tự động 100% không cần can thiệp",
  },
  {
    Icon: BoltIcon,
    text: "Hoạt động song song cùng điện lưới",
  },
  {
    Icon: SunIcon,
    text: "Ưu tiên sử dụng tối đa điện mặt trời, nếu thiếu, tự động huy động điện lưới",
  },
];

const compareRows = [
  {
    left: {
      Icon: Battery100Icon,
      text: "Điện mặt trời dư được tự động sạc vào pin lưu trữ và xả ra khi thiếu nắng",
    },
    right: {
      Icon: Battery0Icon,
      text: "Không có pin lưu trữ, gây lãng phí điện mặt trời dư",
    },
  },
  {
    left: {
      Icon: BoltIcon,
      text: "Sử dụng được khi mất điện",
    },
    right: {
      Icon: BoltSlashIcon,
      text: "Không sử dụng được khi mất điện",
    },
  },
  {
    left: {
      Icon: MoonIcon,
      text: "Sử dụng được vào ban đêm",
    },
    right: {
      Icon: SunIcon,
      text: "Chỉ sử dụng được khi có nắng",
    },
  },
];

export default function SoSanhHyOn() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[846px] bg-white border border-[#E5E7EB] md:rounded-l-[12px] px-4 pt-[39px] pb-[39px] md:p-[9px] flex flex-col gap-4 md:gap-3 h-[529px] md:h-[542px] font-sf text-[#2B2B2B]">
        <div className="flex flex-col gap-3 md:gap-3">
          <h3 className="text-left md:text-center font-semibold text-[20px] md:text-[24px] leading-[1.2] md:leading-[1.25]">
            So sánh điện mặt trời Hy-Brid và điện mặt trời On-Grid
          </h3>

          <div className="grid grid-cols-2 text-center text-[16px] leading-[1] font-semibold">
            <div className="flex flex-col gap-1">
              <span>Hy-Brid</span>
              <span className="text-[#6B7280]">
                (có pin lưu trữ)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span>On-Grid</span>
              <span className="text-[#6B7280]">
                (không pin lưu trữ)
              </span>
            </div>
          </div>


        </div>

        <div className="flex flex-col border-t border-[#E5E7EB] divide-y divide-[#E5E7EB] text-[13px] md:text-[14px] text-[#4B5563] md:flex-1">
          {commonRows.map(({ Icon, text }) => (
            <div
              key={text}
              className="flex items-start md:flex-1 md:items-center md:justify-center gap-3 py-3 md:py-[9px] text-left md:text-center"
            >
              <Icon className="mt-0.5 md:mt-0 h-5 w-5 md:h-6 md:w-6 text-[#4B5563]" />
              <p className="max-w-[680px] md:max-w-none leading-[1.35] md:leading-[1.35]">
                {text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col border-t border-[#E5E7EB] divide-y divide-[#E5E7EB] text-[13px] md:text-[14px] text-[#4B5563] md:flex-1">
          {compareRows.map((row) => (
            <div
              key={row.left.text}
              className="grid grid-cols-2 gap-3 md:gap-4 py-3 md:py-[9px] md:flex-1"
            >
              <div className="flex items-start gap-3">
                <row.left.Icon className="mt-0.5 md:mt-0 h-5 w-5 md:h-6 md:w-6 text-[#4B5563]" />
                <p className="leading-[1.35] md:leading-[1.35]">
                  {row.left.text}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <row.right.Icon className="mt-0.5 md:mt-0 h-5 w-5 md:h-6 md:w-6 text-[#4B5563]" />
                <p className="leading-[1.35] md:leading-[1.35]">
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
