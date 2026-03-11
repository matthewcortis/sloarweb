import React from "react";

export default function BannerCard({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full h-[80px] max-h-[80px] lg:rounded-[12px] lg:h-auto lg:max-h-none cursor-pointer overflow-hidden"    >
      <div className="w-full h-full p-0 lg:p-0">
        <img
          src={image}
          alt="banner"
          loading="lazy"
          decoding="async"
          className="block w-full h-full object-cover lg:h-auto lg:object-contain"
        />
      </div>
    </div>
  );
}
