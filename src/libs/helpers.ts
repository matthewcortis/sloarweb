// helpers.ts
export const toNumber = (v: any): number | null => {
  if (v == null) return null;
  const n = Number(v);
  return isNaN(n) ? null : n;
};

export const toBool = (v: any): boolean => {
  if (typeof v === "boolean") return v;
  return !!v;
};

export const toDate = (v: any): Date | null => {
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};


export interface FilterCriteria {
  fieldName: string;
  operation: string;
  value: any;
  logicType?: "AND" | "OR";
}


export interface SortCriteria {
  fieldName: string;
  direction: "ASC" | "DESC";
}

export interface BaseFilterRequest {
  filters: FilterCriteria[];
  sorts: SortCriteria[];
  page: number;
  size: number;
}
