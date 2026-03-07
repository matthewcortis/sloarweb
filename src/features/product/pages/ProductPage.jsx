import { useLocation, useSearchParams } from "react-router-dom";
import HybridBanner from "../../home/components/MoTa.jsx";
import ProductsCarousel from "../../home/components/ProductsCarousel.jsx";
import { useTronGoiProducts } from "../../home/controllers/useTronGoiProducts";
import { BAN_CHAY, PRESETS, PRESET_BY_PATH } from "../hooks/productPresets.js";
import { hybridData } from "../../../services/mota.js";
import {
  filterProductsByNhomTronGoiTen,
  getNhomTronGoiTenFromProducts,
} from "../../home/services/nhomTronGoiTenFilter.js";

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

  const selectedLoaiPha = activePreset ? undefined : searchParams.get("loaiPha");
  const normalizedLoaiPha = selectedLoaiPha?.trim();
  const shouldOnlyShowSelectedPhase =
    normalizedLoaiPha === "1 pha" || normalizedLoaiPha === "3 pha";
  const show1Pha = !shouldOnlyShowSelectedPhase || normalizedLoaiPha === "1 pha";
  const show3Pha = !shouldOnlyShowSelectedPhase || normalizedLoaiPha === "3 pha";

  const queryConfig = {
    loaiHeThong,
    banChay: BAN_CHAY ? true : undefined,
    page: activePreset ? activePreset.page : undefined,
    size: activePreset ? activePreset.size : undefined,
    sortField: activePreset ? activePreset.sortField : undefined,
    sortDirection: activePreset ? activePreset.sortDirection : undefined,
  };

  const bannerData1Pha = resolveBannerData({ loaiHeThong, loaiPha: "1 pha" });
  const bannerData3Pha = resolveBannerData({ loaiHeThong, loaiPha: "3 pha" });

  const {
    products: products1Pha,
    loading: loading1Pha,
  } = useTronGoiProducts({
    ...queryConfig,
    loaiPha: "1 pha",
  });

  const {
    products: products3Pha,
    loading: loading3Pha,
  } = useTronGoiProducts({
    ...queryConfig,
    loaiPha: "3 pha",
  });
  const nhomTronGoiTen1Pha = getNhomTronGoiTenFromProducts(products1Pha);
  const filteredProducts1Pha = filterProductsByNhomTronGoiTen(
    products1Pha,
    nhomTronGoiTen1Pha
  );
  const nhomTronGoiTen3Pha = getNhomTronGoiTenFromProducts(products3Pha);
  const filteredProducts3Pha = filterProductsByNhomTronGoiTen(
    products3Pha,
    nhomTronGoiTen3Pha
  );

  return (
    <main className="px-[16px] xl:px-[80px] pt-[39px] lg:pt-[80px] pb-[39px] lg:pb-[80px]">
      {show1Pha && (
        <section>
          <HybridBanner data={bannerData1Pha} />

          <div className="mt-[24px]">
            <ProductsCarousel
              products={filteredProducts1Pha}
              loading={loading1Pha}
              viewMode="grid"
              hideDetailsOnMobile
            />
          </div>
        </section>
      )}

      {show3Pha && (
        <section className={show1Pha ? "mt-[39px] lg:mt-[80px]" : undefined}>
          <HybridBanner data={bannerData3Pha} />

          <div className="mt-[24px]">
            <ProductsCarousel
              products={filteredProducts3Pha}
              loading={loading3Pha}
              viewMode="grid"
              hideDetailsOnMobile
            />
          </div>
        </section>
      )}
    </main>
  );
}
