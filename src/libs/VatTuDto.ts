import { NhomVatTuDto, parseNhomVatTuDto } from "./NhomVatTuDto";
import { ThuongHieuDto, parseThuongHieuDto } from "./ThuongHieuDto";
import { NhaCungCapDto, parseNhaCungCapDto } from "./NhaCungCapDto";
import { AnhVatTuDto, parseAnhVatTuDto } from "./AnhVatTuDto";
import { ThongTinGiaDto, parseThongTinGiaDto } from "./GiaInfo";
import { ThuocTinh } from "./ThuocTinh";

export interface VatTuDto {
    id: number;
    ma: string;
    nhomVatTu: NhomVatTuDto;
    thuongHieu: ThuongHieuDto;
    nhaCungCap: NhaCungCapDto;
    ten: string;
    sheetLink: string;
    donVi: string;
    moTaBaoGia: string;
    moTaHopDong: string;
    duLieuRieng: Record<string, ThuocTinh>;
    taoLuc: string;
    trangThai: number;
    anhVatTus: AnhVatTuDto[];
    thongTinGias: ThongTinGiaDto[];
    thoiGianBaoHanh?: number | null;
}
export const parseVatTuDto = (json: any): VatTuDto => {
    const rawMap = json.duLieuRieng ?? {};
    const duLieuParsed: Record<string, ThuocTinh> = {};

    if (rawMap && typeof rawMap === "object") {
        Object.entries(rawMap).forEach(([key, value]) => {
            const v = value as Partial<ThuocTinh>;
            duLieuParsed[key] = {
                ten: v.ten ?? "",
                donVi: v.donVi ?? "",
                giaTri: v.giaTri
            };
        });

    }

    return {
        id: json.id ?? 0,
        ma: json.ma ?? "",
        nhomVatTu: parseNhomVatTuDto(json.nhomVatTu ?? {}),
        thuongHieu: parseThuongHieuDto(json.thuongHieu ?? {}),
        nhaCungCap: parseNhaCungCapDto(json.nhaCungCap ?? {}),
        ten: json.ten ?? "",
        sheetLink: json.sheetLink ?? "",
        donVi: json.donVi ?? "",
        moTaBaoGia: json.moTaBaoGia ?? "",
        moTaHopDong: json.moTaHopDong ?? "",
        duLieuRieng: duLieuParsed,
        taoLuc: json.taoLuc ?? "",
        trangThai: json.trangThai ?? 0,
        anhVatTus: Array.isArray(json.anhVatTus) ? json.anhVatTus.map(parseAnhVatTuDto) : [],
        thongTinGias: Array.isArray(json.thongTinGias) ? json.thongTinGias.map(parseThongTinGiaDto) : [],
        thoiGianBaoHanh: json.thoiGianBaoHanh ?? null
    };
};
