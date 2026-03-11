import { TietKiemCard as SavingBadge } from "../../../shared/components/cards";
import fallbackImage from "../../../assets/solarmax.jpg";

export default function ProductInfo({
  image,
  title,
  save,
  price,
  specs,
  theme,
  onContactNow,
}) {
  const resolvedMainColor = `${theme?.mainColor ?? ""}`.trim() || "#059549";
  const resolvedSaveColor = `${theme?.saveColor ?? ""}`.trim() || "#E6F4ED";
  const resolvedSaveTextColor =
    `${theme?.saveTextColor ?? ""}`.trim() || resolvedMainColor;
  const normalizedMainColor = resolvedMainColor.toUpperCase();
  const normalizedSaveTextColor = resolvedSaveTextColor.toUpperCase();
  const resolvedSaveIconColor =
    `${theme?.saveIconColor ?? ""}`.trim() ||
    (normalizedSaveTextColor === "#FFFFFF"
      ? "#FFFFFF"
      : normalizedMainColor === "#EE4037"
      ? "#EE4037"
      : "#37AA6D");
  const resolvedPriceColor =
    `${theme?.priceColor ?? ""}`.trim() || resolvedMainColor;
  const resolvedButtonBgColor =
    `${theme?.buttonBgColor ?? ""}`.trim() || resolvedMainColor;
  const resolvedButtonTextColor =
    `${theme?.buttonTextColor ?? ""}`.trim() || "#FFFFFF";

  return (
    <div
      className="w-full bg-white lg:flex lg:gap-6 lg:p-[10px] lg:pb-[39px]"
    >
      {/* IMAGE */}
      <div
        className="w-full aspect-square bg-gray-100 overflow-hidden lg:aspect-auto lg:shrink-0 lg:rounded-[12px] lg:w-[min(519px,46vw)] lg:h-[min(519px,46vw)] xl:w-[519px] xl:h-[519px]"
      >
        <img
          src={image || fallbackImage}
          alt={title}
          className="w-full h-full object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      {/* INFO */}
      <div className="p-[9px] flex flex-col gap-4 lg:flex-1 lg:max-h-[529px] lg:rounded-[12px] lg:p-4 lg:gap-6 lg:shadow-[0px_8px_16px_0px_#E7EAED66]">
        <h1
          className="font-semibold text-[18px] text-black line-clamp-2 lg:text-[21px]"
        >
          {title}
        </h1>

        <SavingBadge
          value={save}
          bgColor={resolvedSaveColor}
          textColor={resolvedSaveTextColor}
          iconColor={resolvedSaveIconColor}
        />

        {/* PRICE */}
        <div className="w-full border-y border-gray-200 py-2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span
            className="text-base text-gray-500"
          >
            GIÁ NIÊM YẾT
          </span>

          <span
            className="text-[22px] font-bold lg:text-[24px]"
            style={{ color: resolvedPriceColor }}
          >
            {price}
          </span>
        </div>

        {/* SPECS */}
        <div className="w-full text-base text-gray-700 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 lg:gap-x-8 lg:gap-y-2 lg:flex-1">
          {specs.map((item) => (
            <span key={item.key ?? item.label} className="contents">
              <span>{item.label}</span>
              <span className="justify-self-end text-right">{item.value}</span>
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onContactNow}
          className="w-full h-[45px] rounded-[10px] font-semibold lg:w-[310px] lg:h-[49px] lg:rounded-[12px]"
          style={{
            backgroundColor: resolvedButtonBgColor,
            color: resolvedButtonTextColor,
          }}
        >
          Liên hệ ngay
        </button>
      </div>
    </div>
  );
}
