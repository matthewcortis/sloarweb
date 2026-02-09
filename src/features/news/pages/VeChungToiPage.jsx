import VeChungToiSection from "../components/VeChungToiSection.jsx";
import VeChungToiGallery from "../components/VeChungToiGallery.jsx";
import VeChungToiPartnersMission, {
  defaultMissionIcons,
} from "../components/VeChungToiPartnersMission.jsx";
import storyImage from "../../../assets/story.png";
import partnerLogo from "../../../assets/icons/huawei.png";
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
  { id: 1, name: "JA Solar", image: partnerLogo },
  { id: 2, name: "LONGi", image: partnerLogo },
  { id: 3, name: "Solis", image: partnerLogo },
  { id: 4, name: "Dyness", image: partnerLogo },
  { id: 5, name: "Easyway", image: partnerLogo },
];

const missionItems = [
  {
    id: 1,
    icon: defaultMissionIcons.flag,
    text: "Sứ mệnh SolarMax\nĐiện Xanh Mái Nhà Việt",
  },
  {
    id: 2,
    icon: defaultMissionIcons.target,
    text:
      "Mục tiêu SolarMax\nĐến năm 2030, Solarmax hoàn\nthành lắp đặt 1 triệu m2 tấm pin\nnăng lượng mặt trời cho mái nhà\nViệt",
  },
  {
    id: 3,
    icon: defaultMissionIcons.core,
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
