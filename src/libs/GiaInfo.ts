import { toNumber } from "./helpers";
export interface GiaInfo {
  maCoSo: string;
  tenCoSo: string;
  giaNhap?: number | null;
  giaBan?: number | null;
  giaNhapRaw?: string | null;
  giaBanRaw?: string | null;
}

export const parseGiaInfo = (json: any): GiaInfo => ({
  maCoSo: json.maCoSo ?? "",
  tenCoSo: json.tenCoSo ?? "",
  giaNhap: toNumber(json.giaNhap),
  giaBan: toNumber(json.giaBan),
  giaNhapRaw: json.giaNhapRaw ?? null,
  giaBanRaw: json.giaBanRaw ?? null
});

export interface ThongTinGiaDto {
  id: number;
  dsGia: GiaInfo[];
  taoLuc: string;
  trangThai: number;
}
export const parseThongTinGiaDto = (json: any): ThongTinGiaDto => ({
  id: json.id ?? 0,
  dsGia: Array.isArray(json.dsGia) ? json.dsGia.map(parseGiaInfo) : [],
  taoLuc: json.taoLuc ?? "",
  trangThai: json.trangThai ?? 0
});
