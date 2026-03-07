// src/components/HybridProductsSection.jsx
import { useNavigate } from "react-router-dom";
import { hybridData } from "../../../services/mota.js";
import Hybrid1PhaView from "./Hybrid1PhaView.jsx";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";
import {
  filterProductsByNhomTronGoiTen,
  getNhomTronGoiTenFromProducts,
} from "../services/nhomTronGoiTenFilter.js";

const HE_THONG = "Hy-Brid";
const LOAI_PHA = "1 pha";

export default function HybridProducts1Pha() {
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
    <Hybrid1PhaView
      bannerData={hybridData.moTa1Pha}
      onMoreClick={() =>
        navigate(
          `/products?${new URLSearchParams({
            heThong: HE_THONG,
            loaiPha: LOAI_PHA,
          }).toString()}`
        )
      }
      products={filteredProducts}
      loading={loading}
    />
  );
}
