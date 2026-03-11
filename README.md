# SolarMax Web

Website frontend cho SolarMax, xây dựng bằng React + Vite.

## Công nghệ
- React 19
- Vite 7
- Tailwind CSS 4
- React Router
- Axios

## Chạy dự án
```bash
npm install
npm run dev
```

## Build và kiểm tra chất lượng
```bash
npm run lint
npm run build
npm run preview
```

## Cấu trúc thư mục
```text
src/
  assets/                # Hình ảnh, icon, font, dữ liệu tĩnh
  components/            # UI dùng ở layout cấp cao (navbar, footer)
  features/              # Module theo domain nghiệp vụ
    home/
    product/
    huawei/
    news/
  layouts/               # Khung trang, trang lỗi
  libs/                  # DTO/parser tầng dữ liệu
  router/                # Router toàn ứng dụng
  services/              # API clients, model mapper
  shared/                # Thành phần tái sử dụng dùng đa feature
    components/
      cards/
      common/
    constants/
    hooks/
    utils/
  theme/                 # Theme config/style dùng chung
```

## Quy ước quản lý code tái sử dụng
- Tất cả reusable UI phải đặt trong `src/shared/components/*`.
- Hook dùng đa feature phải đặt trong `src/shared/hooks`.
- Constant toàn app đặt trong `src/shared/constants`.
- Logic đặc thù từng nghiệp vụ phải giữ trong `src/features/<feature-name>`.
- Ưu tiên import qua `index.js` (barrel) tại `shared` để giảm đường dẫn tương đối dài.

## Tài liệu bổ sung
- Payload/API note: `docs/api-notes.md`
