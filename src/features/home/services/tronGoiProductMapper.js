import productFallbackImage from "../../../assets/product.png";

const formatNumber = (value, maximumFractionDigits = 2) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "-";
  return new Intl.NumberFormat("vi-VN", { maximumFractionDigits }).format(
    numeric
  );
};

const formatCurrency = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "-";
  return `${formatNumber(numeric, 0)} đ`;
};

const formatProduction = (minValue, maxValue) => {
  const min = Number(minValue);
  const max = Number(maxValue);
  if (Number.isFinite(min) && Number.isFinite(max)) {
    return `${formatNumber(min, 0)}-${formatNumber(max, 0)} kWh/tháng`;
  }
  if (Number.isFinite(min)) {
    return `${formatNumber(min, 0)} kWh/tháng`;
  }
  if (Number.isFinite(max)) {
    return `${formatNumber(max, 0)} kWh/tháng`;
  }
  return "-";
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

const calcDienTichM2 = (items = []) => {
  if (!Array.isArray(items)) return null;
  const item = items.find(
    (entry) =>
      entry?.vatTu?.nhomVatTu?.ma === "TAM_PIN" &&
      entry?.vatTu?.duLieuRieng?.kich_thuoc?.giaTri
  );

  if (!item) return null;

  const raw = item?.vatTu?.duLieuRieng?.kich_thuoc?.giaTri?.toString();
  if (!raw) return null;

  const parts = raw.split(/[xX×]/).map((part) => part.trim());
  if (parts.length < 2) return null;

  const daiMm = Number(parts[0]);
  const rongMm = Number(parts[1]);
  if (!Number.isFinite(daiMm) || !Number.isFinite(rongMm)) return null;

  const areaOne = (daiMm * rongMm) / 1_000_000;
  const soLuong = Number(item?.soLuong ?? 1);
  const multiplier = Number.isFinite(soLuong) ? soLuong : 1;

  return areaOne * multiplier;
};

const formatArea = (value) => {
  if (!Number.isFinite(value)) return "--";
  return `${formatNumber(value, 1)} m²`;
};

const getBrandLabel = (brand) => {
  if (!brand) return "";
  const name = brand?.ten || brand?.tenQuocTe || "";
  return name || "";
};

const parseNumeric = (value) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return Number.NaN;
  const match = value.match(/-?\d+(?:[.,]\d+)?/);
  if (!match) return Number.NaN;
  return Number(match[0].replace(",", "."));
};

const parseValueAndUnitFromText = (value) => {
  if (typeof value !== "string") return null;
  const match = value.match(
    /(-?\d+(?:[.,]\d+)?)\s*(kwh|wh|kwp|kw|wp|w)\b/i
  );
  if (!match) return null;
  return {
    value: Number(match[1].replace(",", ".")),
    unit: match[2].toLowerCase(),
  };
};

const normalizeUnit = (unit) =>
  (unit || "").toString().toLowerCase().replace(/\s/g, "");

const toTargetUnit = (value, unit, targetUnit) => {
  const numeric = parseNumeric(value);
  if (!Number.isFinite(numeric)) return null;
  const normalizedUnit = normalizeUnit(unit);

  if (!normalizedUnit) {
    return numeric;
  }

  if (targetUnit === "kWp" || targetUnit === "kW") {
    if (normalizedUnit.includes("kw")) return numeric;
    if (normalizedUnit.includes("wp") || normalizedUnit === "w") {
      return numeric / 1000;
    }
    return numeric;
  }

  if (targetUnit === "kWh") {
    if (normalizedUnit.includes("kwh")) return numeric;
    if (normalizedUnit.includes("wh")) return numeric / 1000;
    if (normalizedUnit.includes("kw")) return numeric;
    return numeric;
  }

  return numeric;
};

const extractSpecValue = (vatTu, keywords = []) => {
  const duLieu = vatTu?.duLieuRieng;
  if (duLieu && typeof duLieu === "object") {
    const entries = Object.entries(duLieu);
    for (const [key, detail] of entries) {
      const keyText = `${key} ${detail?.ten ?? ""}`.toLowerCase();
      const matchesKeyword = keywords.some((keyword) =>
        keyText.includes(keyword)
      );
      if (!matchesKeyword) continue;

      const unit = detail?.donVi;
      const rawValue = detail?.giaTri;
      const parsed = parseValueAndUnitFromText(
        typeof rawValue === "string" ? rawValue : ""
      );

      return {
        value: parsed?.value ?? rawValue,
        unit: parsed?.unit ?? unit,
      };
    }
  }

  const fromName = parseValueAndUnitFromText(vatTu?.ten ?? "");
  if (fromName) {
    return { value: fromName.value, unit: fromName.unit };
  }

  return null;
};

const calcTotalByGroup = (vatTuTronGois = [], groupCode, config) => {
  if (!Array.isArray(vatTuTronGois) || !groupCode) return null;
  const { keywords = [], targetUnit } = config;
  let total = 0;
  let hasValue = false;

  vatTuTronGois.forEach((item) => {
    if (item?.vatTu?.nhomVatTu?.ma !== groupCode) return;
    const spec = extractSpecValue(item?.vatTu, keywords);
    if (!spec) return;

    const normalized = toTargetUnit(spec.value, spec.unit, targetUnit);
    if (!Number.isFinite(normalized)) return;

    const quantity = Number(item?.soLuong ?? 1);
    const multiplier = Number.isFinite(quantity) ? quantity : 1;
    total += normalized * multiplier;
    hasValue = true;
  });

  return hasValue ? total : null;
};

const formatWithUnit = (value, unit, maximumFractionDigits = 2) => {
  if (!Number.isFinite(value)) return "-";
  return `${formatNumber(value, maximumFractionDigits)} ${unit}`;
};

const formatCongSuatHeThong = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "-";
  if (numeric >= 1000) {
    return `${formatNumber(numeric / 1000)} kWp`;
  }
  return `${formatNumber(numeric)} kW`;
};

const GROUP_CONFIGS = {
  TAM_PIN: {
    targetUnit: "kWp",
    keywords: ["cong_suat", "công suất", "power", "kw", "wp"],
  },
  BIEN_TAN: {
    targetUnit: "kW",
    keywords: ["cong_suat", "công suất", "power", "kw"],
  },
  PIN_LUU_TRU: {
    targetUnit: "kWh",
    keywords: ["dung_luong", "dung lượng", "capacity", "kwh", "wh", "cong_suat"],
  },
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
  const value = detail?.giaTri ?? "--";
  const unit = detail?.donVi ?? "";
  return unit ? `${value} ${unit}` : `${value}`;
};

const getThuocTinhByKeys = (vatTu, keys = []) => {
  const duLieu = vatTu?.duLieuRieng;
  if (!duLieu || typeof duLieu !== "object") return null;

  for (const key of keys) {
    if (duLieu[key]) return duLieu[key];
  }

  const entries = Object.entries(duLieu);
  for (const [key, detail] of entries) {
    const keyText = `${key} ${detail?.ten ?? ""}`.toLowerCase();
    const match = keys.some((target) => keyText.includes(target));
    if (match) return detail;
  }

  return null;
};

const getPowerValue = (vatTu, groupCode) => {
  if (!vatTu) return "--";
  const config = GROUP_CONFIGS[groupCode];
  if (!config) return "--";
  const spec = extractSpecValue(vatTu, config.keywords);
  if (!spec) return "--";

  const normalized = toTargetUnit(spec.value, spec.unit, config.targetUnit);
  if (!Number.isFinite(normalized)) return "--";
  return formatWithUnit(normalized, config.targetUnit);
};

const getWarrantyText = (value) => {
  if (!Number.isFinite(Number(value))) return "--";
  return convertMonthToYearAndMonth(Number(value));
};

export const mapTronGoiToProduct = (tronGoi) => ({
  id: tronGoi.id,
  title: tronGoi.ten || "Hệ thống Hy-Brid",
  image: tronGoi?.tepTin?.duongDan || productFallbackImage,
  save: tronGoi?.nhomTronGoi?.ten || tronGoi?.moTa || "",
  price: formatCurrency(tronGoi?.tongGia),
  pvLabel: getBrandLabel(tronGoi?.nhomTronGoi?.thuongHieuTamPin),
  pv: (() => {
    const total = calcTotalByGroup(
      tronGoi?.vatTuTronGois,
      "TAM_PIN",
      GROUP_CONFIGS.TAM_PIN
    );
    if (Number.isFinite(total)) {
      return formatWithUnit(total, GROUP_CONFIGS.TAM_PIN.targetUnit);
    }
    return formatCongSuatHeThong(tronGoi?.congSuatHeThong);
  })(),
  inverterLabel: getBrandLabel(tronGoi?.nhomTronGoi?.thuongHieuInverter),
  inverter: (() => {
    const total = calcTotalByGroup(
      tronGoi?.vatTuTronGois,
      "BIEN_TAN",
      GROUP_CONFIGS.BIEN_TAN
    );
    if (Number.isFinite(total)) {
      return formatWithUnit(total, GROUP_CONFIGS.BIEN_TAN.targetUnit);
    }
    return "-";
  })(),
  batteryLabel: getBrandLabel(tronGoi?.nhomTronGoi?.thuongHieuPinLuuTru),
  battery: (() => {
    const total = calcTotalByGroup(
      tronGoi?.vatTuTronGois,
      "PIN_LUU_TRU",
      GROUP_CONFIGS.PIN_LUU_TRU
    );
    if (Number.isFinite(total)) {
      return formatWithUnit(total, GROUP_CONFIGS.PIN_LUU_TRU.targetUnit);
    }
    return "-";
  })(),
  production: formatProduction(
    tronGoi?.sanLuongToiThieu,
    tronGoi?.sanLuongToiDa
  ),
  roi: (() => {
    const min = Number(tronGoi?.sanLuongToiThieu);
    const max = Number(tronGoi?.sanLuongToiDa);
    const tongGia = Number(tronGoi?.tongGia);

    if (
      !Number.isFinite(min) ||
      !Number.isFinite(max) ||
      !Number.isFinite(tongGia)
    ) {
      return "--";
    }

    const sanLuongTB = min / 2 + max / 2;
    if (!Number.isFinite(sanLuongTB) || sanLuongTB <= 0) return "--";

    const soThangHoanVon = tongGia / sanLuongTB / 3000.0;
    return convertMonthToYearAndMonth(soThangHoanVon);
  })(),
  area: formatArea(calcDienTichM2(tronGoi?.vatTuTronGois)),
});

export const mapTronGoiDeviceProducts = (tronGoi) => {
  const items = tronGoi?.vatTuTronGois ?? [];
  return items
    .filter((item) => item?.vatTu?.nhomVatTu?.vatTuChinh === true)
    .filter((item) => item?.duocXem !== false)
    .map((item) => {
      const vatTu = item?.vatTu ?? {};
      const warrantyValue = item?.thoiGianBaoHanh ?? vatTu?.thoiGianBaoHanh;
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

      const groupCode = vatTu?.nhomVatTu?.ma;

      return {
        id: vatTu?.id ?? item?.id,
        groupCode,
        name: vatTu?.ten || vatTu?.ma || "--",
        image: getVatTuImage(vatTu),
        quantity: item?.soLuong ?? 0,
        warranty: {
          physical: getWarrantyText(warrantyValue),
          performance: "",
        },
        power: getPowerValue(vatTu, groupCode),
        size: sizeDetail ? formatThuocTinh(sizeDetail) : "--",
        weight: weightDetail ? formatThuocTinh(weightDetail) : "--",
        price: formatCurrency(item?.gia),
      };
    });
};

export const mapTronGoiOtherMaterials = (tronGoi) => {
  const items = tronGoi?.vatTuTronGois ?? [];
  return items.map((item) => {
      const vatTu = item?.vatTu ?? {};
    const nhomVatTu = vatTu?.nhomVatTu;
    const rawGroupCode = nhomVatTu?.ma;
    const groupCode = rawGroupCode === "HE_TU_DIEN" ? "TU_DIEN" : rawGroupCode;
      const brand = vatTu?.thuongHieu;
      const brandItem = brand
        ? {
            id: brand?.id ?? brand?.ten,
            logo: brand?.tepTin?.duongDan,
            name: brand?.ten ?? brand?.tenQuocTe,
          }
        : null;

      return {
        id: item?.id ?? vatTu?.id,
        groupCode,
        groupName: nhomVatTu?.ten,
        name: vatTu?.ten || vatTu?.ma || "--",
        isPrimary: vatTu?.vatTuChinh ?? nhomVatTu?.vatTuChinh ?? false,
        warranty: getWarrantyText(
          item?.thoiGianBaoHanh ?? vatTu?.thoiGianBaoHanh
        ),
        quantity: item?.soLuong ?? 0,
        brands: brandItem ? [brandItem] : [],
      };
    });
};
