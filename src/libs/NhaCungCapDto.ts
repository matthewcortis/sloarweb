export interface NhaCungCapDto {
  id: number;
  ten: string;
  tenQuocTe: string;
}
export const parseNhaCungCapDto = (json: any): NhaCungCapDto => ({
  id: json.id ?? 0,
  ten: json.ten ?? "",
  tenQuocTe: json.tenQuocTe ?? ""
});
