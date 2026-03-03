import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMegaStory } from "../../home/api/baiVietApi";
import MegaStoryCard from "../../news/components/StoryCard.jsx";
import { hybridData } from "../../../services/mota.js";
import {
  resolveStoryCardImage,
  resolveStoryTitle,
} from "../../news/utils/megaStoryMapper";

export default function MegaStorySection({
  page = 0,
  size = 10,
  title = hybridData?.moTaMegaStory?.title || "Dự án điển hình (Megastory)",
}) {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadMegaStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMegaStory({ page, size });
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
  }, [page, size]);

  const hasStories = stories.length > 0;

  return (
    <section className="w-full">
      <h2 className="typo-section-title text-[#111111]">
        {title}
      </h2>

      <div className="mt-4">
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

        {hasStories && (
          <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory pb-2">
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
    </section>
  );
}
