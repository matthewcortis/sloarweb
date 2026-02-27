import { useState } from "react";

export default function QAItem({ title, content }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-[361px] md:max-w-[845px] bg-white rounded-[6px] md:rounded-[12px]">
      {/* Header */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between
                   h-[48px] px-4 py-3 gap-2
                   cursor-pointer"
      >
        <h3 className="text-[16px] font-semibold leading-[24px] text-[#242425]">
          {title}
        </h3>

        {/* Arrow */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#242425"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-3">
          <p className="text-[16px] leading-[20px] text-[#48484D] font-normal">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
