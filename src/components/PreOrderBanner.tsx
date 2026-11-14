import React from 'react';
import { Sparkles, ArrowRight, X, Calendar, Clock } from 'lucide-react';
import { OFFICIAL_PREORDER_WINDOW } from '../data/bakeryData';

interface PreOrderBannerProps {
  onOrderNow: () => void;
}

export const PreOrderBanner: React.FC<PreOrderBannerProps> = ({ onOrderNow }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Pre-order announcement" className="bg-[#6d0808] text-[#f1f0e5] py-2.5 px-4 transition-all shadow-md border-b border-black/10">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 font-medium text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 bg-[#faddb2] text-[#6d0808] px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase shrink-0">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Pre-Order Window</span>
          </span>
          <span className="font-bold tracking-wide text-white">
            {OFFICIAL_PREORDER_WINDOW.announcement}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={onOrderNow}
            className="inline-flex items-center gap-1.5 font-bold text-[#faddb2] hover:text-white underline decoration-[#faddb2] underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Preorder Your Box (₱10 OFF)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/70 hover:text-white p-1 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
