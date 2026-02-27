import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function NotFoundPage({ mode = "404" }) {
  const [searchParams] = useSearchParams();
  const isMaintenance = useMemo(() => {
    if (mode === "maintenance") return true;
    const flag = searchParams.get("maintenance");
    return flag === "1" || flag === "true";
  }, [mode, searchParams]);

  const pageMeta = useMemo(() => {
    if (isMaintenance) {
      return {
        code: "503",
        title: "Hệ thống đang bảo trì",
        description:
          "Chúng tôi đang nâng cấp hệ thống để phục vụ bạn tốt hơn. Vui lòng quay lại sau ít phút.",
        cta: "Về trang chủ",
      };
    }
    return {
      code: "404",
      title: "Không tìm thấy trang",
      description: "Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.",
      cta: "Về trang chủ",
    };
  }, [isMaintenance]);

  return (
    <>
 
      <main className="relative isolate min-h-screen w-full">
        <img
          alt=""
          src="https://b-company.jp/wp-content/uploads/2024/10/Rooftop-Solar-Power-in-Vietnam-2048x1363.jpg"
          className="absolute inset-0 -z-10 size-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base/8 font-semibold text-white">
            {pageMeta.code}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            {pageMeta.title}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">
            {pageMeta.description}
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="/"
              className="text-base/7 font-semibold text-white hover:text-white/90"
            >
              <span aria-hidden="true">&larr;</span> {pageMeta.cta}
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
