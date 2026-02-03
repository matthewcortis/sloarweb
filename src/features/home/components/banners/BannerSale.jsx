import { useEffect, useState } from "react";

export default function BannerSale({ data }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="relative w-full overflow-visible">
      {/* ================= MOBILE ================= */}
      <div
        className="
          sm:hidden
          flex items-center justify-center
          gap-[17px]
          h-[253px]
          px-4 py-6
          rounded-xl
          bg-cover bg-center
        "
        style={{ backgroundImage: `url(${data.background})` }}
      >
        {/* Ảnh nhân viên */}
        <img
          src={data.staffImage}
          alt="Nhân viên tư vấn"
          className="w-[137px] h-[205px] object-contain shrink-0"
        />

        {/* Nội dung */}
        <div
          className="
            w-[207px] h-[205px]
            flex flex-col justify-center
            gap-4
            text-white
          "
        >
          <p className="text-[12px] leading-snug opacity-90">
            {data.description}
          </p>

          <h3 className="text-[14px] font-semibold">
            {data.title}
          </h3>

          <p className="text-[13px] leading-snug">
            {data.name}
          </p>

          <a
            href={`tel:${data.phone}`}
            className="
              mt-1
              flex items-center justify-center
              w-full h-[36px]
              rounded-full
              bg-red-600
              text-[13px] font-semibold
            "
          >
            📞 {data.phoneLabel}
          </a>
        </div>
      </div>

      {/* ================= DESKTOP (GIỮ NGUYÊN) ================= */}
      <div className="hidden sm:block relative w-full h-[275px] overflow-visible">
        {/* CỤM ẢNH + CONTENT */}
        <div
          className={`
            absolute left-1/2 top-1/2 z-20
            -translate-x-1/2
            flex items-center gap-[6px]
            transition-all duration-700 ease-out
            ${show ? "-translate-y-[55%] opacity-100" : "-translate-y-[45%] opacity-0"}
          `}
        >
          {/* Ảnh nhân viên */}
          <img
            src={data.staffImage}
            alt="Nhân viên tư vấn"
            className="w-[214px] h-[320px] object-contain shrink-0"
          />

          {/* Nội dung */}
          <div
            className={`
              max-w-[836px] flex flex-col gap-3 text-white
              transition-all duration-700 ease-out delay-100
              ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <p className="text-sm opacity-90">{data.description}</p>

            <h3 className="font-semibold text-base">{data.title}</h3>

            <p className="text-[15px] leading-relaxed">{data.name}</p>

            <a
              href={`tel:${data.phone}`}
              className={`
                mt-2 w-fit px-5 py-2 rounded-full bg-red-600 font-semibold
                transition-all duration-700 ease-out delay-300
                hover:scale-105 hover:shadow-lg
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              `}
            >
              📞 {data.phoneLabel}
            </a>
          </div>
        </div>

        {/* Background banner */}
        <div
          className="relative w-full h-full rounded-xl overflow-hidden bg-cover bg-center z-10"
          style={{ backgroundImage: `url(${data.background})` }}
        />
      </div>
    </div>
  );
}
