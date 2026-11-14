import React, { useState } from 'react';
import { PageTab } from '../types';
import { COOKIE_FLAVORS, OFFICIAL_PREORDER_WINDOW, BOX_DISCOUNT_HELPER } from '../data/bakeryData';
import { ArrowRight, Sparkles, Award, Flame, Calendar, MapPin, Cookie, Instagram, Facebook, Store } from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onSelectFlavorForBuilder?: (flavorId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Official Preorder Announcement Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#6d0808] text-white rounded-2xl p-5 sm:p-6 shadow-lg border border-[#8a1313] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#faddb2] text-[#6d0808] flex items-center justify-center shrink-0 shadow-sm">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#faddb2] block">
                Current Preorder Batch Window
              </span>
              <h2 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide">
                {OFFICIAL_PREORDER_WINDOW.announcement}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('builder')}
              className="px-5 py-2.5 bg-[#faddb2] hover:bg-white text-[#6d0808] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow cursor-pointer whitespace-nowrap"
            >
              Order Box (Get ₱10 OFF)
            </button>
          </div>
        </div>
      </section>

      {/* Hero Section with Locked Two-Column Layout */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-[#6d0808]/15 shadow-sm bg-gradient-to-r from-[#faddb2] via-[#f6eada] to-[#f1f0e5]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-full max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
          
          {/* COMPACT TEXT COLUMN (LEFT PANEL) */}
          <div className="w-full md:w-[48%] flex flex-col items-start text-left">
            <div className="bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-sm border border-white/20 w-full max-w-xl space-y-6 text-left">
              {/* Brand Header: ONLY clean lowercase script "mielle" */}
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/mielle_logo_nav_transparent.png"
                  alt="mielle"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <div className="h-4 w-px bg-[#6d0808]/20" />
                <span className="text-xs uppercase tracking-widest text-[#6d0808]/80 font-bold">
                  Boutique Homegrown Bakery · Iloilo
                </span>
              </div>

              {/* Exact Copywriting Stack */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#6D0808] tracking-tight leading-[1.12]">
                  For the ones who love soft moments.
                </h1>

                <p className="text-sm sm:text-base text-[#6d0808]/90 leading-relaxed font-sans max-w-xl">
                  Welcome to Maisonmielle. We specialize in premium, small-batch, chunky-style cookies crafted entirely around a strict pre-order model. Slowly crafted in Iloilo with browned French butter, rested dough, and rich molten centers, our treats are baked fresh to order and designed to arrive at peak texture right when you crave them. Choose individual pieces or curate a Box of 5 or 6 with an automatic ₱10 discount.
                </p>
              </div>

              {/* Stylized Burgundy Action Button */}
              <div className="pt-2 flex items-center">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded-lg transition-all shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap font-bold"
                >
                  <span>COOKIE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Trust Attributes */}
              <div className="pt-4 border-t border-[#6d0808]/15 flex flex-wrap items-center gap-6 text-xs text-[#6d0808]/85 font-medium">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#6d0808]" />
                  <span>₱10 OFF on 5+ Boxes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#6d0808]" />
                  <span>USA & Molo Drop-off</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#6d0808]" />
                  <span>Browned French Butter</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROMINENT IMAGE PANEL (RIGHT PANEL) - Seamless Floating Cookies */}
          <div className="w-full md:w-[48%] bg-transparent flex justify-center md:justify-end items-center p-0 border-0 shadow-none">
            <img
              src="/assets/aistudio/hero-cookies.png"
              alt="Mielle handcrafted cookies"
              className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.02] filter drop-shadow-[0_8px_20px_rgba(109,8,8,0.08)]"
            />
          </div>

        </div>
      </section>

      {/* 2. Official "How to Order" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6d0808]">
              Official Ordering Workflow
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#6d0808]">
              How to Order Your mielle Cookies
            </h2>
            <p className="text-xs sm:text-sm text-[#6d0808]/85 leading-relaxed">
              We bake small batches for our scheduled preorder window. Follow these 3 easy steps to reserve your fresh cookies for Nov. 5 dispatch:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Individual or Box Discount */}
            <div className="p-6 rounded-xl bg-white/70 border border-[#6d0808]/15 space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#6d0808] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808]">
                Select Your Order Format
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                Choose <strong>individual cookies</strong> or assemble an assortment box. <strong>{BOX_DISCOUNT_HELPER}</strong>
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 px-3 py-1.5 rounded border border-[#6d0808]/10">
                Individual pieces from ₱35 · ₱10 OFF on 5+ Cookies
              </div>
            </div>

            {/* Step 2: Delivery Locations */}
            <div className="p-6 rounded-xl bg-white/70 border border-[#6d0808]/15 space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#6d0808] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808]">
                Select Delivery Location
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                Standard drop-off & meet-up at <strong>USA, Molo (Standard)</strong> or outside courier delivery.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 px-3 py-1.5 rounded border border-[#6d0808]/10">
                {OFFICIAL_PREORDER_WINDOW.deliveryOptionsList}
              </div>
            </div>

            {/* Step 3: Direct Pick-up Option */}
            <div className="p-6 rounded-xl bg-white/70 border border-[#6d0808]/15 space-y-3 relative group hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#6d0808] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808]">
                Direct Pick-Up Option
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                Prefer to collect your cookies directly from our home bakery station on Nov. 5?
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 px-3 py-1.5 rounded border border-[#6d0808]/10">
                {OFFICIAL_PREORDER_WINDOW.pickupNote}
              </div>
            </div>

          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#6d0808]/15 text-xs text-[#6d0808]/85">
            <div>
              <strong>Dispatch Date:</strong> All orders are baked fresh and dispatched on <strong>November 5</strong>.
            </div>
            <button
              onClick={() => setActiveTab('builder')}
              className="inline-flex items-center gap-1.5 font-bold text-[#6d0808] hover:underline cursor-pointer"
            >
              <span>Launch Box Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collection Spotlight with Clean Uniform Circular Photos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
              The 6 Handcrafted Flavors
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#6d0808] mt-1">
              The Indulgence Cookie Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#6d0808]/80 mt-1">
              Every flavor crafted with real butter and rich fillings. {BOX_DISCOUNT_HELPER}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6d0808] hover:underline cursor-pointer"
          >
            <span>Explore All 6 Flavors & Notes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Cookie Cards with Circular Photo Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {COOKIE_FLAVORS.map((cookie) => (
            <div
              key={cookie.id}
              className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl overflow-hidden flex flex-col group hover:shadow-xl transition-all"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#f6f0e4] flex items-center justify-center p-4">
                {!imageErrorMap[cookie.id] ? (
                  <img
                    src={cookie.image}
                    alt={cookie.name}
                    onError={() => handleImageError(cookie.id)}
                    className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center bg-[#f6f0e4] border border-stone-200 text-[#6d0808] p-2 text-center shadow-sm rounded-xl">
                    <Cookie className="w-8 h-8 text-[#6d0808]/70 mb-1" />
                    <span className="font-serif font-bold text-[10px]">{cookie.name.split(' ')[0]}</span>
                  </div>
                )}

                {/* Badge for Limited Release (Cookie Monster) */}
                {cookie.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#6d0808] text-white text-[10px] font-bold tracking-widest uppercase rounded shadow-sm border border-[#faddb2]/30">
                      <Sparkles className="w-3 h-3 text-[#faddb2]" />
                      {cookie.badge}
                    </span>
                  </div>
                )}

                {/* Price Pill */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-bold tabular-nums text-[#6d0808] border border-[#6d0808]/15 shadow-xs">
                  ₱{cookie.price.toFixed(2)} / pc
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#6d0808] group-hover:text-[#520505] transition-colors">
                    {cookie.name}
                  </h3>
                  <p className="text-xs font-serif italic text-[#6d0808] font-semibold">
                    {cookie.tagline}
                  </p>
                  <p className="text-xs text-[#6d0808]/80 line-clamp-2 leading-relaxed">
                    {cookie.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#6d0808]/15 flex items-center justify-between">
                  <span className="text-xs text-[#6d0808]/75">
                    Nov. 5 Batch
                  </span>
                  <button
                    onClick={() => setActiveTab('builder')}
                    className="text-xs font-bold text-[#6d0808] hover:text-[#520505] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Add to Box</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cozy Pop-Up Booths & Events Notice Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#fdf8f0] via-white/90 to-[#faddb2]/25 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6d0808] text-[#faddb2] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>NEXT POP-UP: TBA (TO BE ANNOUNCED)</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6d0808]/75">
                  Pop-Up Booths &amp; Events
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#6d0808]">
                Where to Find Us: Pop-Up Events
              </h2>

              <p className="text-xs sm:text-sm text-[#6d0808]/85 leading-relaxed">
                We love meeting you in person! Our next pop-up date and location in Iloilo are currently brewing. Follow{' '}
                <a
                  href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#6d0808] hover:text-[#520505]"
                >
                  @maisonmielle.ph
                </a>{' '}
                on{' '}
                <a
                  href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#6d0808] hover:text-[#520505]"
                >
                  Instagram
                </a>{' '}
                and{' '}
                <a
                  href="https://www.facebook.com/profile.php?id=100065012409586"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-[#6d0808] hover:text-[#520505]"
                >
                  Facebook
                </a>{' '}
                so you don&apos;t miss our next booth drop.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#6d0808] bg-white border border-[#6d0808]/20 hover:bg-[#faddb2]/30 transition-colors shadow-2xs"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-600" />
                  <span>Instagram @maisonmielle.ph</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100065012409586"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[#6d0808] bg-white border border-[#6d0808]/20 hover:bg-[#faddb2]/30 transition-colors shadow-2xs"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>

            {/* Past Highlight Card */}
            <div className="lg:w-80 shrink-0 bg-[#faddb2]/35 border border-[#6d0808]/20 rounded-xl p-5 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#6d0808]">
                <Store className="w-4 h-4 text-[#6d0808]" />
                <span>Past Highlight</span>
              </div>
              <p className="font-serif font-bold text-base text-[#6d0808] leading-snug">
                Previously spotted at: Our First 3-Day Pop-Up at Mercato!
              </p>
              <p className="text-[11px] text-[#6d0808]/80 leading-relaxed">
                Thank you to everyone in Iloilo who dropped by our booth and shared a warm cookie moment with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#6d0808] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-[#8a1313]">
          <p className="font-serif italic text-xl text-[#faddb2]">
            Ready for your warm, gooey indulgence?
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white max-w-2xl mx-auto">
            {BOX_DISCOUNT_HELPER}
          </h2>
          <p className="text-xs sm:text-sm text-[#f1f1e6]/85 max-w-xl mx-auto">
            Mix and match your favorites from our 6 gourmet cookies. Freshly baked in small batches and dispatched in Iloilo on November 5.
          </p>
          <div>
            <button
              onClick={() => setActiveTab('builder')}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#6d0808] bg-[#f1f0e5] hover:bg-white rounded transition-all shadow-md cursor-pointer font-bold"
            >
              <span>Start Assembling Box</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
