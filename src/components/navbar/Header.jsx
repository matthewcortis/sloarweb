'use client'
import Logo from '../../assets/Group.png';
import facebook from '../../assets/facebook.png';
import tiktok from '../../assets/tiktok.png';
import youtube from '../../assets/youtube.png';
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header({ variant = "light" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  return (
    <header className={headerClassName}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </a>

        {/* DESKTOP MENU */}
        <div className={`hidden lg:flex gap-10 text-sm font-semibold ${menuTextClassName}`}>
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
            className={`rounded-md border px-2 py-1 text-sm font-semibold ${selectClassName}`}
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
              <img src={Logo} alt="Logo" className="h-4 w-auto" />
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
            <label className="block text-sm font-semibold mb-2">Khu vực</label>
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
