import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBaiVietById } from "../../home/api/baiVietApi";
import {
  resolveStoryContentSource,
  resolveStoryImage,
  resolveStorySummary,
  resolveStoryTitle,
} from "../utils/megaStoryMapper";

const isLikelyHtml = (value) => /<\/?[a-z][\s\S]*>/i.test(value || "");

const isUrlLike = (value) =>
  typeof value === "string" &&
  (value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("/"));

export default function MegaStoryDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [content, setContent] = useState("");
  const [contentIsHtml, setContentIsHtml] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentError, setContentError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadStory = async () => {
      setLoading(true);
      setError(null);
      setContent("");
      setContentIsHtml(false);
      setContentError(null);

      try {
        const response = await fetchBaiVietById(id);
        if (!isMounted) return;

        setStory(response);

        const contentSource = resolveStoryContentSource(response);
        if (!contentSource) return;

        if (isLikelyHtml(contentSource)) {
          setContent(contentSource);
          setContentIsHtml(true);
          return;
        }

        if (isUrlLike(contentSource)) {
          setContentLoading(true);
          try {
            const res = await fetch(contentSource);
            const text = await res.text();
            if (!isMounted) return;
            setContent(text);
            setContentIsHtml(isLikelyHtml(text));
          } catch (fetchError) {
            console.error("Failed to load mega story content", fetchError);
            if (isMounted) {
              setContentError(fetchError);
            }
          } finally {
            if (isMounted) {
              setContentLoading(false);
            }
          }
          return;
        }

        setContent(contentSource);
        setContentIsHtml(false);
      } catch (fetchError) {
        console.error("Failed to load mega story detail", fetchError);
        if (isMounted) {
          setError(fetchError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadStory();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  const title = resolveStoryTitle(story);
  const summary = resolveStorySummary(story);
  const image = resolveStoryImage(story);

  return (
    <div className="px-[16px] xl:px-[80px] pb-[80px] pt-[24px]">
      <div className="max-w-[960px] mx-auto">
        <button
          type="button"
          onClick={() => navigate("/megastory")}
          className="text-[14px] text-[#667085] mb-4"
        >
          ← Quay lại Mega Story
        </button>

        {loading && (
          <p className="text-[14px] text-[#667085]">Đang tải nội dung...</p>
        )}

        {!loading && error && (
          <p className="text-[14px] text-[#B42318]">
            Không thể tải bài viết. Vui lòng thử lại sau.
          </p>
        )}

        {!loading && !error && !story && (
          <p className="text-[14px] text-[#667085]">Không tìm thấy bài viết.</p>
        )}

        {!loading && !error && story && (
          <div>
            <h1
              className="text-[22px] sm:text-[28px] font-semibold text-[#1D1D1F]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              {title}
            </h1>

            {summary && (
              <p className="mt-2 text-[14px] text-[#667085]">{summary}</p>
            )}

            {image && (
              <div className="mt-6">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-auto max-h-[420px] object-cover rounded-[12px]"
                />
              </div>
            )}

            <div className="mt-6 text-[15px] leading-7 text-[#344054]">
              {contentLoading && (
                <p className="text-[14px] text-[#667085]">Đang tải nội dung...</p>
              )}

              {!contentLoading && contentError && (
                <p className="text-[14px] text-[#B42318]">
                  Không thể tải nội dung chi tiết.
                </p>
              )}

              {!contentLoading && !contentError && content && contentIsHtml && (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              )}

              {!contentLoading && !contentError && content && !contentIsHtml && (
                <p>{content}</p>
              )}

              {!contentLoading && !contentError && !content && !summary && (
                <p className="text-[14px] text-[#667085]">Chưa có nội dung.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
