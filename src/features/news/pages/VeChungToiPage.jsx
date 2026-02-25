import VeChungToiSection from "../components/VeChungToiSection.jsx";
import VeChungToiGallery from "../components/VeChungToiGallery.jsx";
import VeChungToiPartnersMission from "../components/VeChungToiPartnersMission.jsx";
import storyImage from "../../../assets/story.png";
import jaSolarLogo from "../../../assets/icons/solar.png";
import longiLogo from "../../../assets/icons/longi.png";
import solisLogo from "../../../assets/icons/solis.png";
import dynessLogo from "../../../assets/icons/dyness.png";
import easywayLogo from "../../../assets/icons/easyway.png";

import missionFlagIcon from "../../../assets/icons/1.png";
import missionTargetIcon from "../../../assets/icons/bullseye.png";
import missionCoreIcon from "../../../assets/icons/diamond.png";
import easup from "../../../assets/easup.png";
const gallerySlides = [
  {
    id: 1,
    image: storyImage,
    caption: "Dự án điện mặt trời Hà nội (600MW), tại DakLak",
  },
  {
    id: 2,
    image: easup,
    caption: "Dự án điện mặt trời Easup (600MW), tại DakLak",
  },
  {
    id: 3,
    image: storyImage,
    caption: "Dự án điện mặt trời Easup (600MW), tại DakLak",
  },
];

const galleryStats = [
  { id: 1, value: "1,000+", label: "Khách hàng" },
  { id: 2, value: "10 năm", label: "Kinh nghiệm" },
  { id: 3, value: "4 kho", label: "Miền bắc" },
  { id: 4, value: "Top 3", label: "Đối tác toàn cầu" },
  { id: 5, value: "2 kho", label: "Miền bắc" },
];

const partnerBrands = [
  { id: 1, name: "JA Solar", image: jaSolarLogo },
  { id: 2, name: "LONGi", image: longiLogo },
  { id: 3, name: "Solis", image: solisLogo },
  { id: 4, name: "Dyness", image: dynessLogo },
  { id: 5, name: "Easyway", image: easywayLogo },
];

const missionItems = [
  {
    id: 1,
    icon: missionFlagIcon,
    text: "Sứ mệnh SolarMax\nĐiện Xanh Mái Nhà Việt",
  },
  {
    id: 2,
    icon: missionTargetIcon,
    text:
      "Mục tiêu SolarMax\nĐến năm 2030, Solarmax hoàn\nthành lắp đặt 1 triệu m2 tấm pin\nnăng lượng mặt trời cho mái nhà\nViệt",
  },
  {
    id: 3,
    icon: missionCoreIcon,
    text: "Giá trị cốt lõi\nTín - Tốc - Tín",
  },
];

export default function VeChungToiPage() {
  return (
    <>
      <VeChungToiSection />
      <VeChungToiGallery slides={gallerySlides} stats={galleryStats} />
      <VeChungToiPartnersMission
        partners={partnerBrands}
        missions={missionItems}
      />
    </>
  );
}
