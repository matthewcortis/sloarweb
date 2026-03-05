// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import ProductsCarousel from "./ProductsCarousel.jsx";
import SoSanh3Pha from "./sosanh.jsx";
import { hybridData } from "../../../services/mota.js";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";
import { useNavigate } from "react-router-dom";

const HE_THONG = "Hy-Brid";
const LOAI_PHA = "3 pha";
const NHOM_TRON_GOI_TEN = "JA Solar - Solis - Dyness";
export default function HybridProductsSection() {
  const navigate = useNavigate();
  const { products, loading } = useTronGoiProducts({
    loaiHeThong: HE_THONG,
    loaiPha: LOAI_PHA,
    nhomTronGoiTen: NHOM_TRON_GOI_TEN,
    sortDirection: "ASC",
  });

  return (
    <div className="px-0 xl:px-[80px] pb-0 lg:pb-[80px]">
     
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <MoTa
          data={{
            ...hybridData.moTa3Pha,
            highlight: "Giải pháp phù hợp với hóa đơn tiền điện trên 3 triệu/tháng.",
          }}
          onMoreClick={() =>
            navigate(
              `/products?${new URLSearchParams({
                heThong: HE_THONG,
                loaiPha: LOAI_PHA,
              }).toString()}`
            )
          }
        />
        <div className="mt-[24px] md:mt-6 mb-0 md:mb-0 w-full">
          <SoSanh3Pha />
        </div>

      </div>

      <div
        className="
          mt-[24px] md:mt-6
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
      >
        <ProductsCarousel products={products} loading={loading} />
      </div>
    </div>
  );
}
