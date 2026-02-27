'use client'
import Logo from '../../assets/Group.png';
import facebook from '../../assets/facebook.png';
import tiktok from '../../assets/tiktok.png';
import youtube from '../../assets/youtube.png';
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header({ variant = "light", autoHideOnMobile = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showOnMobile, setShowOnMobile] = useState(!autoHideOnMobile)
  const [location, setLocation] = useState(() => {
    if (typeof window === "undefined") return "HN"
    const storedLocation = window.localStorage.getItem("solarmax-location")
    return storedLocation === "HN" || storedLocation === "HCM" ? storedLocation : "HN"
  })
  const isDark = variant === "dark"
  const headerClassName = isDark ? "bg-[#1D1D1F]" : "bg-white shadow-sm"
  const menuTextClassName = isDark ? "text-white" : "text-gray-900"
  const iconButtonClassName = isDark ? "p-2 text-white" : "p-2 text-gray-700"
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
        <a href="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-[19.078125px] w-[110px] sm:h-8 sm:w-auto"
          />
        </a>

        {/* DESKTOP MENU */}
        <div className={`hidden lg:flex gap-10 text-base font-semibold ${menuTextClassName}`}>
          <a href="/combo-on-grid">Combo On-Grid</a>
          <a href="/combo-hy-brid">Combo Hy-Brid</a>
          <a href="/device">Thiết bị</a>
          <a href="/megastory">Dự án</a>
          <a href="/q&a">Hỏi đáp</a>
        </div>

        {/* DESKTOP SOCIAL ICONS */}
        <div className="hidden lg:flex items-center gap-4">
          <select
            aria-label="Chọn khu vực"
            className={`rounded-md border px-2 py-1 text-base font-semibold ${selectClassName}`}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <option value="HN">HN</option>
            <option value="HCM">HCM</option>
          </select>
          <img src={facebook} className="h-5 w-5" alt="Facebook" />
          <img src={tiktok} className="h-5 w-5" alt="TikTok" />
          <img src={youtube} className="h-5 w-5" alt="YouTube" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={iconButtonClassName}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU SIDEPANEL */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="relative z-50 lg:hidden"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Panel */}
        <DialogPanel className={`fixed inset-y-0 right-0 w-full p-6 overflow-y-auto ${panelClassName}`}>
          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="flex items-center">
              <img
                src={Logo}
                alt="Logo"
                className="h-[19.078125px] w-[110px] sm:h-4 sm:w-auto"
              />
            </a>
            <button onClick={() => setMobileMenuOpen(false)} className={closeButtonClassName}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* MENU */}
          <nav className={`flex flex-col gap-4 text-lg font-semibold ${panelTextClassName}`}>
            <a href="/combo-on-grid">Combo On-Grid</a>
            <a href="/combo-hy-brid">Combo Hy-Brid</a>
            <a href="/device">Thiết bị</a>
            <a href="/megastory">Dự án</a>
            <a href="/q&a">Hỏi đáp</a>
            
          </nav>

          <div className="mt-6">
            <label className="block text-base font-semibold mb-2">Khu vực</label>
            <select
              aria-label="Chọn khu vực"
              className={`w-full rounded-md border px-3 py-2 text-base font-semibold ${selectClassName}`}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="HN">HN</option>
              <option value="HCM">HCM</option>
            </select>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 mt-10">
            <img src={facebook} className="h-6 w-6" alt="Facebook" />
            <img src={tiktok} className="h-6 w-6" alt="TikTok" />
            <img src={youtube} className="h-6 w-6" alt="YouTube" />
          </div>
        </DialogPanel>
      </Dialog>


    </header>
  )
}
