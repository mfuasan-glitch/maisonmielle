import React, { useState } from 'react';
import { PageTab } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Sparkles, Instagram, Facebook, ExternalLink, GraduationCap } from 'lucide-react';

interface ContactPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding Favors',
    estimatedCookies: '48-72 Cookies (4-6 Boxes)',
    eventDate: '',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `MM-EVT-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(ref);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner - Transparent for smooth gradient */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Bulk Orders &amp; Event Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Iloilo &amp; Western Visayas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Say Hello
          </h1>
          <p className="text-sm sm:text-base text-[#6d0808]/85 max-w-xl mx-auto leading-relaxed">
            Weddings, corporate giftings, birthdays, and cafe wholesale partnerships. We craft personalized gourmet cookie assortments tailored to your momentous gatherings.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Bakery Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
                  The Bakery Kitchen
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#6d0808] mt-1">
                  Connect with Maisonmielle
                </h3>
                <p className="text-xs text-[#6d0808]/80 mt-1 leading-relaxed">
                  Founder Marielle and our artisan baking team are always glad to assist with customized wedding favors and custom-ribbon gift boxes.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#6d0808]/85">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#faddb2]/30 text-[#6d0808] flex items-center justify-center shrink-0 border border-[#6d0808]/15">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#6d0808]">Boutique Kitchen & Dispatch Base</strong>
                    <span>Iloilo City, Western Visayas, Philippines</span>
                    <span className="block text-[11px] text-[#6d0808]/75 mt-0.5">
                      Serving Iloilo City, Pavia, and Santa Barbara
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#faddb2]/30 text-[#6d0808] flex items-center justify-center shrink-0 border border-[#6d0808]/15">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#6d0808]">Concierge Phone & GCash</strong>
                    <span className="font-bold">+63 917 842 9102</span>
                    <span className="block text-[11px] text-[#6d0808]/75 mt-0.5">Available Mon–Sun 9:00 AM – 7:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#faddb2]/30 text-[#6d0808] flex items-center justify-center shrink-0 border border-[#6d0808]/15">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#6d0808]">Email Inquiries</strong>
                    <span className="font-bold">hello@maisonmielle.ph</span>
                    <span className="block text-[11px] text-[#6d0808]/75 mt-0.5">Responses typically sent within 4 hours</span>
                  </div>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="p-4 bg-[#f6eada]/70 rounded-xl border border-[#6d0808]/15 space-y-3 shadow-2xs">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808] block">
                  Official Social Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="https://www.instagram.com/maisonmielle.ph?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#6d0808]/20 hover:border-[#6d0808] text-[#6d0808] transition-all font-semibold shadow-2xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                        <Instagram className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-bold">@maisonmielle.ph</div>
                        <div className="text-[9px] text-[#6d0808]/75">Instagram</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6d0808]/60 group-hover:text-[#6d0808]" />
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=100065012409586"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#6d0808]/20 hover:border-[#6d0808] text-[#6d0808] transition-all font-semibold shadow-2xs group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                        <Facebook className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-bold">Maisonmielle</div>
                        <div className="text-[9px] text-[#6d0808]/75">Facebook Page</div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#6d0808]/60 group-hover:text-[#6d0808]" />
                  </a>
                </div>
              </div>

              {/* Lead Time Note */}
              <div className="p-4 bg-white/70 rounded-xl border border-[#6d0808]/15 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#6d0808] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Catering Lead Times</span>
                </div>
                <p className="text-[11px] text-[#6d0808]/85 leading-relaxed">
                  For bulk orders exceeding 50 cookies, we recommend booking at least <strong>5 to 7 days in advance</strong> to accommodate our 36-hour dough fermentation ritual.
                </p>
              </div>

              {/* Course Requirement Disclaimer */}
              <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-300 text-[11px] text-[#6d0808] space-y-0.5">
                <div className="font-bold flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#6d0808]" />
                  <span>Academic Course Project Notice</span>
                </div>
                <p className="leading-snug">
                  Disclaimer: This website is a course requirement for E-Commerce and E-Marketing only.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Bulk Inquiry Form */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 sm:p-10 shadow-sm">
            {submittedRef ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#faddb2]/30 text-[#6d0808] rounded-full flex items-center justify-center mx-auto border border-[#6d0808]/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#6d0808]">
                  Inquiry Received
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                  Thank you for thinking of Maisonmielle!
                </h3>
                <p className="text-xs text-[#6d0808]/85 max-w-md mx-auto leading-relaxed">
                  Marielle will personally review your event requirements and message you on WhatsApp/Viber or email within 24 hours with custom pricing and flavor samples.
                </p>
                <div className="inline-block bg-[#faddb2]/30 border border-[#6d0808]/20 px-4 py-2 rounded text-xs font-mono font-bold text-[#6d0808]">
                  Inquiry Reference: #{submittedRef}
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        eventType: 'Wedding Favors',
                        estimatedCookies: '48-72 Cookies (4-6 Boxes)',
                        eventDate: '',
                        notes: '',
                      });
                    }}
                    className="text-xs font-bold text-[#6d0808] underline cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
                    Event Questionnaire
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#6d0808] mt-0.5 mb-4">
                    Tell us about your soft celebration
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Your Full Name <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sofia Ramirez"
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Contact Number <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0917 123 4567"
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Email Address <span className="text-red-700">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sofia@gmail.com"
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Nature of Event / Inquiry
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] text-[#6d0808]"
                    >
                      <option value="Wedding Favors">Wedding Favors & Souvenirs</option>
                      <option value="Corporate Gifting">Corporate Gifting & Holiday Boxes</option>
                      <option value="Birthday & Intimate Gathering">Birthday & Special Milestone</option>
                      <option value="Cafe Wholesale">Cafe / Specialty Coffee Wholesale</option>
                      <option value="Press / Influencer Box">Media / Creative Collaboration</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Estimated Cookie Quantity
                    </label>
                    <select
                      value={formData.estimatedCookies}
                      onChange={(e) => setFormData({ ...formData, estimatedCookies: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] text-[#6d0808]"
                    >
                      <option value="24-36 Cookies (2-3 Boxes)">24–36 Cookies (Small Gathering)</option>
                      <option value="48-72 Cookies (4-6 Boxes)">48–72 Cookies (Recommended Event Tier)</option>
                      <option value="100-150 Cookies">100–150 Cookies (Full Wedding / Corporate)</option>
                      <option value="200+ Cookies">200+ Cookies (Grand Scale Celebration)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#6d0808] font-semibold mb-1">
                      Target Event Date
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] text-[#6d0808]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6d0808] font-semibold mb-1">
                    Customization Details, Packaging Themes or Inquiries
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your event theme, custom ribbon color preferences, favorite flavors, or venue delivery details in Iloilo..."
                    className="w-full p-3 rounded-lg border border-[#6d0808]/20 bg-white focus:outline-none focus:border-[#6d0808] focus:ring-1 focus:ring-[#6d0808] text-[#6d0808] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Transmitting Inquiry...' : 'Submit Bulk & Event Inquiry'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
