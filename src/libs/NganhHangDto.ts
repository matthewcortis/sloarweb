export interface NganhHangDto {
  id: number;
  ma: string;
  ten: string;
  sdtSale: string;
  sdtTech: string;
  anhNgang: string;
  anhVuong: string;
  trangThai: number;
}

export const parseNganhHangDto = (json: any): NganhHangDto => ({
  id: json.id ?? 0,
  ma: json.ma ?? "",
  ten: json.ten ?? "",
  sdtSale: json.sdtSale ?? "",
  sdtTech: json.sdtTech ?? "",
  anhNgang: json.anhNgang ?? "",
  anhVuong: json.anhVuong ?? "",
  trangThai: json.trangThai ?? 0
});
