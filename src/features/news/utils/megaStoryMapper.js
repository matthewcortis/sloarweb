import megaFallbackImage from "../../../assets/story.png";

const resolveImageValue = (value) => {
  if (Array.isArray(value)) {
    return resolveImageValue(value[0]);
  }
  if (typeof value === "string" && value.trim()) return value;
  if (value && typeof value === "object") {
    const nested =
      value.duongDan ??
      value.tepTin?.duongDan ??
      value.url ??
      value.path ??
      value.link ??
      value.imageUrl;
    if (typeof nested === "string" && nested.trim()) return nested;
  }
  return "";
};

export const resolveStoryTitle = (story) =>
  story?.tieuDe ??
  story?.tieuDeBaiViet ??
  story?.title ??
  story?.ten ??
  story?.moTa ??
  "Mega Story";

const resolveStoryImageFromCandidates = (candidates = []) => {
  for (const candidate of candidates) {
    const resolved = resolveImageValue(candidate);
    if (resolved) return resolved;
  }

  return megaFallbackImage;
};

export const resolveStoryCardImage = (story) => {
  const candidates = [
    story?.anhNgoai,
    story?.anhNgoaiUrl,
    story?.tepTin,
    story?.anhDaiDien,
    story?.anhDaiDienUrl,
    story?.hinhAnh,
    story?.image,
    story?.anh,
    story?.media,
  ];

  return resolveStoryImageFromCandidates(candidates);
};

export const resolveStoryCoverImage = (story) => {
  const candidates = [
    story?.anhBia,
    story?.anhBiaUrl,
    story?.tepTin,
    story?.anhDaiDien,
    story?.anhDaiDienUrl,
    story?.hinhAnh,
    story?.image,
    story?.anh,
    story?.media,
  ];

  return resolveStoryImageFromCandidates(candidates);
};

// Backward compatible default (prefer cover image).
export const resolveStoryImage = resolveStoryCoverImage;

export const resolveStorySummary = (story) =>
  story?.moTa ?? story?.moTaNgan ?? story?.tomTat ?? "";

export const resolveStoryContentSource = (story) => {
  const candidates = [
    story?.noiDung?.duongDan,
    story?.noiDung?.url,
    story?.noiDung?.link,
    story?.noiDungDuongDan,
    story?.noiDungBaiViet?.duongDan,
    story?.noiDungBaiViet,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) return candidate;
  }

  if (typeof story?.noiDung === "string" && story?.noiDung.trim()) {
    return story.noiDung;
  }

  return "";
};
