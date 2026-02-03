import { ThuocTinh, parseThuocTinh } from "./ThuocTinh";

export interface NhomVatTuDto {
    id: number;
    ma: string;
    ten: string;
    thuocTinhRieng: Record<string, ThuocTinh>;
    gm: number;
    vatTuChinh: boolean;
    taoLuc: string;
    trangThai: number;
}

export const parseNhomVatTuDto = (json: any): NhomVatTuDto => {
    const rawMap = json.thuocTinhRieng ?? {};
    const parsedMap: Record<string, ThuocTinh> = {};

    if (rawMap && typeof rawMap === "object") {
        Object.entries(rawMap).forEach(([key, value]) => {
            if (value && typeof value === "object") {
                parsedMap[key] = parseThuocTinh(value);
            }
        });
    }

    return {
        id: json.id ?? 0,
        ma: json.ma ?? "",
        ten: json.ten ?? "",
        thuocTinhRieng: parsedMap,
        gm: typeof json.gm === "number" ? json.gm : Number(json.gm ?? 0),
        vatTuChinh: Boolean(json.vatTuChinh),
        taoLuc: json.taoLuc ?? "",
        trangThai: json.trangThai ?? 0
    };
};
