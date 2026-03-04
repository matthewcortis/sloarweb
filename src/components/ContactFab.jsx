import { useEffect, useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

const CONTACT_PHONE = "+84 (95) 492-0242";
const CONTACT_PHONE_TEL = "+84954920242";
const SHOW_AFTER_SCROLL_PX = 240;

export default function ContactFab() {
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);
  const [fabViewportOffset, setFabViewportOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getScrollTop = () =>
      window.pageYOffset ||
      document.documentElement?.scrollTop ||
      document.body?.scrollTop ||
      0;

    const onScroll = () => {
      setShowContact(getScrollTop() > SHOW_AFTER_SCROLL_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const update = () => {
      const bottomOffset = Math.max(
        0,
        window.innerHeight - (viewport.height + viewport.offsetTop)
      );
      setFabViewportOffset(bottomOffset);
    };

    update();
    viewport.addEventListener("resize", update);
    viewport.addEventListener("scroll", update);
    window.addEventListener("orientationchange", update);
    window.addEventListener("resize", update);

    return () => {
      viewport.removeEventListener("resize", update);
      viewport.removeEventListener("scroll", update);
      window.removeEventListener("orientationchange", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      style={{ "--fab-vv": `${fabViewportOffset}px` }}
      className={`fixed inset-x-0 z-50 flex justify-center px-4 [--fab-base:28px] [--fab-vv:0px] sm:[--fab-base:24px] bottom-[calc(var(--fab-base)+var(--fab-vv)+env(safe-area-inset-bottom))] transition-opacity duration-300 ease-out [transform:translate3d(0,0,0)] [will-change:transform] [backface-visibility:hidden] ${
        showContact
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } motion-reduce:transition-none`}
    >
      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        aria-label={`Liên hệ tư vấn trực tiếp: ${CONTACT_PHONE}`}
        className="contact-fab"
      >
        <span className="contact-fab__label">Liên hệ tư vấn trực tiếp</span>
        <span className="contact-fab__icon">
          <PhoneIcon className="h-5 w-5" />
        </span>
      </a>
    </div>,
    document.body
  );
}
