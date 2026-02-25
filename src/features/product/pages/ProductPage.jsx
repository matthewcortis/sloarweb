import { useLocation, useSearchParams } from "react-router-dom";
import HybridBanner from "../../home/components/MoTa.jsx";
import ProductsCarousel from "../../home/components/ProductsCarousel.jsx";
import { useTronGoiProducts } from "../../home/controllers/useTronGoiProducts";
import { BAN_CHAY, PRESETS, PRESET_BY_PATH } from "../hooks/productPresets.js";
import { hybridData } from "../../../services/mota.js";

const resolveBannerData = ({ loaiHeThong, loaiPha }) => {
  if (loaiHeThong === "Hy-Brid") {
    if (loaiPha === "3 pha") return hybridData.moTa3Pha;
    return hybridData.moTa1Pha;
  }

  if (loaiHeThong === "On-Grid") {
    if (loaiPha === "3 pha") return hybridData.moTaOngrid3Pha;
    return hybridData.moTaOngrid1Pha;
  }

  return hybridData.moTa1Pha;
};

export default function ProductPage({ preset }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const presetId = PRESETS[preset] ? preset : PRESET_BY_PATH[location.pathname];
  const activePreset = presetId ? PRESETS[presetId] : undefined;
  const loaiHeThong = activePreset
    ? activePreset.loaiHeThong
    : searchParams.get("heThong") || undefined;
  const loaiPha = activePreset
    ? undefined
    : searchParams.get("loaiPha") || undefined;
  const bannerData = resolveBannerData({ loaiHeThong, loaiPha });
  const { products, loading } = useTronGoiProducts({
    loaiHeThong,
    loaiPha,
    banChay: BAN_CHAY ? true : undefined,
    page: activePreset ? activePreset.page : undefined,
    size: activePreset ? activePreset.size : undefined,
    sortField: activePreset ? activePreset.sortField : undefined,
    sortDirection: activePreset ? activePreset.sortDirection : undefined,
  });

  return (
    <main className="px-[16px] xl:px-[80px]">
      <HybridBanner data={bannerData} />

      <ProductsCarousel
        products={products}
        loading={loading}
        viewMode="grid"
        hideDetailsOnMobile
      />
    </main>
  );
}
