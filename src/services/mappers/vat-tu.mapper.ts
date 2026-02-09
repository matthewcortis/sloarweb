import { VatTu } from '../vat-tu.model'

export function mapVatTu(data: any): VatTu {
  return {
    id: Number(data?.id ?? 0),
    ma: data?.ma,
    nhomVatTu: data?.nhomVatTu,
    thuongHieu: data?.thuongHieu,
    ten: data?.ten,
    donVi: data?.donVi,
    duLieuRieng: data?.duLieuRieng,
    thoiGianBaoHanh: data?.thoiGianBaoHanh,
    gm: data?.gm,
    vatTuChinh: data?.vatTuChinh,
    taoLuc: data?.taoLuc,
    trangThai: data?.trangThai,
    anhVatTus: data?.anhVatTus ?? [],
    thongTinGias: data?.thongTinGias ?? []
  }
}
