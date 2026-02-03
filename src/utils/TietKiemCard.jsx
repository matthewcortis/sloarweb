import React from "react";
import check from "../assets/icons/check.svg";
const SavingBadge = ({ value }) => {
  return (
    <div
      className="
        flex items-center
        gap-[11px]
        px-4 py-2
        rounded-[12px]
        bg-[#E6F4ED]
        opacity-100
      "
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
          text-[#059549]
          font-normal
          text-[16px]
          leading-[19px]
          tracking-[0%]
          w-[243px]
          h-[19px]
          font-['SF_Pro_Display']
        "
      >
        Số tiền tiết kiệm/tháng: {value}
      </span>
    </div>
  );
};

export default SavingBadge;
