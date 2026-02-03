export default function MegaStoryCard({ image, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        flex-shrink-0
        w-[260px] sm:w-[290px]
        bg-white
        rounded-[12px]
        pb-3
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        gap-3
        overflow-hidden
        cursor-pointer
        scroll-snap-align-start
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="
          w-full
          h-[140px] sm:h-[145px]
          object-cover
        "
      />

      {/* Content */}
      <div className="px-3 flex flex-col gap-2">
        <h3
          className="
            font-semibold
            text-[18px] sm:text-[21px]
            leading-tight
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
          "
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
}
