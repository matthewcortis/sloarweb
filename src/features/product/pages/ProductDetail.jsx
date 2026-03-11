import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { BannerCard, CongNghiepCard } from "../../../shared/components/cards";
import { bannerData } from "../../../services/banner.js";
import DeviceCategorySection from "../components/ThietBi";
import VatTuKhac from "../components/VatTuKhac";
import BienPhapThiCong from "../components/BienPhapThiCong";
import MegaStorySection from "../components/MegaStorySection.jsx";
import congNghiepImage from "../../../assets/congnghiep.png";
import pvhcm from "../../../assets/pvhcm.png";
import pvhn from "../../../assets/pvhn.png";
import { fetchTronGoiById } from "../../home/api/tronGoiApi";
import {
  fetchQuangCaoByViTri,
  fetchQuangCaoImageUrlByViTri,
} from "../../home/api/quangCaoApi";
import { mapTronGoi } from "../../../services/mappers/tron-goi.mapper";
import {
  mapTronGoiToProduct,
  mapTronGoiDeviceProducts,
  mapTronGoiOtherMaterials,
} from "../../home/services/tronGoiProductMapper";
import { useSalePhone } from "../../../shared/hooks";
import {
  PRODUCTS_CAROUSEL_THEME_KEYS,
  resolveProductsCarouselTheme,
} from "../../../theme/styles/productsCarouselThemes.js";
import { useSeoMeta } from "../../../shared/seo";

const TRON_GOI_BANNER_POSITION = "WEB_BANNER_TRON_GOI_1";
const THI_CONG_THIET_BI_POSITION = "WEB_BIEN_PHAP_THI_CONG_THIET_BI";
const BIEU_DO_DIEN_POSITION = "WEB_BIEU_DO_DIEN";
const PVOUT_HN_POSITION = "WEB_PVOUT_HN";
const PVOUT_HCM_POSITION = "WEB_PVOUT_HCM";

const defaultThiCongThietBiCards = [
  {
    id: 1,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 2,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 3,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
  {
    id: 4,
    image: congNghiepImage,
    items: ["Biến tần", "Tủ điện", "Pin lưu trữ"],
  },
];

const mapQuangCaoToCards = (items = []) =>
  items
    .filter(
      (item) =>
        item?.hoatDong === true &&
        item?.trangThai === 1 &&
        typeof item?.tepTin?.duongDan === "string" &&
        item.tepTin.duongDan.length > 0
    )
    .map((item, index) => ({
      id: item?.id ?? `thi-cong-thiet-bi-${index}`,
      image: item.tepTin.duongDan,
      items: [],
    }));

const defaultPvOutItems = [
  {
    id: "pv-out-hn",
    image: pvhn,
  },
  {
    id: "pv-out-hcm",
    image: pvhcm,
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const { salePhoneTel } = useSalePhone();

  const [product, setProduct] = useState(null);
  const [tronGoi, setTronGoi] = useState(null);
  const [tronGoiBannerImage, setTronGoiBannerImage] = useState(bannerData.banner3.image);
  const [thiCongThietBiCards, setThiCongThietBiCards] = useState(defaultThiCongThietBiCards);
  const [pvOutItems, setPvOutItems] = useState(defaultPvOutItems);
  const [bieuDoDienItems, setBieuDoDienItems] = useState(defaultPvOutItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchTronGoiById(id);
        const content = response?.content ?? response?.data?.content ?? [];
        const raw = Array.isArray(content) ? content[0] : content;
        const mappedTronGoi = raw ? mapTronGoi(raw) : null;
        const mapped = mappedTronGoi ? mapTronGoiToProduct(mappedTronGoi) : null;

        if (isMounted) {
          setProduct(mapped);
          setTronGoi(mappedTronGoi);
        }
      } catch (fetchError) {
        console.error("Failed to load product detail", fetchError);
        if (isMounted) {
          setError(fetchError);
          setProduct(null);
          setTronGoi(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchDetail();
    } else {
      setLoading(false);
      setProduct(null);
      setTronGoi(null);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    let isActive = true;

    const loadTronGoiBanner = async () => {
      try {
        const imageUrl = await fetchQuangCaoImageUrlByViTri({
          viTri: TRON_GOI_BANNER_POSITION,
          page: 0,
          size: 20,
        });

        if (isActive && imageUrl) {
          setTronGoiBannerImage(imageUrl);
        }
      } catch (fetchError) {
        console.error("Khong tai duoc banner WEB_BANNER_TRON_GOI_1", fetchError);
      }
    };

    loadTronGoiBanner();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadPvOutItems = async () => {
      try {
        const [pvOutHnImageUrl, pvOutHcmImageUrl] = await Promise.all([
          fetchQuangCaoImageUrlByViTri({
            viTri: PVOUT_HN_POSITION,
            page: 0,
            size: 20,
          }),
          fetchQuangCaoImageUrlByViTri({
            viTri: PVOUT_HCM_POSITION,
            page: 0,
            size: 20,
          }),
        ]);

        if (isActive) {
          setPvOutItems([
            {
              id: "pv-out-hn",
              image: pvOutHnImageUrl || pvhn,
            },
            {
              id: "pv-out-hcm",
              image: pvOutHcmImageUrl || pvhcm,
            },
          ]);
        }
      } catch (fetchError) {
        console.error(
          "Khong tai duoc danh sach WEB_PVOUT_HN / WEB_PVOUT_HCM",
          fetchError
        );
      }
    };

    loadPvOutItems();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadBieuDoDienItems = async () => {
      try {
        const items = await fetchQuangCaoByViTri({
          viTri: BIEU_DO_DIEN_POSITION,
          page: 0,
          size: 20,
        });

        const mappedCards = mapQuangCaoToCards(items);
        if (isActive && mappedCards.length > 0) {
          setBieuDoDienItems(mappedCards);
        }
      } catch (fetchError) {
        console.error("Khong tai duoc danh sach WEB_BIEU_DO_DIEN", fetchError);
      }
    };

    loadBieuDoDienItems();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadThiCongThietBiCards = async () => {
      try {
        const items = await fetchQuangCaoByViTri({
          viTri: THI_CONG_THIET_BI_POSITION,
          page: 0,
          size: 20,
        });

        const mappedCards = mapQuangCaoToCards(items);
        if (isActive && mappedCards.length > 0) {
          setThiCongThietBiCards(mappedCards);
        }
      } catch (fetchError) {
        console.error(
          "Khong tai duoc danh sach WEB_BIEN_PHAP_THI_CONG_THIET_BI",
          fetchError
        );
      }
    };

    loadThiCongThietBiCards();

    return () => {
      isActive = false;
    };
  }, []);

  const thiCongThietBiCategories = useMemo(
    () => [
      {
        id: "thi-cong-thiet-bi",
        items: thiCongThietBiCards,
      },
    ],
    [thiCongThietBiCards]
  );

  const bieuDoDienCategories = useMemo(
    () => [
      {
        id: "bieu-do-dien",
        description: "Chúng tôi hiểu bạn để tốt hơn mỗi ngày",
        items: bieuDoDienItems,
        listClassName: "h-[252px] md:h-[291px]",
        gapClassName: "gap-4",
      },
    ],
    [bieuDoDienItems]
  );

  const pvOutCategories = useMemo(
    () => [
      {
        id: "pv-out",
        description:
          "Tập đoàn Điện lực Việt Nam công bố Hệ số PVout năm 2025 phục vụ tính toán sản lượng điện mặt trời mái nhà tự sản xuất, tự tiêu thụ.",
        items: pvOutItems,
        listClassName: "h-[252px] md:h-[291px]",
        gapClassName: "gap-4",
      },
    ],
    [pvOutItems]
  );

  const deviceProducts = useMemo(() => {
    const items = mapTronGoiDeviceProducts(tronGoi);
    const priorityOrder = ["TAM_PIN", "BIEN_TAN", "PIN_LUU_TRU"];
    const orderIndex = (code) => {
      const idx = priorityOrder.indexOf(code);
      return idx === -1 ? priorityOrder.length : idx;
    };

    return items
      .map((item, index) => ({ ...item, __index: index }))
      .sort((a, b) => {
        const diff = orderIndex(a.groupCode) - orderIndex(b.groupCode);
        if (diff !== 0) return diff;
        return a.__index - b.__index;
      })
      .map((item) => {
        const nextItem = { ...item };
        delete nextItem.__index;
        return nextItem;
      });
  }, [tronGoi]);
  const otherMaterials = useMemo(
    () => mapTronGoiOtherMaterials(tronGoi),
    [tronGoi]
  );
  const mainDevices = useMemo(
    () =>
      (tronGoi?.vatTuTronGois ?? []).filter(
        (item) =>
          item?.vatTu?.nhomVatTu?.vatTuChinh === true && item?.duocXem !== false
      ),
    [tronGoi]
  );
  const isHuaweiCombo = useMemo(() => {
    const huaweiSignals = [
      product?.nhomTronGoiTen,
      tronGoi?.nhomTronGoi?.ten,
      tronGoi?.ten,
    ];

    return huaweiSignals.some((value) =>
      `${value ?? ""}`.toLowerCase().includes("huawei")
    );
  }, [product?.nhomTronGoiTen, tronGoi?.nhomTronGoi?.ten, tronGoi?.ten]);
  const detailThemeKey =
    isHuaweiCombo
      ? PRODUCTS_CAROUSEL_THEME_KEYS.HUAWEI
      : tronGoi?.loaiHeThong === "On-Grid"
      ? PRODUCTS_CAROUSEL_THEME_KEYS.ONGRID
      : PRODUCTS_CAROUSEL_THEME_KEYS.DEFAULT;
  const detailTheme = useMemo(
    () => resolveProductsCarouselTheme(detailThemeKey),
    [detailThemeKey]
  );
  const detailInfoTheme = useMemo(() => {
    if (!isHuaweiCombo) return detailTheme;

    return {
      ...detailTheme,
      priceColor: "#111111",
      saveTextColor: "#FFFFFF",
      buttonBgColor: "#111111",
      buttonTextColor: "#FFFFFF",
    };
  }, [detailTheme, isHuaweiCombo]);
  const seoTitle = product?.title
    ? `${product.title} | Combo điện mặt trời SolarMax`
    : "Chi tiết combo điện mặt trời | SolarMax";
  const seoDescription = product?.save
    ? `${product.save}. Xem chi tiết cấu hình, giá và phương án thi công tại SolarMax.`
    : "Thông tin chi tiết combo điện mặt trời: cấu hình thiết bị, giá và phương án thi công.";

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    image: product?.image || tronGoiBannerImage,
    type: "product",
  });

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Lỗi tải dữ liệu sản phẩm
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Không tìm thấy sản phẩm
        </p>
      </div>
    );
  }

  const {
    image,
    title,
    save,
    price,
    pvLabel,
    pv,
    inverterLabel,
    inverter,
    batteryLabel,
    battery,
    production,
    roi,
    area,
  } = product;

  const pvInfoLabel = `${pvLabel ?? ""}`.trim() || "Công suất ";
  const inverterInfoLabel =
    `Biến tần: ${inverterLabel ?? ""}`.trim() || "Biến tần ";
  const batteryInfoLabel = `Lưu trữ: ${batteryLabel ?? ""}`.trim() || "Lưu trữ";
 
  const specs = [
    { key: "pv", label: `${pvInfoLabel}: `, value: pv },
    { key: "inverter", label: `${inverterInfoLabel} `, value: inverter },
    { key: "battery", label: `${batteryInfoLabel} `, value: battery },
    { key: "production", label: "Sản lượng:", value: production },
    { key: "roi", label: "Hoàn vốn:", value: roi },
    { key: "area", label: "Diện tích:", value: area },
  ];

  const handleContactNow = () => {
    if (!salePhoneTel) return;
    window.location.href = `tel:${salePhoneTel}`;
  };

  return (
    <main className="w-full min-h-screen pb-[39px] lg:px-[173px] lg:pt-[40px] lg:pb-[80px]">
      <div className="bg-white lg:flex lg:flex-col lg:rounded-[12px] lg:shadow-[0px_8px_16px_0px_#E7EAED66]">
        <ProductInfo
          image={image}
          title={title}
          save={save}
          price={price}
          specs={specs}
          theme={detailInfoTheme}
          onContactNow={handleContactNow}
        />

        <div className="w-full mt-[39px] lg:mt-[80px] px-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <BannerCard
            image={tronGoiBannerImage}
           
          />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] pl-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <DeviceCategorySection
            products={deviceProducts}
            badgeText={`${deviceProducts.length} thiết bị`}
            variant="contained"
          />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] px-4 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <VatTuKhac
            items={otherMaterials}
            mainDevices={mainDevices}
            badgeText={`7 vật tư`}
          />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] pl-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <BienPhapThiCong />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] pl-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <BienPhapThiCong
            title="Thi công thiết bị"
            categories={thiCongThietBiCategories}
            renderItem={(item) => (
              <CongNghiepCard
                key={item.id}
                image={item.image}
                variant="responsive"
                alt="Thi công thiết bị"
              />
            )}
          />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] pl-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <BienPhapThiCong
            title="Hệ số PV out"
            categories={pvOutCategories}
            renderItem={(item) => (
              <CongNghiepCard
                key={item.id}
                image={item.image}
                variant="responsive"
                alt="Hệ số PV out"
              />
            )}
          />
        </div>

        {/* công thức sản lượng điện */}
        <div className="w-full h-auto min-h-[152px] px-4 pt-[20px] pb-[10px] lg:min-h-[152px] lg:px-[10px] lg:pt-[20px] lg:pb-[10px]">
          <div className="text-left text-[#4A4A4A] text-[16px] leading-[100%] tracking-[0]">
            <p className="font-normal">Công thức sản lượng điện mặt trời:</p>
            <p className="mt-[2px] leading-[140%] font-semibold">
              Sản lượng điện mặt trời = Hệ số PV out × Tổng công suất tấm quang
              năng
            </p>
            <p className="mt-[20px] leading-[140%] font-normal">
              Ví dụ: Hệ thống có tổng công suất 6 kW (10 tấm quang năng JA Solar
              600 W), sẽ có sản lượng điện mặt trời tại TP. Hồ Chí Minh vào
              tháng 1 là:{" "}
              <span className="font-semibold">135 x 6 = 810 (kWh)</span>
            </p>
          </div>
        </div>

        <div className="w-full mt-[39px] lg:mt-[20px] px-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <BienPhapThiCong
            title="Biểu đồ điện"
            categories={bieuDoDienCategories}
            renderItem={(item) => (
              <CongNghiepCard
                key={item.id}
                image={item.image}
                variant="responsive"
                alt="Biểu đồ điện"
              />
            )}
          />
        </div>

        <div className="w-full mt-[39px] lg:mt-[80px] pl-4 pr-0 pt-0 pb-[10px] lg:p-[10px] lg:pt-0">
          <MegaStorySection />
        </div>
      </div>
    </main>
  );
}
