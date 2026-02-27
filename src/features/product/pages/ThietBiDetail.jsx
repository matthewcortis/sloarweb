import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import productFallbackImage from "../../../assets/product.png";
import { fetchThietBiById } from "../api/thietBiApi";

const formatNumber = (value, maximumFractionDigits = 0) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits }).format(
    numeric
  );
};

const formatCurrency = (value) => {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    const formatted = formatNumber(numeric, 0);
    return formatted ? `${formatted} đ` : "--";
  }
  if (typeof value === "string" && value.trim()) return value;
  return "--";
};

const getVatTuImage = (vatTu) => {
  const anhChinh = vatTu?.anhVatTus?.find?.((item) => item?.anhChinh);
  const anyAnh = vatTu?.anhVatTus?.[0];
  const image =
    anhChinh?.tepTin?.duongDan ||
    anyAnh?.tepTin?.duongDan ||
    vatTu?.thuongHieu?.tepTin?.duongDan;

  return image || productFallbackImage;
};

const formatThuocTinh = (detail) => {
  if (!detail) return "--";
  if (typeof detail === "string" || typeof detail === "number") {
    return `${detail}`;
  }
  const value = detail?.giaTri ?? detail?.value ?? "--";
  const unit = detail?.donVi ?? detail?.unit ?? "";
  return unit ? `${value} ${unit}` : `${value}`;
};

const getThuocTinhByKeys = (vatTu, keys = []) => {
  const duLieu = vatTu?.duLieuRieng;
  if (!duLieu || typeof duLieu !== "object") return null;

  for (const key of keys) {
    if (duLieu[key]) return duLieu[key];
  }

  const normalizedKeys = keys.map((key) => key.toLowerCase());
  for (const [key, detail] of Object.entries(duLieu)) {
    const keyText = `${key} ${detail?.ten ?? ""}`.toLowerCase();
    const match = normalizedKeys.some((target) => keyText.includes(target));
    if (match) return detail;
  }

  return null;
};

const getPowerValue = (vatTu) => {
  const detail = getThuocTinhByKeys(vatTu, [
    "cong_suat",
    "công suất",
    "power",
    "kw",
    "wp",
  ]);
  if (detail) return formatThuocTinh(detail);
  return vatTu?.congSuat ?? vatTu?.power ?? "--";
};

const getPriceValue = (vatTu) => {
  const thongTinGias = Array.isArray(vatTu?.thongTinGias)
    ? vatTu.thongTinGias
    : [];

  let rawPrice;
  for (const info of thongTinGias) {
    const dsGia = Array.isArray(info?.dsGia) ? info.dsGia : [];
    const found = dsGia.find(
      (item) =>
        item?.giaBan ??
        item?.giaNhap ??
        item?.giaBanRaw ??
        item?.giaNhapRaw
    );
    if (found) {
      rawPrice =
        found?.giaBan ??
        found?.giaNhap ??
        found?.giaBanRaw ??
        found?.giaNhapRaw;
      break;
    }
  }

  if (rawPrice == null) {
    const direct = thongTinGias.find(
      (item) => item?.giaBan ?? item?.gia ?? item?.giaNiemYet
    );
    rawPrice = direct?.giaBan ?? direct?.gia ?? direct?.giaNiemYet;
  }

  const raw =
    rawPrice ?? vatTu?.gia ?? vatTu?.price ?? vatTu?.donGia ?? vatTu?.giaBan;

  return formatCurrency(raw);
};

const getIpValue = (vatTu) => {
  const detail = getThuocTinhByKeys(vatTu, [
    "chi_so_ip",
    "chỉ số ip",
    "ip",
  ]);
  const value =
    (detail ? formatThuocTinh(detail) : null) ??
    vatTu?.ip ??
    vatTu?.chiSoIp;
  return value || "66";
};

const mapVatTuToDevice = (data) => {
  const vatTu = data?.vatTu ?? data ?? {};
  const sizeDetail = getThuocTinhByKeys(vatTu, [
    "kich_thuoc",
    "kích thước",
    "size",
  ]);
  const weightDetail = getThuocTinhByKeys(vatTu, [
    "khoi_luong",
    "cân nặng",
    "trong_luong",
    "weight",
  ]);

  return {
    id: vatTu?.id ?? data?.id,
    name: vatTu?.ten || vatTu?.ma || "--",
    image: getVatTuImage(vatTu),
    power: getPowerValue(vatTu),
    size: formatThuocTinh(sizeDetail),
    weight: formatThuocTinh(weightDetail),
    price: getPriceValue(vatTu),
    ip: getIpValue(vatTu),
    sheetLink: vatTu?.sheetLink || data?.sheetLink || "",
  };
};

const downloadIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 3v10m0 0l4-4m-4 4l-4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ThietBiDetail() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchThietBiById(id);
        const content = response?.content ?? response?.data?.content ?? response;
        const raw = Array.isArray(content) ? content[0] : content;
        const mapped = raw ? mapVatTuToDevice(raw) : null;

        if (isMounted) {
          setDevice(mapped);
        }
      } catch (fetchError) {
        console.error("Failed to load device detail", fetchError);
        if (isMounted) {
          setError(fetchError);
          setDevice(null);
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
      setDevice(null);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const detailRows = useMemo(() => {
    if (!device) return [];
    return [
      { label: "Công suất:", value: device.power },
      { label: "Kích thước:", value: device.size },
      { label: "Cân nặng:", value: device.weight },
      { label: "Chỉ số IP:", value: device.ip },
    ];
  }, [device]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Đang tải thiết bị...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Lỗi tải dữ liệu thiết bị
        </p>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-500">
          Không tìm thấy thiết bị
        </p>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen px-[16px] lg:px-[173px] py-[24px] lg:py-[39px]">
      <div className="w-full bg-white rounded-[12px] shadow-[0px_8px_16px_0px_#E7EAED66] p-[10px] lg:p-[20px]">
        <div className="flex flex-col items-center lg:items-start lg:flex-row lg:gap-6">
          {/* IMAGE */}
          <div className="w-full lg:w-[519px] lg:h-[519px] flex flex-col items-center">
            <div className="w-full max-w-[393px] h-[393px] lg:max-w-none lg:w-[519px] lg:h-[519px] bg-white rounded-[6px] lg:rounded-[12px] p-[10px] lg:p-0 flex items-center justify-center">
              <img
                src={device.image}
                alt={device.name}
                className="w-full h-full object-contain"
              />
            </div>
            
          </div>

          {/* INFO */}
          <div className="w-full max-w-[393px] lg:max-w-none lg:w-[519px] lg:h-[519px] mt-4 lg:mt-0 mx-auto lg:mx-0 flex flex-col gap-3 lg:gap-4">
            {/* TITLE + PRICE */}
            <div className="w-full h-[145px] lg:h-[120px]">
              <h1 className="text-[16px] lg:text-[18px] font-semibold text-[#111111] line-clamp-2">
                {device.name}
              </h1>
              <div className="mt-3">
                <div className="text-[16px] text-gray-500">GIÁ NIÊM YẾT</div>
                <div className="text-[20px] lg:text-[22px] font-bold text-[#FF4D4F]">
                  {device.price}
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="w-full h-[124px] bg-white rounded-[12px] px-[16px] py-[12px] flex flex-col justify-between lg:gap-[7px] lg:justify-start">
              {detailRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between text-[16px] text-[#2A2A2A]"
                >
                  <span>{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </div>
              ))}
            </div>

            {/* CTA 1 */}
            <div className="flex flex-col gap-3">
              <div className="text-[16px] font-semibold text-[#1A1A1A]">
                Thông tin chi tiết
              </div>
              {device.sheetLink ? (
                <a
                  href={device.sheetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="h-[40px] w-full rounded-[8px] bg-[#3AA85E] text-white text-[16px] font-semibold flex items-center justify-center gap-2"
                >
                  {downloadIcon}
                  Tải về Datasheet
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="h-[40px] w-full rounded-[8px] bg-[#3AA85E]/60 text-white text-[16px] font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  {downloadIcon}
                  Tải về Datasheet
                </button>
              )}
            </div>

            {/* CTA 2 */}
            <div className="flex flex-col gap-3">
              <div className="text-[16px] font-semibold text-[#1A1A1A]">
                Danh mục pin lithium tương thích
              </div>
              <button className="h-[40px] w-full rounded-[8px] bg-[#3AA85E] text-white text-[16px] font-semibold flex items-center justify-center gap-2">
                {downloadIcon}
                Tải về Datasheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
