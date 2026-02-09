import { NhomTronGoi } from './nhom-tron-goi.model'
import { CoSo } from './co-so.model'
import { TepTin } from './tep-tin.model'
import { VatTuTronGoi } from './vat-tu-tron-goi.model'

export interface TronGoi {
  id: number
  nhomTronGoi?: NhomTronGoi
  coSo?: CoSo
  ten?: string
  tepTin?: TepTin
  loaiHeThong?: string
  loaiPha?: string
  congSuatHeThong?: number
  sanLuongToiThieu?: number
  sanLuongToiDa?: number
  giaKhungSat?: number
  moTa?: string
  taoLuc?: string
  tongGia?: number
  gmTong?: number
  banChay?: boolean
  trangThai?: number
  vatTuTronGois?: VatTuTronGoi[]
}
