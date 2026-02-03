import { useEffect, useState } from "react";
import HybridBanner from "../../home/components/MoTa.jsx";
import ProductsCarousel from "../../home/components/ProductsCarousel.jsx";
import { products as mockProducts } from "../../../services/data.js";

export default function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // giả lập gọi API
    const timer = setTimeout(() => {
      setData(mockProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="px-[16px] xl:px-[80px]">
      <HybridBanner
        data={{
          title:
            "Điện mặt trời Hy-Brid (Có pin lưu trữ) cho nguồn điện 1 pha",
          description:
            "Hệ thống điện mặt trời Hy-Brid, có bao gồm Pin lưu trữ Lithium...",
        }}
      />

      <ProductsCarousel
        products={data}
        loading={loading}
        viewMode="grid"
      />
    </main>
  );
}
