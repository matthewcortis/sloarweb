// src/components/HybridProductsSection.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HybridBanner from "./MoTa.jsx";
import { hybridData } from "../../../services/mota.js";
import { fetchMegaStory } from "../api/baiVietApi";
import MegaStoryCard from "../../news/components/StoryCard.jsx";
import {
  resolveStoryCardImage,
  resolveStoryTitle,
} from "../../news/utils/megaStoryMapper";

export default function MeGaStory() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const megaStoryTitle = "Tản mạn SolarMax";

  useEffect(() => {
    let isMounted = true;

    const loadMegaStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMegaStory({ page: 0, size: 10 });
        if (isMounted) {
          setStories(Array.isArray(response) ? response : []);
        }
      } catch (fetchError) {
        console.error("Failed to load mega story", fetchError);
        if (isMounted) {
          setStories([]);
          setError(fetchError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMegaStories();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasStories = stories.length > 0;

  return (
    <div className="">
      {/* Mô tả */}
      <div className="flex flex-col items-center max-w-[1280px] mx-auto">
        <div className="w-full md:hidden">
          <div className="flex items-start justify-between gap-4">
            <h2 className="typo-section-title text-[#1D1D1F]">
              {megaStoryTitle}
            </h2>
            <button
              type="button"
              onClick={() => navigate("/megastory")}
              className="text-red-500 font-semibold underline decoration-red-500 underline-offset-2 whitespace-nowrap"
            >
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        <div className="hidden md:block w-full">
          <HybridBanner
            data={{ ...hybridData.moTaMegaStory, title: megaStoryTitle }}
            onMoreClick={() => navigate("/megastory")}
          />
        </div>
      </div>

      {/* Mega Story list */}
      <div className="mt-[24px] md:mt-6">
        <div className="flex flex-col gap-3 pl-0 ">
          {loading && (
            <p className="text-[16px] text-[#667085]">Đang tải Mega Story...</p>
          )}
          {!loading && error && (
            <p className="text-[16px] text-[#B42318]">
              Không thể tải Mega Story. Vui lòng thử lại sau.
            </p>
          )}
          {!loading && !error && !hasStories && (
            <p className="text-[16px] text-[#667085]">Chưa có Mega Story.</p>
          )}
        </div>

        {hasStories && (
          <div className="flex gap-[16px] overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-2 pl-0 xl:pl-[80px]">
            {stories.map((item, index) => (
              <MegaStoryCard
                key={item?.id ?? index}
                image={resolveStoryCardImage(item)}
                title={resolveStoryTitle(item)}
                onClick={() => {
                  if (item?.id) {
                    navigate(`/megastory/${item.id}`);
                  } else {
                    navigate("/megastory");
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
