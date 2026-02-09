import React from "react";
import { useNavigate } from "react-router-dom";

export default function DeviceCard({ ThietBiCard }) {
  const navigate = useNavigate();
  const deviceId = ThietBiCard?.id ?? ThietBiCard?.vatTuId;
  const openDetail = () => {
    if (!deviceId) return;
    navigate(`/devices/${deviceId}`);
  };
  const {
    name,
    image,
    quantity,
    warranty = { physical: "--", performance: "" },
    power,
    size,
    weight,
    price,
  } =   ThietBiCard;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          openDetail();
        }
      }}
      className="w-[252px] md:w-[290px] flex-shrink-0 bg-white rounded-[12px] shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)] p-[12px_8px] flex flex-col gap-4 cursor-pointer"
    >
      
      {/* PHẦN 1: IMAGE + TAG + BẢO HÀNH */}
      <div className="flex flex-col gap-3">
        <div className="w-full h-[236px] md:h-[274px] rounded-[6px] overflow-hidden relative">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />

          <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs shadow">
            Số lượng: {quantity}
          </span>
        </div>

        <div className="w-full h-[54px] bg-[#F1F1F2] rounded-[12px] flex items-center justify-center px-2 py-2 text-center text-sm text-[#242425]">
          <div>
            <p>Bảo hành {warranty.physical}</p>
            {warranty.performance ? <p>{warranty.performance}</p> : null}
          </div>
        </div>
      </div>

      {/* PHẦN 2: THÔNG TIN */}
      <div className="w-full flex flex-col gap-2 text-sm text-[#242425]">
        <h3
          className="text-[16px] font-semibold uppercase leading-[24px] min-h-[48px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {name}
        </h3>

        <div className="flex justify-between">
          <span>Công suất:</span>
          <span>{power}</span>
        </div>

        <div className="flex justify-between">
          <span>Kích thước:</span>
          <span>{size}</span>
        </div>

        <div className="flex justify-between">
          <span>Cân nặng:</span>
          <span>{weight}</span>
        </div>

        <p className="text-red-600 font-semibold text-base">{price}</p>
      </div>

      {/* PHẦN 3: BUTTON */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          openDetail();
        }}
        className="w-full h-[49px] bg-green-600 hover:bg-green-700 text-white rounded-[12px] px-[10px] flex items-center justify-center gap-2 transition mt-auto"
      >
        Xem chi tiết
        <span className="text-lg">→</span>
      </button>
    </div>
  );
}
