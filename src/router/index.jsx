import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import ContactFab from "../components/ContactFab";
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const HomePage = lazy(() => import("../features/home/pages/HomePage"));
const ProductPage = lazy(() => import("../features/product/pages/ProductPage"));
const ProductDetail = lazy(() => import("../features/product/pages/ProductDetail"));
const ThietBiPage = lazy(() => import("../features/product/pages/ThietBiPage"));
const ThietBiDetail = lazy(() => import("../features/product/pages/ThietBiDetail"));
const ThietBiThuongHieuPage = lazy(() => import("../features/product/pages/ThietBi_ThuongHieuPage"));
const HuaWeiPage = lazy(() => import("../features/huawei/page/HuaWeiPage"));
const HoiDapPage = lazy(() => import("../features/news/pages/HoiDapPage"));
const VeChungToiPage = lazy(() => import("../features/news/pages/VeChungToiPage"));
const MegaStoryPage = lazy(() => import("../features/news/pages/MegaStoryPage"));
const MegaStoryDetailPage = lazy(() => import("../features/news/pages/MegaStoryDetailPage"));
const NotFoundPage = lazy(() => import("../layouts/404Page"));

function RouteFallback() {
    return (
        <div className="flex min-h-[40vh] w-full items-center justify-center">
            <p className="text-[16px] text-[#667085]">Đang tải trang...</p>
        </div>
    );
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/bao-tri" element={<NotFoundPage mode="maintenance" />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route
                            path="/combo-on-grid"
                            element={<ProductPage preset="combo-on-grid" />}
                        />
                        <Route
                            path="/combo-hy-brid"
                            element={<ProductPage preset="combo-hy-brid" />}
                        />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/device" element={<ThietBiPage />} />
                        <Route path="/device/thuong-hieu" element={<ThietBiThuongHieuPage />} />
                        <Route path="/devices/:id" element={<ThietBiDetail />} />
                        <Route path="/huawei" element={<HuaWeiPage />} />
                        <Route path="/megastory" element={<MegaStoryPage />} />
                        <Route path="/megastory/:id" element={<MegaStoryDetailPage />} />
                        <Route path="/hoi-dap" element={<HoiDapPage />} />
                        <Route path="/q&a" element={<HoiDapPage />} />
                        <Route path="/gioi-thieu" element={<VeChungToiPage />} />
                    </Route>
                </Routes>
            </Suspense>
            <ContactFab />
        </BrowserRouter>
    );
}
