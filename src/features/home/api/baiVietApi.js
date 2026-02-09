import { post } from "../../../services/apiService";

const toNumber = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const normalizePagedResponse = (response) => {
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;
  const totalElements = toNumber(
    resolved?.totalElements ?? resolved?.data?.totalElements
  );
  const totalPages = toNumber(resolved?.totalPages ?? resolved?.data?.totalPages);
  const size = toNumber(resolved?.size ?? resolved?.data?.size);
  const number = toNumber(resolved?.number ?? resolved?.data?.number);

  return {
    content: Array.isArray(content) ? content : [],
    totalElements,
    totalPages,
    size,
    number,
  };
};

export const buildBaiVietFilterPayload = ({
  loaiBaiViet,
  page = 0,
  size = 3,
  sortField = "taoLuc",
  sortDirection = "DESC",
} = {}) => {
  const filters = [];

  if (loaiBaiViet) {
    filters.push({
      fieldName: "loaiBaiViet",
      operation: "EQUALS",
      value: loaiBaiViet,
      logicType: "AND",
    });
  }

  return {
    filters,
    sorts: [
      {
        fieldName: sortField,
        direction: sortDirection,
      },
    ],
    page,
    size,
  };
};

export const fetchBaiVietByLoai = async ({
  loaiBaiViet,
  page = 0,
  size = 3,
  sortField,
  sortDirection,
} = {}) => {
  if (!loaiBaiViet) return [];
  const payload = buildBaiVietFilterPayload({
    loaiBaiViet,
    page,
    size,
    sortField,
    sortDirection,
  });
  const response = await post("basic-api/bai-viet/filter", payload);
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;

  return Array.isArray(content) ? content : [];
};

export const fetchMegaStory = ({ page = 0, size = 10 } = {}) =>
  fetchBaiVietByLoai({ loaiBaiViet: "MEGA_STORY", page, size });

export const fetchHoiDap = ({ page = 0, size = 100 } = {}) =>
  fetchBaiVietByLoai({ loaiBaiViet: "HOI_DAP", page, size });

export const fetchBaiVietPage = async ({
  loaiBaiViet,
  page = 0,
  size = 3,
  sortField,
  sortDirection,
} = {}) => {
  if (!loaiBaiViet) {
    return {
      content: [],
      totalElements: null,
      totalPages: 1,
      size,
      number: page,
    };
  }

  const payload = buildBaiVietFilterPayload({
    loaiBaiViet,
    page,
    size,
    sortField,
    sortDirection,
  });
  const response = await post("basic-api/bai-viet/filter", payload);
  return normalizePagedResponse(response);
};

export const fetchMegaStoryPage = ({ page = 0, size = 12 } = {}) =>
  fetchBaiVietPage({ loaiBaiViet: "MEGA_STORY", page, size });

export const fetchBaiVietById = async (id) => {
  if (!id) return null;
  const payload = {
    filters: [
      {
        fieldName: "id",
        operation: "EQUALS",
        value: Number(id),
        logicType: "AND",
      },
    ],
    page: 0,
    size: 1,
  };

  const response = await post("basic-api/bai-viet/filter", payload);
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;

  if (Array.isArray(content)) return content[0] ?? null;
  if (content && typeof content === "object") return content;
  return null;
};
