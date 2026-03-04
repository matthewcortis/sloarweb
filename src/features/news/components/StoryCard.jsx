import solarmaxFallback from "../../../assets/solarmax.jpg";

export default function MegaStoryCard({
  image,
  title,
  onClick,
  className = "",
  variant = "compact",
}) {
  const isPageMobileVariant = variant === "pageMobile";

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = solarmaxFallback;
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0
        ${isPageMobileVariant
          ? "h-[282.5px] w-full sm:w-[290px] sm:h-[280px]"
          : "h-[253px] w-[252px] sm:w-[290px] sm:h-[280px]"}
        bg-[#F2F2F2]
        rounded-[12px]
        shadow-[0px_8px_16px_0px_rgba(231,234,237,0.4)]
        flex flex-col
        gap-2
        pb-2
        cursor-pointer
        snap-start
        ${className}
      `}
    >
      <div
        className={`
          relative flex-none
          ${isPageMobileVariant
            ? "w-full h-[180.5px] sm:h-[145px]"
            : "w-[252px] h-[126px] sm:w-full sm:h-[145px]"}
          overflow-hidden rounded-[6px]
        `}
      >
        <img
          src={image || solarmaxFallback}
          alt={title || "Solarmax"}
          onError={handleImageError}
          className="
            w-full h-full
            object-cover
          "
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[6px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 56.19%, rgba(0, 0, 0, 0.8) 88.55%)",
          }}
        />
      </div>

      <div
        className={`px-2 flex flex-col gap-[10px] ${
          isPageMobileVariant ? "h-[86px]" : "h-[111px]"
        } sm:h-auto sm:flex-1`}
      >
        <h3
          className={`
            font-['SF_Pro_Display']
            font-semibold
            text-[21px]
            leading-[100%]
            tracking-[0px]
            text-[#242425]
            overflow-hidden
            [display:-webkit-box]
            ${
              isPageMobileVariant
                ? "[-webkit-line-clamp:2]"
                : "[-webkit-line-clamp:3]"
            }
            [-webkit-box-orient:vertical]
          `}
        >
          {title}
        </h3>

        <button
          type="button"
          className="
            mt-auto
            bg-transparent
            p-0
            font-['SF_Pro_Display']
            text-[16px]
            font-semibold
            leading-[100%]
            tracking-[0px]
            text-[#737477]
            underline
            decoration-solid
            decoration-[#737477]
            underline-offset-0
            inline-flex
            items-center
            whitespace-nowrap
            text-left
          "
        >
          Đọc thêm
        </button>
      </div>
    </div>
  );
}
