// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import ProductsCarousel from "./ProductsCarousel.jsx";
import { useNavigate } from "react-router-dom";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";

const NHOM_TRON_GOI_TEN = "HUAWEI";
const BAN_CHAY = false;

export default function Huawei({ hideDescriptionAndButton = false }) {
    const navigate = useNavigate();
    const { products, loading } = useTronGoiProducts({
        nhomTronGoiTen: NHOM_TRON_GOI_TEN,
        banChay: BAN_CHAY,
        sortDirection: "DESC",
    });
    const huaweiBannerData = hideDescriptionAndButton
      ? { ...hybridData.moTaHuawei, description: "" }
      : hybridData.moTaHuawei;

    return (
        <div className="px-4  bg-[#1D1D1F] pb-[30px] ">
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
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
        "
            >
                <ProductsCarousel
                    products={products}
                    loading={loading}
                    cardBgColor="#000000"
                    mainColor="#EE4037"
                    textColor="#FFFFFF"
                    saveColor="#48484D"
                    scrollContainerClassName="py-4"


                />
            </div>
        </div>
    );
}
