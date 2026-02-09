import { post } from "../../../services/apiService";

export const buildTronGoiFilterPayload = ({
  location,
  loaiHeThong,
  loaiPha,
  banChay,
  nhomTronGoiTen,
  nhomTronGoiTenOperation = "ILIKE",
  page = 0,
  size = 20,
  sortField = "tongGia",
  sortDirection = "ASC",
} = {}) => {
  const filters = [];

  if (location) {
    filters.push({
      fieldName: "coSo.ma",
      operation: "EQUALS",
      value: location,
      logicType: "AND",
    });
  }

  if (loaiHeThong) {
    filters.push({
      fieldName: "loaiHeThong",
      operation: "EQUALS",
      value: loaiHeThong,
      logicType: "AND",
    });
  }
 
  if (loaiPha) {
    filters.push({
      fieldName: "loaiPha",
      operation: "EQUALS",
      value: loaiPha,
      logicType: "AND",
    });
  }

  if (nhomTronGoiTen) {
    filters.push({
      fieldName: "nhomTronGoi.ten",
      operation: nhomTronGoiTenOperation,
      value: nhomTronGoiTen,
      logicType: "AND",
    });
  }

  if (typeof banChay === "boolean") {
    filters.push({
      fieldName: "banChay",
      operation: "EQUALS",
      value: banChay,
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

export const fetchTronGoiByFilter = async (payload) => {
  const response = await post("basic-api/tron-goi/filter", payload);
  return response?.data ?? response;
};

export const fetchTronGoiById = async (id) => {
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
  const response = await post("basic-api/tron-goi/filter", payload);
  return response?.data ?? response;
};
