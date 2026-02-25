import { post } from "../../../services/apiService";

const resolveContent = (response) => {
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;

  return Array.isArray(content) ? content : [];
};

export const buildQuangCaoFilterPayload = ({
  viTri,
  page = 0,
  size = 20,
  sorts = [],
} = {}) => {
  const filters = [];

  if (viTri) {
    filters.push({
      fieldName: "viTri",
      operation: "EQUALS",
      value: viTri,
      logicType: "AND",
    });
  }

  return {
    filters,
    sorts,
    page,
    size,
  };
};

export const fetchQuangCaoByFilter = async (payload) => {
  const response = await post("basic-api/quang-cao/filter", payload);
  return resolveContent(response);
};

export const fetchQuangCaoByViTri = async ({
  viTri,
  page = 0,
  size = 20,
  sorts = [],
} = {}) => {
  if (!viTri) return [];
  const payload = buildQuangCaoFilterPayload({ viTri, page, size, sorts });
  return fetchQuangCaoByFilter(payload);
};

export const fetchQuangCaoImageUrlByViTri = async ({
  viTri,
  page = 0,
  size = 20,
} = {}) => {
  const items = await fetchQuangCaoByViTri({ viTri, page, size });
  const selected =
    items.find((item) => item?.hoatDong === true && item?.trangThai === 1) ??
    items.find((item) => item?.hoatDong === true) ??
    items[0];

  return selected?.tepTin?.duongDan ?? null;
};
