import React, { useState } from 'react';
import { PageTab } from '../types';
import { MOCK_MEMBER } from '../data/bakeryData';
import { Award, Gift, Sparkles, Check, ArrowRight, Copy, Star, Crown, Heart, UserPlus, LogIn, ChevronRight } from 'lucide-react';

interface BakersClubPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const BakersClubPage: React.FC<BakersClubPageProps> = ({ setActiveTab }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [member, setMember] = useState(MOCK_MEMBER);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Registration form inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Simulating point increments
  const handleEarnPoints = (amount: number, reason: string) => {
    setMember((prev: any) => {
      const newPoints = prev.points + amount;
      const newToNext = Math.max(0, prev.pointsToNextTier - amount);
      return {
        ...prev,
        points: newPoints,
        pointsToNextTier: newToNext,
        recentActivity: [
          {
            id: `act-${Date.now()}`,
            date: 'Today',
            description: reason,
            pointsDelta: +amount,
          },
          ...prev.recentActivity,
        ],
      };
    });
  };

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;

    setMember({
      ...MOCK_MEMBER,
      id: `MM-${Math.floor(10000 + Math.random() * 90000)}`,
      name: regName,
      email: regEmail || 'member@maisonmielle.ph',
      phone: regPhone,
      points: 100, // 100 Welcome points!
      pointsToNextTier: 200,
      memberTier: 'Flour & Honey',
      recentActivity: [
        {
          id: `act-${Date.now()}`,
          date: 'Today',
          description: 'Welcome Bonus for joining Mielle Rewards & Bakers Club',
          pointsDelta: +100,
        },
      ],
    });
    setIsLoggedIn(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner - Transparent */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Mielle Rewards</span>
            <span aria-hidden="true">·</span>
            <span>Artisan Loyalty Society</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Mielle Rewards & Bakers Club
          </h1>
          <p className="text-sm sm:text-base text-[#6d0808]/85 max-w-xl mx-auto leading-relaxed">
            Our intimate circle of cookie lovers in Iloilo. Earn sweet points with every oven batch, unlock secret seasonal flavors, and enjoy complimentary local deliveries.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="text-xs text-[#6d0808] font-bold hover:underline cursor-pointer"
            >
              {isLoggedIn ? 'Switch to Sign In / Register View' : 'Back to Member Dashboard'}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isLoggedIn ? (
          /* Authentication & Registration Form Layout */
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md border border-[#6d0808]/20 rounded-2xl p-8 shadow-md space-y-6">
            
            {/* Toggle Mode */}
            <div className="flex border-b border-[#6d0808]/15">
              <button
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-colors ${
                  authMode === 'signin'
                    ? 'border-b-2 border-[#6d0808] text-[#6d0808] font-bold'
                    : 'text-[#6d0808]/70 hover:text-[#6d0808]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center cursor-pointer transition-colors ${
                  authMode === 'register'
                    ? 'border-b-2 border-[#6d0808] text-[#6d0808] font-bold'
                    : 'text-[#6d0808]/70 hover:text-[#6d0808]'
                }`}
              >
                Join Bakers Club
              </button>
            </div>

            {authMode === 'register' ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Marielle Ortencio"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="marielle@gmail.com"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Mobile Number (Iloilo contact)</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0917 123 4567"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Create Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <div className="p-3 bg-[#faddb2]/30 rounded border border-[#6d0808]/15 text-[11px] text-[#6d0808] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-[#6d0808]" />
                  <span>Receive <strong>100 Welcome Points</strong> instantly upon sign up!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-colors cursor-pointer shadow-sm"
                >
                  Create Member Account
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Mobile Number or Email</label>
                  <input
                    type="text"
                    defaultValue="+63 917 842 9102"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <div>
                  <label className="block text-[#6d0808] font-medium mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full p-2.5 rounded border border-[#6d0808]/20 bg-white text-[#6d0808] focus:outline-none focus:border-[#6d0808]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] rounded transition-colors cursor-pointer shadow-sm"
                >
                  Access Member Lounge
                </button>
              </form>
            )}

          </div>
        ) : (
          /* Logged In Member Lounge & Mock Loyalty Progress Tracker */
          <div className="space-y-10">
            
            {/* Top Row: Digital Membership Card + Loyalty Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left: Luxury Digital Membership Pass */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#6d0808] via-[#520505] to-[#360303] text-white p-7 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden border border-[#8a1313]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -mr-12 -mt-12 pointer-events-none" />
                
                <div className="space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#faddb2] font-semibold">
                        Mielle Rewards Member Pass
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                        Maisonmielle
                      </h3>
                    </div>
                    <Crown className="w-7 h-7 text-[#faddb2] stroke-1" />
                  </div>

                  <div className="pt-4">
                    <span className="text-[11px] text-white/70">Member Tier:</span>
                    <div className="text-xl font-serif font-bold text-[#faddb2]">
                      {member.memberTier}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/15 space-y-3 relative">
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-white/60 block">Member Name</span>
                      <strong className="text-white text-sm font-medium">{member.name}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/60 block">Member ID</span>
                      <span className="font-mono text-xs text-[#faddb2] font-semibold">{member.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-white/60 pt-1">
                    <span>Member since {member.joinedDate}</span>
                    <span>Iloilo, PH</span>
                  </div>
                </div>
              </div>

              {/* Right: Mock Loyalty Progress Tracker Card */}
              <div className="lg:col-span-7 bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
                        Loyalty Progress Tracker
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-[#6d0808] mt-0.5">
                        Your Sweet Cookie Balance
                      </h2>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-serif font-bold tabular-nums text-[#6d0808]">
                        {member.points}
                      </div>
                      <span className="text-xs text-[#6d0808]/75">Available Points</span>
                    </div>
                  </div>

                  {/* Visual Tier Progress Bar */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs font-medium text-[#6d0808]">
                      <span>Current: <strong>{member.memberTier}</strong></span>
                      <span>Next: <strong>{member.nextTierName}</strong></span>
                    </div>

                    <div className="w-full h-3 bg-[#faddb2]/30 rounded-full overflow-hidden border border-[#6d0808]/15">
                      <div
                        className="h-full bg-[#6d0808] transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(100, (member.points / (member.points + member.pointsToNextTier)) * 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-[#6d0808]/80">
                      <span>{member.points} pts accumulated</span>
                      <span><strong>{member.pointsToNextTier} pts</strong> needed for {member.nextTierName}</span>
                    </div>
                  </div>
                </div>

                {/* Point Simulation Actions */}
                <div className="pt-4 border-t border-[#6d0808]/15 bg-white/70 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#6d0808] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#6d0808]" />
                      <span>Simulate Earning Points:</span>
                    </span>
                    <span className="text-[11px] text-[#6d0808]/70">Interactive demo actions</span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <button
                      onClick={() => handleEarnPoints(10, 'Daily Bakers Club Check-In')}
                      className="px-3 py-1.5 bg-white hover:bg-[#faddb2]/20 border border-[#6d0808]/20 text-[#6d0808] font-bold rounded cursor-pointer transition-colors shadow-2xs"
                    >
                      +10 pts: Daily Check-In
                    </button>
                    <button
                      onClick={() => handleEarnPoints(30, 'Left a 5-star review on The Classic')}
                      className="px-3 py-1.5 bg-white hover:bg-[#faddb2]/20 border border-[#6d0808]/20 text-[#6d0808] font-bold rounded cursor-pointer transition-colors shadow-2xs"
                    >
                      +30 pts: Share Cookie Review
                    </button>
                    <button
                      onClick={() => handleEarnPoints(60, 'Ordered a 6-Piece Assortment Box')}
                      className="px-3 py-1.5 bg-white hover:bg-[#faddb2]/20 border border-[#6d0808]/20 text-[#6d0808] font-bold rounded cursor-pointer transition-colors shadow-2xs"
                    >
                      +60 pts: Complete Box Order
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Middle Section: Active Member Vouchers with One-Click Copy */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
                    Member Perks & Rewards
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                    Your Claimable Vouchers
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('order')}
                  className="text-xs font-bold text-[#6d0808] hover:underline cursor-pointer"
                >
                  Use Voucher at Checkout →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.availableVouchers.map((voucher: any) => (
                  <div
                    key={voucher.id}
                    className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-5 flex items-start justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {voucher.discount}
                      </span>
                      <h4 className="font-serif font-bold text-base text-[#6d0808] mt-1">
                        {voucher.title}
                      </h4>
                      <p className="text-xs text-[#6d0808]/75">
                        {voucher.expiresIn}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <button
                        onClick={() => handleCopyVoucher(voucher.code)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold text-[#6d0808] bg-[#faddb2]/30 hover:bg-[#faddb2]/50 border border-[#6d0808]/20 rounded transition-colors cursor-pointer"
                        title="Copy code to clipboard"
                      >
                        {copiedCode === voucher.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{voucher.code}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section: Club Tier Progression & Privileges */}
            <div className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl p-8 space-y-6 shadow-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6d0808]">
                  The Three Societies
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#6d0808]">
                  Tier Privileges & Exclusive Perks
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 p-5 rounded-xl border border-[#6d0808]/15 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#6d0808]" />
                    <h4 className="font-serif font-bold text-lg text-[#6d0808]">Flour & Honey</h4>
                  </div>
                  <span className="text-[11px] text-[#6d0808]/75 block">Entry Level · 0–299 pts</span>
                  <ul className="text-xs text-[#6d0808]/85 space-y-1.5 list-disc pl-4">
                    <li>100 Welcome Points upon registration</li>
                    <li>Advance notification 2 hours before oven batch drops</li>
                    <li>Birthday surprise single cookie voucher</li>
                  </ul>
                </div>

                <div className="bg-[#faddb2]/25 p-5 rounded-xl border-2 border-[#6d0808] space-y-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#6d0808]" />
                    <h4 className="font-serif font-bold text-lg text-[#6d0808]">Butter & Gold (You)</h4>
                  </div>
                  <span className="text-[11px] text-[#6d0808] font-bold block">Silver Confectioner · 300–499 pts</span>
                  <ul className="text-xs text-[#6d0808]/90 space-y-1.5 list-disc pl-4">
                    <li>10% off on all 12-piece assortment boxes</li>
                    <li>Complimentary Iloilo City courier on every 3rd order</li>
                    <li>Tasting samples of unreleased experimental recipes</li>
                  </ul>
                </div>

                <div className="bg-white/70 p-5 rounded-xl border border-[#6d0808]/15 space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#6d0808]" />
                    <h4 className="font-serif font-bold text-lg text-[#6d0808]">Grand Confectioner</h4>
                  </div>
                  <span className="text-[11px] text-[#6d0808]/75 block">Master Tier · 500+ pts</span>
                  <ul className="text-xs text-[#6d0808]/85 space-y-1.5 list-disc pl-4">
                    <li>Guaranteed reservation slots during holiday peak rushes</li>
                    <li>Personalized gold foil gift message packaging</li>
                    <li>Direct secret flavor bespoke requests to Marielle</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-xl p-6 space-y-4 shadow-xs">
              <h4 className="font-serif font-bold text-base text-[#6d0808]">
                Recent Points Activity
              </h4>
              <div className="space-y-2 text-xs">
                {member.recentActivity.map((act: any) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between py-2 border-b border-[#6d0808]/15 last:border-0"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-[#6d0808]">{act.description}</div>
                      <div className="text-[10px] text-[#6d0808]/70">{act.date}</div>
                    </div>
                    <span className="font-bold font-mono text-[#6d0808]">
                      +{act.pointsDelta} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
