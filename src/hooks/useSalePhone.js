import { useEffect, useMemo, useState } from "react";
import { fetchMienByTenMien } from "../services/mienApi";

const DEFAULT_SALE_PHONE = "0964920242";

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

const normalizeDomain = (domain = "") => {
  const trimmedDomain = `${domain}`.trim();
  if (!trimmedDomain) return "";

  let candidateDomain = trimmedDomain;
  if (!/^https?:\/\//i.test(candidateDomain)) {
    candidateDomain = `https://${candidateDomain}`;
  }

  try {
    const parsedUrl = new URL(candidateDomain);
    parsedUrl.hash = "";
    parsedUrl.search = "";
    parsedUrl.pathname = "/";
    return parsedUrl.toString();
  } catch {
    return "";
  }
};

const buildDomainCandidates = (domain = "") => {
  const normalizedDomain = normalizeDomain(domain);
  if (!normalizedDomain) return [];

  const candidates = new Set([normalizedDomain]);

  try {
    const parsedUrl = new URL(normalizedDomain);
    const normalizedHost = parsedUrl.hostname.toLowerCase();

    if (normalizedHost.includes(".")) {
      if (normalizedHost.startsWith("www.")) {
        parsedUrl.hostname = normalizedHost.replace(/^www\./, "");
      } else {
        parsedUrl.hostname = `www.${normalizedHost}`;
      }
      candidates.add(parsedUrl.toString());
    }
  } catch {
    // no-op
  }

  return Array.from(candidates);
};

const getCurrentDomain = () => {
  if (typeof window === "undefined") return "";
  return normalizeDomain(window.location.origin);
};

const fetchSalePhoneByDomain = async (domain) => {
  const normalizedDomain = normalizeDomain(domain);
  if (!normalizedDomain) {
    throw new Error("Khong xac dinh duoc ten mien hien tai");
  }

  if (salePhoneCache.has(normalizedDomain)) {
    return salePhoneCache.get(normalizedDomain);
  }

  if (salePhoneRequestCache.has(normalizedDomain)) {
    return salePhoneRequestCache.get(normalizedDomain);
  }

  const request = (async () => {
    const domainCandidates = buildDomainCandidates(normalizedDomain);

    for (const domainCandidate of domainCandidates) {
      const mien = await fetchMienByTenMien({
        tenMien: domainCandidate,
        page: 0,
        size: 6,
      });
      const salePhone = `${mien?.coSo?.sdt ?? ""}`.trim();
      const normalizedPhone = toTelPhone(salePhone);

      if (normalizedPhone) {
        salePhoneCache.set(normalizedDomain, normalizedPhone);
        return normalizedPhone;
      }
    }

    throw new Error(`Ten mien ${normalizedDomain} khong co so dien thoai`);
  })().finally(() => {
    salePhoneRequestCache.delete(normalizedDomain);
  });

  salePhoneRequestCache.set(normalizedDomain, request);
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
