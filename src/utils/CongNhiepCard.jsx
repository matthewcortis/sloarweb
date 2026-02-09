export default function CongNghiepCard({ image, items, variant = "desktop" }) {
  const isResponsive = variant === "responsive";

  return (
    <div
      className={[
        "rounded-[12px] bg-white shadow-[0px_8px_16px_rgba(231,234,237,0.4)] overflow-hidden flex-shrink-0 flex flex-col",
        isResponsive ? "w-[252px] h-[329px] md:w-[290px] md:h-[372px]" : "w-[290px] h-[372px]",
      ].join(" ")}
    >
      {/* IMAGE */}
      <img
        src={image}
        alt=""
        className={[
          "object-cover rounded-[12px]",
          isResponsive ? "w-full h-[248px] md:h-[291px]" : "w-[290px] h-[291px]",
        ].join(" ")}
      />

      {/* CONTENT */}
      <div
        className={[
          "h-[69px] bg-[#FFFFFF] px-[12px] pb-[12px] flex flex-col justify-end gap-[10px]",
          isResponsive ? "w-full" : "w-[290px]",
        ].join(" ")}
      >
        <div className="text-[16px] leading-[100%] font-normal text-black">
          {items.map((txt, idx) => (
            <div key={idx}>{txt}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
