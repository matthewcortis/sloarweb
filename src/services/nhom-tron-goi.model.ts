// models/nhom-tron-goi.model.ts
import { NganhHang } from './nganh-hang.model'
import { ThuongHieu } from './thuong-hieu.model'

export interface NhomTronGoi {
  id: number
  ten?: string
  nganhHang?: NganhHang
  thuongHieuTamPin?: ThuongHieu
  thuongHieuInverter?: ThuongHieu
  thuongHieuPinLuuTru?: ThuongHieu
}
