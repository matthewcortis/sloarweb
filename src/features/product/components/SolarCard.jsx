import React from "react";
import { useNavigate } from "react-router-dom";
import checkicon from "../../../assets/icons/check.svg";

export default function SolarCard({
  data,
  cardBgColor = "#FFFFFF",
  mainColor = "#00A859",
  textColor = "#000000ff",
  saveColor = "#E6F4ED",
}) {
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div
      className="
        w-[302px]
        rounded-[12px]
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        overflow-hidden
        hover:shadow-lg transition-shadow
      "
      style={{ backgroundColor: cardBgColor }}
    >
      {/* ===== Tên + Ảnh ===== */}
      <div className="p-3 flex flex-col gap-2">
        <div className="min-h-[44px] flex items-center">
          <h2
            className="text-[18px] font-semibold leading-[22px]"
            style={{ color: textColor }}
          >
            {data.title}
          </h2>
        </div>

        {/* Giữ tỉ lệ ảnh */}
        <div className="aspect-square rounded-[12px] bg-[#F5F8FA] flex items-center justify-center">
          <img
            src={data.image}
            alt="product"
            className="object-contain max-h-full max-w-full"
          />
        </div>
      </div>

      {/* ===== Tiết kiệm + Giá ===== */}
      <div className="flex flex-col">
        <div
          className="px-3 py-2 flex items-center gap-2"
          style={{ backgroundColor: saveColor }}
        >
          <img src={checkicon} alt="check" className="w-[18px] h-[18px]" />
          <p className="text-[14px]" style={{ color: textColor }}>
            {data.save}
          </p>
        </div>

        <div className="py-4 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[12px] uppercase" style={{ color: textColor }}>
              Giá niêm yết
            </p>
            <p
              className="text-[24px] font-semibold"
              style={{ color: mainColor }}
            >
              {data.price}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Thông tin + Button ===== */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <Info label="Công suất PV:" value={data.pv} color={textColor} />
        <Info label="Biến tần Solis:" value={data.inverter} color={textColor} />
        <Info label="Lưu trữ Dyness:" value={data.battery} color={textColor} />
        <Info label="Sản Lượng:" value={data.production} color={textColor} />
        <Info label="Hoàn Vốn:" value={data.roi} color={textColor} />
        <Info label="Diện tích lắp đặt:" value={data.area} color={textColor} />

        {/* Buttons luôn dính đáy */}
        <div className="mt-auto flex gap-2 pt-2">
          <button
            onClick={() => navigate(`/products/${data.id}`)}
            className="flex-1 h-[44px] rounded-[6px] text-white text-[14px] font-medium"
            style={{ backgroundColor: mainColor }}
          >
            Xem chi tiết
          </button>

          <button
            type="button"
            className="flex-1 h-[44px] rounded-[6px] border text-[14px] font-medium"
            style={{ borderColor: mainColor, color: mainColor }}
          >
            Liên hệ
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, color }) {
  return (
    <div
      className="
        grid
        grid-cols-[1fr_auto]
        gap-x-2
        text-[14px]
        leading-[20px]
      "
      style={{ color }}
    >
      <span className="whitespace-nowrap">
        {label}
      </span>

      <span className="text-right font-medium">
        {value || "-"}
      </span>
    </div>
  );
}

