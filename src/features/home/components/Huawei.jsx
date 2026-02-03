// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { products } from "../../../services/data.js";
import ProductsCarousel from "./ProductsCarousel.jsx";

export default function Huawei() {
    return (
        <div className="px-[16px] xl:px-[80px] bg-[#1D1D1F] py-[80px]">
            {/* CONTENT ĐỌC */}
            <div className="flex flex-col items-center max-w-[1280px] mx-auto">
                <MoTa
                    data={hybridData.moTa1Pha}
                    titleColor="#FFFFFF"
                    desColor="#FFFFFF"
                />
            </div>

            {/* CAROUSEL – TRÁI THEO PX, PHẢI FULL */}
            <div
                className="
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
            >
                <ProductsCarousel
                    products={products}
                    cardBgColor="#000000"
                    mainColor="#EE4037"
                    textColor="#FFFFFF"
                    saveColor="#48484D"
                />
            </div>
        </div>
    );
}
