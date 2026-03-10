// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import ProductsCarousel from "./ProductsCarousel.jsx";
import { hybridData } from "../../../services/mota.js";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";
import { useNavigate } from "react-router-dom";
import {
  filterProductsByNhomTronGoiTen,
  getNhomTronGoiTenFromProducts,
} from "../services/nhomTronGoiTenFilter.js";
import { PRODUCTS_CAROUSEL_THEME_KEYS } from "../../../theme/styles/productsCarouselThemes.js";

const HE_THONG = "On-Grid";
const LOAI_PHA = "3 pha";

export default function OngridProducts3Pha() {
  const navigate = useNavigate();
  const { products, loading } = useTronGoiProducts({
    loaiHeThong: HE_THONG,
    loaiPha: LOAI_PHA,
    sortDirection: "ASC",
  });
  const nhomTronGoiTen = getNhomTronGoiTenFromProducts(products);
  const filteredProducts = filterProductsByNhomTronGoiTen(
    products,
    nhomTronGoiTen
  );

  return (
    <div className="px-0 xl:px-[80px] pb-0 lg:pb-[30px]">
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <MoTa
          data={hybridData.moTaOngrid3Pha}
          onMoreClick={() =>
            navigate(
              `/products?${new URLSearchParams({
                heThong: HE_THONG,
                loaiPha: LOAI_PHA,
              }).toString()}`
            )
          }
        />
      </div>
      <div
        className="
          mt-[24px] md:mt-6
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
      >
        <ProductsCarousel
          products={filteredProducts}
          loading={loading}
          theme={PRODUCTS_CAROUSEL_THEME_KEYS.ONGRID}
        />
      </div>
    </div>
  );
}
