import { CoSoDto, parseCoSoDto } from "./CoSoDto";

export interface UserModel {
  id: number;
  coSo?: CoSoDto | null;
  phanQuyen?: string | null;
  email?: string | null;
  sdt?: string | null;
  matKhau?: string | null;
  hoVaTen?: string | null;
  gioiTinh?: boolean | null;
  phanTramHoaHong?: number | null;
  tongHoaHong?: number | null;
  diaChi?: string | null;
  sinhNhat?: string | null;
  taoLuc?: string | null;
  trangThai?: number | null;
  khachHangs?: any[] | null;
}
export const parseUserModel = (json: any): UserModel => ({
  id: json.id ?? 0,
  coSo: json.coSo ? parseCoSoDto(json.coSo) : null,
  phanQuyen: json.phanQuyen ?? null,
  email: json.email ?? null,
  sdt: json.sdt ?? null,
  matKhau: json.matKhau ?? null,
  hoVaTen: json.hoVaTen ?? null,
  gioiTinh: typeof json.gioiTinh === "boolean" ? json.gioiTinh : null,
  phanTramHoaHong: json.phanTramHoaHong != null ? Number(json.phanTramHoaHong) : null,
  tongHoaHong: json.tongHoaHong != null ? Number(json.tongHoaHong) : null,
  diaChi: json.diaChi ?? null,
  sinhNhat: json.sinhNhat ?? null,
  taoLuc: json.taoLuc ?? null,
  trangThai: json.trangThai ?? null,
  khachHangs: Array.isArray(json.khachHangs) ? json.khachHangs : []
});
