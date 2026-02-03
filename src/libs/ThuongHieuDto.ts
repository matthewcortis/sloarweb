import { TepTinDto, parseTepTinDto } from "./TepTinDto";

export interface ThuongHieuDto {
  id: number;
  tenQuocTe: string;
  ten: string;
  quocGia?: string | null;
  moTa?: string | null;
  tepTin?: TepTinDto | null;
}

export const parseThuongHieuDto = (json: any): ThuongHieuDto => ({
  id: json.id ?? 0,
  ten: json.ten ?? "",
  tenQuocTe: json.tenQuocTe ?? "",
  quocGia: json.quocGia ?? null,
  moTa: json.moTa ?? null,
  tepTin: json.tepTin ? parseTepTinDto(json.tepTin) : null
});
