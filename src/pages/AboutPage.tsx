import React from 'react';
import { PageTab } from '../types';
import { Sparkles, Tag, Heart, Clock, ArrowRight, Instagram, Facebook, GraduationCap } from 'lucide-react';

interface AboutPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Editorial Header */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Our Story · The mielle Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Est. in Iloilo</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Meet Marielle Faith P. Ortencio
          </h1>
          <p className="font-serif italic text-xl text-[#6d0808]">
            &ldquo;For the ones who love soft moments.&rdquo;
          </p>

          {/* Academic Rubric Disclaimer Card */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-50/90 border border-amber-300 rounded-xl text-xs font-semibold text-[#6d0808] shadow-2xs">
            <GraduationCap className="w-4 h-4 text-[#6d0808] shrink-0" />
            <span>Disclaimer: This website is a course requirement for E-Commerce and E-Marketing only.</span>
          </div>
        </div>
      </section>

      {/* Main Narrative & Official Founder Logo Treatment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* 1. Restructured Founder Profile Side with Official Logo Asset */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Logo Container with Specified Clean Background Card Treatment */}
            <div className="bg-white/50 backdrop-blur-sm border border-stone-200 rounded-2xl p-8 flex items-center justify-center min-h-[350px] shadow-sm">
              <img
                src="/assets/aistudio/image_dPnC4g.png"
                alt="mielle official brand logo"
                className="w-64 sm:w-72 md:w-80 h-auto object-contain transition-transform duration-500 hover:scale-105 filter drop-shadow-sm"
              />
            </div>

            {/* Founder Profile Caption Card in Burgundy Tone */}
            <div className="mt-4 p-5 bg-white/70 backdrop-blur-sm border border-stone-200 rounded-2xl shadow-xs text-center space-y-2.5 text-[#6d0808]">
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-[#6d0808]">
                  Marielle Faith P. Ortencio
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]/85">
                  Founder &amp; Head Artisan Baker
                </p>
                <p className="text-xs text-[#6d0808]/75">
                  Iloilo City, Philippines
                </p>
              </div>

              {/* Direct Official Social Links */}
              <div className="pt-2 border-t border-[#6d0808]/15 flex items-center justify-center gap-3 text-xs flex-wrap">
                <a
                  href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#faddb2]/30 text-[#6d0808] border border-[#6d0808]/20 transition-all font-semibold shadow-2xs hover:shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-600" />
                  <span>@maisonmielle.ph</span>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100065012409586"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#faddb2]/30 text-[#6d0808] border border-[#6d0808]/20 transition-all font-semibold shadow-2xs hover:shadow-xs"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span>Official Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-6 space-y-5 text-[#6d0808]/90 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#6d0808] leading-tight">
              A lifelong love affair with butter, cacao, and the comfort of fresh-baked dough.
            </h2>
            
            <p>
              Maisonmielle wasn’t founded in a boardroom. It was born in a sunlit kitchen in Iloilo, where <strong>Marielle Faith P. Ortencio</strong> spent countless late evenings and early mornings perfecting a cookie that refused to be ordinary.
            </p>

            <p>
              Growing up with an instinctive appreciation for sweet confectionery and artisanal bakes, Marielle noticed that most commercial cookies in the local market were either flat, overly brittle, or masked with shortening and artificial flavoring. She craved something substantial: a cookie with <em>presence</em>. A cookie whose exterior shattered with golden caramelization, yielding to an impossibly dense, molten, buttery center that enveloped the senses.
            </p>

            <p>
              After months of rigorous experimentation—testing varying protein levels in flour, timing the precise foaming stage of clarified butter, and aging dough for 36 hours to allow complex sugars to develop—<strong>The Indulgence Cookie Collection</strong> was born.
            </p>

            <div className="p-4 bg-white/80 backdrop-blur-xs rounded-lg border border-[#6d0808]/15 space-y-1 text-xs text-[#6d0808]">
              <strong className="text-[#6d0808] font-serif text-sm block">What &quot;mielle&quot; Represents:</strong>
              <p>
                Inspired by Marielle’s personal name and honeyed, gentle moments, mielle stands for comfort, devotion, and hospitality in every single bake.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Overhauled 4 Artisanal Principle Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
            Our Artisanal Principles
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#6d0808]">
            How we bake without compromise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: We use quality ingredients. */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 space-y-3.5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6d0808]/10 flex items-center justify-center text-[#6d0808] border border-[#6d0808]/15 shadow-2xs">
                <Sparkles className="w-5 h-5 text-[#6d0808]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808] leading-snug">
                We use quality ingredients.
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                we believe that a good pastry starts with good ingredients. We want to leave a good impression and provide a nice experience for our customers by making sure they receive the quality they truly deserve.
              </p>
            </div>
          </div>

          {/* Card 2: The prices are student-friendly. */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 space-y-3.5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6d0808]/10 flex items-center justify-center text-[#6d0808] border border-[#6d0808]/15 shadow-2xs">
                <Tag className="w-5 h-5 text-[#6d0808]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808] leading-snug">
                The prices are student-friendly.
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                We want our customers to enjoy good-quality products without having to spend too much money. Although we use quality ingredients, we also want to make our products affordable and accessible to everyone.
              </p>
            </div>
          </div>

          {/* Card 3: Baked with love and passion */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 space-y-3.5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6d0808]/10 flex items-center justify-center text-[#6d0808] border border-[#6d0808]/15 shadow-2xs">
                <Heart className="w-5 h-5 text-[#6d0808]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808] leading-snug">
                Baked with love and passion
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                every batch is made with care, patience, and passion because we believe that what you do reflects in the things you create. We never cut corners when it comes to quality.
              </p>
            </div>
          </div>

          {/* Card 4: Freshly made, never rushed. */}
          <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 space-y-3.5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6d0808]/10 flex items-center justify-center text-[#6d0808] border border-[#6d0808]/15 shadow-2xs">
                <Clock className="w-5 h-5 text-[#6d0808]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#6d0808] leading-snug">
                Freshly made, never rushed.
              </h3>
              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                We believe that every customer deserves a good experience that’s why we take our time in preparation and baking. While we value freshness, we want to make sure that each order meets our standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Experience */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold text-[#6d0808]">
          Experience a warm soft moment today.
        </h2>
        <p className="text-sm text-[#6d0808]/85 max-w-xl mx-auto">
          Every box is hand-packed by Marielle and our small kitchen team, tied with our signature burgundy ribbon, and delivered fresh to your door in Iloilo City, Pavia, or Santa Barbara.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab('builder')}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-all cursor-pointer shadow-md"
          >
            <span>Curate Your Assortment Box</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Clearly Visible Course Requirement Disclaimer Box at Bottom */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-6 bg-amber-50/90 backdrop-blur-sm border-2 border-amber-300 rounded-2xl shadow-sm text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6d0808]">
            <GraduationCap className="w-4 h-4 text-[#6d0808]" />
            <span>Academic Course Project Notice</span>
          </div>
          <p className="font-serif font-bold text-base sm:text-lg text-[#6d0808]">
            Disclaimer: this website is a course requirement for e commerce and e marketing only.
          </p>
          <p className="text-xs text-[#6d0808]/80 max-w-xl mx-auto">
            Created for academic evaluation at the University of San Agustin (USA), Iloilo City, Philippines.
          </p>
        </div>
      </section>

    </div>
  );
};
