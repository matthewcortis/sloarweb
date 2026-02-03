import { VatTuDto, parseVatTuDto } from "./VatTuDto";
import { ThuongHieuDto, parseThuongHieuDto } from "./ThuongHieuDto";

export interface VatTuHopDongBaoHanhDto {
  id: number;
  vatTu: VatTuDto;
  thuongHieu?: ThuongHieuDto | null;
  tenVatTu: string;
  thuongHieuTen: string;
  donVi: string;
  nhomMa: string;
  nhomTen: string;
  thoiGianBaoHanhThietBi?: number | null;
  thoiGianBaoHanhThucTe?: number | null;
  soLuong: number;
  giaHeThong?: number | null;
  giaHienThi?: number | null;
  gm?: number | null;
  baoHanhBatDau?: Date | null;
  baoHanhKetThuc?: Date | null;
  duocBaoHanh: boolean;
  moTa?: string | null;
  taoLuc?: Date | null;
  trangThai?: number | null;
}

import { toDate } from "./helpers"; // nếu cần
export const parseVatTuHopDongBaoHanhDto = (json: any): VatTuHopDongBaoHanhDto => {
  const vatTuJson = json.vatTu ?? {};
  const thuongHieuJson = json.thuongHieu ?? null;
  const nhomVatTu = vatTuJson.nhomVatTu ?? {};

  return {
    id: json.id ?? 0,
    vatTu: parseVatTuDto(vatTuJson),
    thuongHieu: thuongHieuJson ? parseThuongHieuDto(thuongHieuJson) : null,
    tenVatTu: vatTuJson.ten ?? "",
    thuongHieuTen: thuongHieuJson?.ten ?? "--",
    donVi: vatTuJson.donVi ?? "",
    nhomMa: nhomVatTu.ma ?? "",
    nhomTen: nhomVatTu.ten ?? "",
    thoiGianBaoHanhThietBi: vatTuJson.thoiGianBaoHanh ?? null,
    thoiGianBaoHanhThucTe: json.thoiGianBaoHanh ?? null,
    soLuong: json.soLuong ?? 0,
    giaHeThong: json.giaHeThong != null ? Number(json.giaHeThong) : null,
    giaHienThi: json.giaHienThi != null ? Number(json.giaHienThi) : null,
    gm: json.gm != null ? Number(json.gm) : null,
    baoHanhBatDau: json.baoHanhBatDau ? toDate(json.baoHanhBatDau) : null,
    baoHanhKetThuc: json.baoHanhKetThuc ? toDate(json.baoHanhKetThuc) : null,
    duocBaoHanh: json.duocBaoHanh ?? false,
    moTa: json.moTa ?? null,
    taoLuc: json.taoLuc ? toDate(json.taoLuc) : null,
    trangThai: json.trangThai ?? null
  };
};
