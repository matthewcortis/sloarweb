const normalizeNhomTronGoiTen = (value) =>
  typeof value === "string" ? value.trim() : "";

export const getNhomTronGoiTenFromProducts = (products = []) => {
  const source = Array.isArray(products) ? products : [];

  return (
    source
      .map((product) => normalizeNhomTronGoiTen(product?.nhomTronGoiTen))
      .find(Boolean) || undefined
  );
};

export const filterProductsByNhomTronGoiTen = (
  products = [],
  nhomTronGoiTen
) => {
  const source = Array.isArray(products) ? products : [];
  const normalizedNhomTronGoiTen = normalizeNhomTronGoiTen(nhomTronGoiTen);

  if (!normalizedNhomTronGoiTen) return source;

  return source.filter(
    (product) =>
      normalizeNhomTronGoiTen(product?.nhomTronGoiTen) ===
      normalizedNhomTronGoiTen
  );
};
