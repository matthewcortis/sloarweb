import { NganhHangDto, parseNganhHangDto } from "./NganhHangDto";
import { ThuongHieuDto, parseThuongHieuDto } from "./ThuongHieuDto";

export interface NhomTronGoiDto {
  id: number;
  nganhHang: NganhHangDto;
  ten: string;
  thuongHieuTamPin: ThuongHieuDto;
  thuongHieuInverter: ThuongHieuDto;
  thuongHieuPinLuuTru: ThuongHieuDto;
  trangThai: number;
  taoLuc?: string | null;
}
export const parseNhomTronGoiDto = (json: any): NhomTronGoiDto => ({
  id: json.id ?? 0,
  nganhHang: parseNganhHangDto(json.nganhHang ?? {}),
  ten: json.ten ?? "",
  thuongHieuTamPin: parseThuongHieuDto(json.thuongHieuTamPin ?? {}),
  thuongHieuInverter: parseThuongHieuDto(json.thuongHieuInverter ?? {}),
  thuongHieuPinLuuTru: parseThuongHieuDto(json.thuongHieuPinLuuTru ?? {}),
  trangThai: json.trangThai ?? 0,
  taoLuc: json.taoLuc ?? null
});
