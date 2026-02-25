import React from "react";
import Logo from '../../assets/Group.png';
const footer = {
  company: {
    logo: Logo,
    name: "Công ty Cổ phần đầu tư SLM",
    offices: [
      {
        title: "Văn phòng HCM",
        address: "Số 32, Đường số 5, Lovera Park Khang Điền, Xã Bình Hưng, Hồ Chí Minh, Việt Nam",
      },
      {
        title: "Văn phòng Hà Nội",
        address: "Tầng 5, Tòa Diamond Plaza Tower, Hoàng Đạo Thúy, Hà Nội, Việt Nam",
      },
    ],
    contact: {
      phone: "+84 (96) 492-0242",
      email: "sales@smsolar.com",
    },
  },
  warehouses: [
    {
      title: "Kho Hà Nội",
      address: "Đường Hoàng Sa, Đông Anh, TP Hà Nội",
    },
    {
      title: "Kho Bắc Giang",
      address: "Đường Hoàng Hoa Thám, Tân Yên, Bắc Giang",
    },
    {
      title: "Kho Hải Dương",
      address: "KCN Tân Trường, Cẩm Giàng, Hải Dương",
    },
  ],
  others: [
    {
      title: "Kho Thanh Hoá",
      address: "Đường Kim Xuân, Hoằng Hoá, Thanh Hoá",
    },
    {
      title: "Kho HCM",
      address: "212 Thanh Xuân 52, Phường Thạnh Xuân, Quận 12, HCM",
    },
  ],
};

export default function Footer({ variant = "light" }) {
  const isDark = variant === "dark";
  const footerClassName = isDark ? "bg-[#1D1D1F] text-white" : "bg-[#E5E7EB]";
  const subTextClassName = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <footer className={`${footerClassName} py-12 px-6`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* CỘT 1 — COMPANY */}
        <div className="space-y-4">
          <img src={footer.company.logo} alt="Logo" className="h-8" />
          <p className="font-semibold">{footer.company.name}</p>

          {footer.company.offices.map((office) => (
            <div key={office.title}>
              <p className="font-semibold">{office.title}</p>
              <p className={`text-sm ${subTextClassName} leading-5`}>{office.address}</p>
            </div>
          ))}

          <p className="text-sm font-semibold">A: {footer.company.offices[0].address}</p>
          <p className="text-sm">P: {footer.company.contact.phone}</p>
          <p className="text-sm">M: {footer.company.contact.email}</p>
        </div>

        {/* CỘT 2 — WAREHOUSE */}
        <div className="space-y-4">
          <p className="font-semibold">Văn phòng kho</p>
          {footer.warehouses.map((item) => (
            <div key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p className={`text-sm ${subTextClassName} leading-5`}>{item.address}</p>
            </div>
          ))}
        </div>

        {/* CỘT 3 — OTHER */}
        <div className="space-y-4">
          {footer.others.map((item) => (
            <div key={item.title}>
              <p className="font-semibold">{item.title}</p>
              <p className={`text-sm ${subTextClassName} leading-5`}>{item.address}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
