// src/components/HybridProductsSection.jsx
import HybridBanner from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { meGaStory }  from "../../../services/mega.js";
import MegaStoryCard from "../../news/components/StoryCard.jsx";

export default function MeGaStory() {
  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px]">
      {/* Mô tả */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <HybridBanner data={hybridData.moTaMegaStory} />
      </div>

      {/* Mega Story list */}
      <div
        className="
          relative
          -mr-[16px] xl:-mr-[80px]
          w-[calc(100%+16px)] xl:w-[calc(100%+80px)]
          mt-8
        "
      >
        <div className="flex gap-4 overflow-x-auto pl-[16px] xl:pl-[80px]">
          {meGaStory.map((item, index) => (
            <MegaStoryCard
              key={index}
              image={item.image}
              title={item.title}
              onClick={() => {
                console.log(item);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
