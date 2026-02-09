import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MegaStoryCard from "../components/StoryCard.jsx";
import { fetchMegaStoryPage } from "../../home/api/baiVietApi";
import { resolveStoryImage, resolveStoryTitle } from "../utils/megaStoryMapper";

const ITEMS_PER_PAGE = 12;

export default function MegaStoryPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [stories, setStories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadMegaStories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMegaStoryPage({
          page: currentPage - 1,
          size: ITEMS_PER_PAGE,
        });
        const content = response?.content ?? [];
        const totalFromApi =
          response?.totalPages ??
          (response?.totalElements
            ? Math.ceil(response.totalElements / ITEMS_PER_PAGE)
            : 1);

        if (isMounted) {
          setStories(Array.isArray(content) ? content : []);
          setTotalPages(Math.max(1, totalFromApi || 1));
        }
      } catch (fetchError) {
        console.error("Failed to load mega story page", fetchError);
        if (isMounted) {
          setStories([]);
          setTotalPages(1);
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
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const hasStories = stories.length > 0;

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  return (
    <div className="px-[9px] xl:px-[80px] pb-[80px] pt-[24px]">
      <div className="max-w-[1280px] mx-auto">
        <h1
          className="text-[20px] sm:text-[24px] font-semibold text-[#1D1D1F] text-left md:text-center"
          style={{ fontFamily: "SF Pro Display" }}
        >
          Dự án điển hình (Megastory)
        </h1>

        <div className="mt-6 flex flex-col gap-3">
          {loading && (
            <p className="text-[14px] text-[#667085]">Đang tải Mega Story...</p>
          )}
          {!loading && error && (
            <p className="text-[14px] text-[#B42318]">
              Không thể tải Mega Story. Vui lòng thử lại sau.
            </p>
          )}
          {!loading && !error && !hasStories && (
            <p className="text-[14px] text-[#667085]">Chưa có Mega Story.</p>
          )}
        </div>

        {hasStories && (
          <div className="mt-6 flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stories.map((item, index) => (
              <MegaStoryCard
                key={item?.id ?? index}
                image={resolveStoryImage(item)}
                title={resolveStoryTitle(item)}
                className="w-full sm:w-[290px] h-auto sm:h-[280px]"
                onClick={() => {
                  if (item?.id) {
                    navigate(`/megastory/${item.id}`);
                  }
                }}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="w-[328px] h-[40px] rounded-[25px] bg-white flex items-center justify-center gap-2">
              <PaginationArrow
                direction="prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              />

              {paginationItems.map((item, index) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-[40px] h-[40px] rounded-full border border-[#D0D5DD] text-[#667085] text-[14px] font-medium flex items-center justify-center cursor-default select-none"
                  >
                    ...
                  </span>
                ) : (
                  <PaginationButton
                    key={item}
                    active={item === currentPage}
                    onClick={() => setCurrentPage(item)}
                  >
                    {item}
                  </PaginationButton>
                )
              )}

              <PaginationArrow
                direction="next"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PaginationButton({ children, active, onClick }) {
  const baseClass =
    "w-[40px] h-[40px] rounded-full text-[14px] font-medium flex items-center justify-center border transition-colors";
  const activeClass = "bg-[#242425] text-white border-[#242425]";
  const inactiveClass = "bg-white text-[#667085] border-[#D0D5DD]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      {children}
    </button>
  );
}

function PaginationArrow({ direction, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={`w-[40px] h-[40px] rounded-full text-[14px] font-medium flex items-center justify-center border transition-colors ${
        disabled
          ? "bg-white text-[#98A2B3] border-[#E4E7EC] cursor-not-allowed"
          : "bg-white text-[#667085] border-[#D0D5DD] hover:bg-[#F2F4F7]"
      }`}
    >
      {direction === "prev" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
}
