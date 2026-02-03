import { TepTinDto, parseTepTinDto } from "./TepTinDto";
export interface AnhVatTuDto {
  id: number;
  tepTin: TepTinDto;
  anhChinh: boolean;
  trangThai: number;
}

export const parseAnhVatTuDto = (json: any): AnhVatTuDto => ({
  id: json.id ?? 0,
  tepTin: parseTepTinDto(json.tepTin ?? {}),
  anhChinh: json.anhChinh ?? false,
  trangThai: json.trangThai ?? 0
});
