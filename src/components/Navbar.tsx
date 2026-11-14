import React, { useState } from 'react';
import { PageTab } from '../types';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  cartCount: number;
  openCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: PageTab; label: string }[] = [
    { tab: 'home', label: 'Home' },
    { tab: 'about', label: 'Our Story' },
    { tab: 'catalog', label: 'The Cookie Collection' },
    { tab: 'images', label: 'Bakehouse Gallery' },
    { tab: 'links', label: 'Partners & Socials' },
    { tab: 'contact', label: 'Say Hello' },
    { tab: 'builder', label: 'Curate a Box' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md transition-colors relative">
      {/* Handcrafted Scalloped / Wavy Bakery Box Lace Divider */}
      <div
        className="absolute top-full left-0 w-full overflow-hidden leading-none pointer-events-none z-40 h-3"
        aria-hidden="true"
      >
        <svg
          className="w-full h-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="scallop-divider-pattern"
              width="24"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              {/* Soft scalloped body curving downward gently */}
              <path
                d="M 0 0 Q 12 11 24 0 Z"
                fill="rgba(255, 255, 255, 0.85)"
              />
              {/* Artisanal pastry box / lace edge contour line */}
              <path
                d="M 0 0 Q 12 11 24 0"
                fill="none"
                stroke="#6d0808"
                strokeWidth="1.2"
                strokeOpacity="0.18"
              />
              {/* Handcrafted delicate eyelet dot */}
              <circle cx="12" cy="4" r="1" fill="#6d0808" fillOpacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="12" fill="url(#scallop-divider-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Authentic brand logo featuring ONLY clean lowercase script "mielle" */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer group py-1 shrink-0 text-left"
            aria-label="mielle"
          >
            <img
              src="/assets/aistudio/mielle_logo_nav_transparent.png"
              alt="mielle"
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="sr-only">mielle</span>
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] xl:text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#6d0808] font-bold'
                      : 'text-[#6d0808]/75 hover:text-[#6d0808]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6d0808] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Main action button - COOKIE COLLECTION route to catalog */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('catalog')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
            >
              COOKIE COLLECTION
            </button>

            <button
              onClick={openCart}
              className="relative p-2.5 rounded text-[#6d0808] hover:bg-[#6d0808]/10 transition-colors cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-[#6d0808]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-[#6d0808] rounded-full border-2 border-white tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#6d0808] hover:bg-[#6d0808]/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#6d0808]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f6eada]/95 backdrop-blur-md border-b border-[#6d0808]/20 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => handleNavClick(item.tab)}
              className={`block w-full text-left px-3 py-2.5 rounded text-base font-medium transition-colors ${
                activeTab === item.tab
                  ? 'bg-white/80 text-[#6d0808] font-bold shadow-xs'
                  : 'text-[#6d0808]/80 hover:bg-white/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#6d0808]/15 flex gap-2">
            <button
              onClick={() => handleNavClick('catalog')}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] rounded hover:bg-[#520505] transition-colors"
            >
              Cookie Collection
            </button>
            <button
              onClick={() => handleNavClick('builder')}
              className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#6d0808] border border-[#6d0808] rounded hover:bg-[#6d0808]/10 transition-colors"
            >
              Curate a Box
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
