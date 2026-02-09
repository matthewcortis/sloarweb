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
      <div className="w-full h-full p-0 lg:p-0">
        <img
          src={image}
          alt="banner"
          className="w-full h-full object-cover opacity-100 rotate-0"
        />
      </div>
    </div>
  );
}
