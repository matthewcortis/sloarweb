import { post } from "../../../services/apiService";

export const fetchThietBiById = async (id) => {
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

  const response = await post("basic-api/vat-tu/filter", payload);
  return response?.data ?? response;
};

export const fetchThietBiByGroup = async (groupCode) => {
  if (!groupCode) return [];
  const payload = {
    filters: [
      {
        fieldName: "nhomVatTu.ma",
        operation: "EQUALS",
        value: groupCode,
        logicType: "AND",
      },
      {
        fieldName: "trangThai",
        operation: "EQUALS",
        value: "1",
        logicType: "AND",
      },
      {
        fieldName: "vatTuChinh",
        operation: "EQUALS",
        value: true,
        logicType: "AND",
      },
    ],
    sorts: [{ fieldName: "taoLuc", direction: "ASC" }],
    page: 0,
    size: 1000,
  };

  const response = await post("basic-api/vat-tu/filter", payload);
  const resolved = response?.data ?? response;
  const content =
    resolved?.content ??
    resolved?.data?.content ??
    resolved?.data ??
    resolved;

  return Array.isArray(content) ? content : [];
};
