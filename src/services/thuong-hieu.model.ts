// models/thuong-hieu.model.ts
import { TepTin } from './tep-tin.model'

export interface ThuongHieu {
  id: number
  ten?: string
  tenQuocTe?: string
  quocGia?: string
  moTa?: string
  tepTin?: TepTin
}
