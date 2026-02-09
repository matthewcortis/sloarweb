import { VatTu } from './vat-tu.model'

export interface VatTuTronGoi {
  id: number
  vatTu?: VatTu
  moTa?: string
  soLuong?: number
  gia?: number
  gm?: number
  thoiGianBaoHanh?: number
  duocBaoHanh?: boolean
  duocXem?: boolean
  trangThai?: number
}
