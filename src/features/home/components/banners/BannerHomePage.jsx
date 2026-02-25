import React from "react";

export default function Banner({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full h-[80px] max-h-[80px] lg:h-[290px] lg:max-h-[290px] cursor-pointer overflow-hidden"
    >
      <img
        src={image}
        alt="banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
