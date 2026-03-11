import { useEffect, useMemo, useState } from "react";
import { fetchMienByTenMien } from "../../services/mienApi";
import {
  getCurrentDomain,
  normalizeHost,
  resolveByDomainCandidates,
} from "../utils/domain";

const DEFAULT_SALE_PHONE = "0976666905";

const salePhoneCache = new Map();
const salePhoneRequestCache = new Map();

const toTelPhone = (phone = "") => {
  const trimmed = `${phone}`.trim();
  if (!trimmed) return "";

  const hasLeadingPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return "";

  return hasLeadingPlus ? `+${digits}` : digits;
};

const toPhoneLabel = (phone = "") => {
  const telPhone = toTelPhone(phone);
  const digits = telPhone.replace(/^\+/, "");

  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return `${phone}`.trim();
};

const resolveFallbackPhone = (fallbackPhone) =>
  toTelPhone(fallbackPhone) || DEFAULT_SALE_PHONE;

const pickPhoneFromThongTinTenMiens = (thongTinTenMiens = []) => {
  if (!Array.isArray(thongTinTenMiens)) return "";

  const activeEntry = thongTinTenMiens.find((item) => {
    const hasPhone = Boolean(toTelPhone(item?.sdt));
    if (!hasPhone) return false;

    const trangThai = item?.trangThai;
    if (trangThai === undefined || trangThai === null) return true;

    return Number(trangThai) === 1;
  });

  if (activeEntry?.sdt) {
    return `${activeEntry.sdt}`.trim();
  }

  const fallbackEntry = thongTinTenMiens.find((item) => Boolean(toTelPhone(item?.sdt)));
  return `${fallbackEntry?.sdt ?? ""}`.trim();
};

const resolveSalePhoneFromMien = (mien) => {
  const domainInfoPhone = pickPhoneFromThongTinTenMiens(mien?.thongTinTenMiens);
  if (domainInfoPhone) return domainInfoPhone;

  return `${mien?.coSo?.sdt ?? ""}`.trim();
};

const fetchSalePhoneByDomain = async (domain) => {
  const normalizedHost = normalizeHost(domain);
  if (!normalizedHost) {
    throw new Error("Khong xac dinh duoc ten mien hien tai");
  }

  if (salePhoneCache.has(normalizedHost)) {
    return salePhoneCache.get(normalizedHost);
  }

  if (salePhoneRequestCache.has(normalizedHost)) {
    return salePhoneRequestCache.get(normalizedHost);
  }

  const request = (async () => {
    const resolvedPhone = await resolveByDomainCandidates(
      normalizedHost,
      async (domainCandidate) => {
        const mien = await fetchMienByTenMien({
          tenMien: domainCandidate,
          page: 0,
          size: 6,
        });
        const salePhone = resolveSalePhoneFromMien(mien);
        return toTelPhone(salePhone);
      }
    );

    if (resolvedPhone) {
      salePhoneCache.set(normalizedHost, resolvedPhone);
      return resolvedPhone;
    }

    throw new Error(`Ten mien ${normalizedHost} khong co so dien thoai`);
  })().finally(() => {
    salePhoneRequestCache.delete(normalizedHost);
  });

  salePhoneRequestCache.set(normalizedHost, request);
  return request;
};

export const useSalePhone = ({ fallbackPhone } = {}) => {
  const fallbackPhoneValue = useMemo(
    () => resolveFallbackPhone(fallbackPhone),
    [fallbackPhone]
  );
  const domain = useMemo(() => getCurrentDomain(), []);
  const [salePhoneTel, setSalePhoneTel] = useState(() => {
    const cachedPhone = salePhoneCache.get(getCurrentDomain());
    return cachedPhone || fallbackPhoneValue;
  });

  useEffect(() => {
    let isActive = true;

    const loadSalePhone = async () => {
      if (!domain) {
        if (isActive) {
          setSalePhoneTel(fallbackPhoneValue);
        }
        return;
      }

      try {
        const resolvedPhone = await fetchSalePhoneByDomain(domain);
        if (isActive) {
          setSalePhoneTel(resolvedPhone || fallbackPhoneValue);
        }
      } catch (error) {
        console.error("Khong tai duoc so dien thoai sale theo ten mien", error);
        if (isActive) {
          setSalePhoneTel(fallbackPhoneValue);
        }
      }
    };

    loadSalePhone();

    return () => {
      isActive = false;
    };
  }, [domain, fallbackPhoneValue]);

  const salePhoneLabel = useMemo(
    () => toPhoneLabel(salePhoneTel),
    [salePhoneTel]
  );

  return {
    domain,
    salePhoneTel,
    salePhoneLabel,
  };
};
