import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import BannerCard from "../../../utils/BannerCard";
import { bannerData } from "../../../services/banner.js";
import DeviceCategorySection from "../components/ThietBi";
import VatTuKhac from "../components/VatTuKhac";
import BienPhapThiCong from "../components/BienPhapThiCong";
import congNghiepImage from "../../../assets/congnghiep.png";
import pvhcm from "../../../assets/pvhcm.png";
import pvhn from "../../../assets/pvhn.png";
import { fetchTronGoiById } from "../../home/api/tronGoiApi";
import { mapTronGoi } from "../../../services/mappers/tron-goi.mapper";
import {
  mapTronGoiToProduct,
  mapTronGoiDeviceProducts,
  mapTronGoiOtherMaterials,
} from "../../home/services/tronGoiProductMapper";
const thiCongThietBiCards = [
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

const thiCongThietBiCategories = [
  {
    id: "thi-cong-thiet-bi",
    items: thiCongThietBiCards,
  },
];

const pvOutItems = [
  {
    id: "pv-out-1",
    image: pvhcm,
  },
  {
    id: "pv-out-2",
    image: pvhn,
  }
];

const pvOutCategories = [
  {
    id: "pv-out",
    description:
      "Tập đoàn Điện lực Việt Nam công bố Hệ số PVout năm 2025 phục vụ tính toán sản lượng điện mặt trời mái nhà tự sản xuất, tự tiêu thụ.",
    items: pvOutItems,
    listClassName: "h-[252px] md:h-[291px]",
    gapClassName: "gap-4",
  },
];
export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [tronGoi, setTronGoi] = useState(null);
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
      .map(({ __index, ...item }) => item);
  }, [tronGoi]);
  const otherMaterials = useMemo(
    () => mapTronGoiOtherMaterials(tronGoi),
    [tronGoi]
  );

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
    pv,
    inverter,
    battery,
    production,
    roi,
    area,
  } = product;

  const specs = [
    { key: "pv", label: product.pvLabel || "", value: pv },
    { key: "inverter", label: product.inverterLabel || "", value: inverter },
    { key: "battery", label: product.batteryLabel || "", value: battery },
    { key: "production", label: "Sản lượng:", value: production },
    { key: "roi", label: "Hoàn vốn:", value: roi },
    { key: "area", label: "Diện tích:", value: area },
  ];

  return (
    <main className="w-full min-h-screen lg:px-[173px] lg:py-[39px]">
      <div className="bg-white lg:flex lg:flex-col lg:rounded-[12px] lg:shadow-[0px_8px_16px_0px_#E7EAED66]">
        <ProductInfo
          image={image}
          title={title}
          save={save}
          price={price}
          specs={specs}
        />

        <div className="w-full p-[10px] pt-0">
          <BannerCard
            image={bannerData.banner3.image}
            onClick={() => window.location.href = bannerData.banner3.link}
          />
        </div>
        <div className="w-full p-[10px]">
          <DeviceCategorySection
            products={deviceProducts}
            badgeText={`${deviceProducts.length} thiết bị`}
            variant="contained"
          />
        </div>
        <div className="w-full p-[10px]">
          <VatTuKhac
            items={otherMaterials}
            badgeText={`${otherMaterials.length} vật tư`}
          />
        </div>
        <div className="w-full p-[10px]">
          <BienPhapThiCong />
        </div>
        <div className="w-full p-[10px]">
          <BienPhapThiCong
            title="Thi công thiết bị"
            categories={thiCongThietBiCategories}
          />
        </div>
        <div className="w-full p-[10px]">
          <BienPhapThiCong
            title="Hệ số PV out"
            categories={pvOutCategories}
            renderItem={(item) => (
              <div
                key={item.id}
                className="w-[252px] h-[252px] md:w-[290px] md:h-[291px] rounded-[6px] md:rounded-[12px] overflow-hidden shadow-[0px_8px_16px_rgba(231,234,237,0.4)] flex-shrink-0 bg-white"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          />
        </div>
      </div>


    </main>


  );
}
