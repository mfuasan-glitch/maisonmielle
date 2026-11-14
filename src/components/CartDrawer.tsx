import React from 'react';
import { BoxSelection, PageTab } from '../types';
import { COOKIE_FLAVORS } from '../data/bakeryData';
import { X, Trash2, ArrowRight, ShoppingBag, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  boxes: BoxSelection[];
  onRemoveBox: (index: number) => void;
  onProceedToCheckout: () => void;
  onOpenBuilder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  boxes,
  onRemoveBox,
  onProceedToCheckout,
  onOpenBuilder,
}) => {
  if (!isOpen) return null;

  const totalAmount = boxes.reduce((sum, box) => sum + box.boxPrice, 0);

  const getFlavorName = (id: string) => {
    return COOKIE_FLAVORS.find((f) => f.id === id)?.name || id;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#f6eada] border-l border-[#6d0808]/20 text-[#6d0808] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-[#6d0808]/15 flex items-center justify-between bg-white/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#6d0808]" />
              <h2 className="text-lg font-serif font-bold text-[#6d0808]">
                Your Cookie Box Order
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#6d0808]/70 hover:text-[#6d0808] hover:bg-[#6d0808]/10 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {boxes.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#faddb2]/30 flex items-center justify-center text-[#6d0808]">
                  <Gift className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#6d0808]">
                    Your assortment box is empty
                  </h3>
                  <p className="text-xs text-[#6d0808]/80 max-w-xs mx-auto mt-1">
                    Select your favorite flavors to curate a custom 5-piece or 6-piece gourmet box (Get ₱10 OFF).
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBuilder();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-all cursor-pointer shadow-md"
                >
                  <span>Build Assortment Box</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#6d0808]/80 font-medium">
                  <span>{boxes.length} Custom {boxes.length === 1 ? 'Box' : 'Boxes'} Prepared</span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBuilder();
                    }}
                    className="text-[#6d0808] font-bold hover:underline cursor-pointer"
                  >
                    + Build Another Box
                  </button>
                </div>

                {boxes.map((box, idx) => (
                  <div
                    key={box.boxId || idx}
                    className="bg-white/90 border border-[#6d0808]/15 rounded-lg p-4 space-y-3 relative group shadow-2xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6d0808] bg-[#faddb2]/30 px-2 py-0.5 rounded border border-[#6d0808]/15">
                          {box.size >= 5 ? `${box.size}-Piece Assortment` : `${box.size}× Individual Piece${box.size > 1 ? 's' : ''}`}
                        </span>
                        <div className="text-sm font-serif font-bold text-[#6d0808] mt-1">
                          {box.size >= 5 ? 'Signature Gift Box' : 'Individual Cookie Order'}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold tabular-nums text-[#6d0808]">
                          ₱{box.boxPrice.toLocaleString()}
                        </span>
                        <button
                          onClick={() => onRemoveBox(idx)}
                          className="block text-[#6d0808]/60 hover:text-red-700 ml-auto mt-1 p-1 cursor-pointer transition-colors"
                          title="Remove this box"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Breakdown of Flavors in Box */}
                    <div className="bg-[#faddb2]/20 p-2.5 rounded text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#6d0808] block">
                        Included Flavors:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {Object.entries(box.flavors).map(([flavorId, count]) => {
                          if (count <= 0) return null;
                          return (
                            <span
                              key={flavorId}
                              className="text-xs bg-white text-[#6d0808] border border-[#6d0808]/15 px-2 py-0.5 rounded font-medium"
                            >
                              <strong>{count}×</strong> {getFlavorName(flavorId)}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout CTA */}
          {boxes.length > 0 && (
            <div className="p-6 border-t border-[#6d0808]/15 bg-white/90 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6d0808]/80 font-medium">Subtotal</span>
                <span className="text-lg font-bold font-serif tabular-nums text-[#6d0808]">
                  ₱{totalAmount.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-[#6d0808]/75">
                Delivery to USA & Molo (Free drop-off), Outside Locations (+₱20 / courier), or Direct Pick-Up.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 px-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-all shadow-md cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
