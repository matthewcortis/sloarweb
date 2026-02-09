import { useEffect, useState } from "react";
import { mapTronGoi } from "../../../services/mappers/tron-goi.mapper";
import {
  buildTronGoiFilterPayload,
  fetchTronGoiByFilter,
} from "../api/tronGoiApi";
import { mapTronGoiToProduct } from "../services/tronGoiProductMapper";

const DEFAULT_LOCATION = "HN";
const VALID_LOCATIONS = new Set(["HN", "HCM"]);

const getStoredLocation = () => {
  if (typeof window === "undefined") return DEFAULT_LOCATION;
  const storedLocation = window.localStorage.getItem("solarmax-location");
  return VALID_LOCATIONS.has(storedLocation) ? storedLocation : DEFAULT_LOCATION;
};

export const useTronGoiProducts = ({
  loaiHeThong,
  loaiPha,
  banChay,
  nhomTronGoiTen,
  nhomTronGoiTenOperation,
  page = 0,
  size = 20,
  sortField,
  sortDirection,
} = {}) => {
  const [location, setLocation] = useState(getStoredLocation);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleLocationChange = () => {
      setLocation(getStoredLocation());
    };

    window.addEventListener("storage", handleLocationChange);
    window.addEventListener("solarmax-location-change", handleLocationChange);

    return () => {
      window.removeEventListener("storage", handleLocationChange);
      window.removeEventListener(
        "solarmax-location-change",
        handleLocationChange
      );
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload = buildTronGoiFilterPayload({
          location,
          loaiHeThong,
          loaiPha,
          banChay,
          nhomTronGoiTen,
          nhomTronGoiTenOperation,
          page,
          size,
          sortField,
          sortDirection,
        });
        const response = await fetchTronGoiByFilter(payload);
        const content = response?.content ?? [];
        const mapped = content.map(mapTronGoi).map(mapTronGoiToProduct);

        if (isMounted) {
          setProducts(mapped);
        }
      } catch (fetchError) {
        console.error("Failed to load tron-goi products", fetchError);
        if (isMounted) {
          setProducts([]);
          setError(fetchError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (location) {
      fetchProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [
    location,
    loaiHeThong,
    loaiPha,
    banChay,
    nhomTronGoiTen,
    nhomTronGoiTenOperation,
    page,
    size,
    sortField,
    sortDirection,
  ]);

  return {
    products,
    loading,
    error,
    location,
  };
};
