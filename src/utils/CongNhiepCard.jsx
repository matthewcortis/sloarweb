export default function CongNghiepCard({ image, items }) {
  return (
    <div className="w-[290px] h-[372px] rounded-[12px] bg-white shadow-[0px_8px_16px_rgba(231,234,237,0.4)] overflow-hidden flex-shrink-0 flex flex-col">
      
      {/* IMAGE */}
      <img
        src={image}
        alt=""
        className="w-[290px] h-[291px] object-cover rounded-[12px]"
      />

      {/* CONTENT */}
      <div className="w-[290px] h-[69px] bg-[#FFFFFF] px-[12px] pb-[12px] flex flex-col justify-end gap-[10px]">
        <div className="text-[16px] leading-[100%] font-normal text-black">
          {items.map((txt, idx) => (
            <div key={idx}>{txt}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
