import { post } from "./apiService";

export const buildMienFilterPayload = ({ tenMien, page = 0, size = 6 } = {}) => ({
  filters: [
    {
      fieldName: "tenMien",
      operation: "EQUALS",
      value: tenMien,
      logicType: "AND",
    },
  ],
  sorts: [
    {
      fieldName: "id",
      direction: "ASC",
    },
  ],
  page,
  size,
});

const resolveContent = (response) => {
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;

  return Array.isArray(content) ? content : [];
};

export const fetchMienByTenMien = async ({ tenMien, page = 0, size = 6 } = {}) => {
  if (!tenMien) return null;

  const payload = buildMienFilterPayload({ tenMien, page, size });
  const response = await post("basic-api/mien/filter", payload);
  const content = resolveContent(response);
  return content[0] ?? null;
};
