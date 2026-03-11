import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useSeoMeta } from "../shared/seo";

const resolveLayoutSeoMeta = (pathname = "/") => {
  if (pathname === "/") {
    return {
      title: "SolarMax | Giải pháp điện mặt trời",
      description:
        "Giải pháp điện mặt trời dân dụng và doanh nghiệp: combo On-Grid, Hy-Brid, thiết bị và dịch vụ thi công tiêu chuẩn cao.",
    };
  }

  if (pathname === "/huawei") {
    return {
      title: "Giải pháp Huawei FusionSolar | SolarMax",
      description:
        "Khám phá giải pháp điện mặt trời Huawei FusionSolar: inverter, optimizer, lưu trữ và quản lý hệ thống.",
    };
  }

  if (pathname === "/products" || pathname.startsWith("/combo-")) {
    return {
      title: "Combo điện mặt trời | SolarMax",
      description:
        "Danh sách combo điện mặt trời On-Grid và Hy-Brid được tối ưu theo nhu cầu sử dụng điện thực tế.",
    };
  }

  if (pathname.startsWith("/products/")) {
    return {
      title: "Chi tiết combo điện mặt trời | SolarMax",
      description:
        "Thông tin chi tiết combo điện mặt trời: giá, cấu hình thiết bị, hiệu suất và phương án thi công.",
    };
  }

  if (pathname === "/device" || pathname === "/device/thuong-hieu") {
    return {
      title: "Thiết bị điện mặt trời | SolarMax",
      description:
        "Danh mục thiết bị điện mặt trời chính hãng: tấm pin, biến tần, pin lưu trữ và phụ kiện.",
    };
  }

  if (pathname.startsWith("/devices/")) {
    return {
      title: "Chi tiết thiết bị điện mặt trời | SolarMax",
      description:
        "Thông số và đặc điểm thiết bị điện mặt trời: công suất, kích thước, giá bán và tài liệu kỹ thuật.",
    };
  }

  if (pathname === "/megastory") {
    return {
      title: "Tản mạn SolarMax",
      description:
        "Các bài viết chia sẻ kinh nghiệm triển khai điện mặt trời, vận hành và tối ưu hệ thống.",
    };
  }

  if (pathname.startsWith("/megastory/")) {
    return {
      title: "Chi tiết bài viết | Tản mạn SolarMax",
      description:
        "Nội dung chi tiết từ chuyên mục Tản mạn SolarMax về điện mặt trời và giải pháp năng lượng.",
    };
  }

  if (pathname === "/hoi-dap" || pathname === "/q&a") {
    return {
      title: "Hỏi & Đáp | SolarMax",
      description:
        "Các câu hỏi thường gặp về hệ thống điện mặt trời, chi phí đầu tư, vận hành và bảo trì.",
    };
  }

  if (pathname === "/gioi-thieu") {
    return {
      title: "Về SolarMax",
      description:
        "Thông tin về SolarMax, năng lực thi công, đối tác và định hướng phát triển điện mặt trời tại Việt Nam.",
    };
  }

  return {
    title: "SolarMax | Giải pháp điện mặt trời",
    description:
      "Giải pháp điện mặt trời dân dụng và doanh nghiệp: combo On-Grid, Hy-Brid, thiết bị và dịch vụ thi công tiêu chuẩn cao.",
  };
};

export default function MainLayout() {
  const location = useLocation();
  const isHuaweiPage = location.pathname === "/huawei";
  const pageMeta = resolveLayoutSeoMeta(location.pathname);

  useSeoMeta(pageMeta);

  return (
    <div
      className={`min-h-screen ${
        isHuaweiPage ? "bg-[#1D1D1F]" : "bg-gray-50"
      }`}
    >
      <Header
        variant={isHuaweiPage ? "dark" : "light"}
        autoHideOnMobile
      />
      <main className="flex-1 w-full p-0">
        <Outlet />
      </main>
      <Footer variant={isHuaweiPage ? "dark" : "light"} />
    </div>
  );
}
