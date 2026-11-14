import React from 'react';
import { PageTab } from '../types';
import { ExternalLink, Instagram, Facebook, Truck, CreditCard, GraduationCap, MapPin, Sparkles, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface RelatedLinksPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const RelatedLinksPage: React.FC<RelatedLinksPageProps> = ({ setActiveTab }) => {
  const officialInstagramUrl = 'https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==';
  const officialFacebookUrl = 'https://www.facebook.com/profile.php?id=100065012409586';

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. Header Banner */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Related Links &amp; Directory</span>
            <span aria-hidden="true">·</span>
            <span>Iloilo Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Partners &amp; Socials
          </h1>
          <p className="text-sm sm:text-base text-[#6d0808]/85 max-w-2xl mx-auto leading-relaxed">
            Connect with our official bakery social handles, accredited delivery courier services, e-wallet payment gateways, and university academic references.
          </p>

          {/* Academic Rubric Compliance Banner */}
          <div className="mt-6 max-w-2xl mx-auto bg-amber-50/90 border border-amber-300/80 rounded-xl p-4 shadow-xs text-left flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#6d0808] text-white shrink-0 mt-0.5">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-xs text-[#6d0808] space-y-1">
              <div className="font-bold text-xs uppercase tracking-wider">
                Academic Course Project Notice
              </div>
              <p className="font-semibold text-sm leading-snug">
                Disclaimer: This website is a course requirement for E-Commerce and E-Marketing only.
              </p>
              <p className="text-[11px] text-[#6d0808]/80">
                Created in partial fulfillment of the course curriculum at the University of San Agustin (USA), Iloilo City, Philippines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 2. Official Maisonmielle Social Media Channels (Prominently Featured) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#6d0808]/15 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
                Direct Brand Channels
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#6d0808]">
                Official Maisonmielle Social Accounts
              </h2>
            </div>
            <span className="text-xs bg-[#faddb2]/40 text-[#6d0808] px-3 py-1 rounded-full font-bold border border-[#6d0808]/15">
              Verified Accounts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Official Instagram Card */}
            <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
                    <Instagram className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Preorder Drops
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                    Official Instagram Account
                  </h3>
                  <div className="text-sm font-bold text-[#6d0808] font-mono mt-1">
                    @maisonmielle.ph
                  </div>
                </div>

                <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                  Follow our official Instagram for weekly bake schedules, molten center slice videos, limited flavor countdowns, and direct messaging (DM) for direct pick-up coordinates in Iloilo.
                </p>

                <div className="p-3 bg-[#f6eada]/70 rounded-xl border border-[#6d0808]/10 text-xs text-[#6d0808] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#6d0808]" />
                    <span>Instagram Direct (DM) Services:</span>
                  </div>
                  <p className="text-[11px] text-[#6d0808]/80">
                    • Request exact pick-up coordinates for USA &amp; Molo stations<br />
                    • Send GCash / Maya payment verification receipts
                  </p>
                </div>
              </div>

              <a
                href={officialInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <span>Visit Instagram (@maisonmielle.ph)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Official Facebook Card */}
            <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center shadow-md">
                    <Facebook className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Official Facebook Page
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                    Official Facebook Page
                  </h3>
                  <div className="text-sm font-bold text-[#6d0808] font-mono mt-1">
                    facebook.com/profile.php?id=100065012409586
                  </div>
                </div>

                <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                  Join our official Facebook community for community feedback, customer reviews, photo albums of customer cookie boxes, and Messenger-assisted order reservations.
                </p>

                <div className="p-3 bg-[#f6eada]/70 rounded-xl border border-[#6d0808]/10 text-xs text-[#6d0808] space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#6d0808]" />
                    <span>Facebook Messenger Assistance:</span>
                  </div>
                  <p className="text-[11px] text-[#6d0808]/80">
                    • Chat directly with Marielle &amp; bakery support<br />
                    • Inquire about event catering &amp; bulk party boxes
                  </p>
                </div>
              </div>

              <a
                href={officialFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <span>Visit Facebook (Maisonmielle)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* 3. Iloilo Logistics & Delivery Partners */}
        <section className="space-y-4">
          <div className="border-b border-[#6d0808]/15 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
              Local Courier Fleet &amp; Dispatch
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#6d0808]">
              Iloilo Delivery Logistics Partners
            </h2>
            <p className="text-xs text-[#6d0808]/80 mt-1">
              Standard local delivery covers USA and Molo, with third-party courier dispatch or self-arranged delivery for outside locations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Maxim */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-neutral-900 flex items-center justify-center font-bold text-sm shadow-2xs">
                  M
                </div>
                <h3 className="font-serif font-bold text-base text-[#6d0808]">
                  Maxim Delivery Iloilo
                </h3>
                <p className="text-xs text-[#6d0808]/80 leading-relaxed">
                  Primary partner for on-demand motorcycle courier dispatch across Mandurriao, Jaro, La Paz, and City Proper.
                </p>
                <div className="text-[11px] text-[#6d0808] font-semibold border-t border-[#6d0808]/10 pt-2">
                  Rate: Standard meter / +₱20 outside zone
                </div>
              </div>
              <a
                href="https://taximaxim.com/ph/en-US/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/60 rounded-lg border border-[#6d0808]/20 transition-colors"
              >
                <span>Open Maxim Delivery</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* GrabExpress */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                  G
                </div>
                <h3 className="font-serif font-bold text-base text-[#6d0808]">
                  GrabExpress Iloilo
                </h3>
                <p className="text-xs text-[#6d0808]/80 leading-relaxed">
                  Careful point-to-point transport for multiple delicate assortment boxes and gift-tied party packs.
                </p>
                <div className="text-[11px] text-[#6d0808] font-semibold border-t border-[#6d0808]/10 pt-2">
                  Rate: Distance-based app fare
                </div>
              </div>
              <a
                href="https://www.grab.com/ph/express/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/60 rounded-lg border border-[#6d0808]/20 transition-colors"
              >
                <span>Open GrabExpress</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Lalamove */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                  L
                </div>
                <h3 className="font-serif font-bold text-base text-[#6d0808]">
                  Lalamove Western Visayas
                </h3>
                <p className="text-xs text-[#6d0808]/80 leading-relaxed">
                  Courier option for catering trays and larger batch drop-offs reaching Pavia and Santa Barbara.
                </p>
                <div className="text-[11px] text-[#6d0808] font-semibold border-t border-[#6d0808]/10 pt-2">
                  Rate: Scheduled multi-stop dispatch
                </div>
              </div>
              <a
                href="https://www.lalamove.com/en-ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/60 rounded-lg border border-[#6d0808]/20 transition-colors"
              >
                <span>Open Lalamove PH</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Direct Pick-Up */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#6d0808] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                  <MapPin className="w-5 h-5 text-[#faddb2]" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#6d0808]">
                  Direct Pick-Up (USA / Molo)
                </h3>
                <p className="text-xs text-[#6d0808]/80 leading-relaxed">
                  Collect freshly baked cookies straight from our studio. DM on Instagram or Facebook for exact coordinates.
                </p>
                <div className="text-[11px] text-[#6d0808] font-semibold border-t border-[#6d0808]/10 pt-2">
                  Rate: Free Meet-up &amp; Collection
                </div>
              </div>
              <a
                href={officialInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/60 rounded-lg border border-[#6d0808]/20 transition-colors"
              >
                <span>DM for Coordinates</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </section>

        {/* 4. Payment & E-Wallet Gateway Channels */}
        <section className="space-y-4">
          <div className="border-b border-[#6d0808]/15 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
              Accredited Payment Gateways
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#6d0808]">
              Payment &amp; E-Wallet Partners
            </h2>
            <p className="text-xs text-[#6d0808]/80 mt-1">
              Compliant with BSP financial security standards and the Internet Transactions Act of 2023.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* GCash */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#007DFE] text-base font-mono">GCash</span>
                  <span className="text-[10px] font-bold bg-[#007DFE]/10 text-[#007DFE] px-2 py-0.5 rounded">
                    Primary E-Wallet
                  </span>
                </div>
                <div className="text-xs text-[#6d0808] space-y-0.5">
                  <div>Account: <strong>0917 842 9102</strong></div>
                  <div>Name: <strong>Marielle Faith P. Ortencio</strong></div>
                </div>
                <p className="text-[11px] text-[#6d0808]/80">
                  Instant QR payment and mobile number transfers. Upload or send screenshot via Facebook or Instagram DM.
                </p>
              </div>
              <a
                href="https://www.gcash.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#007DFE] bg-[#007DFE]/10 hover:bg-[#007DFE]/20 rounded-lg border border-[#007DFE]/20 transition-colors"
              >
                <span>Visit GCash Official Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Maya */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-700 text-base font-mono">Maya</span>
                  <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                    Digital Wallet
                  </span>
                </div>
                <div className="text-xs text-[#6d0808] space-y-0.5">
                  <div>Account: <strong>0917 842 9102</strong></div>
                  <div>Name: <strong>Marielle Faith P. Ortencio</strong></div>
                </div>
                <p className="text-[11px] text-[#6d0808]/80">
                  Support for Maya digital wallet, Visa/Mastercard scan-to-pay, and digital banking fund transfers.
                </p>
              </div>
              <a
                href="https://www.maya.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
              >
                <span>Visit Maya Official Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Cash on Delivery */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#6d0808] text-base font-serif">Cash on Delivery</span>
                  <span className="text-[10px] font-bold bg-[#faddb2]/40 text-[#6d0808] px-2 py-0.5 rounded">
                    COD Available
                  </span>
                </div>
                <div className="text-xs text-[#6d0808] space-y-0.5">
                  <div>Eligible Zones: <strong>USA &amp; Molo</strong></div>
                  <div>Condition: <strong>Exact Cash Prepared</strong></div>
                </div>
                <p className="text-[11px] text-[#6d0808]/80">
                  Pay directly upon package handoff with courier or dispatch rider during the scheduled batch arrival window.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('order')}
                className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-[11px] font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/60 rounded-lg border border-[#6d0808]/20 transition-colors cursor-pointer"
              >
                <span>Order with COD</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </section>

        {/* 5. Academic Course References & Institutional Context */}
        <section className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#6d0808]" />
            <h3 className="font-serif font-bold text-lg text-[#6d0808]">
              Academic &amp; Institutional Attribution
            </h3>
          </div>
          <div className="text-xs text-[#6d0808]/85 space-y-2 leading-relaxed">
            <p>
              <strong>Course Context:</strong> This web application serves as a student course requirement for <em>E-Commerce and E-Marketing</em>, demonstrating digital retail workflows, automated box-assortment pricing, mobile-responsive food commerce layouts, and multi-channel marketing integration.
            </p>
            <p>
              <strong>Academic Institution:</strong>{' '}
              <a
                href="https://www.usa.edu.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-[#6d0808] hover:text-[#520505] inline-flex items-center gap-1"
              >
                <span>University of San Agustin (USA)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              , General Luna St., Iloilo City, 5000 Western Visayas, Philippines.
            </p>
            <p>
              <strong>Local Culinary Heritage:</strong> Celebrating Iloilo City’s designation as a UNESCO Creative City of Gastronomy through artisanal pastry craftsmanship and homegrown confectionery entrepreneurship.
            </p>
          </div>
        </section>

      </div>

    </div>
  );
};
