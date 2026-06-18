// src/components/HybridProductsSection.jsx
import MoTa from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import ProductsCarousel from "./ProductsCarousel.jsx";
import { useNavigate } from "react-router-dom";
import { useTronGoiProducts } from "../controllers/useTronGoiProducts";
import { PRODUCTS_CAROUSEL_THEME_KEYS } from "../../../theme/styles/productsCarouselThemes.js";

const HUAWEI_PRESETS = [
    {
        loaiHeThong: "Hy-Brid",
        nhomTronGoiTen: "JA Solar - Huawei - Huawei",
    },
    {
        loaiHeThong: "On-Grid",
        nhomTronGoiTen: "JA Solar - Huawei",
    },
];
const HUAWEI_PHASES = ["1 pha", "3 pha"];

const buildHuaweiPayload = ({ coSoMa, loaiHeThong, nhomTronGoiTen, loaiPha }) => ({
    filters: [
        {
            fieldName: "coSo.ma",
            operation: "EQUALS",
            value: coSoMa,
            logicType: "AND",
        },
        {
            fieldName: "loaiHeThong",
            operation: "EQUALS",
            value: loaiHeThong,
            logicType: "AND",
        },
        {
            fieldName: "nhomTronGoi.ten",
            operation: "ILIKE",
            value: nhomTronGoiTen,
            logicType: "AND",
        },
        {
            fieldName: "loaiPha",
            operation: "EQUALS",
            value: loaiPha,
            logicType: "AND",
        },
        {
            fieldName: "trangThai",
            operation: "EQUALS",
            value: "1",
            logicType: "AND",
        },
        {
            fieldName: "nhomTronGoi.trangThai",
            operation: "EQUALS",
            value: "1",
            logicType: "AND",
        },
    ],
    sorts: [
        {
            fieldName: "tongGia",
            direction: "ASC",
        },
    ],
    page: 0,
    size: 20,
});

const buildHuaweiPayloads = (coSoMa) =>
    HUAWEI_PRESETS.flatMap((preset) =>
        HUAWEI_PHASES.map((loaiPha) =>
            buildHuaweiPayload({
                coSoMa,
                loaiPha,
                ...preset,
            })
        )
    );

export default function Huawei({ hideDescriptionAndButton = false }) {
    const navigate = useNavigate();
    const { products, loading } = useTronGoiProducts({
        buildFilterPayloads: buildHuaweiPayloads,
    });
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
                    products={products}
                    loading={loading}
                    theme={PRODUCTS_CAROUSEL_THEME_KEYS.HUAWEI}
                    scrollContainerClassName="py-4"


                />
            </div>
        </div>
    );
}
