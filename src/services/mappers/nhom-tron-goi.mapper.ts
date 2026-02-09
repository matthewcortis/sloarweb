// mappers/nhom-tron-goi.mapper.ts
import { NhomTronGoi } from '../nhom-tron-goi.model'

export function mapNhomTronGoi(data: any): NhomTronGoi {
  return {
    id: Number(data?.id ?? 0),
    ten: data?.ten,
    nganhHang: data?.nganhHang,
    thuongHieuTamPin: data?.thuongHieuTamPin,
    thuongHieuInverter: data?.thuongHieuInverter,
    thuongHieuPinLuuTru: data?.thuongHieuPinLuuTru
  }
}
