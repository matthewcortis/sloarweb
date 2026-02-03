import { VatTuHopDongBaoHanhDto, parseVatTuHopDongBaoHanhDto } from "./VatTuHopDongBaoHanhDto";

export interface HopDongBaoHanhDto {
  id: number;
  tenHopDong: string;
  coSoMa: string;
  khachHangTen: string;
  tongGia: number;
  taoLuc?: Date | null;
  vatTuHopDongs: VatTuHopDongBaoHanhDto[];
}
import { toDate } from "./helpers";

export const parseHopDongBaoHanhDto = (json: any): HopDongBaoHanhDto => ({
  id: json.id ?? 0,
  tenHopDong: json.ten?.toString() ?? "",
  coSoMa: json.coSo?.ma?.toString() ?? "",
  khachHangTen: json.khachHang?.hoVaTen?.toString() ?? "",
  tongGia: Number(json.tongGia ?? 0),
  taoLuc: json.taoLuc ? toDate(json.taoLuc) : null,
  vatTuHopDongs: Array.isArray(json.vatTuHopDongs)
    ? json.vatTuHopDongs.map(parseVatTuHopDongBaoHanhDto)
    : []
});
