export interface CoSoDto {
  id: number;
  ma: string;
  ten: string;
  dcVanPhong: string;
  dcKho: string;
  taoLuc: string;
  trangThai: number;
}

export const parseCoSoDto = (json: any): CoSoDto => ({
  id: json.id ?? 0,
  ma: json.ma ?? "",
  ten: json.ten ?? "",
  dcVanPhong: json.dcVanPhong ?? "",
  dcKho: json.dcKho ?? "",
  taoLuc: json.taoLuc ?? "",
  trangThai: json.trangThai ?? 0
});
