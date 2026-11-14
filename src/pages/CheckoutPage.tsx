import React, { useState } from 'react';
import { BoxSelection, OrderFormData, ConfirmedOrder, DeliveryZone, PageTab } from '../types';
import { DELIVERY_ZONES, UPCOMING_BATCHES, COOKIE_FLAVORS } from '../data/bakeryData';
import { Check, ShieldCheck, MapPin, CreditCard, Truck, Calendar, Sparkles, AlertCircle, ArrowLeft, Download, Printer, Instagram, Facebook, ExternalLink } from 'lucide-react';

interface CheckoutPageProps {
  boxes: BoxSelection[];
  onAddDefaultBox: (size: 5 | 6) => void;
  onClearCart: () => void;
  setActiveTab: (tab: PageTab) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  boxes,
  onAddDefaultBox,
  onClearCart,
  setActiveTab,
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    contactNumber: '',
    deliveryZone: 'USA (University of San Agustin)',
    specificAddress: '',
    deliveryBatch: UPCOMING_BATCHES[0].label,
    paymentMethod: 'GCash',
    specialInstructions: '',
  });

  const [paymentRefNumber, setPaymentRefNumber] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number; description: string } | null>(null);
  const [voucherError, setVoucherError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  // Delivery zone details
  const activeZoneConfig = DELIVERY_ZONES.find((z) => z.zone === formData.deliveryZone) || DELIVERY_ZONES[0];
  const deliveryFee = activeZoneConfig.fee;

  // Subtotal calculation
  const subtotal = boxes.reduce((acc, box) => acc + box.boxPrice, 0);
  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const getFlavorName = (id: string) => {
    return COOKIE_FLAVORS.find((f) => f.id === id)?.name || id;
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    const code = voucherCode.trim().toUpperCase();

    if (code === 'SOFTMOMENTS10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount({
        code: 'SOFTMOMENTS10',
        amount: discount,
        description: '10% Bakers Club Welcome Discount',
      });
    } else if (code === 'ILOILOFREESHIP') {
      setAppliedDiscount({
        code: 'ILOILOFREESHIP',
        amount: deliveryFee,
        description: 'Free Local Delivery in Iloilo',
      });
    } else {
      setVoucherError('Invalid voucher code. Try "SOFTMOMENTS10" or "ILOILOFREESHIP"');
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.contactNumber.trim() || formData.contactNumber.replace(/\D/g, '').length < 10) {
      errors.contactNumber = 'Please provide a valid 11-digit Philippine mobile number (e.g. 0917 123 4567)';
    }
    if (!formData.specificAddress.trim()) {
      errors.specificAddress = 'Specific street address, barangay, or landmark is required';
    }
    if (boxes.length === 0) {
      errors.cart = 'Please add at least one cookie box to your order';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `MM-${Date.now().toString().slice(-6)}`;
      const order: ConfirmedOrder = {
        orderNumber,
        date: new Date().toLocaleDateString('en-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: boxes.map((box, i) => ({
          id: `ITEM-${i + 1}`,
          boxSize: box.size,
          price: box.boxPrice,
          flavorSummary: Object.entries(box.flavors)
            .filter(([_, qty]) => qty > 0)
            .map(([fid, qty]) => `${qty}× ${getFlavorName(fid)}`)
            .join(', '),
          flavors: box.flavors,
        })),
        customer: { ...formData },
        subtotal,
        deliveryFee,
        total: grandTotal,
      };

      setConfirmedOrder(order);
      setIsSubmitting(false);
      onClearCart();
    }, 900);
  };

  // Order Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white/90 backdrop-blur-md border border-[#6d0808]/20 rounded-2xl p-8 sm:p-10 shadow-xl text-[#6d0808] space-y-8">
          
          <div className="text-center space-y-3 pb-6 border-b border-[#6d0808]/15">
            <div className="w-14 h-14 bg-[#faddb2]/40 text-[#6d0808] rounded-full flex items-center justify-center mx-auto border border-[#6d0808]/20">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6d0808]">
              Pre-Order Reserved
            </span>
            <h1 className="text-3xl font-serif font-bold text-[#6d0808]">
              Thank you, {confirmedOrder.customer.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xs text-[#6d0808]/80 max-w-md mx-auto">
              Your gourmet cookie reservation has been recorded into our bakery oven dispatch system.
            </p>
            <div className="inline-block bg-[#faddb2]/30 border border-[#6d0808]/20 px-4 py-2 rounded text-xs font-mono font-bold text-[#6d0808]">
              Order #{confirmedOrder.orderNumber}
            </div>
          </div>

          {/* Receipt Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
              Order Summary
            </h3>

            <div className="space-y-3">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="bg-white/80 p-4 rounded-lg border border-[#6d0808]/15 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-sm text-[#6d0808]">
                    <span>
                      {item.boxSize >= 5
                        ? `${item.boxSize}-Piece Signature Gift Box`
                        : `${item.boxSize}× Individual Cookie${item.boxSize > 1 ? 's' : ''}`}
                    </span>
                    <span className="font-serif tabular-nums text-[#6d0808]">₱{item.price.toLocaleString()}</span>
                  </div>
                  <div className="text-[#6d0808]/80">
                    {item.flavorSummary}
                  </div>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="pt-2 border-t border-[#6d0808]/15 space-y-1.5 text-xs text-[#6d0808]/85">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums">₱{confirmedOrder.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Delivery ({confirmedOrder.customer.deliveryZone})</span>
                <span className="tabular-nums">₱{confirmedOrder.deliveryFee.toLocaleString()}</span>
              </div>
              {appliedDiscount && (
                <div className="flex justify-between text-[#6d0808] font-medium">
                  <span>Discount ({appliedDiscount.code})</span>
                  <span className="tabular-nums">-₱{appliedDiscount.amount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#6d0808] pt-2 border-t border-[#6d0808]/15">
                <span>Total Amount</span>
                <span className="font-serif text-2xl tabular-nums text-[#6d0808]">
                  ₱{confirmedOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white/70 p-4 rounded-lg border border-[#6d0808]/15">
            <div>
              <strong className="text-[#6d0808] block mb-1">Delivery Destination:</strong>
              <div className="text-[#6d0808]/85 space-y-0.5">
                <div>{confirmedOrder.customer.specificAddress}</div>
                <div>{confirmedOrder.customer.deliveryZone}, Western Visayas</div>
                <div className="pt-1 font-semibold text-[#6d0808]">{confirmedOrder.customer.deliveryBatch}</div>
              </div>
            </div>

            <div>
              <strong className="text-[#6d0808] block mb-1">Payment Method:</strong>
              <div className="text-[#6d0808]/85 space-y-0.5">
                <div className="font-bold text-[#6d0808]">{confirmedOrder.customer.paymentMethod}</div>
                {confirmedOrder.customer.paymentMethod === 'Cash on Delivery' ? (
                  <div>Please prepare exact cash (₱{confirmedOrder.total}) upon rider arrival.</div>
                ) : (
                  <div>
                    Payment verification underway. Send screenshot to <strong>0917 842 9102</strong> or send via{' '}
                    <a
                      href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-[#6d0808] hover:text-[#520505] inline-flex items-center gap-0.5"
                    >
                      Instagram (@maisonmielle.ph)
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://www.facebook.com/profile.php?id=100065012409586"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-[#6d0808] hover:text-[#520505] inline-flex items-center gap-0.5"
                    >
                      Facebook Messenger
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-[#6d0808]/80 hover:text-[#6d0808] font-medium cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Receipt</span>
            </button>

            <button
              onClick={() => setActiveTab('home')}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-colors cursor-pointer"
            >
              Return to Bakery Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header - Transparent for smooth gradient background */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Iloilo Local Checkout</span>
            <span aria-hidden="true">·</span>
            <span>Batch Reservation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Order & Delivery Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#6d0808]/85 max-w-xl mx-auto leading-relaxed">
            Delivery Locations: USA, Molo. For outside locations: Add ₱20.00 or self-arranged courier. Direct Pick-Up: DM for exact location coordinates on{' '}
            <a
              href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-[#6d0808] hover:text-[#520505] inline-flex items-center gap-0.5"
            >
              Instagram (@maisonmielle.ph)
              <ExternalLink className="w-3 h-3 inline" />
            </a>{' '}
            or{' '}
            <a
              href="https://www.facebook.com/profile.php?id=100065012409586"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-[#6d0808] hover:text-[#520505] inline-flex items-center gap-0.5"
            >
              Facebook
              <ExternalLink className="w-3 h-3 inline" />
            </a>.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {boxes.length === 0 ? (
          <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-10 text-center max-w-xl mx-auto space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#faddb2]/30 text-[#6d0808] flex items-center justify-center mx-auto border border-[#6d0808]/20">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#6d0808]">
                No Cookie Boxes in Your Order Yet
              </h2>
              <p className="text-xs text-[#6d0808]/80 mt-1">
                Curate a custom Box of 5 or 6 gourmet cookies (GET ANY 5 COOKIES AND ENJOY ₱10 OFF!), or add our Chef&apos;s signature mix in one tap.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setActiveTab('builder')}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-colors cursor-pointer shadow-sm"
              >
                Open Custom Box Builder
              </button>
              <button
                onClick={() => onAddDefaultBox(5)}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#6d0808] bg-white border border-[#6d0808] hover:bg-white/80 rounded transition-colors cursor-pointer shadow-2xs"
              >
                Quick Add: Chef&apos;s Box of 5 (₱237 · Save ₱10)
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Checkout Inputs */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Contact Info */}
                <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6d0808] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="font-serif font-bold text-lg text-[#6d0808]">Customer Contact Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#6d0808] mb-1">
                        Full Name <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Marielle Ortencio"
                        className="w-full text-xs p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] text-red-700 mt-1">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6d0808] mb-1">
                        Mobile Number (Philippine) <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="0917 123 4567"
                        className="w-full text-xs p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                      />
                      {formErrors.contactNumber && (
                        <p className="text-[11px] text-red-700 mt-1">{formErrors.contactNumber}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 2. Delivery Address */}
                <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6d0808] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="font-serif font-bold text-lg text-[#6d0808]">Delivery Zone & Address</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#6d0808] mb-1">
                        Select Delivery Coverage Zone <span className="text-red-700">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {DELIVERY_ZONES.map((zoneItem) => (
                          <button
                            key={zoneItem.zone}
                            type="button"
                            onClick={() => setFormData({ ...formData, deliveryZone: zoneItem.zone })}
                            className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                              formData.deliveryZone === zoneItem.zone
                                ? 'border-[#6d0808] bg-[#faddb2]/30 ring-2 ring-[#6d0808]'
                                : 'border-[#6d0808]/20 bg-white hover:bg-white/80'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-[#6d0808]">{zoneItem.zone}</span>
                              <span className="text-xs font-bold text-[#6d0808]">
                                {zoneItem.fee === 0 ? 'FREE' : `+₱${zoneItem.fee}.00`}
                              </span>
                            </div>
                            <div className="text-[11px] font-medium text-[#6d0808]/90 mt-1">{zoneItem.note}</div>
                            <div className="text-[10px] text-[#6d0808]/70 mt-0.5">{zoneItem.districts.join(', ')}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6d0808] mb-1">
                        Detailed Street Address & Landmark <span className="text-red-700">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={formData.specificAddress}
                        onChange={(e) => setFormData({ ...formData, specificAddress: e.target.value })}
                        placeholder="House/Unit #, Street, Subdivision, Barangay, Landmark (e.g. Near Festive Walk / CPU / Pavia Plaza)"
                        className="w-full text-xs p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808] resize-none"
                      />
                      {formErrors.specificAddress && (
                        <p className="text-[11px] text-red-700 mt-1">{formErrors.specificAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#6d0808] mb-1">
                        Target Oven Dispatch Batch Date
                      </label>
                      <select
                        value={formData.deliveryBatch}
                        onChange={(e) => setFormData({ ...formData, deliveryBatch: e.target.value })}
                        className="w-full text-xs p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                      >
                        {UPCOMING_BATCHES.map((batch) => (
                          <option key={batch.id} value={batch.label}>
                            {batch.label} — {batch.date} ({batch.status})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#6d0808] text-white text-xs font-bold flex items-center justify-center">3</span>
                    <h3 className="font-serif font-bold text-lg text-[#6d0808]">Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['GCash', 'Maya', 'Cash on Delivery'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          formData.paymentMethod === method
                            ? 'border-[#6d0808] bg-[#faddb2]/30 ring-2 ring-[#6d0808]'
                            : 'border-[#6d0808]/20 bg-white hover:bg-white/80'
                        }`}
                      >
                        <div className="font-bold text-xs text-[#6d0808]">{method}</div>
                        <div className="text-[10px] text-[#6d0808]/75 mt-0.5">
                          {method === 'GCash' && 'Instant QR or Mobile Transfer'}
                          {method === 'Maya' && 'Maya Wallet / Card Transfer'}
                          {method === 'Cash on Delivery' && 'Pay to rider upon arrival'}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Payment Details Drawer based on method */}
                  <div className="p-4 rounded-lg bg-white/70 border border-[#6d0808]/15 text-xs space-y-2">
                    {formData.paymentMethod === 'GCash' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#6d0808]">GCash Account:</strong>
                          <span className="font-mono font-bold text-sm text-[#6d0808]">0917 842 9102</span>
                        </div>
                        <div className="text-[#6d0808]/85">
                          Account Name: <strong>Maisonmielle Bakery (M. Ortencio)</strong>
                        </div>
                        <div className="pt-1 flex items-center gap-1.5 flex-wrap text-[11px] text-[#6d0808]">
                          <span>Send verification receipt via:</span>
                          <a
                            href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold underline text-[#6d0808] hover:text-[#520505]"
                          >
                            <Instagram className="w-3 h-3 text-rose-600" />
                            <span>@maisonmielle.ph</span>
                          </a>
                          <span>or</span>
                          <a
                            href="https://www.facebook.com/profile.php?id=100065012409586"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold underline text-[#6d0808] hover:text-[#520505]"
                          >
                            <Facebook className="w-3 h-3 text-blue-600" />
                            <span>Facebook Messenger</span>
                          </a>
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#6d0808] mb-1">
                            GCash Reference No. (Optional / Can follow up)
                          </label>
                          <input
                            type="text"
                            value={paymentRefNumber}
                            onChange={(e) => setPaymentRefNumber(e.target.value)}
                            placeholder="e.g. 10098234812"
                            className="w-full text-xs p-2 rounded border border-[#6d0808]/20 bg-white text-[#6d0808]"
                          />
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'Maya' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#6d0808]">Maya Wallet:</strong>
                          <span className="font-mono font-bold text-sm text-[#6d0808]">0917 842 9102</span>
                        </div>
                        <div className="text-[#6d0808]/85">
                          Account Name: <strong>Marielle Faith P. Ortencio</strong>
                        </div>
                        <div className="pt-1 flex items-center gap-1.5 flex-wrap text-[11px] text-[#6d0808]">
                          <span>Send verification receipt via:</span>
                          <a
                            href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold underline text-[#6d0808] hover:text-[#520505]"
                          >
                            <Instagram className="w-3 h-3 text-rose-600" />
                            <span>@maisonmielle.ph</span>
                          </a>
                          <span>or</span>
                          <a
                            href="https://www.facebook.com/profile.php?id=100065012409586"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold underline text-[#6d0808] hover:text-[#520505]"
                          >
                            <Facebook className="w-3 h-3 text-blue-600" />
                            <span>Facebook Messenger</span>
                          </a>
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#6d0808] mb-1">
                            Maya Transaction Reference
                          </label>
                          <input
                            type="text"
                            value={paymentRefNumber}
                            onChange={(e) => setPaymentRefNumber(e.target.value)}
                            placeholder="e.g. MY-84012"
                            className="w-full text-xs p-2 rounded border border-[#6d0808]/20 bg-white text-[#6d0808]"
                          />
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'Cash on Delivery' && (
                      <div className="space-y-1 text-[#6d0808]/85">
                        <strong className="text-[#6d0808] block">Cash on Delivery (COD) Policy:</strong>
                        <p>
                          Our courier will collect <strong>₱{grandTotal.toLocaleString()}</strong> in exact cash upon turnover. Please prepare bills to minimize rider delays.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Submission */}
              <div className="lg:col-span-5 sticky top-28 space-y-6">
                <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-6 shadow-sm space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-[#6d0808]/15 pb-3">
                    <h3 className="font-serif font-bold text-lg text-[#6d0808]">
                      Your Order Summary
                    </h3>
                    <span className="text-xs text-[#6d0808]/75">
                      {boxes.length} {boxes.length === 1 ? 'Box' : 'Boxes'}
                    </span>
                  </div>

                  {/* Itemized list */}
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {boxes.map((box, i) => (
                      <div key={box.boxId || i} className="bg-white/80 p-3 rounded-lg border border-[#6d0808]/15 text-xs space-y-1">
                        <div className="flex justify-between font-bold text-[#6d0808]">
                          <span>
                            {box.size >= 5
                              ? `${box.size}-Piece Assortment Box`
                              : `${box.size}× Individual Cookie${box.size > 1 ? 's' : ''}`}
                          </span>
                          <span className="font-serif text-sm tabular-nums text-[#6d0808]">
                            ₱{box.boxPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6d0808]/75">
                          {Object.entries(box.flavors)
                            .filter(([_, q]) => q > 0)
                            .map(([fid, q]) => `${q}× ${getFlavorName(fid)}`)
                            .join(', ')}
                        </div>
                        {box.discount > 0 && (
                          <div className="text-[10px] font-semibold text-emerald-800">
                            ₱{box.discount} Box Discount Applied
                          </div>
                        )}
                        {box.customNote && (
                          <div className="text-[10px] italic text-[#6d0808] border-t border-[#6d0808]/15 pt-1">
                            Card Note: &ldquo;{box.customNote}&rdquo;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Voucher Input */}
                  <div className="pt-2 border-t border-[#6d0808]/15">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Promo code (e.g. SOFTMOMENTS10)"
                        className="flex-1 text-xs p-2.5 rounded border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] text-[#6d0808] uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyVoucher}
                        className="px-3 py-2 text-xs font-semibold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/50 border border-[#6d0808]/20 rounded cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {voucherError && <p className="text-[10px] text-red-700 mt-1">{voucherError}</p>}
                    {appliedDiscount && (
                      <p className="text-[11px] text-emerald-800 mt-1 flex items-center gap-1 font-semibold">
                        <Check className="w-3 h-3" />
                        {appliedDiscount.description} (-₱{appliedDiscount.amount})
                      </p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 text-xs text-[#6d0808]/85 pt-2 border-t border-[#6d0808]/15">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="tabular-nums font-semibold">₱{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee ({formData.deliveryZone})</span>
                      <span className="tabular-nums font-semibold">₱{deliveryFee.toLocaleString()}</span>
                    </div>
                    {appliedDiscount && (
                      <div className="flex justify-between text-[#6d0808]">
                        <span>Voucher Discount</span>
                        <span className="tabular-nums font-semibold">-₱{appliedDiscount.amount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#6d0808] pt-2 border-t border-[#6d0808]/15">
                      <span>Grand Total</span>
                      <span className="font-serif text-2xl tabular-nums text-[#6d0808]">
                        ₱{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Compliance Notice */}
                  <div className="text-[11px] text-[#6d0808]/80 flex items-start gap-1.5 leading-relaxed bg-[#faddb2]/20 p-2.5 rounded border border-[#6d0808]/15">
                    <ShieldCheck className="w-4 h-4 text-[#6d0808] shrink-0 mt-0.5" />
                    <span>
                      Protected under Philippine RA 10173 (Data Privacy) & RA 11967 (Internet Transactions Act of 2023).
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Reserving Batch Slot...</span>
                    ) : (
                      <span>Confirm Pre-Order (₱{grandTotal.toLocaleString()})</span>
                    )}
                  </button>

                </div>
              </div>

            </div>
          </form>
        )}

      </div>

    </div>
  );
};
