export interface PageResponse<T = any> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const parsePageResponse = <T>(
  json: any,
  mapper: (item: any) => T
): PageResponse<T> => ({
  content: Array.isArray(json.content) ? json.content.map(mapper) : [],
  totalElements: json.totalElements ?? 0,
  totalPages: json.totalPages ?? 0,
  size: json.size ?? 0,
  number: json.number ?? 0
});
