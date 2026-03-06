import solarmaxFallback from "../../../assets/solarmax.jpg";

export default function MegaStoryCard({
  image,
  title,
  onClick,
  className = "",
  variant = "compact",
}) {
  const isPageMobileVariant = variant === "pageMobile";
  const cardSizeClass = isPageMobileVariant
    ? "w-full sm:w-[290px]"
    : "w-[78vw] min-w-[220px] max-w-[290px] sm:w-[290px]";
  const contentMinHeightClass = isPageMobileVariant
    ? "min-h-[86px] sm:min-h-[91px]"
    : "min-h-[91px]";

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = solarmaxFallback;
  };

  return (
    <div
      onClick={onClick}
      className={`
        flex-shrink-0
        ${cardSizeClass}
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
          w-full aspect-[2/1]
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
       
      </div>

      <div
        className={`px-2 flex flex-col gap-2 ${contentMinHeightClass} flex-1`}
      >
        <h3
          className={`
            font-['SF_Pro_Display']
            font-semibold
            text-[clamp(16px,18px)]
            leading-[130%]
            tracking-[0px]
            overflow-hidden
            [display:-webkit-box]
            [-webkit-line-clamp:2]
            [-webkit-box-orient:vertical]
          `}
        >
          {title}
        </h3>

        <button
          type="button"
          className="
            bg-transparent
            p-0
            font-['SF_Pro_Display']
            text-[15px] sm:text-[16px]
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
