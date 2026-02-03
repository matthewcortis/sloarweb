import { VatTuDto, parseVatTuDto } from "./VatTuDto";

export interface VatTuTronGoiDto {
  id: number;
  vatTu: VatTuDto;
  moTa: string;
  soLuong: number;
  gia: number;
  gm: number;
  taoLuc: string;
  thoiGianBaoHanh: number;
  duocBaoHanh: boolean;
  duocXem?: boolean | null;
  trangThai: number;
}

import { toNumber } from "./helpers"; // nếu cần

export const parseVatTuTronGoiDto = (json: any): VatTuTronGoiDto => ({
  id: json.id ?? 0,
  vatTu: parseVatTuDto(json.vatTu ?? {}),
  moTa: json.moTa ?? "",
  soLuong: toNumber(json.soLuong) ?? 0,
  gia: toNumber(json.gia) ?? 0,
  gm: toNumber(json.gm) ?? 0,
  taoLuc: json.taoLuc ?? "",
  thoiGianBaoHanh: json.thoiGianBaoHanh ?? 0,
  duocBaoHanh: json.duocBaoHanh ?? false,
  duocXem: json.duocXem ?? null,
  trangThai: json.trangThai ?? 0
});
