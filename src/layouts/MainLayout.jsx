import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
export default function MainLayout() {
  const location = useLocation();
  const isHuaweiPage = location.pathname === "/huawei";

  return (
    <div
      className={`min-h-screen ${
        isHuaweiPage ? "bg-[#1D1D1F]" : "bg-gray-50"
      }`}
    >
      <Header variant={isHuaweiPage ? "dark" : "light"} />
      <main className="flex-1 w-full p-0">
        <Outlet />
      </main>
      <Footer variant={isHuaweiPage ? "dark" : "light"} />
    </div>
  );
}
