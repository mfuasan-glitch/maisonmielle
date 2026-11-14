import React, { useState } from 'react';
import { PageTab, BoxSelection } from './types';
import { COOKIE_FLAVORS } from './data/bakeryData';
import { Navbar } from './components/Navbar';
import { PreOrderBanner } from './components/PreOrderBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PrivacyNoticeModal } from './components/PrivacyNoticeModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CatalogPage } from './pages/CatalogPage';
import { BoxBuilderPage } from './pages/BoxBuilderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BakersClubPage } from './pages/BakersClubPage';
import { ContactPage } from './pages/ContactPage';
import { RelatedLinksPage } from './pages/RelatedLinksPage';
import { ImagesPage } from './pages/ImagesPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Custom boxes in user cart
  const [cartBoxes, setCartBoxes] = useState<BoxSelection[]>([
    // Start with a sample 5-piece box featuring our signature flavors (₱10 OFF applied)
    {
      boxId: 'BOX-INIT-1',
      size: 5,
      flavors: {
        'the-classic': 1,
        'midnight-choco': 1,
        'hershey-melt': 1,
        'ruby-velvet': 1,
        'campfire': 1,
        'cookie-monster': 0,
      },
      customNote: 'Please tie with extra love! For our weekend family gathering in Jaro.',
      boxPrice: 237, // (35 + 45 + 49 + 49 + 69) = 247 - 10 = 237
      originalPrice: 247,
      discount: 10,
    },
  ]);

  // Dynamic stock state for all 6 flavors (including Halloween Special)
  const [flavorsStockState, setFlavorsStockState] = useState<Record<string, boolean>>({
    'the-classic': false,
    'midnight-choco': false,
    'hershey-melt': false,
    'ruby-velvet': false,
    'campfire': false,
    'cookie-monster': false,
  });

  // Track if a specific flavor was clicked from the catalog to pre-populate builder
  const [initialFlavorToAdd, setInitialFlavorToAdd] = useState<string | null>(null);

  // Toggle flavor stock simulation
  const handleToggleStock = (flavorId: string) => {
    setFlavorsStockState((prev) => ({
      ...prev,
      [flavorId]: !prev[flavorId],
    }));
  };

  // Quick add single flavor directly to box builder
  const handleQuickAddFlavorToBuilder = (flavorId: string) => {
    setInitialFlavorToAdd(flavorId);
    setActiveTab('builder');
  };

  // Add constructed box to cart
  const handleAddBoxToCart = (newBox: BoxSelection) => {
    setCartBoxes((prev) => [...prev, newBox]);
  };

  // Remove box from cart
  const handleRemoveBox = (index: number) => {
    setCartBoxes((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Clear all boxes
  const handleClearCart = () => {
    setCartBoxes([]);
  };

  // Quick-add default chef box directly into cart
  const handleAddDefaultBox = (size: 5 | 6) => {
    const defaultFlavors = size === 5 ? {
      'the-classic': 1,
      'midnight-choco': 1,
      'hershey-melt': 1,
      'ruby-velvet': 1,
      'campfire': 1,
      'cookie-monster': 0,
    } : {
      'the-classic': 1,
      'midnight-choco': 1,
      'hershey-melt': 1,
      'ruby-velvet': 1,
      'campfire': 1,
      'cookie-monster': 1,
    };

    const originalPrice = COOKIE_FLAVORS.reduce((sum, f) => {
      const count = defaultFlavors[f.id as keyof typeof defaultFlavors] || 0;
      return sum + (count * f.price);
    }, 0);

    const discount = 10;
    const boxPrice = Math.max(0, originalPrice - discount);

    const defaultBox: BoxSelection = {
      boxId: `BOX-${Date.now()}`,
      size,
      flavors: defaultFlavors,
      boxPrice,
      originalPrice,
      discount,
    };
    setCartBoxes((prev) => [...prev, defaultBox]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#6d0808] font-sans antialiased selection:bg-[#6d0808]/20 selection:text-[#6d0808]">
      
      {/* 1. Active Pre-Order Announcement Banner */}
      <PreOrderBanner onOrderNow={() => { setActiveTab('builder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

      {/* 2. Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartBoxes.length}
        openCart={() => setIsCartOpen(true)}
      />

      {/* 3. Page Router Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onSelectFlavorForBuilder={handleQuickAddFlavorToBuilder}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            setActiveTab={setActiveTab}
            onQuickAddFlavorToBuilder={handleQuickAddFlavorToBuilder}
            flavorsStockState={flavorsStockState}
            onToggleStock={handleToggleStock}
          />
        )}

        {activeTab === 'builder' && (
          <BoxBuilderPage
            onAddBoxToCart={handleAddBoxToCart}
            setActiveTab={setActiveTab}
            initialFlavorToAdd={initialFlavorToAdd}
            flavorsStockState={flavorsStockState}
          />
        )}

        {activeTab === 'order' && (
          <CheckoutPage
            boxes={cartBoxes}
            onAddDefaultBox={handleAddDefaultBox}
            onClearCart={handleClearCart}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'club' && (
          <BakersClubPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'contact' && (
          <ContactPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'links' && (
          <RelatedLinksPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'images' && (
          <ImagesPage setActiveTab={setActiveTab} />
        )}
      </main>

      {/* 4. Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        boxes={cartBoxes}
        onRemoveBox={handleRemoveBox}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setActiveTab('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBuilder={() => {
          setIsCartOpen(false);
          setActiveTab('builder');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 5. Privacy Notice & Statutory Compliance Modal */}
      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* 6. Footer with regulatory notices & brand links */}
      <Footer
        setActiveTab={setActiveTab}
        openPrivacyModal={() => setIsPrivacyModalOpen(true)}
      />

    </div>
  );
}
