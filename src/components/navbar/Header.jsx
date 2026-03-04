'use client'
import Logo from '../../assets/Group.png';
import facebook from '../../assets/facebook.png';
import tiktok from '../../assets/tiktok.png';
import youtube from '../../assets/youtube.png';
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/solarmax87",
    icon: facebook,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@solarmax87",
    icon: tiktok,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@solarmax87",
    icon: youtube,
  },
]

export default function Header({ variant = "light", autoHideOnMobile = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showOnMobile, setShowOnMobile] = useState(!autoHideOnMobile)
  const locationState = useLocation();
  const [location, setLocation] = useState(() => {
    if (typeof window === "undefined") return "HN"
    const storedLocation = window.localStorage.getItem("solarmax-location")
    return storedLocation === "HN" || storedLocation === "HCM" ? storedLocation : "HN"
  })
  const isDark = variant === "dark"
  const headerClassName = isDark ? "bg-[#1D1D1F]" : "bg-white shadow-sm"
  const menuTextClassName = isDark ? "text-white" : "text-gray-900"
  const iconButtonClassName = isDark ? "text-white" : "text-gray-700"
  const panelClassName = isDark ? "bg-[#1D1D1F] text-white" : "bg-white"
  const panelTextClassName = isDark ? "text-white" : "text-gray-900"
  const closeButtonClassName = isDark ? "p-2 text-white" : "p-2 text-black"
  const selectClassName = isDark
    ? "bg-[#1D1D1F] text-white border-white/30"
    : "bg-white text-gray-900 border-gray-300"

  useEffect(() => {
    window.localStorage.setItem("solarmax-location", location)
    window.dispatchEvent(
      new CustomEvent("solarmax-location-change", { detail: location })
    )
  }, [location])

  useEffect(() => {
    if (!autoHideOnMobile) {
      setShowOnMobile(true)
      return
    }
    if (typeof window === "undefined") return

    const media = window.matchMedia("(max-width: 1023px)")
    const updateVisibility = () => {
      if (!media.matches) {
        setShowOnMobile(true)
        return
      }
      setShowOnMobile(window.scrollY > 40)
    }

    updateVisibility()
    window.addEventListener("scroll", updateVisibility, { passive: true })
    window.addEventListener("resize", updateVisibility, { passive: true })
    if (media.addEventListener) {
      media.addEventListener("change", updateVisibility)
    } else {
      media.addListener(updateVisibility)
    }

    return () => {
      window.removeEventListener("scroll", updateVisibility)
      window.removeEventListener("resize", updateVisibility)
      if (media.removeEventListener) {
        media.removeEventListener("change", updateVisibility)
      } else {
        media.removeListener(updateVisibility)
      }
    }
  }, [autoHideOnMobile])

  useEffect(() => {
    setMobileMenuOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [locationState.pathname, locationState.search, locationState.hash]);

  useEffect(() => {
    if (mobileMenuOpen || typeof document === "undefined") return;
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [mobileMenuOpen]);

  const autoHideClassName = autoHideOnMobile
    ? `fixed left-0 right-0 top-0 z-40 transition-all duration-300 ease-out lg:static lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto ${
        showOnMobile
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`
    : ""

  return (
    <header className={`${headerClassName} ${autoHideClassName}`}>
      <nav className="mx-auto flex h-12 w-full max-w-7xl items-center justify-between px-3 lg:h-auto lg:p-4 lg:px-8">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-[19.078125px] w-[110px] sm:h-8 sm:w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className={`hidden lg:flex gap-10 text-base normal-case ${menuTextClassName}`}>
          <Link to="/combo-on-grid">Combo On-Grid</Link>
          <Link to="/combo-hy-brid">Combo Hy-Brid</Link>
          <Link to="/device">Thiết bị</Link>
          <Link to="/megastory">Dự án</Link>
          <Link to="/q&a">Hỏi đáp</Link>
        </div>

        {/* DESKTOP SOCIAL ICONS */}
        <div className="hidden lg:flex items-center gap-4">
          <select
            aria-label="Chọn khu vực"
            className={`rounded-md border px-2 py-1 text-base normal-case ${selectClassName}`}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <option value="HN">HN</option>
            <option value="HCM">HCM</option>
          </select>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              <img src={social.icon} className="h-5 w-5" alt={social.name} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-[30px] lg:hidden">
          {/* MOBILE SOCIAL ICONS */}
          <div className="flex h-6 w-[136px] shrink-0 items-center gap-6">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} className="h-6 w-6" alt={social.name} />
              </a>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`flex h-6 w-6 items-center justify-center ${iconButtonClassName}`}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU SIDEPANEL */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <DialogPanel className={`fixed inset-y-0 right-0 w-full p-6 overflow-y-auto ${panelClassName}`}>
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
              <img
                src={Logo}
                alt="Logo"
                className="h-[19.078125px] w-[110px] sm:h-4 sm:w-auto"
              />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} className={closeButtonClassName}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className={`flex flex-col gap-4 text-lg normal-case ${panelTextClassName}`}>
            <Link to="/combo-on-grid" onClick={() => setMobileMenuOpen(false)}>Combo On-Grid</Link>
            <Link to="/combo-hy-brid" onClick={() => setMobileMenuOpen(false)}>Combo Hy-Brid</Link>
            <Link to="/device" onClick={() => setMobileMenuOpen(false)}>Thiết bị</Link>
            <Link to="/megastory" onClick={() => setMobileMenuOpen(false)}>Dự án</Link>
            <Link to="/q&a" onClick={() => setMobileMenuOpen(false)}>Hỏi đáp</Link>
          </nav>

          <div className="mt-6">
            <label className="block text-base normal-case mb-2">Khu vực</label>
            <select
              aria-label="Chọn khu vực"
              className={`w-full rounded-md border px-3 py-2 text-base normal-case ${selectClassName}`}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="HN">HN</option>
              <option value="HCM">HCM</option>
            </select>
          </div>

          <div className="flex items-center gap-4 mt-10">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} className="h-6 w-6" alt={social.name} />
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
