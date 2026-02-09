import { NganhHang } from './nganh-hang.model'
import { ThuocTinhRieng } from './thuoc-tinh-rieng.model'

export interface NhomVatTu {
  id: number
  ma?: string
  nghanhHang?: NganhHang
  ten?: string
  thuocTinhRieng?: ThuocTinhRieng
  gm?: number
  vatTuChinh?: boolean
  taoLuc?: string
  trangThai?: number
}
