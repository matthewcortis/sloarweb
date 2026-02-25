import { useEffect, useState } from "react";

export default function CongNghiepCard({
  image,
  variant = "desktop",
  alt = "Hinh cong nghiep",
}) {
  const isResponsive = variant === "responsive";
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!isPreviewOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isPreviewOpen]);

  return (
    <>
      <div
        className={[
          "rounded-[12px] bg-white shadow-[0px_8px_16px_rgba(231,234,237,0.4)] overflow-hidden flex-shrink-0",
          isResponsive ? "w-[252px] md:w-[290px]" : "w-[290px]",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="block w-full h-full cursor-zoom-in"
          aria-label="Mo rong anh"
        >
          <img
            src={image}
            alt={alt}
            className={[
              "object-cover rounded-[12px]",
              isResponsive ? "w-full h-[248px] md:h-[291px]" : "w-[290px] h-[291px]",
            ].join(" ")}
          />
        </button>
      </div>

      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-[2px] p-4 md:p-8 flex items-center justify-center"
          onClick={() => setIsPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-[96vw] max-h-[90vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-[#111111] text-[20px] leading-none shadow-[0px_8px_20px_rgba(0,0,0,0.35)]"
              aria-label="Dong anh"
            >
              x
            </button>

            <img
              src={image}
              alt={alt}
              className="max-w-[96vw] max-h-[90vh] w-auto h-auto object-contain rounded-[12px] shadow-[0px_12px_30px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
