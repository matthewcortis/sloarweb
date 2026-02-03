import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../../services/data";
import ProductInfo from "../components/ProductInfo";
import BannerCard from "../../../utils/BannerCard";
import { bannerData } from "../../../services/banner.js";
export default function ProductDetail() {
  const { id } = useParams();

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [id]
  );

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Không tìm thấy sản phẩm
        </p>
      </div>
    );
  }

  const {
    image,
    title,
    save,
    price,
    pv,
    inverter,
    battery,
    production,
    roi,
    area,
  } = product;

  const specs = [
    { label: "Công suất PV:", value: pv },
    { label: "Biến tần solis:", value: inverter },
    { label: "Lưu trữ Dyness:", value: battery },
    { label: "Sản lượng:", value: production },
    { label: "Hoàn vốn:", value: roi },
    { label: "Diện tích:", value: area },
  ];

  return (
    <main className="w-full min-h-screen lg:px-[173px] lg:py-[39px]">
      {/* PRODUCT INFO MOBILE */}
      <ProductInfo
        variant="mobile"
        image={image}
        title={title}
        save={save}
        price={price}
        specs={specs}
      />

      {/* BANNER MOBILE */}
      <div className="block lg:hidden">
        <BannerCard
          image={bannerData.banner3.image}
          onClick={() => window.location.href = bannerData.banner3.link}
        />
      </div>

      {/* DESKTOP WRAPPER */}
      <div className="hidden lg:block bg-white rounded-[12px] shadow-[0px_8px_16px_0px_#E7EAED66]">
        <ProductInfo
          variant="desktop"
          image={image}
          title={title}
          save={save}
          price={price}
          specs={specs}
        />

        <div className="w-full p-[10px] pt-0">
          <BannerCard
            image={bannerData.banner3.image}
            onClick={() => window.location.href = bannerData.banner3.link}
          />
        </div>
      </div>
    </main>


  );
}
