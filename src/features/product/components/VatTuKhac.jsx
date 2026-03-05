import huawei from "../../../assets/icons/huawei.png";
const defaultItems = [
  {
    id: 1,
    name: "Hệ khung giá đỡ nhôm chất liệu A6005-T6 cao cấp",
    warranty: "5 năm",
    quantity: 1,
    brands: [{ id: "risen-1", logo: huawei }, { id: "risen-2", name: "risen" }],
  },
  {
    id: 2,
    name: "Hệ dây điện kết nối hệ thống",
    warranty: "5 năm",
    quantity: 1,
    brands: [{ id: "risen-3", logo: huawei }, { id: "risen-4", name: "risen" }],
  },
  {
    id: 3,
    name: "Hệ tiếp địa",
    warranty: "5 năm",
    quantity: 1,
    brands: [{ id: "risen-5", logo: huawei }, { id: "risen-6", name: "risen" }],
  },
  {
    id: 4,
    name: "Trọn gói vật tư phụ lắp đặt",
    warranty: "5 năm",
    quantity: 1,
    brands: [{ id: "risen-7", logo: huawei }, { id: "risen-8", name: "risen" }],
  },
  {
    id: 5,
    name: "Trọn gói nhân công lắp đặt",
    warranty: "5 năm",
    quantity: 1,
    brands: [{ id: "risen-9", logo: huawei }, { id: "risen-10", name: "risen" }],
  },
];

const GROUP_ORDER = [
  "TAM_PIN",
  "BIEN_TAN",
  "PIN_LUU_TRU",
  "HE_KHUNG_NHOM",
  "HE_DAY_DIEN",
  "TU_DIEN",
  "HE_TIEP_DIA",
];

const REQUIRED_GROUPS = ["TAM_PIN", "BIEN_TAN", "PIN_LUU_TRU"];

const GROUP_LABELS = {
  TAM_PIN: "Tấm pin",
  BIEN_TAN: "Biến tần",
  PIN_LUU_TRU: "Pin lưu trữ",
  HE_KHUNG_NHOM: "Hệ khung nhôm",
  HE_DAY_DIEN: "Hệ dây điện",
  TU_DIEN: "Tủ điện",
  HE_TIEP_DIA: "Hệ tiếp địa",
  OTHER: "Khác",
};

const getGroupCode = (item, fallbackGroupKey = "OTHER") => {
  const rawGroupCode = item?.groupCode ?? item?.vatTu?.nhomVatTu?.ma;
  if (!rawGroupCode) return fallbackGroupKey;
  return rawGroupCode === "HE_TU_DIEN" ? "TU_DIEN" : rawGroupCode;
};

const getItemName = (item) =>
  item?.name || item?.vatTu?.ten || item?.vatTu?.ma || "";

const isPrimaryItem = (item) => {
  if (typeof item?.isPrimary === "boolean") return item.isPrimary;
  return item?.vatTu?.nhomVatTu?.vatTuChinh === true;
};

const getWarrantyValue = (item) => {
  const rawWarranty =
    item?.warranty ?? item?.thoiGianBaoHanh ?? item?.vatTu?.thoiGianBaoHanh;
  if (!rawWarranty) return "--";
  if (typeof rawWarranty === "object") {
    return rawWarranty?.physical || rawWarranty?.performance || "--";
  }
  return rawWarranty;
};

const parseWarrantyMonths = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const match = value.match(/-?\d+(?:[.,]\d+)?/);
    if (!match) return null;
    const parsed = Number(match[0].replace(",", "."));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const formatYearsFromMonths = (months) => {
  if (!Number.isFinite(months) || months <= 0) return "--";
  const years = months / 12;
  const normalizedYears = Number.isInteger(years)
    ? years.toString()
    : Number(years.toFixed(1)).toLocaleString("vi-VN", {
        maximumFractionDigits: 1,
      });
  return `${normalizedYears} năm`;
};

const getPrimaryWarranty = (groupItems) => {
  if (!groupItems?.length) return "--";
  const foundItem =
    groupItems.find((item) =>
      Number.isFinite(
        parseWarrantyMonths(item?.thoiGianBaoHanh ?? item?.vatTu?.thoiGianBaoHanh)
      )
    ) ?? groupItems[0];
  const months = parseWarrantyMonths(
    foundItem?.thoiGianBaoHanh ?? foundItem?.vatTu?.thoiGianBaoHanh
  );
  return formatYearsFromMonths(months);
};

const getFirstWarranty = (groupItems) => {
  if (!groupItems?.length) return "--";
  const found = groupItems.find(
    (item) => getWarrantyValue(item) !== "--"
  );
  return getWarrantyValue(found || groupItems[0]);
};

const getTotalQuantity = (groupItems) => {
  if (!groupItems?.length) return 0;
  return groupItems.reduce((total, item) => {
    const value = Number(item?.quantity ?? item?.soLuong ?? 0);
    return total + (Number.isFinite(value) ? value : 0);
  }, 0);
};

const getPrimaryName = (groupItems) => {
  if (!groupItems?.length) return "";
  const foundPrimary = groupItems.find(
    (item) => isPrimaryItem(item) && getItemName(item) && getItemName(item) !== "--"
  );
  if (foundPrimary) return getItemName(foundPrimary);

  const found = groupItems.find(
    (item) => getItemName(item) && getItemName(item) !== "--"
  );
  return getItemName(found || groupItems[0]);
};

function BrandBadge({ brand }) {
  if (!brand?.logo) return null;

  return (
    <span
      className="inline-flex h-[25px] items-center gap-[10px] rounded-[6px] border border-[#E1E3E6] px-[8px] text-[16px] text-[#2A2A2A]"
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-[14px] w-auto max-w-[48px] object-contain"
      />
    </span>
  );
}

export default function VatTuKhac({
  title = "Bản kê chi tiết vật tư",
  badgeText,
  items = defaultItems,
  mainDevices = [],
}) {
  const fallbackGroupKey = "OTHER";
  const summaryRows = GROUP_ORDER.map((groupKey) => {
    const isRequiredGroup = REQUIRED_GROUPS.includes(groupKey);
    const sourceItems = isRequiredGroup ? mainDevices : items;
    const groupItems = sourceItems.filter(
      (item) => getGroupCode(item, fallbackGroupKey) === groupKey
    );
    if (groupItems.length === 0 && !isRequiredGroup) {
      return null;
    }

    const firstItem = groupItems[0];
    const groupLabel =
      firstItem?.groupName ||
      firstItem?.vatTu?.nhomVatTu?.ten ||
      GROUP_LABELS[groupKey] ||
      groupKey;
    const primaryName = isRequiredGroup ? getPrimaryName(groupItems) : "";

    return {
      key: groupKey,
      label: primaryName || groupLabel,
      warranty: isRequiredGroup
        ? getPrimaryWarranty(groupItems)
        : getFirstWarranty(groupItems),
      quantity: isRequiredGroup ? getTotalQuantity(groupItems) : 1,
    };
  }).filter(Boolean);

  const resolvedBadge = badgeText ?? `${summaryRows.length} hệ`;

  return (
    <section className="w-full">
      <div className="flex items-center gap-4">
        <h2 className="typo-section-title text-[#111111]">
          {title}
        </h2>
        <span
          className="h-[32px] min-w-[100px] px-[10px] inline-flex items-center justify-center rounded-[6px] bg-[#F1F1F2] text-[16px] font-medium text-[#2A2A2A]"
        >
          {resolvedBadge}
        </span>
      </div>

      <div className="mt-6 -mx-4 w-[calc(100%+32px)] overflow-hidden rounded-none border border-[#ECEEF0] lg:mx-0 lg:w-full lg:rounded-[12px]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] md:grid-cols-[minmax(0,1fr)_271px_67px] gap-4 md:gap-0 bg-[#F6F6F6] px-[16px] py-[10px] text-[16px] text-[#6B7280]">
          <span className="text-left">Tên hệ</span>
          <span className="text-left md:text-center">Bảo hành</span>
          <span className="text-right md:text-center">Số lượng</span>
        </div>

        <div className="w-full">
          {summaryRows.map((row) => (
            <div
              key={row.key}
              className="grid items-center grid-cols-[minmax(0,1fr)_auto_auto] md:grid-cols-[minmax(0,1fr)_271px_67px] gap-4 md:gap-0 border-b border-[#ECEEF0] px-[16px] py-[12px] md:h-[72px] last:border-b-0"
            >
              <div className="flex min-h-[27px] items-center">
                <p className="typo-body leading-none text-[#1F2933]">
                  {row.label}
                </p>
              </div>

              <div className="flex min-h-[27px] items-center text-[16px] text-[#1F2933] md:justify-center md:w-[271px]">
                {row.warranty}
              </div>

              <div className="flex min-h-[27px] items-center justify-end md:justify-center">
                <span className="inline-flex h-[27px] w-[67px] items-center justify-center rounded-[6px] bg-[#E6E7E9] text-[16px] font-medium text-[#2A2A2A]">
                  {row.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
