import { CoSoDto, parseCoSoDto } from "./CoSoDto";
import { NhomTronGoiDto, parseNhomTronGoiDto } from "./NhomTronGoiDto";
import { TepTinDto, parseTepTinDto } from "./TepTinDto";
import { VatTuTronGoiDto, parseVatTuTronGoiDto } from "./VatTuTronGoiDto";

export interface TronGoiDto {
  id: number;
  coSo: CoSoDto;
  nhomTronGoi: NhomTronGoiDto;
  ten: string;
  tepTin: TepTinDto;
  loaiHeThong: string;
  loaiPha: string;
  congSuatHeThong?: number | null;
  sanLuongToiThieu: number;
  sanLuongToiDa: number;
  moTa: string;
  taoLuc: string;
  tongGia: number;
  gmTong?: number | null;
  banChay: boolean;
  trangThai: number;
  vatTuTronGois: VatTuTronGoiDto[];
}
export const parseTronGoiDto = (json: any): TronGoiDto => ({
  id: json.id ?? 0,
  coSo: parseCoSoDto(json.coSo ?? {}),
  nhomTronGoi: parseNhomTronGoiDto(json.nhomTronGoi ?? {}),
  ten: json.ten ?? "",
  tepTin: parseTepTinDto(json.tepTin ?? {}),
  loaiHeThong: json.loaiHeThong ?? "",
  loaiPha: json.loaiPha ?? "",
  congSuatHeThong: json.congSuatHeThong != null ? Number(json.congSuatHeThong) : null,
  sanLuongToiThieu: Number(json.sanLuongToiThieu ?? 0),
  sanLuongToiDa: Number(json.sanLuongToiDa ?? 0),
  moTa: json.moTa ?? "",
  taoLuc: json.taoLuc ?? "",
  tongGia: Number(json.tongGia ?? 0),
  gmTong: json.gmTong != null ? Number(json.gmTong) : null,
  banChay: json.banChay ?? false,
  trangThai: json.trangThai ?? 0,
  vatTuTronGois: Array.isArray(json.vatTuTronGois)
    ? json.vatTuTronGois.map(parseVatTuTronGoiDto)
    : []
});
