import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ProductPage from "../features/product/pages/ProductPage";
import ProductDetail from "../features/product/pages/ProductDetail";
import ThietBiPage from "../features/product/pages/ThietBiPage";
import ThietBiDetail from "../features/product/pages/ThietBiDetail";
import ThietBiThuongHieuPage from "../features/product/pages/ThietBi_ThuongHieuPage";
import HuaWeiPage from "../features/huawei/page/HuaWeiPage";
import HoiDapPage from "../features/news/pages/HoiDapPage";
import VeChungToiPage from "../features/news/pages/VeChungToiPage";
import MegaStoryPage from "../features/news/pages/MegaStoryPage";
import MegaStoryDetailPage from "../features/news/pages/MegaStoryDetailPage";
import NotFoundPage from "../layouts/404Page";
export default function AppRouter() {
    return (
        <BrowserRouter>
            <ScrollToTop />
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
        </BrowserRouter>
    );
}
