import React from "react";
import Logo from '../../assets/Group.png';
import { useSalePhone } from "../../hooks/useSalePhone";
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
  const { salePhoneLabel, salePhoneTel } = useSalePhone();
  const isDark = variant === "dark";
  const footerClassName = isDark ? "bg-[#1D1D1F] text-white" : "bg-[#E5E7EB]";
  const subTextClassName = isDark ? "text-gray-300" : "text-gray-700";

  return (
    <footer className={`${footerClassName} px-4 py-6 md:px-6 md:py-12`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

        {/* CỘT 1 — COMPANY */}
        <div className="flex flex-col gap-6">
          <img
            src={footer.company.logo}
            alt="Logo"
            className="h-[22px] w-[130px] object-contain"
          />
          <p className="font-semibold">{footer.company.name}</p>

          <div className="flex flex-col gap-4">
            {footer.company.offices.map((office) => (
              <div key={office.title} className="flex flex-col gap-1">
                <p className="font-semibold">{office.title}</p>
                <p className={`text-base ${subTextClassName} leading-5`}>{office.address}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base">
              <span className="font-bold uppercase">A:</span>{" "}
              <span className="font-normal normal-case">{footer.company.offices[0].address}</span>
            </p>
            <p className="text-base">
              <span className="font-bold uppercase">P:</span>{" "}
              <a
                href={`tel:${salePhoneTel}`}
                className="font-normal normal-case hover:underline"
              >
                {salePhoneLabel}
              </a>
            </p>
            <p className="text-base">
              <span className="font-bold uppercase">M:</span>{" "}
              <span className="font-normal normal-case">{footer.company.contact.email}</span>
            </p>
          </div>
        </div>

        {/* CỘT 2 — WAREHOUSE */}
        <div className="flex flex-col gap-6">
          <p className="font-semibold">Văn phòng kho</p>
          <div className="flex flex-col gap-4">
            {footer.warehouses.map((item) => (
              <div key={item.title} className="flex flex-col gap-1">
                <p className="font-semibold">{item.title}</p>
                <p className={`text-base ${subTextClassName} leading-5`}>{item.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT 3 — OTHER */}
        <div className="flex flex-col gap-4 md:gap-6">
          {footer.others.map((item) => (
            <div key={item.title} className="flex flex-col gap-1">
              <p className="font-semibold">{item.title}</p>
              <p className={`text-base ${subTextClassName} leading-5`}>{item.address}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
