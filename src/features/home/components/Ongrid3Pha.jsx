// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { products } from "../../../services/data.js";
import ProductsCarousel from "./ProductsCarousel.jsx";

export default function OngridProducts3Pha() {
  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px]">
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <MoTa data={hybridData.moTa3Pha} /> 
      </div>
      <div
        className="
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
      >
        <ProductsCarousel
          products={products}
          cardBgColor="#FFFFFF"
          mainColor="#EE4037"
          textColor="#000000"
          saveColor="#FDECEB"
        />
      </div>
    </div>
  );
}
