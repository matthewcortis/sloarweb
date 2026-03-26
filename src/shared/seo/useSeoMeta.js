import { useEffect } from "react";

const DEFAULT_TITLE = "SolarMax | Giải pháp điện mặt trời";
const DEFAULT_DESCRIPTION =
  "Liên hệ ngay SoLarMax để làm rõ từng tiêu chuẩn kĩ thuật nhỏ nhất, đảm bảo hệ thống điện mặt trời vận hành bên vững trong 20 năm.";
const DEFAULT_IMAGE =
  "https://minio.slmglobal.vn/slm/quang_cao_tag_global_1774495829716";
const DEFAULT_TYPE = "website";
const DEFAULT_SITE_NAME = "SolarMax";

const upsertMeta = (attr, key, content) => {
  if (!content) return;

  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (!href) return;

  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const toAbsoluteUrl = (value) => {
  if (!value) return "";

  try {
    return new URL(value, window.location.origin).href;
  } catch {
    return "";
  }
};

export const useSeoMeta = ({
  title,
  description,
  image,
  url,
  type = DEFAULT_TYPE,
  siteName = DEFAULT_SITE_NAME,
  noIndex = false,
} = {}) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const resolvedTitle = `${title ?? ""}`.trim() || DEFAULT_TITLE;
    const resolvedDescription =
      `${description ?? ""}`.trim() || DEFAULT_DESCRIPTION;
    const resolvedUrl = toAbsoluteUrl(url || window.location.href);
    const resolvedImage = toAbsoluteUrl(image || DEFAULT_IMAGE);
    const resolvedType = `${type ?? ""}`.trim() || DEFAULT_TYPE;
    const resolvedSiteName = `${siteName ?? ""}`.trim() || DEFAULT_SITE_NAME;

    document.title = resolvedTitle;

    upsertMeta("name", "description", resolvedDescription);
    upsertMeta("name", "robots", noIndex ? "noindex,nofollow" : "index,follow");

    upsertMeta("property", "og:title", resolvedTitle);
    upsertMeta("property", "og:description", resolvedDescription);
    upsertMeta("property", "og:type", resolvedType);
    upsertMeta("property", "og:url", resolvedUrl);
    upsertMeta("property", "og:image", resolvedImage);
    upsertMeta("property", "og:site_name", resolvedSiteName);
    upsertMeta("property", "og:locale", "vi_VN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", resolvedTitle);
    upsertMeta("name", "twitter:description", resolvedDescription);
    upsertMeta("name", "twitter:image", resolvedImage);

    upsertLink("canonical", resolvedUrl);
  }, [title, description, image, url, type, siteName, noIndex]);
};
