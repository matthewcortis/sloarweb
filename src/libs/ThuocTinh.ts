export interface ThuocTinh {
  ten: string;
  donVi: string;
  giaTri: any;
}

export const parseThuocTinh = (json: any): ThuocTinh => ({
  ten: json.ten ?? "",
  donVi: json.donVi ?? "",
  giaTri: json.giaTri
});
