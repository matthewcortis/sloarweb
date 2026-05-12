const hasValue = (value) => {
  if (value == null) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
};

const pickPriceCandidate = (source) => {
  if (!source || typeof source !== "object") return null;

  const candidate =
    source.giaBan ??
    source.giaNhap ??
    source.giaBanRaw ??
    source.giaNhapRaw ??
    source.gia ??
    source.giaNiemYet;

  return hasValue(candidate) ? candidate : null;
};

const toTimestamp = (value) => {
  const timestamp = Date.parse(`${value ?? ""}`);
  return Number.isFinite(timestamp) ? timestamp : Number.NEGATIVE_INFINITY;
};

export const getLatestPriceFromThongTinGias = (
  thongTinGias,
  preferredBaseCode
) => {
  const list = Array.isArray(thongTinGias) ? thongTinGias : [];
  if (!list.length) return null;

  const activeItems = list.filter((item) => Number(item?.trangThai) === 1);
  const candidates = activeItems.length ? activeItems : list;
  const sorted = [...candidates].sort((a, b) => {
    const diff = toTimestamp(b?.taoLuc) - toTimestamp(a?.taoLuc);
    if (diff !== 0) return diff;
    return Number(b?.id ?? 0) - Number(a?.id ?? 0);
  });

  const normalizedBaseCode = `${preferredBaseCode ?? ""}`
    .trim()
    .toUpperCase();

  for (const info of sorted) {
    const dsGia = Array.isArray(info?.dsGia) ? info.dsGia : [];

    if (dsGia.length && normalizedBaseCode) {
      const matchedByBase = dsGia.find(
        (item) =>
          `${item?.maCoSo ?? item?.coSoMa ?? ""}`.trim().toUpperCase() ===
          normalizedBaseCode
      );
      const matchedPrice = pickPriceCandidate(matchedByBase);
      if (hasValue(matchedPrice)) return matchedPrice;
    }

    for (const priceItem of dsGia) {
      const candidate = pickPriceCandidate(priceItem);
      if (hasValue(candidate)) return candidate;
    }

    const directPrice = pickPriceCandidate(info);
    if (hasValue(directPrice)) return directPrice;
  }

  return null;
};

export const formatCurrencyVnd = (value, fallback = "--") => {
  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return `${new Intl.NumberFormat("vi-VN", {
      maximumFractionDigits: 0,
    }).format(numeric)} đ`;
  }

  if (typeof value === "string" && value.trim()) return value;
  return fallback;
};
