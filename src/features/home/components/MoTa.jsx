import React from "react";

const HybridBanner = ({
  data,
  titleColor,
  desColor,
  showMore = true,
  onMoreClick,
}) => {
  return (
    <div className="w-full relative py-10 px-4">

      {/* DESKTOP BUTTON */}
      {showMore && onMoreClick && (
        <div className="hidden md:block absolute right-6 top-12">
          <button
            onClick={onMoreClick}
            className="text-red-500 font-semibold hover:underline"
          >
            Tìm hiểu thêm
          </button>
        </div>
      )}

      {/* TEXT BLOCK */}
      <div
        className="
          w-full max-w-[842px] mx-auto whitespace-pre-line
          leading-relaxed break-words text-left md:text-center
        "
      >
        <h2
          className="text-[20px] font-semibold md:text-[32px] md:leading-snug"
          style={{ color: titleColor }}
        >
          {data.title}
        </h2>

        {data?.description && (
          <div
            className="mt-3 text-[14px] md:text-[15px]"
            style={{ color: desColor }}
          >
            {data.description}
          </div>
        )}
      </div>

      {/* MOBILE BUTTON */}
      {showMore && onMoreClick && (
        <div className="block md:hidden mt-4">
          <button
            onClick={onMoreClick}
            className="text-red-500 font-semibold hover:underline"
          >
            Tìm hiểu thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default HybridBanner;
