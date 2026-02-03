import React from "react";

export default function Banner({ image, onClick }) {
  return (
    <div onClick={onClick} className="w-full cursor-pointer">
      <img
        src={image}
        alt="banner"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
