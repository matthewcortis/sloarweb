import React from "react";
import check from "../assets/icons/check.svg";
const SavingBadge = ({ value, bgColor = "#E6F4ED", textColor = "#059549" }) => {
  return (
    <div
      className="
        flex items-center
        gap-[11px]
        px-4 py-2
        rounded-[12px]
        opacity-100
      "
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon */}
      <img
        src={check}
        alt="check icon"
        className="w-[18px] h-[18px]"
      />

      {/* Text */}
      <span
        className="
          font-normal
          text-[16px]
          leading-[19px]
          tracking-[0%]
          w-[243px]
          h-[19px]
          font-['SF_Pro_Display']
        "
        style={{ color: textColor }}
      >
        {value}
      </span>
    </div>
  );
};

export default SavingBadge;
