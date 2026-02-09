import { VatTuTronGoi } from '../vat-tu-tron-goi.model'
import { mapVatTu } from './vat-tu.mapper'

export function mapVatTuTronGoi(data: any): VatTuTronGoi {
  return {
    id: Number(data?.id ?? 0),
    vatTu: data?.vatTu ? mapVatTu(data.vatTu) : undefined,
    moTa: data?.moTa,
    soLuong: data?.soLuong,
    gia: data?.gia,
    gm: data?.gm,
    thoiGianBaoHanh: data?.thoiGianBaoHanh,
    duocBaoHanh: data?.duocBaoHanh,
    duocXem: data?.duocXem,
    trangThai: data?.trangThai
  }
}

export function mapVatTuTronGois(list: any[] = []): VatTuTronGoi[] {
  return list.map(mapVatTuTronGoi)
}
