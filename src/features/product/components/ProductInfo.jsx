import SavingBadge from "../../../utils/TietKiemCard";

export default function ProductInfo({
  image,
  title,
  save,
  price,
  specs,
  variant = "mobile",
}) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "w-full bg-white lg:hidden"
          : "hidden lg:flex w-full p-[10px] pb-[39px] gap-6"
      }
    >
      {/* IMAGE */}
      <div
        className={
          isMobile
            ? "w-full aspect-square bg-gray-100 overflow-hidden"
            : "flex-1 aspect-square max-h-[519px] rounded-[12px] bg-gray-100 overflow-hidden"
        }
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div
        className={
          isMobile
            ? "p-[9px] flex flex-col gap-4"
            : "flex-1 max-h-[519px] bg-white rounded-[12px] p-4 flex flex-col gap-6 shadow-[0px_8px_16px_0px_#E7EAED66]"
        }
      >
        <h1
          className={
            isMobile
              ? "font-semibold text-[18px] text-black"
              : "font-semibold text-[21px] text-black line-clamp-2"
          }
        >
          {title}
        </h1>

        <SavingBadge value={save} />

        {/* PRICE */}
        <div
          className={
            isMobile
              ? "border-y border-gray-200 py-2 flex flex-col items-center text-center"
              : "w-full border-y border-gray-200 py-2 flex flex-col items-center text-center lg:items-start lg:text-left"
          }
        >
          <span
            className={
              isMobile
                ? "text-xs text-gray-500"
                : "text-sm text-gray-500"
            }
          >
            GIÁ NIÊM YẾT
          </span>

          <span
            className={
              isMobile
                ? "text-[22px] font-bold text-[#059549]"
                : "text-[24px] font-bold text-[#059549]"
            }
          >
            {price}
          </span>
        </div>

        {/* SPECS */}
        <div
          className={`text-sm text-gray-700 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 ${
            !isMobile ? "gap-x-8 gap-y-2 flex-1" : ""
          }`}
        >
          {specs.map((item) => (
            <span key={item.label} className="contents">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </span>
          ))}
        </div>

        <button
          className={
            isMobile
              ? "w-full h-[45px] rounded-[10px] bg-[#059549] text-white font-semibold"
              : "w-[310px] h-[49px] rounded-[12px] bg-[#059549] text-white font-semibold"
          }
        >
          Liên hệ ngay
        </button>
      </div>
    </div>
  );
}
