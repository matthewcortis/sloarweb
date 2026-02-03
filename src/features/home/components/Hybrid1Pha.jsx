// src/components/HybridProductsSection.jsx
import HybridBanner from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { products } from "../../../services/data.js";
import ProductsCarousel from "./ProductsCarousel.jsx";
import { useNavigate } from "react-router-dom";
export default function HybridProducts1Pha() {

   const navigate = useNavigate();
  return (
    
    <div className="px-[16px] xl:px-[80px]">
      {/* MÔ TẢ – GIỮ MAX WIDTH */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <HybridBanner data={hybridData.moTa1Pha}  onMoreClick={() => navigate("/products")}  />
      </div>


      <div
        className="
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
      >
        <ProductsCarousel products={products} />
      </div>
    </div>
  );
}
