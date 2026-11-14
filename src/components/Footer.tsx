import React from 'react';
import { PageTab } from '../types';
import { Heart, MapPin, Clock, Phone, Mail, ShieldCheck, Instagram, Facebook, ExternalLink, GraduationCap } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  openPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openPrivacyModal }) => {
  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const officialInstagramUrl = 'https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==';
  const officialFacebookUrl = 'https://www.facebook.com/profile.php?id=100065012409586';

  return (
    <footer className="bg-[#480505] text-[#f1f0e5] border-t border-[#6d0808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#6d0808]/40">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="font-serif italic lowercase text-3xl font-medium tracking-wide text-[#faddb2]">
              mielle
            </h3>
            <p className="font-serif italic text-[#f6eada] text-sm leading-relaxed">
              &ldquo;For the ones who love soft moments.&rdquo;
            </p>
            <p className="text-xs text-[#f1f1e6]/80 leading-relaxed">
              Boutique homegrown bakery in Iloilo, Philippines. Handcrafted thick-set gourmet cookies baked in small, limited pre-order batches with pure French butter and Belgian cacao.
            </p>
            <div className="pt-1 text-xs text-[#faddb2]">
              <span>Founded with love by Marielle Faith P. Ortencio</span>
            </div>

            {/* Official Social Links in Brand Column */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={officialInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Follow @maisonmielle.ph on Instagram"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={officialFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Maisonmielle on Facebook"
                className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-xs"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-[#faddb2]/90 font-medium font-mono">@maisonmielle.ph</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faddb2] mb-4">
              Explore The Bakery
            </h4>
            <ul className="space-y-2.5 text-xs text-[#f1f1e6]/80">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Cookie Collection (6 Flavors)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('builder')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Curate a Box (5 &amp; 6 pcs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('images')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bakehouse Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('club')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mielle Rewards &amp; Bakers Club
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Say Hello (Bulk &amp; Event Inquiries)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('links')}
                  className="text-[#faddb2] font-semibold hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <span>Partners &amp; Socials</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Bakery Operations & Delivery Area */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faddb2] mb-4">
              Delivery Coverage & Dispatch
            </h4>
            <div className="space-y-3 text-xs text-[#f1f1e6]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#faddb2] shrink-0 mt-0.5" />
                <span>
                  <strong>Coverage Points:</strong>
                  <br />USA & Molo (Standard) · Outside Delivery (+₱20) · Direct Pick-Up
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#faddb2] shrink-0 mt-0.5" />
                <span>
                  <strong>Fresh Oven Batches:</strong>
                  <br />Friday, Saturday & Sunday dispatches
                  <br />2:00 PM – 6:30 PM Door-to-Door
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Customer Care */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#faddb2] mb-4">
              Customer Desk & Channels
            </h4>
            <div className="space-y-2.5 text-xs text-[#f1f1e6]/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#faddb2] shrink-0" />
                <span>+63 917 842 9102 (Mobile & GCash)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#faddb2] shrink-0" />
                <span>hello@maisonmielle.ph</span>
              </div>
              <div className="pt-1 space-y-1.5">
                <a
                  href={officialInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#faddb2] hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Instagram: @maisonmielle.ph</span>
                  <ExternalLink className="w-3 h-3 text-[#faddb2]/70" />
                </a>
                <a
                  href={officialFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-[#faddb2] hover:text-white transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Facebook: Maisonmielle</span>
                  <ExternalLink className="w-3 h-3 text-[#faddb2]/70" />
                </a>
              </div>
              <p className="pt-2 text-[11px] text-[#f1f1e6]/70 leading-normal">
                Payment options: GCash, Maya, and Cash on Delivery (COD) for eligible Iloilo deliveries.
              </p>
            </div>
          </div>

        </div>

        {/* Academic Course Disclaimer Strip */}
        <div className="py-4 border-b border-[#6d0808]/40 flex items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 text-xs text-amber-200/95 font-medium bg-[#360303]/60 px-4 py-2 rounded-xl border border-amber-300/30">
            <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Disclaimer: This website is a course requirement for E-Commerce and E-Marketing only.</span>
          </div>
        </div>

        {/* Bottom Compliance & Rights Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#f1f1e6]/70">
          <div>
            © {new Date().getFullYear()} Maisonmielle Bakery. All rights reserved. Handcrafted in Iloilo, Philippines.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => handleNav('links')}
              className="text-[#faddb2] hover:text-white transition-colors cursor-pointer"
            >
              Partners &amp; Socials
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={openPrivacyModal}
              className="inline-flex items-center gap-1.5 text-[#faddb2] hover:text-white underline underline-offset-4 decoration-[#faddb2]/60 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#faddb2]" />
              <span>Privacy Notice (RA 10173 & Internet Transactions Act)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

