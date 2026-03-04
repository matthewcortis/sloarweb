import React from "react";

const HybridBanner = ({
  data,
  titleColor,
  desColor,
  showMore = true,
  onMoreClick,
}) => {
  const renderDescription = () => {
    const description = data?.description;
    if (!description) return null;

    const highlight = data?.highlight;
    if (!highlight || !description.includes(highlight)) {
      return description;
    }

    const startIndex = description.indexOf(highlight);
    const before = description.slice(0, startIndex);
    const after = description.slice(startIndex + highlight.length);

    return (
      <>
        {before}
        <span className="font-semibold">
          {highlight}
        </span>
        {after}
      </>
    );
  };

  return (
    <div className="w-full relative">
      {/* TEXT BLOCK */}
      <div
        className="
          w-full whitespace-pre-line
          leading-relaxed break-words text-left md:text-center
        "
      >
        <div className="relative">
          <h2
            className="typo-section-title max-w-[842px] mx-auto 
            text-[21px]
            leading-[150%]
            md:text-[32px] md:leading-[140%] md:px-[140px]"
            style={{ color: titleColor }}
          >
            {data.title}
          </h2>
          {/* DESKTOP BUTTON */}
          {showMore && onMoreClick && (
            <div className="hidden md:block absolute right-6 top-[22px] -translate-y-1/2">
              <button
                onClick={onMoreClick}
                className="text-red-500 font-semibold underline decoration-red-500 underline-offset-2"
              >
                Tìm hiểu thêm
              </button>
            </div>
          )}
        </div>

        {data?.description && (
          <div
            className="mt-6 max-w-[842px] mx-auto text-[16px] font-normal [&_strong]:font-semibold"
            style={{ color: desColor }}
          >
            {renderDescription()}
          </div>
        )}
      </div>

      {/* MOBILE BUTTON */}
      {showMore && onMoreClick && (
        <div className="block md:hidden mt-4">
          <button
            onClick={onMoreClick}
            className="text-red-500 font-semibold underline decoration-red-500 underline-offset-2"
          >
            Tìm hiểu thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default HybridBanner;
