// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import ProductsCarousel from "./ProductsCarousel.jsx";
import { useNavigate } from "react-router-dom";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";
import {
    filterProductsByNhomTronGoiTen,
    getNhomTronGoiTenFromProducts,
} from "../services/nhomTronGoiTenFilter.js";
import { PRODUCTS_CAROUSEL_THEME_KEYS } from "../../../theme/styles/productsCarouselThemes.js";

//const BAN_CHAY = false;

export default function Huawei({ hideDescriptionAndButton = false }) {
    const navigate = useNavigate();
    const { products, loading } = useTronGoiProducts({
        //banChay: BAN_CHAY,
        sortDirection: "DESC",
    });
    const nhomTronGoiTen = getNhomTronGoiTenFromProducts(products);
    const filteredProducts = filterProductsByNhomTronGoiTen(
        products,
        nhomTronGoiTen
    );
    const huaweiBannerData = hideDescriptionAndButton
        ? { ...hybridData.moTaHuawei, description: "" }
        : hybridData.moTaHuawei;

    return (
        <div className="bg-[#1D1D1F] px-0 xl:px-[80px]">
            {/* CONTENT ĐỌC */}
            <div className="flex flex-col items-center max-w-[1280px] mx-auto">
                <MoTa
                    data={huaweiBannerData}
                    titleColor="#FFFFFF"
                    desColor="#FFFFFF"
                    showMore={!hideDescriptionAndButton}
                    onMoreClick={
                        hideDescriptionAndButton
                            ? undefined
                            : () => navigate(hybridData.moTaHuawei.link)
                    }
                />
            </div>

            {/* CAROUSEL – TRÁI THEO PX, PHẢI FULL */}
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
                    theme={PRODUCTS_CAROUSEL_THEME_KEYS.HUAWEI}
                    scrollContainerClassName="py-4"


                />
            </div>
        </div>
    );
}
