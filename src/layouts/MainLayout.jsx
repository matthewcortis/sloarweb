import Header from "../components/navbar/Header";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 w-full p-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
