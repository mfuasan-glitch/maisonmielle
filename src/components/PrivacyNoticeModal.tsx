import React from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyNoticeModal: React.FC<PrivacyNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-[#f6eada] border border-[#6d0808]/20 rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl text-[#6d0808] max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <div className="flex items-start justify-between border-b border-[#6d0808]/15 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[#6d0808]/10 flex items-center justify-center text-[#6d0808]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="privacy-modal-title" className="text-xl font-serif font-bold text-[#6d0808]">
                Privacy Notice & Regulatory Compliance
              </h2>
              <p className="text-xs text-[#6d0808]/75">
                Republic Act No. 10173 & Republic Act No. 11967
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#6d0808]/70 hover:text-[#6d0808] p-1.5 rounded hover:bg-[#6d0808]/10 transition-colors cursor-pointer"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#6d0808]/90 leading-relaxed">
          <div className="bg-white/90 p-4 rounded-lg border border-[#6d0808]/15 space-y-2">
            <div className="flex items-center gap-2 text-[#6d0808] font-bold text-xs tracking-wider uppercase">
              <FileText className="w-4 h-4 shrink-0" />
              <span>1. Data Privacy Act of 2012 (RA 10173)</span>
            </div>
            <p>
              Maisonmielle is committed to safeguarding personal information collected through our web storefront and pre-order pipelines. In strict compliance with the <strong>Philippine Data Privacy Act of 2012 (Republic Act No. 10173)</strong>, its Implementing Rules and Regulations (IRR), and National Privacy Commission (NPC) issuances:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#6d0808]/85">
              <li><strong>Information Collected:</strong> Full customer name, verified mobile phone number, delivery address (Iloilo City, Pavia, or Santa Barbara), and payment confirmation identifiers.</li>
              <li><strong>Purpose of Processing:</strong> Exclusive dispatch logistics, order confirmation notifications, kitchen batch preparation, and Mielle Rewards tracking.</li>
              <li><strong>Data Retention & Security:</strong> Customer records are securely encrypted and retained only as long as necessary for tax compliance and customer service warranties. We never sell, rent, or lease personal identifiers to third-party marketing entities.</li>
              <li><strong>Data Subject Rights:</strong> You retain the full statutory right to access, rectify, object, or request erasure of your personal data by contacting our team.</li>
            </ul>
          </div>

          <div className="bg-white/90 p-4 rounded-lg border border-[#6d0808]/15 space-y-2">
            <div className="flex items-center gap-2 text-[#6d0808] font-bold text-xs tracking-wider uppercase">
              <Lock className="w-4 h-4 shrink-0" />
              <span>2. Internet Transactions Act of 2023 (RA 11967)</span>
            </div>
            <p>
              In adherence to the <strong>Internet Transactions Act of 2023</strong> enacted to promote a safe and fair digital commerce ecosystem under the Department of Trade and Industry (DTI):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-[#6d0808]/85">
              <li><strong>Merchant Transparency:</strong> Maisonmielle is a homegrown registered bakery enterprise operating out of Iloilo, Philippines, headed by founder Marielle Faith P. Ortencio.</li>
              <li><strong>Price & Product Truthfulness:</strong> All stated cookie prices in Philippine Pesos (₱) represent final consumer costs excluding standard localized courier delivery fees clearly itemized before checkout.</li>
              <li><strong>Freshness Warranty & Resolution:</strong> Due to the perishable nature of fresh gourmet bakes, any discrepancy, transit damage, or quality concern reported within 6 hours of courier receipt is addressed promptly with replacement or store credit.</li>
            </ul>
          </div>

          <div className="bg-[#faddb2]/30 p-3.5 rounded-lg border border-[#6d0808]/15 text-xs text-[#6d0808] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#6d0808] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#6d0808]">Inquiries & Data Officer:</strong> For any privacy-related questions or data deletion requests, email our Privacy Desk at <span className="underline font-bold text-[#6d0808]">privacy@maisonmielle.ph</span> or contact <span className="font-bold">+63 917 842 9102</span>.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#6d0808]/15 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-colors cursor-pointer shadow-sm"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
