import HuaweiHeroSection from "../components/HuaweiHeroSection.jsx";
import HuaweiFusionSolarSection from "../components/HuaweiFusionSolarSection.jsx";
import HuaweiSafetyActiveSection from "../components/HuaweiSafetyActiveSection.jsx";
import HuaweiOptimizerSection from "../components/HuaweiOptimizerSection.jsx";
import { huaweiHeroData } from "../../../services/datahuawei.js";
import Huawei from "../../home/components/Huawei.jsx";

export default function HuaWeiPage() {
  return (
    <div className="bg-[#1D1D1F]">
      <main className="px-[16px] xl:px-[80px] pt-[36px] pb-[80px]">
        <HuaweiHeroSection data={huaweiHeroData} />
        <div className="mt-[40px] md:mt-[80px]">
          <HuaweiFusionSolarSection />
        </div>
        <div className="mt-[40px] md:mt-[80px]">
          <HuaweiSafetyActiveSection />
        </div>
        <div className="mt-[40px] md:mt-[80px]">
          <HuaweiOptimizerSection />
        </div>
        <Huawei hideDescriptionAndButton />

      </main>
    </div>
  );
}
