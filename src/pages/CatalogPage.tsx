import React, { useState } from 'react';
import { PageTab, CookieFlavor } from '../types';
import { COOKIE_FLAVORS, OFFICIAL_PREORDER_WINDOW, BOX_DISCOUNT_HELPER } from '../data/bakeryData';
import { Plus, Check, Info, Sparkles, AlertCircle, ArrowRight, ToggleLeft, ToggleRight, X, Cookie } from 'lucide-react';

interface CatalogPageProps {
  setActiveTab: (tab: PageTab) => void;
  onQuickAddFlavorToBuilder: (flavorId: string) => void;
  flavorsStockState: Record<string, boolean>; // flavorId -> isOutOfStock
  onToggleStock: (flavorId: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  setActiveTab,
  onQuickAddFlavorToBuilder,
  flavorsStockState,
  onToggleStock,
}) => {
  const [selectedFlavorModal, setSelectedFlavorModal] = useState<CookieFlavor | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const handleAddFlavor = (cookie: CookieFlavor) => {
    const isOutOfStock = flavorsStockState[cookie.id] ?? cookie.isOutOfStock;
    if (isOutOfStock) return;

    onQuickAddFlavorToBuilder(cookie.id);
    setAddedToast(cookie.name);
    setTimeout(() => {
      setAddedToast(null);
    }, 2400);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#6d0808] text-white px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 transition-all">
          <Check className="w-4 h-4 text-[#faddb2]" />
          <span>Added 1× <strong>{addedToast}</strong> to your Box Builder!</span>
          <button
            onClick={() => setActiveTab('builder')}
            className="ml-2 underline text-[#faddb2] font-semibold cursor-pointer"
          >
            View Box
          </button>
        </div>
      )}

      {/* 1. Dedicated "The Cookie Collection" Graphic Banner showing cooling rack & assorted cookie boxes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative overflow-hidden rounded-2xl shadow-xl border border-[#6d0808]/20 bg-[#f6eada] h-72 sm:h-84 md:h-96 lg:h-[420px]">
          <img
            src="/assets/aistudio/collection-banner.png"
            alt="Maisonmielle artisanal cookie collection cooling rack and gift boxes flat lay"
            className="w-full h-full object-cover object-center"
          />
          {/* Smooth, warm dark gradient overlay directly over background image and behind text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25 flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/95">
              BOUTIQUE HOMEGROWN BAKERY • ILOILO CITY
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold !text-[#f7a1a1] tracking-tight mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.75)]"
              style={{ color: '#f7a1a1' }}
            >
              The Cookie Collection
            </h1>
            <p className="text-xs sm:text-sm text-white max-w-2xl mt-2 leading-relaxed drop-shadow-xs">
              Our complete lineup of thick-set, molten-centered gourmet cookies. Crafted with browned French butter, rested dough, and rich fillings.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#faddb2] text-[#6d0808] font-bold text-xs uppercase tracking-wider rounded shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {BOX_DISCOUNT_HELPER}
              </span>
              <span className="text-xs text-white/90 font-medium drop-shadow-xs">
                {OFFICIAL_PREORDER_WINDOW.announcement}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Order Window & Delivery Information Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-4 bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl text-xs text-[#6d0808] space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <strong className="text-sm font-serif font-bold text-[#6d0808]">
                Box Discount & Delivery Guide
              </strong>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ₱10 OFF ON 5+ COOKIES
              </span>
            </div>
            <p className="text-[#6d0808]/85 leading-relaxed">
              • <strong>Box Savings:</strong> {BOX_DISCOUNT_HELPER}
            </p>
            <p className="text-[#6d0808]/85 leading-relaxed">
              • <strong>Delivery Options:</strong> {OFFICIAL_PREORDER_WINDOW.deliveryOptionsList}
            </p>
            <p className="text-[#6d0808]/85 leading-relaxed">
              • <strong>Direct Pick-Up:</strong> {OFFICIAL_PREORDER_WINDOW.pickupNote}
            </p>
          </div>

          <div className="p-4 bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl flex flex-col justify-between text-xs text-[#6d0808] shadow-2xs space-y-2">
            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <strong className="font-bold">Interactive Stock Indicator</strong>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-[#faddb2]/40 text-[#6d0808] px-2 py-0.5 rounded border border-[#6d0808]/15">
                  Nov. 5 Dispatch Batch
                </span>
              </div>
              <p className="text-[#6d0808]/75">
                Toggle stock availability to test real-time Sold Out badges and box builder guards.
              </p>
            </div>
            <div className="pt-1 flex items-center justify-between border-t border-[#6d0808]/10 text-[11px]">
              <span className="text-[#6d0808]/80">Preorder Window: Oct. 30 – Nov. 2</span>
              <button
                onClick={() => setActiveTab('builder')}
                className="font-bold text-[#6d0808] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Box Builder</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Official Product Grid with Uniform Circle Photo Styling */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COOKIE_FLAVORS.map((cookie) => {
            const isOutOfStock = flavorsStockState[cookie.id] ?? cookie.isOutOfStock;
            const hasError = imageErrorMap[cookie.id];

            return (
              <div
                key={cookie.id}
                className={`bg-white/85 backdrop-blur-sm border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 relative group shadow-sm ${
                  isOutOfStock ? 'border-red-300 opacity-85' : 'border-[#6d0808]/15 hover:shadow-xl'
                }`}
              >
                {/* Product Image Area - Seamless High-Resolution Display */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-[#f6f0e4] flex items-center justify-center p-4">
                  {!hasError ? (
                    <img
                      src={cookie.image}
                      alt={`${cookie.name} - ${cookie.tagline}`}
                      onError={() => handleImageError(cookie.id)}
                      className={`w-40 h-40 md:w-48 md:h-48 object-contain mx-auto transition-transform duration-300 group-hover:scale-105 mix-blend-multiply ${
                        isOutOfStock ? 'grayscale-30' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center bg-[#f6f0e4] border border-stone-200 text-[#6d0808] p-2 text-center shadow-sm rounded-xl">
                      <Cookie className="w-8 h-8 text-[#6d0808]/70 mb-1" />
                      <span className="font-serif font-bold text-[10px] leading-tight line-clamp-2">{cookie.name}</span>
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {/* Limited Release Burgundy Badge for Cookie Monster */}
                    {cookie.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#6d0808] text-white text-[10px] font-bold tracking-widest uppercase rounded shadow-sm border border-[#faddb2]/30">
                        <Sparkles className="w-3 h-3 text-[#faddb2]" />
                        {cookie.badge}
                      </span>
                    )}

                    {/* Stock Status Badge */}
                    {isOutOfStock ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#6d0808] text-white text-[10px] font-semibold tracking-wider uppercase rounded shadow-sm">
                        <AlertCircle className="w-3 h-3" />
                        Out of Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[#6d0808] text-[10px] font-medium tracking-wide rounded border border-[#6d0808]/15">
                        Nov. 5 Dispatch
                      </span>
                    )}
                  </div>

                  {/* Official Piece Pricing Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded text-xs font-bold tabular-nums text-[#6d0808] border border-[#6d0808]/15 shadow-xs">
                    ₱{cookie.price.toFixed(2)} / piece
                  </div>

                  {/* Info Modal Button */}
                  <button
                    onClick={() => setSelectedFlavorModal(cookie)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#6d0808] p-2 rounded-full shadow-md text-xs transition-colors cursor-pointer"
                    title="View ingredients and tasting notes"
                    aria-label={`View details for ${cookie.name}`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Body with Official Descriptions */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-2xl font-bold text-[#6d0808] group-hover:text-[#520505] transition-colors leading-snug">
                        {cookie.name}
                      </h3>
                    </div>

                    <p className="text-xs font-serif italic text-[#6d0808] font-semibold">
                      {cookie.tagline}
                    </p>

                    <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                      {cookie.description}
                    </p>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cookie.tastingNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] text-[#6d0808] bg-[#faddb2]/30 border border-[#6d0808]/15 px-2 py-0.5 rounded font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Controls */}
                  <div className="pt-4 border-t border-[#6d0808]/15 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      {/* Interactive Stock Switcher */}
                      <button
                        onClick={() => onToggleStock(cookie.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#6d0808]/80 hover:text-[#6d0808] cursor-pointer"
                        title="Simulate stock status"
                      >
                        {isOutOfStock ? (
                          <ToggleLeft className="w-4 h-4 text-red-700" />
                        ) : (
                          <ToggleRight className="w-4 h-4 text-emerald-700" />
                        )}
                        <span>{isOutOfStock ? 'Mark In Stock' : 'Mark Sold Out'}</span>
                      </button>

                      <button
                        onClick={() => setSelectedFlavorModal(cookie)}
                        className="text-[11px] text-[#6d0808] font-bold hover:underline cursor-pointer"
                      >
                        Tasting Notes
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddFlavor(cookie)}
                      disabled={isOutOfStock}
                      className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isOutOfStock
                          ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                          : 'bg-[#6d0808] hover:bg-[#520505] text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {isOutOfStock ? (
                        <span>Sold Out for Nov. 5 Batch</span>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Box (₱{cookie.price})</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Box Builder Promo Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#6d0808] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl border border-[#8a1313]">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#faddb2]">
              Signature Box Builder
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {BOX_DISCOUNT_HELPER}
            </h2>
            <p className="text-xs sm:text-sm text-[#f1f1e6]/85 max-w-xl">
              Mix and match any of our 6 gourmet cookies in the interactive builder. Choose individual pieces or curate a custom Box of 5 or more to automatically deduct ₱10 from your total.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('builder')}
            className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#6d0808] bg-[#faddb2] hover:bg-white rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-md"
          >
            Launch Interactive Box Builder
          </button>
        </div>
      </section>

      {/* 5. Flavor Detail Modal */}
      {selectedFlavorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#f6eada] border border-[#6d0808]/20 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative text-[#6d0808]">
            <button
              onClick={() => setSelectedFlavorModal(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-[#6d0808] p-1.5 rounded-full shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="h-64 bg-[#f6f0e4] relative flex items-center justify-center p-4">
              {!imageErrorMap[selectedFlavorModal.id] ? (
                <img
                  src={selectedFlavorModal.image}
                  alt={selectedFlavorModal.name}
                  className="w-44 h-44 md:w-52 md:h-52 object-contain mx-auto transition-transform duration-300 hover:scale-105 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-44 h-44 flex flex-col items-center justify-center bg-[#f6f0e4] border border-stone-200 text-[#6d0808] rounded-xl">
                  <Cookie className="w-12 h-12 stroke-1 text-[#6d0808]/70 mb-1" />
                  <span className="font-serif font-bold text-xs">{selectedFlavorModal.name}</span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-serif italic text-[#6d0808] font-bold">
                  {selectedFlavorModal.tagline}
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                    {selectedFlavorModal.name}
                  </h3>
                  {selectedFlavorModal.badge && (
                    <span className="px-2 py-0.5 bg-[#6d0808] text-white text-[10px] font-bold uppercase rounded">
                      {selectedFlavorModal.badge}
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold tabular-nums text-[#6d0808] mt-1">
                  ₱{selectedFlavorModal.price.toFixed(2)} per piece
                </div>
              </div>

              <p className="text-xs text-[#6d0808]/85 leading-relaxed">
                {selectedFlavorModal.description}
              </p>

              <div className="bg-white/80 p-4 rounded-xl border border-[#6d0808]/15 space-y-2 text-xs">
                <div>
                  <strong className="text-[#6d0808] block mb-1">Key Ingredients:</strong>
                  <div className="flex flex-wrap gap-1">
                    {selectedFlavorModal.ingredients.map((ing) => (
                      <span key={ing} className="bg-[#faddb2]/30 border border-[#6d0808]/15 px-2 py-0.5 rounded text-[#6d0808]">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#6d0808]/15">
                  <strong className="text-[#6d0808] block mb-1">Allergens:</strong>
                  <span className="text-[#6d0808]/80">
                    Contains {selectedFlavorModal.allergens.join(', ')}. Prepared in an artisanal kitchen handling dairy, chocolate, and gluten.
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedFlavorModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#6d0808]/80 hover:text-[#6d0808] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleAddFlavor(selectedFlavorModal);
                    setSelectedFlavorModal(null);
                  }}
                  disabled={flavorsStockState[selectedFlavorModal.id]}
                  className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded-lg transition-colors cursor-pointer shadow-sm"
                >
                  Add to Custom Box
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
