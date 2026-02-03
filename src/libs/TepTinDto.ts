export interface TepTinDto {
  id: number;
  tenTepGoc: string;
  tenTaiLen: string;
  tenLuuTru: string;
  duongDan: string;
  loaiTepTin: string;
  duoiTep: string;
  kichCo: number;
  moTa: string;
  taoLuc: string;
  suaLuc: string;
  trangThai: number;
}

export const parseTepTinDto = (json: any): TepTinDto => ({
  id: json.id ?? 0,
  tenTepGoc: json.tenTepGoc ?? "",
  tenTaiLen: json.tenTaiLen ?? "",
  tenLuuTru: json.tenLuuTru ?? "",
  duongDan: json.duongDan ?? "",
  loaiTepTin: json.loaiTepTin ?? "",
  duoiTep: json.duoiTep ?? "",
  kichCo: json.kichCo ?? 0,
  moTa: json.moTa ?? "",
  taoLuc: json.taoLuc ?? "",
  suaLuc: json.suaLuc ?? "",
  trangThai: json.trangThai ?? 0
});
