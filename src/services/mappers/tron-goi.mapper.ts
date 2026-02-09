import { TronGoi } from '../tron-goi.model'
import { mapVatTuTronGois } from './vat-tu-tron-goi.mapper'

export function mapTronGoi(data: any): TronGoi {
  return {
    id: Number(data?.id ?? 0),
    nhomTronGoi: data?.nhomTronGoi,
    coSo: data?.coSo,
    ten: data?.ten,
    tepTin: data?.tepTin,
    loaiHeThong: data?.loaiHeThong,
    loaiPha: data?.loaiPha,
    congSuatHeThong: data?.congSuatHeThong,
    sanLuongToiThieu: data?.sanLuongToiThieu,
    sanLuongToiDa: data?.sanLuongToiDa,
    giaKhungSat: data?.giaKhungSat,
    moTa: data?.moTa,
    taoLuc: data?.taoLuc,
    tongGia: data?.tongGia,
    gmTong: data?.gmTong,
    banChay: data?.banChay,
    trangThai: data?.trangThai,
    vatTuTronGois: mapVatTuTronGois(data?.vatTuTronGois)
  }
}
