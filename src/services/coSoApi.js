import { get } from "./apiService";

export const fetchCoSoByMa = async (ma) => {
  if (!ma) return null;
  const response = await get(`basic-api/co-so/get-by-ma/${encodeURIComponent(ma)}`);
  return response?.data ?? null;
};

