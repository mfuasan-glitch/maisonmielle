import React, { useState } from 'react';
import { BoxSize, BoxSelection, PageTab } from '../types';
import { COOKIE_FLAVORS, BOX_DISCOUNT_HELPER, BOX_DISCOUNT_AMOUNT, OFFICIAL_PREORDER_WINDOW } from '../data/bakeryData';
import { Plus, Minus, Check, ArrowRight, RotateCcw, Sparkles, ShoppingBag, Cookie } from 'lucide-react';

interface BoxBuilderPageProps {
  onAddBoxToCart: (box: BoxSelection) => void;
  setActiveTab: (tab: PageTab) => void;
  initialFlavorToAdd?: string | null;
  flavorsStockState: Record<string, boolean>;
}

export const BoxBuilderPage: React.FC<BoxBuilderPageProps> = ({
  onAddBoxToCart,
  setActiveTab,
  initialFlavorToAdd,
  flavorsStockState,
}) => {
  // Box size options: 5 or 6 (GET ANY 5 COOKIES AND ENJOY ₱10 OFF!)
  const [boxSize, setBoxSize] = useState<number>(5);
  
  // Flavor counts supporting all 6 cookies: flavorId -> count
  const [flavorCounts, setFlavorCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {
      'the-classic': 0,
      'midnight-choco': 0,
      'hershey-melt': 0,
      'ruby-velvet': 0,
      'campfire': 0,
      'cookie-monster': 0,
    };
    if (initialFlavorToAdd && initial[initialFlavorToAdd] !== undefined) {
      initial[initialFlavorToAdd] = 1;
    }
    return initial;
  });

  const [giftNote, setGiftNote] = useState('');
  const [justAddedNotification, setJustAddedNotification] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // Compute total selected cookies
  const totalSelected = Object.values(flavorCounts).reduce((acc, count) => acc + count, 0);
  const remainingSlots = Math.max(0, boxSize - totalSelected);
  const isBoxFull = totalSelected === boxSize;

  // JavaScript calculation logic:
  // Base total calculated according to exact individual item prices
  const rawSubtotal = COOKIE_FLAVORS.reduce((acc, flavor) => {
    const qty = flavorCounts[flavor.id] || 0;
    return acc + (qty * flavor.price);
  }, 0);

  // Apply ₱10 discount when total item counts reach 5 or greater
  const discountApplies = totalSelected >= 5;
  const appliedDiscount = discountApplies ? BOX_DISCOUNT_AMOUNT : 0;
  const finalPrice = Math.max(0, rawSubtotal - appliedDiscount);

  // Default reference calculations for configuration display cards
  const classicFiveBase = 35 + 45 + 49 + 49 + 69; // 247
  const classicSixBase = 35 + 45 + 49 + 49 + 69 + 59; // 306

  // Increment flavor counter (allows individual piece ordering without rigid ceiling)
  const handleIncrement = (flavorId: string) => {
    const isOutOfStock = flavorsStockState[flavorId];
    if (isOutOfStock) return;
    if (totalSelected >= 24) return;

    setFlavorCounts((prev) => ({
      ...prev,
      [flavorId]: (prev[flavorId] || 0) + 1,
    }));
  };

  // Decrement flavor counter
  const handleDecrement = (flavorId: string) => {
    if ((flavorCounts[flavorId] || 0) <= 0) return;

    setFlavorCounts((prev) => ({
      ...prev,
      [flavorId]: Math.max(0, (prev[flavorId] || 0) - 1),
    }));
  };

  // Reset current selection
  const handleReset = () => {
    setFlavorCounts({
      'the-classic': 0,
      'midnight-choco': 0,
      'hershey-melt': 0,
      'ruby-velvet': 0,
      'campfire': 0,
      'cookie-monster': 0,
    });
  };

  // Preset: Chef's Balanced Curation supporting all 6 cookies
  const handleChefPreset = () => {
    if (boxSize === 5) {
      // 1 of each of 5 foundational flavors
      setFlavorCounts({
        'the-classic': 1,
        'midnight-choco': 1,
        'hershey-melt': 1,
        'ruby-velvet': 1,
        'campfire': 1,
        'cookie-monster': 0,
      });
    } else {
      // All 6 cookies including limited Halloween Cookie Monster!
      setFlavorCounts({
        'the-classic': 1,
        'midnight-choco': 1,
        'hershey-melt': 1,
        'ruby-velvet': 1,
        'campfire': 1,
        'cookie-monster': 1,
      });
    }
  };

  // Change box size (5 or 6)
  const handleChangeBoxSize = (newSize: number) => {
    setBoxSize(newSize);
  };

  // Build flattened list of selected cookies for the visual box slot representation
  const slotList: { flavorId: string; flavorName: string; image: string; color: string; price: number }[] = [];
  COOKIE_FLAVORS.forEach((flavor) => {
    const count = flavorCounts[flavor.id] || 0;
    for (let i = 0; i < count; i++) {
      slotList.push({
        flavorId: flavor.id,
        flavorName: flavor.name,
        image: flavor.image,
        color: flavor.doughColorHex,
        price: flavor.price,
      });
    }
  });

  // Finish and proceed to checkout pipeline
  const handleFinalizeBox = () => {
    if (totalSelected === 0) {
      setActiveTab('order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const newSelection: BoxSelection = {
      boxId: totalSelected >= 5 ? `BOX-${Date.now()}` : `INDIV-${Date.now()}`,
      size: totalSelected,
      flavors: { ...flavorCounts },
      customNote: giftNote.trim() || undefined,
      boxPrice: finalPrice,
      originalPrice: rawSubtotal,
      discount: appliedDiscount,
    };

    onAddBoxToCart(newSelection);
    setJustAddedNotification(true);

    setTimeout(() => {
      setJustAddedNotification(false);
      setActiveTab('order');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  // Shortcut: Skip to checkout pipeline bypassing all box counter rules
  const handleSkipToCheckout = () => {
    if (totalSelected > 0) {
      const newSelection: BoxSelection = {
        boxId: totalSelected >= 5 ? `BOX-${Date.now()}` : `INDIV-${Date.now()}`,
        size: totalSelected,
        flavors: { ...flavorCounts },
        customNote: giftNote.trim() || undefined,
        boxPrice: finalPrice,
        originalPrice: rawSubtotal,
        discount: appliedDiscount,
      };
      onAddBoxToCart(newSelection);
    }
    setActiveTab('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Interactive Box Builder</span>
            <span aria-hidden="true">·</span>
            <span>{BOX_DISCOUNT_HELPER}</span>
            <span aria-hidden="true">·</span>
            <span>Nov. 5 Dispatch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Curate a Box
          </h1>
          <p className="text-xs sm:text-sm text-[#6d0808]/85 max-w-xl mx-auto leading-relaxed">
            Customize your signature cookie assortment. Choose any 5 or 6 cookies and enjoy <strong>₱10 OFF</strong> automatically deducted from your total!
          </p>

          <div className="inline-block bg-[#faddb2]/40 border border-[#6d0808]/20 px-4 py-1.5 rounded-lg text-xs font-semibold text-[#6d0808]">
            {OFFICIAL_PREORDER_WINDOW.announcement}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step 1: Box Size Selector Strip */}
        <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 sm:p-8 mb-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
                Step 1 · Choose Box Tier
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#6d0808] mt-1">
                Select Your Box Configuration
              </h2>
              {/* Helper text update per unified master instructions */}
              <p className="text-xs font-bold text-[#6d0808] mt-1 bg-[#faddb2]/40 inline-block px-2.5 py-1 rounded border border-[#6d0808]/15">
                {BOX_DISCOUNT_HELPER}
              </p>
            </div>

            {/* Interactive Display Cards for Box Configurations */}
            <div className="flex items-center gap-3">
              {/* Box of 5 Configuration Card */}
              <button
                type="button"
                onClick={() => handleChangeBoxSize(5)}
                className={`flex-1 sm:flex-none px-6 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                  boxSize === 5
                    ? 'border-[#6d0808] bg-[#faddb2]/35 shadow-sm ring-2 ring-[#6d0808]'
                    : 'border-[#6d0808]/20 bg-white hover:bg-white/90'
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-sm font-bold text-[#6d0808]">Box of 5</span>
                  <div className="text-right">
                    <span className="text-[11px] line-through text-[#6d0808]/60 mr-1.5">
                      ₱{(boxSize === 5 && totalSelected === 5 ? rawSubtotal : classicFiveBase).toFixed(2)}
                    </span>
                    <span className="text-sm font-serif font-bold tabular-nums text-[#6d0808]">
                      ₱{(boxSize === 5 && totalSelected === 5 ? finalPrice : classicFiveBase - 10).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[#6d0808] mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6d0808]" />
                  <span>₱10 Discount Visibly Deducted</span>
                </div>
                <div className="text-[10px] text-[#6d0808]/75 mt-0.5">
                  5 Signature Cookies · Auto-Applied ₱10 OFF
                </div>
              </button>

              {/* Box of 6 Configuration Card */}
              <button
                type="button"
                onClick={() => handleChangeBoxSize(6)}
                className={`flex-1 sm:flex-none px-6 py-4 rounded-xl border text-left transition-all cursor-pointer ${
                  boxSize === 6
                    ? 'border-[#6d0808] bg-[#faddb2]/35 shadow-sm ring-2 ring-[#6d0808]'
                    : 'border-[#6d0808]/20 bg-white hover:bg-white/90'
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <span className="text-sm font-bold text-[#6d0808]">Box of 6</span>
                  <div className="text-right">
                    <span className="text-[11px] line-through text-[#6d0808]/60 mr-1.5">
                      ₱{(boxSize === 6 && totalSelected === 6 ? rawSubtotal : classicSixBase).toFixed(2)}
                    </span>
                    <span className="text-sm font-serif font-bold tabular-nums text-[#6d0808]">
                      ₱{(boxSize === 6 && totalSelected === 6 ? finalPrice : classicSixBase - 10).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] font-bold text-[#6d0808] mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6d0808]" />
                  <span>₱10 Discount Visibly Deducted</span>
                </div>
                <div className="text-[10px] text-[#6d0808]/75 mt-0.5">
                  6 Gourmet Cookies · Includes Halloween Special
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Flavor Selector Counters */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6d0808]">
                  Step 2 · Pick Your Flavors
                </span>
                {/* Instructional subtitle updated to read "Add your favorite signature cookies" (removing any ₱85 text) */}
                <h3 className="text-xl font-serif font-bold text-[#6d0808]">
                  Add your favorite signature cookies ({totalSelected}/{boxSize})
                </h3>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleChefPreset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#6d0808] bg-white hover:bg-[#faddb2]/30 border border-[#6d0808]/20 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Fills the box with Chef's signature mix"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6d0808]" />
                  <span>{boxSize === 5 ? 'Chef’s 5 Mix' : 'All 6 Flavors'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#6d0808]/80 hover:text-[#6d0808] bg-white hover:bg-[#faddb2]/30 border border-[#6d0808]/20 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  title="Clear all selections"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Flavor Counters List with Uniform Circular Image Styling */}
            <div className="space-y-3">
              {COOKIE_FLAVORS.map((flavor) => {
                const count = flavorCounts[flavor.id] || 0;
                const isOutOfStock = flavorsStockState[flavor.id] ?? flavor.isOutOfStock;
                const disableAdd = isOutOfStock || totalSelected >= 24;
                const hasError = imageErrorMap[flavor.id];

                return (
                  <div
                    key={flavor.id}
                    className={`bg-white/85 backdrop-blur-sm border rounded-xl p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs ${
                      count > 0 ? 'border-[#6d0808] ring-1 ring-[#6d0808]/30 shadow-xs' : 'border-[#6d0808]/15'
                    } ${isOutOfStock ? 'opacity-65 bg-white/40' : ''}`}
                  >
                    {/* Cookie Thumbnail & Details with Clean Seamless Formatting */}
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-[#f6f0e4] overflow-hidden p-1">
                        {!hasError ? (
                          <img
                            src={flavor.image}
                            alt={flavor.name}
                            onError={() => handleImageError(flavor.id)}
                            className="w-full h-full object-contain mx-auto transition-transform duration-300 hover:scale-105 mix-blend-multiply"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-[#f6f0e4] border border-stone-200 text-[#6d0808] p-2 text-center shadow-sm rounded-xl">
                            <Cookie className="w-8 h-8 text-[#6d0808]/70" />
                            <span className="font-serif font-bold text-[10px] mt-1">{flavor.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#6d0808]">
                            {flavor.name}
                          </h4>
                          {/* Styled Limited Release badge for Cookie Monster */}
                          {flavor.badge && (
                            <span className="text-[10px] font-bold text-white bg-[#6d0808] px-2 py-0.5 rounded uppercase tracking-wider shadow-2xs">
                              {flavor.badge}
                            </span>
                          )}
                          {isOutOfStock && (
                            <span className="text-[10px] font-bold text-white bg-[#6d0808] px-1.5 py-0.5 rounded uppercase">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6d0808]/85 font-medium line-clamp-1">
                          {flavor.tagline}
                        </p>
                        <div className="text-xs font-bold tabular-nums text-[#6d0808]">
                          ₱{flavor.price.toFixed(2)} / piece
                        </div>
                      </div>
                    </div>

                    {/* Interactive Counter Controls with vanilla JS logic */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#6d0808]/15">
                      <span className="text-xs text-[#6d0808]/80 sm:hidden font-medium">
                        Qty in box:
                      </span>

                      <div className="flex items-center border border-[#6d0808]/20 rounded-lg bg-white/95 p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleDecrement(flavor.id)}
                          disabled={count === 0}
                          className="w-8 h-8 flex items-center justify-center rounded text-[#6d0808] hover:bg-[#6d0808]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                          aria-label={`Remove one ${flavor.name}`}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="w-10 text-center font-bold text-sm tabular-nums text-[#6d0808]">
                          {count}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleIncrement(flavor.id)}
                          disabled={disableAdd}
                          className="w-8 h-8 flex items-center justify-center rounded text-[#6d0808] hover:bg-[#6d0808]/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                          aria-label={`Add one ${flavor.name}`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gift Note Customization */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 space-y-2 mt-6 shadow-xs">
              <label htmlFor="gift-note-input" className="block text-xs font-bold uppercase tracking-wider text-[#6d0808]">
                Personalized Note / Instructions (Optional)
              </label>
              <p className="text-xs text-[#6d0808]/80">
                Let us know if you'd like a personalized note card included in your box.
              </p>
              <textarea
                id="gift-note-input"
                rows={2}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="e.g., Happy birthday! Looking forward to soft moments with you."
                className="w-full text-xs p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Right Column: Visual Box Preview & Sticky Checkout Summary */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Box Status & Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[#6d0808]">
                    {totalSelected < 5 ? 'Order Selection' : 'Box Progress'}
                  </span>
                  <span className="font-bold tabular-nums text-sm text-[#6d0808]">
                    {totalSelected < 5
                      ? `${totalSelected} Individual Piece${totalSelected === 1 ? '' : 's'}`
                      : `${totalSelected} / ${Math.max(boxSize, totalSelected)} Selected`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2.5 bg-[#faddb2]/40 rounded-full overflow-hidden border border-[#6d0808]/20">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      discountApplies ? 'bg-[#6d0808]' : 'bg-[#6d0808]/70'
                    }`}
                    style={{ width: `${Math.min(100, (totalSelected / (boxSize || 5)) * 100)}%` }}
                  />
                </div>

                <div className="text-xs flex items-center justify-between text-[#6d0808]">
                  {discountApplies ? (
                    <span className="font-bold flex items-center gap-1 text-[#6d0808]">
                      <Check className="w-3.5 h-3.5" />
                      Box Tier reached · ₱10 Discount Applied!
                    </span>
                  ) : (
                    <span>
                      {totalSelected > 0 ? (
                        <>Add <strong>{Math.max(1, 5 - totalSelected)}</strong> more for ₱10 OFF box savings.</>
                      ) : (
                        <>Order individual pieces or assemble 5+ for ₱10 OFF.</>
                      )}
                    </span>
                  )}
                  <span className="text-[11px] text-[#6d0808]/70 font-semibold">
                    {totalSelected < 5 ? 'Individual Pieces' : `Box of ${Math.max(boxSize, totalSelected)}`}
                  </span>
                </div>
              </div>

              {/* Visual Box Grid Preview */}
              <div className="bg-white/60 border border-[#6d0808]/15 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#6d0808]/80 font-bold">
                  <span>Visual Layout</span>
                  <span>{Math.max(boxSize, totalSelected)} Slots</span>
                </div>

                <div
                  className={`grid gap-2.5 pt-2 ${
                    Math.max(boxSize, totalSelected) <= 5 ? 'grid-cols-5' : 'grid-cols-3 sm:grid-cols-6'
                  }`}
                >
                  {Array.from({ length: Math.max(boxSize, totalSelected) }).map((_, slotIdx) => {
                    const cookieInSlot = slotList[slotIdx];

                    return (
                      <div
                        key={slotIdx}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center p-1 transition-all text-center relative overflow-hidden ${
                          cookieInSlot
                            ? 'bg-white border border-[#6d0808] shadow-xs'
                            : 'border-2 border-dashed border-[#6d0808]/30 bg-white/40'
                        }`}
                      >
                        {cookieInSlot ? (
                          <div className="w-full h-full flex flex-col items-center justify-center relative">
                            <img
                              src={cookieInSlot.image}
                              alt={cookieInSlot.flavorName}
                              className="w-9 h-9 rounded-full object-cover shadow-2xs border border-stone-200"
                              referrerPolicy="no-referrer"
                            />
                            <span className="text-[8px] font-bold text-[#6d0808] truncate max-w-full px-0.5 mt-0.5">
                              {cookieInSlot.flavorName.split(' ')[0]}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDecrement(cookieInSlot.flavorId)}
                              className="absolute -top-1 -right-1 bg-red-100 hover:bg-red-200 text-red-700 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] cursor-pointer"
                              title="Remove from slot"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#6d0808]/50 font-mono">
                            #{slotIdx + 1}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Automatic Discount Pricing Calculation */}
              <div className="pt-2 border-t border-[#6d0808]/15 space-y-2 text-xs">
                {/* Itemized preview */}
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {COOKIE_FLAVORS.map((f) => {
                    const qty = flavorCounts[f.id] || 0;
                    if (qty <= 0) return null;
                    return (
                      <div key={f.id} className="flex justify-between text-[#6d0808]/85 text-[11px]">
                        <span>{qty}× {f.name} (₱{f.price.toFixed(2)}/pc)</span>
                        <span className="tabular-nums font-medium">₱{(qty * f.price).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[#6d0808]/85 pt-1 border-t border-[#6d0808]/10">
                  <span>Items Base Subtotal</span>
                  <span className="tabular-nums font-medium">₱{rawSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#6d0808] font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#6d0808]" />
                    <span>Box Tier Discount (5+ Cookies)</span>
                  </span>
                  <span className={`tabular-nums ${discountApplies ? 'text-emerald-800' : 'text-[#6d0808]/70'}`}>
                    {discountApplies ? '-₱10.00' : '₱0.00'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#6d0808] pt-2 border-t border-[#6d0808]/15">
                  <span>{discountApplies ? 'Total Box Price' : 'Order Total'}</span>
                  <div className="text-right">
                    {discountApplies && rawSubtotal > 0 && (
                      <span className="text-xs line-through text-[#6d0808]/50 mr-2">
                        ₱{rawSubtotal.toFixed(2)}
                      </span>
                    )}
                    <span className="font-serif text-2xl tabular-nums text-[#6d0808]">
                      ₱{finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button - Always active and clickable */}
              <button
                type="button"
                onClick={handleFinalizeBox}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md bg-[#6d0808] hover:bg-[#520505] text-white shadow-lg active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {totalSelected < 5
                    ? 'Proceed with Individual Pieces'
                    : 'Proceed with Your Curated Box'}
                </span>
                {totalSelected > 0 && (
                  <span className="font-mono text-xs opacity-90">
                    (₱{finalPrice.toFixed(2)})
                  </span>
                )}
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSkipToCheckout}
                  className="text-xs text-[#6d0808] font-bold hover:underline cursor-pointer"
                >
                  Skip to Checkout Pipeline →
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
