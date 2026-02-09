import productFallbackImage from "../../../assets/product.png";

export const BRAND_DESCRIPTIONS = {};

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

const convertMonthToYearAndMonth = (totalMonths) => {
  if (!Number.isFinite(totalMonths)) return "--";

  const monthsRounded = Math.ceil(totalMonths);
  const years = Math.floor(monthsRounded / 12);
  const months = monthsRounded % 12;

  if (years > 0 && months > 0) {
    return `${years} năm ${months} tháng`;
  }
  if (years > 0) {
    return `${years} năm`;
  }
  return `${months} tháng`;
};

const getWarrantyText = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "--";
  return convertMonthToYearAndMonth(numeric);
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

export const mapVatTuToDevice = (vatTu) => {
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
    id: vatTu?.id ?? vatTu?.vatTuId,
    name: vatTu?.ten || vatTu?.ma || "--",
    image: getVatTuImage(vatTu),
    quantity: vatTu?.soLuong ?? vatTu?.tonKho ?? 1,
    warranty: {
      physical: getWarrantyText(vatTu?.thoiGianBaoHanh),
      performance: "",
    },
    power: getPowerValue(vatTu),
    size: formatThuocTinh(sizeDetail),
    weight: formatThuocTinh(weightDetail),
    price: getPriceValue(vatTu),
  };
};

export const extractBrandKey = (vatTu) => {
  const brand = vatTu?.thuongHieu;
  if (brand?.id != null) return `brand-${brand.id}`;
  const name = brand?.ten || brand?.tenQuocTe || "";
  return name.trim() ? `brand-${name.trim().toLowerCase()}` : "brand-unknown";
};

export const extractBrandName = (vatTu) => {
  const brand = vatTu?.thuongHieu;
  return brand?.ten || brand?.tenQuocTe || "Thương hiệu";
};

export const buildBrandGroups = (
  items = [],
  brandDescriptions = BRAND_DESCRIPTIONS
) => {
  const grouped = new Map();

  items.forEach((vatTu) => {
    const key = extractBrandKey(vatTu);
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key).push(vatTu);
  });

  const result = [];

  grouped.forEach((list, key) => {
    if (!list.length) return;
    const first = list[0];
    const brandName = extractBrandName(first);
    const apiDesc = (first?.thuongHieu?.moTa || "").trim();
    const fallbackDesc =
      brandDescriptions[key] || brandDescriptions[brandName] || "";
    const description =
      apiDesc || fallbackDesc || "Thông tin thương hiệu đang được cập nhật.";

    result.push({
      key,
      name: brandName,
      logo: first?.thuongHieu?.tepTin?.duongDan || "",
      description,
      products: list.map(mapVatTuToDevice),
    });
  });

  result.sort((a, b) =>
    a.name.localeCompare(b.name, "vi", { sensitivity: "base" })
  );

  return result;
};
