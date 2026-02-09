export interface ThuocTinhChiTiet {
  ten?: string
  donVi?: string
  giaTri?: string | number
}

export interface ThuocTinhRieng {
  [key: string]: ThuocTinhChiTiet
}
