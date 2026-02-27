import React from "react";
import { useNavigate } from "react-router-dom";
import checkicon from "../../../assets/icons/check.svg";
import fallbackImage from "../../../assets/solarmax.jpg";

export default function SolarCard({
  data,
  cardBgColor = "#FFFFFF",
  mainColor = "#00A859",
  textColor = "#000000ff",
  saveColor = "#E6F4ED",
  hideDetailsOnMobile = false,
  className = "",
}) {
  const navigate = useNavigate();

  if (!data) return null;

  const displayPrice =
    typeof data.price === "string"
      ? data.price.replace(/\s*đ$/i, "\u00A0đ").trim()
      : data.price;

  const handleNavigate = () => {
    navigate(`/products/${data.id}`);
  };

  const handleContactCall = (event) => {
    event.stopPropagation();
    window.location.href = "tel:0964920242";
  };

  return (
    <div
      className="
        w-[302px]
        rounded-[12px]
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        overflow-hidden
        hover:shadow-lg transition-shadow
        cursor-pointer
        ${className}
      "
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
      style={{ backgroundColor: cardBgColor }}
    >
      {/* ===== Tên + Ảnh ===== */}
      <div className="p-3 flex flex-col gap-2">
        <div className="min-h-[44px] flex items-center">
          <h2
            className="text-[18px] font-semibold leading-[22px]"
            style={{
              color: textColor,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* Giữ tỉ lệ ảnh */}
        <div className="aspect-square rounded-[12px] overflow-hidden bg-[#F5F8FA] flex items-center justify-center">
          <img
            src={data.image}
            alt="product"
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />
        </div>
      </div>

      {/* ===== Tiết kiệm + Giá ===== */}
      <div className="flex flex-col">
        <div
          className="px-3 py-2 flex items-center gap-2 min-w-0"
          style={{ backgroundColor: saveColor }}
        >
          <img src={checkicon} alt="check" className="w-[18px] h-[18px]" />
          <p
            className="text-[16px] font-normal leading-[19px] tracking-[0] truncate"
            style={{ color: textColor }}
          >
            {data.save}
          </p>
        </div>

        <div className="py-4 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[16px] md:text-[16px] uppercase" style={{ color: textColor }}>
              Giá niêm yết
            </p>
            <p
              className="text-[22px] md:text-[24px] leading-none font-semibold whitespace-nowrap"
              style={{ color: mainColor }}
            >
              {displayPrice}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Thông tin + Button ===== */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <div
          className={
            hideDetailsOnMobile
              ? "hidden md:flex md:flex-col md:gap-2"
              : "flex flex-col gap-2"
          }
        >
          <Info label={data.pvLabel} value={data.pv} color={textColor} />
          <Info
            label={data.inverterLabel}
            value={data.inverter}
            color={textColor}
          />
          <Info
            label={data.batteryLabel}
            value={data.battery}
            color={textColor}
          />
          <Info label="Sản Lượng:" value={data.production} color={textColor} />
          <Info label="Hoàn Vốn:" value={data.roi} color={textColor} />
          <Info label="Diện tích lắp đặt:" value={data.area} color={textColor} />
        </div>

        {/* Buttons luôn dính đáy */}
        <div className="mt-auto flex gap-2 pt-2">
          <button
            onClick={() => navigate(`/products/${data.id}`)}
            className="w-[163px] h-[48px] rounded-[12px] text-white text-[16px] font-medium flex items-center justify-center gap-2 px-[10px] leading-none"
            style={{ backgroundColor: mainColor }}
          >
            Xem chi tiết
          </button>

          <button
            type="button"
            onClick={handleContactCall}
            className={`w-[103px] h-[48px] rounded-[12px] border text-[16px] font-medium flex items-center justify-center gap-[10px] px-[10px] leading-none ${
              hideDetailsOnMobile ? "hidden md:flex" : ""
            }`}
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
        grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
        gap-x-2
        text-[16px]
        leading-[20px]
        items-center
      "
      style={{ color }}
    >
      <span className="min-w-0 truncate">
        {label}
      </span>

      <span className="min-w-0 truncate text-right font-medium">
        {value || "-"}
      </span>
    </div>
  );
}
