// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { products } from "../../../services/data.js";
import ProductsCarousel from "./ProductsCarousel.jsx";

export default function HybridProductsSection() {
  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px]">
      {/* CONTENT ĐỌC – GIỮ MAX WIDTH */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <MoTa data={hybridData.moTa3Pha} />

        {/* GRID SO SÁNH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-sans text-[14px] md:text-[16px] p-2 md:p-6">
          {/* Left */}
          <div className="flex flex-col gap-2 items-center text-center">
            <h4 className="font-[600] text-[16px] md:text-[18px] mb-2">
              3 pha Áp Thấp
            </h4>
            <p>Biến tần áp thấp</p>
            <p>Max công suất 15 kW</p>
            <p>Pin lithium áp thấp</p>
            <p>Max công suất 30 kW</p>
            <p>Sạc xả kém hơn</p>
            <p>Hiệu suất chuyển đổi thấp hơn</p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2 items-center text-center">
            <h4 className="font-[600] text-[16px] md:text-[18px] mb-2">
              3 pha Áp Cao
            </h4>
            <p>Biến tần áp cao</p>
            <p>Max công suất 50 kW</p>
            <p>Pin lithium áp cao</p>
            <p>Công suất không giới hạn</p>
            <p>Sạc xả nhanh hơn</p>
            <p>Hiệu suất chuyển đổi cao hơn</p>
          </div>
        </div>
      </div>

      {/* CAROUSEL – TRÁI THEO PX, PHẢI FULL */}
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
