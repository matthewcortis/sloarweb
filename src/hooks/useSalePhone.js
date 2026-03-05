import { useEffect, useMemo, useState } from "react";
import { fetchCoSoByMa } from "../services/coSoApi";

const DEFAULT_LOCATION = "HN";
const VALID_LOCATIONS = new Set(["HN", "HCM"]);
const DEFAULT_SALE_PHONE = "0964920242";

const salePhoneCache = new Map();
const salePhoneRequestCache = new Map();

const normalizeLocation = (location) =>
  VALID_LOCATIONS.has(location) ? location : DEFAULT_LOCATION;

const getStoredLocation = () => {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  const storedLocation = window.localStorage.getItem("solarmax-location");
  return normalizeLocation(storedLocation);
};

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

const fetchSalePhoneByLocation = async (location) => {
  const normalizedLocation = normalizeLocation(location);

  if (salePhoneCache.has(normalizedLocation)) {
    return salePhoneCache.get(normalizedLocation);
  }

  if (salePhoneRequestCache.has(normalizedLocation)) {
    return salePhoneRequestCache.get(normalizedLocation);
  }

  const request = fetchCoSoByMa(normalizedLocation)
    .then((coSo) => {
      const salePhone = `${coSo?.sdt ?? ""}`.trim();
      if (!salePhone) {
        throw new Error(`Co so ${normalizedLocation} khong co so dien thoai`);
      }

      const normalizedPhone = toTelPhone(salePhone);
      salePhoneCache.set(normalizedLocation, normalizedPhone);
      salePhoneRequestCache.delete(normalizedLocation);
      return normalizedPhone;
    })
    .catch((error) => {
      salePhoneRequestCache.delete(normalizedLocation);
      throw error;
    });

  salePhoneRequestCache.set(normalizedLocation, request);
  return request;
};

export const useSalePhone = ({ fallbackPhone } = {}) => {
  const [location, setLocation] = useState(getStoredLocation);
  const fallbackPhoneValue = useMemo(
    () => resolveFallbackPhone(fallbackPhone),
    [fallbackPhone]
  );
  const [salePhoneTel, setSalePhoneTel] = useState(() => {
    const cachedPhone = salePhoneCache.get(getStoredLocation());
    return cachedPhone || fallbackPhoneValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleLocationChange = () => {
      setLocation(getStoredLocation());
    };

    window.addEventListener("storage", handleLocationChange);
    window.addEventListener("solarmax-location-change", handleLocationChange);

    return () => {
      window.removeEventListener("storage", handleLocationChange);
      window.removeEventListener("solarmax-location-change", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadSalePhone = async () => {
      try {
        const resolvedPhone = await fetchSalePhoneByLocation(location);
        if (isActive) {
          setSalePhoneTel(resolvedPhone || fallbackPhoneValue);
        }
      } catch (error) {
        console.error("Khong tai duoc so dien thoai sale theo co so", error);
        if (isActive) {
          setSalePhoneTel(fallbackPhoneValue);
        }
      }
    };

    loadSalePhone();

    return () => {
      isActive = false;
    };
  }, [location, fallbackPhoneValue]);

  const salePhoneLabel = useMemo(
    () => toPhoneLabel(salePhoneTel),
    [salePhoneTel]
  );

  return {
    location,
    salePhoneTel,
    salePhoneLabel,
  };
};

