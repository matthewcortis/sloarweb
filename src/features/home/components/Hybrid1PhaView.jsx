import HybridBanner from "./MoTa.jsx";
import ProductsCarousel from "./ProductsCarousel.jsx";

export default function Hybrid1PhaView({
  bannerData,
  onMoreClick,
  products,
  loading,
}) {
  return (
    <div className="px-[16px] xl:px-[80px]">
      {/* MÔ TẢ – GIỮ MAX WIDTH */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <HybridBanner data={bannerData} onMoreClick={onMoreClick} />
      </div>

      <div
        className="
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
