import SavingBadge from "../../../utils/TietKiemCard";

export default function ProductInfo({
  image,
  title,
  save,
  price,
  specs,
}) {
  return (
    <div
      className="w-full bg-white lg:flex lg:gap-6 lg:p-[10px] lg:pb-[39px]"
    >
      {/* IMAGE */}
      <div
        className="w-full aspect-square bg-gray-100 overflow-hidden lg:flex-1 lg:max-h-[519px] lg:rounded-[12px]"
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="p-[9px] flex flex-col gap-4 lg:flex-1 lg:max-h-[519px] lg:rounded-[12px] lg:p-4 lg:gap-6 lg:shadow-[0px_8px_16px_0px_#E7EAED66]">
        <h1
          className="font-semibold text-[18px] text-black lg:text-[21px] lg:line-clamp-2"
        >
          {title}
        </h1>

        <SavingBadge value={save} />

        {/* PRICE */}
        <div className="w-full border-y border-gray-200 py-2 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span
            className="text-xs text-gray-500 lg:text-sm"
          >
            GIÁ NIÊM YẾT
          </span>

          <span
            className="text-[22px] font-bold text-[#059549] lg:text-[24px]"
          >
            {price}
          </span>
        </div>

        {/* SPECS */}
        <div className="text-sm text-gray-700 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 lg:gap-x-8 lg:gap-y-2 lg:flex-1">
          {specs.map((item) => (
            <span key={item.key ?? item.label} className="contents">
              <span>{item.label}</span>
              <span>{item.value}</span>
            </span>
          ))}
        </div>

        <button
          className="w-full h-[45px] rounded-[10px] bg-[#059549] text-white font-semibold lg:w-[310px] lg:h-[49px] lg:rounded-[12px]"
        >
          Liên hệ ngay
        </button>
      </div>
    </div>
  );
}
