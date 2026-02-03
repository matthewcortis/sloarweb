import React from "react";

export default function BannerCard({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        w-full
        cursor-pointer
        opacity-100
        h-[78px]
        lg:h-[210px]
        lg:rounded-[12px]
        overflow-hidden
      "
    >
      {/* Mobile padding wrapper */}
      <div className="w-full h-full px-[16px] pr-[76px] py-[16px] lg:p-0">
        <img
          src={image}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
