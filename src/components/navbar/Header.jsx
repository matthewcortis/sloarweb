'use client'
import Logo from '../../assets/Group.png';
import facebook from '../../assets/facebook.png';
import tiktok from '../../assets/tiktok.png';
import youtube from '../../assets/youtube.png';
import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

        {/* LOGO */}
        <a href="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-10 text-sm font-semibold text-gray-900">
          <a href="/combo-on-grid">Combo On-Grid</a>
          <a href="/combo-off-grid">Combo Off-Grid</a>
          <a href="/thiet-bi">Thiết bị</a>
          <a href="/du-an">Dự án</a>
          <a href="/hoi-dap">Hỏi đáp</a>
        </div>

        {/* DESKTOP SOCIAL ICONS */}
        <div className="hidden lg:flex items-center gap-4">
          <img src={facebook} className="h-5 w-5" alt="Facebook" />
          <img src={tiktok} className="h-5 w-5" alt="TikTok" />
          <img src={youtube} className="h-5 w-5" alt="YouTube" />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-700"
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
        <DialogPanel className="fixed inset-y-0 right-0 w-full bg-white p-6 overflow-y-auto">
          {/* TOP BAR */}
          <div className="flex items-center justify-between mb-8">
            <a href="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-4 w-auto" />
            </a>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-black">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* MENU */}
          <nav className="flex flex-col gap-4 text-lg font-semibold text-gray-900">
            <a href="/combo-on-grid">Combo On-Grid</a>
            <a href="/combo-off-grid">Combo Off-Grid</a>
            <a href="/thiet-bi">Thiết bị</a>
            <a href="/du-an">Dự án</a>
            <a href="/hoi-dap">Hỏi đáp</a>
          </nav>

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
