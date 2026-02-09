export default function MegaStoryCard({ image, title, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0
        w-[252px] sm:w-[290px]
        h-[273px] sm:h-[300px]
        bg-white
        rounded-[6px] sm:rounded-[12px]
        pb-2 sm:pb-3
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        gap-2 sm:gap-3
        overflow-hidden
        cursor-pointer
        scroll-snap-align-start
        ${className}
      `}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="
          w-full
          h-[146px] sm:h-[165px]
          rounded-[6px] sm:rounded-[12px]
          object-cover
        "
      />

      {/* Content */}
      <div className="px-3 flex flex-1 flex-col gap-2">
        <h3
          className="
            font-semibold
            text-[18px] sm:text-[21px]
            leading-[22px] sm:leading-[26px]
            min-h-[66px] sm:min-h-[78px]
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
