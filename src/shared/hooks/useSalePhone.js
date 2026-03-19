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

const resolvePhonePoolFromThongTinTenMiens = (thongTinTenMiens = []) => {
  if (!Array.isArray(thongTinTenMiens)) return [];

  const sortedEntries = [...thongTinTenMiens].sort((entryA, entryB) => {
    const createdAtA = Date.parse(entryA?.taoLuc ?? "");
    const createdAtB = Date.parse(entryB?.taoLuc ?? "");
    const hasCreatedAtA = Number.isFinite(createdAtA);
    const hasCreatedAtB = Number.isFinite(createdAtB);

    if (hasCreatedAtA && hasCreatedAtB && createdAtA !== createdAtB) {
      return createdAtA - createdAtB;
    }

    const idA = Number(entryA?.id);
    const idB = Number(entryB?.id);
    const hasIdA = Number.isFinite(idA);
    const hasIdB = Number.isFinite(idB);

    if (hasIdA && hasIdB && idA !== idB) {
      return idA - idB;
    }

    return 0;
  });

  const buildPhonePool = (entries = []) =>
    entries
      .map((item) => toTelPhone(item?.sdt))
      .filter(Boolean);

  const activeEntries = sortedEntries.filter((item) => {
    const hasPhone = Boolean(toTelPhone(item?.sdt));
    if (!hasPhone) return false;

    const trangThai = item?.trangThai;
    if (trangThai === undefined || trangThai === null) return true;

    return Number(trangThai) === 1;
  });

  const activePhonePool = buildPhonePool(activeEntries);
  if (activePhonePool.length > 0) return activePhonePool;

  return buildPhonePool(sortedEntries);
};

const resolveRotateIntervalMs = (intervalValue) => {
  const intervalMinutes = Number(intervalValue);
  if (!Number.isFinite(intervalMinutes) || intervalMinutes <= 0) return 0;

  return intervalMinutes * 60 * 1000;
};

const pickPhoneByRotatingInterval = (
  phonePool = [],
  intervalValue,
  nowTimestamp = Date.now()
) => {
  if (!Array.isArray(phonePool) || phonePool.length === 0) return "";
  if (phonePool.length === 1) return phonePool[0];

  const rotateIntervalMs = resolveRotateIntervalMs(intervalValue);
  if (!rotateIntervalMs) return phonePool[0];

  const timeBucket = Math.floor(nowTimestamp / rotateIntervalMs);
  const poolSize = phonePool.length;
  const phoneIndex = ((timeBucket % poolSize) + poolSize) % poolSize;

  return phonePool[phoneIndex];
};

const resolveSalePhoneConfigFromMien = (mien) => {
  const domainPhonePool = resolvePhonePoolFromThongTinTenMiens(
    mien?.thongTinTenMiens
  );
  const uniqueDomainPhonePool = Array.from(
    new Set(domainPhonePool.filter(Boolean))
  );
  if (uniqueDomainPhonePool.length > 0) {
    return {
      phonePool: uniqueDomainPhonePool,
      rotateIntervalMs: resolveRotateIntervalMs(mien?.thoiGianThayDoiHotline),
    };
  }

  const officePhone = toTelPhone(mien?.coSo?.sdt);
  if (!officePhone) return null;

  return {
    phonePool: [officePhone],
    rotateIntervalMs: 0,
  };
};

const resolveSalePhoneFromConfig = (salePhoneConfig, nowTimestamp = Date.now()) => {
  if (!salePhoneConfig) return "";
  return pickPhoneByRotatingInterval(
    salePhoneConfig.phonePool,
    salePhoneConfig.rotateIntervalMs ? salePhoneConfig.rotateIntervalMs / 60000 : 0,
    nowTimestamp
  );
};

const fetchSalePhoneConfigByDomain = async (domain) => {
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
        const salePhoneConfig = resolveSalePhoneConfigFromMien(mien);
        if (!salePhoneConfig) return null;

        const salePhone = resolveSalePhoneFromConfig(salePhoneConfig, Date.now());
        if (!salePhone) return null;

        return salePhoneConfig;
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
  const [salePhoneConfig, setSalePhoneConfig] = useState(() => {
    return salePhoneCache.get(getCurrentDomain()) ?? null;
  });
  const [salePhoneTel, setSalePhoneTel] = useState(() => {
    const cachedConfig = salePhoneCache.get(getCurrentDomain());
    const cachedPhone = resolveSalePhoneFromConfig(cachedConfig, Date.now());
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
        const resolvedConfig = await fetchSalePhoneConfigByDomain(domain);
        if (isActive) {
          setSalePhoneConfig(resolvedConfig);
          const resolvedPhone = resolveSalePhoneFromConfig(
            resolvedConfig,
            Date.now()
          );
          setSalePhoneTel(resolvedPhone || fallbackPhoneValue);
        }
      } catch (error) {
        console.error("Khong tai duoc so dien thoai sale theo ten mien", error);
        if (isActive) {
          setSalePhoneConfig(null);
          setSalePhoneTel(fallbackPhoneValue);
        }
      }
    };

    loadSalePhone();

    return () => {
      isActive = false;
    };
  }, [domain, fallbackPhoneValue]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rotateIntervalMs = Number(salePhoneConfig?.rotateIntervalMs) || 0;
    const phonePoolSize = Array.isArray(salePhoneConfig?.phonePool)
      ? salePhoneConfig.phonePool.length
      : 0;
    if (rotateIntervalMs <= 0 || phonePoolSize <= 1) {
      return undefined;
    }

    const syncSalePhone = () => {
      const nextPhone =
        resolveSalePhoneFromConfig(salePhoneConfig, Date.now()) || fallbackPhoneValue;
      setSalePhoneTel((previousPhone) =>
        previousPhone === nextPhone ? previousPhone : nextPhone
      );
    };

    const nowTimestamp = Date.now();
    const elapsedTime = nowTimestamp % rotateIntervalMs;
    const delayToNextTick =
      elapsedTime === 0 ? rotateIntervalMs : rotateIntervalMs - elapsedTime;

    let intervalId = null;
    const timeoutId = window.setTimeout(() => {
      syncSalePhone();
      intervalId = window.setInterval(syncSalePhone, rotateIntervalMs);
    }, delayToNextTick);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [salePhoneConfig, fallbackPhoneValue]);

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
