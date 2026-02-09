import { NhomVatTu } from './nhom-vat-tu.model'
import { ThuongHieu } from './thuong-hieu.model'
import { DuLieuRieng } from './du-lieu-rieng.model'
import { ThongTinGia } from './thong-tin-gia.model'

export interface VatTu {
  id: number
  ma?: string
  nhomVatTu?: NhomVatTu
  thuongHieu?: ThuongHieu
  ten?: string
  donVi?: string
  duLieuRieng?: DuLieuRieng
  thoiGianBaoHanh?: number
  gm?: number
  vatTuChinh?: boolean
  taoLuc?: string
  trangThai?: number
  anhVatTus?: any[]
  thongTinGias?: ThongTinGia[]
}
