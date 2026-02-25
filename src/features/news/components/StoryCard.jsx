import { useEffect, useState } from "react";
import solarmaxFallback from "../../../assets/solarmax.jpg";

export default function MegaStoryCard({ image, title, onClick, className = "" }) {
  const [imgSrc, setImgSrc] = useState(image || solarmaxFallback);

  useEffect(() => {
    setImgSrc(image || solarmaxFallback);
  }, [image]);

  const handleImageError = () => {
    setImgSrc(solarmaxFallback);
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0
        w-[252px] sm:w-[290px]
        h-[312px] sm:h-[500px]
        bg-white
        rounded-[6px] sm:rounded-[12px]
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        overflow-hidden
        cursor-pointer
        scroll-snap-align-start
        ${className}
      `}
    >
      {/* Image */}
      <img
        src={imgSrc}
        alt={title || "Solarmax"}
        onError={handleImageError}
        className="
          w-full
          h-[180px] sm:h-[361px]
          rounded-[6px] sm:rounded-[12px]
          object-cover
        "
      />

      {/* Content */}
      <div className="px-3 py-2 flex flex-1 flex-col gap-2">
        <h3
          className="
            font-semibold
            text-[18px] sm:text-[20px]
            leading-[22px] sm:leading-[25px]
            h-[66px] sm:h-[75px]
            text-[#242425]
            overflow-hidden
            [display:-webkit-box]
            [-webkit-line-clamp:3]
            [-webkit-box-orient:vertical]
          "
        >
          {title}
        </h3>

        <button
          className="
            w-fit
            h-[28px]
            rounded-[20px]
            px-3
            bg-[#242425]
            text-white
            text-[12px]
            font-medium
            flex items-center justify-center
            mt-auto
          "
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
}
