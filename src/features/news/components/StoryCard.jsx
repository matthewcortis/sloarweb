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
        h-auto
        bg-white
        rounded-[6px] sm:rounded-[12px]
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        overflow-hidden
        cursor-pointer
        scroll-snap-align-start
        ${className}
        w-full max-w-[361px] sm:w-[290px] sm:max-w-none
      `}
    >
      
      <div className="relative w-full flex-none h-[180px] sm:h-auto sm:aspect-[2/1] overflow-hidden rounded-[6px] sm:rounded-[12px]">
        <img
          src={imgSrc}
          alt={title || "Solarmax"}
          onError={handleImageError}
          className="
            w-full h-full
            object-cover
          "
        />
      </div>

      {/* Content */}
      <div className="px-3 py-2 flex flex-1 flex-col gap-2">
        <h3
          className="
            font-semibold
            text-[18px] sm:text-[20px]
            leading-[22px] sm:leading-[25px]
            h-[44px] sm:h-[50px]
            text-[#242425]
            overflow-hidden
            [display:-webkit-box]
            [-webkit-line-clamp:2]
            [-webkit-box-orient:vertical]
          "
        >
          {title}
        </h3>

        <button
          type="button"
          className="
         
            mt-auto
            bg-transparent
            p-0
            text-[16px]
            font-semibold
            leading-[16px]
            text-[#737477]
            underline
            decoration-solid
            decoration-[#737477]
            underline-offset-0
            inline-flex
            items-center
          "
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
}
