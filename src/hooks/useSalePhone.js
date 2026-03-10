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

const normalizeHost = (domain = "") => {
  const trimmedDomain = `${domain}`.trim();
  if (!trimmedDomain) return "";

  let candidateDomain = trimmedDomain;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(candidateDomain)) {
    candidateDomain = `https://${candidateDomain}`;
  }

  try {
    const parsedUrl = new URL(candidateDomain);
    return parsedUrl.hostname.toLowerCase().replace(/\.$/, "");
  } catch {
    return "";
  }
};

const buildHostVariants = (host = "") => {
  if (!host) return [];

  const variants = new Set([host]);
  if (host.includes(".")) {
    if (host.startsWith("www.")) {
      variants.add(host.replace(/^www\./, ""));
    } else {
      variants.add(`www.${host}`);
    }
  }

  return Array.from(variants);
};

const buildDomainCandidates = (domain = "") => {
  const host = normalizeHost(domain);
  if (!host) return [];

  const hostVariants = buildHostVariants(host);
  const candidates = new Set();

  hostVariants.forEach((hostVariant) => {
    candidates.add(hostVariant);
    candidates.add(`${hostVariant}/`);
    candidates.add(`https://${hostVariant}`);
    candidates.add(`https://${hostVariant}/`);
    candidates.add(`http://${hostVariant}`);
    candidates.add(`http://${hostVariant}/`);
  });

  return Array.from(candidates);
};

const getCurrentDomain = () => {
  if (typeof window === "undefined") return "";
  return normalizeHost(window.location.hostname || window.location.origin);
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
    const domainCandidates = buildDomainCandidates(normalizedHost);

    for (const domainCandidate of domainCandidates) {
      const mien = await fetchMienByTenMien({
        tenMien: domainCandidate,
        page: 0,
        size: 6,
      });
      const salePhone = `${mien?.coSo?.sdt ?? ""}`.trim();
      const normalizedPhone = toTelPhone(salePhone);

      if (normalizedPhone) {
        salePhoneCache.set(normalizedHost, normalizedPhone);
        return normalizedPhone;
      }
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
