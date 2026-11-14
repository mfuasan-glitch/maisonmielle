import React, { useState } from 'react';
import { PageTab } from '../types';
import { Camera, Sparkles, ZoomIn, X, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface ImagesPageProps {
  setActiveTab: (tab: PageTab) => void;
}

interface ImageItem {
  id: string;
  title: string;
  category: 'Brand Identity' | 'Hero Composition' | 'Signature Cookie' | 'Special Release';
  filename: string;
  imageSrc: string;
  caption: string;
  tags: string[];
}

export const ImagesPage: React.FC<ImagesPageProps> = ({ setActiveTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalImage, setActiveModalImage] = useState<ImageItem | null>(null);

  const galleryItems: ImageItem[] = [
    {
      id: 'collection-banner',
      title: 'Artisanal Flat Lay & Assorted Cookie Boxes',
      category: 'Hero Composition',
      filename: 'collection-banner.png',
      imageSrc: '/assets/aistudio/collection-banner.png',
      caption: 'Full bakery flat lay photography presenting cooling wire racks with freshly baked Hershey Melt, The Classic, and Ruby Velvet cookies surrounded by hand-packed 5-piece and 6-piece gift boxes.',
      tags: ['Collection Banner', 'Cooling Rack', 'Assorted Boxes', 'Flat Lay'],
    },
    {
      id: 'hero-composition',
      title: 'Hero Cookie Composition',
      category: 'Hero Composition',
      filename: 'hero-cookies.png',
      imageSrc: '/assets/aistudio/hero-cookies.png',
      caption: 'Artisanal overhead flat lay composition showcasing Maisonmielle’s chunky cookie repertoire, featuring The Classic, Ruby Velvet, Hershey Melt, and Midnight Choco with scattered Belgian chocolate chips over a warm baker’s canvas.',
      tags: ['Hero Graphic', 'Cascading Cookies', 'Flat Lay', 'Bakery Artwork'],
    },
    {
      id: 'mielle-logo',
      title: 'mielle Official Brand Logo',
      category: 'Brand Identity',
      filename: 'image_dPnC4g.png',
      imageSrc: '/assets/aistudio/image_dPnC4g.png',
      caption: 'The official Maisonmielle brand identity insignia featuring the warm burgundy script "mielle" lettering with an elegant flour flourish, designed to represent comfort, devotion, and sweet soft moments.',
      tags: ['Brand Identity', 'Wordmark', 'Artisan Bakery', 'Iloilo City'],
    },
    {
      id: 'the-classic',
      title: 'The Classic Cookie',
      category: 'Signature Cookie',
      filename: 'the-classic.png',
      imageSrc: '/assets/aistudio/the-classic.png',
      caption: 'Our signature golden, buttery classic thick-style cookie loaded with generous dark chocolate chips. Golden caramelized exterior with a tender, molten center crafted with browned French butter and organic cane sugar.',
      tags: ['Browned Butter', 'Dark Chocolate Chips', 'Molten Center', '₱35.00'],
    },
    {
      id: 'midnight-choco',
      title: 'Midnight Choco Cookie',
      category: 'Signature Cookie',
      filename: 'midnight-choco.png',
      imageSrc: '/assets/aistudio/midnight-choco.png',
      caption: 'A deep, fudgy double chocolate cookie loaded with dark Dutch cocoa, molten Belgian chocolate chunks, and a hint of espresso. Rich, gooey, and formulated for true chocolate connoisseurs.',
      tags: ['Double Dark Chocolate', 'Dutch Cocoa', 'Fudge Core', '₱45.00'],
    },
    {
      id: 'hershey-melt',
      title: 'Hershey Melt Cookie',
      category: 'Signature Cookie',
      filename: 'hershey-melt.png',
      imageSrc: '/assets/aistudio/hershey-melt.png',
      caption: 'A thick, golden chocolate-chip cookie crown-topped with an authentic melted Hershey’s milk chocolate bar piece. Warm, gooey, and intensely satisfying with double-layered chocolate richness.',
      tags: ['Hershey’s Milk Chocolate', 'Melty Crown', 'Sweet Butter Dough', '₱49.00'],
    },
    {
      id: 'ruby-velvet',
      title: 'Ruby Velvet Cookie',
      category: 'Signature Cookie',
      filename: 'ruby-velvet.png',
      imageSrc: '/assets/aistudio/ruby-velvet.png',
      caption: 'A vibrant red velvet cookie enriched with cultured French butter and pure vanilla extract, packed with creamy Belgian white chocolate chunks for a luxurious, silky contrast of textures.',
      tags: ['Red Velvet', 'Belgian White Chocolate', 'Cultured Butter', '₱49.00'],
    },
    {
      id: 'campfire',
      title: 'Campfire Cookie',
      category: 'Signature Cookie',
      filename: 'campfire.png',
      imageSrc: '/assets/aistudio/campfire.png',
      caption: 'A decadent golden chocolate-chip cookie crowned with toasted gooey marshmallow and a rich chocolate block, baked upon a crunchy, buttery graham cracker base. Cozy, sweet, and campfire nostalgic.',
      tags: ['Toasted Marshmallow', 'Graham Cracker Crust', 'Campfire S’mores', '₱69.00'],
    },
    {
      id: 'cookie-monster',
      title: 'Cookie Monster Cookie',
      category: 'Special Release',
      filename: 'cookie-monster.png',
      imageSrc: '/assets/aistudio/cookie-monster.png',
      caption: 'Whimsical limited-batch confection featuring vibrant blue sweet-cream dough folded with crunchy Oreo cookies, dark chocolate chips, chocolate chunks, and candy marshmallow eyes.',
      tags: ['Limited Release', 'Oreo Chunk Dough', 'Whimsical Confection', '₱69.00'],
    },
  ];

  const categories = ['All', 'Signature Cookie', 'Special Release', 'Hero Composition', 'Brand Identity'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Header Banner */}
      <section className="bg-transparent border-b border-[#6d0808]/15 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[#6d0808]/80 font-medium">
            <span className="font-semibold text-[#6d0808] uppercase tracking-wider text-[11px]">Brand &amp; Product Images</span>
            <span aria-hidden="true">·</span>
            <span>Artisanal Photography</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#6d0808] tracking-tight">
            Bakehouse Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#6d0808]/85 max-w-2xl mx-auto leading-relaxed">
            A comprehensive visual index of Maisonmielle’s handcrafted chunky cookies, signature hero compositions, and official brand identity assets with full descriptive captions.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6d0808] text-white shadow-sm'
                    : 'bg-white/80 text-[#6d0808] hover:bg-white border border-[#6d0808]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="bg-white/85 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Image Frame */}
              <div className="relative bg-[#f6f0e4] p-6 flex items-center justify-center min-h-[260px] overflow-hidden border-b border-[#6d0808]/10">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="max-h-52 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
                  loading="lazy"
                />

                <button
                  onClick={() => setActiveModalImage(item)}
                  className="absolute bottom-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-white text-[#6d0808] shadow-xs transition-transform hover:scale-110 cursor-pointer"
                  title="Expand image"
                  aria-label={`Expand image: ${item.title}`}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-[#6d0808] border border-[#6d0808]/15 shadow-2xs">
                  {item.category}
                </span>
              </div>

              {/* Text Caption Container */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-serif font-bold text-lg text-[#6d0808]">
                      {item.title}
                    </h2>
                    <code className="text-[10px] text-[#6d0808]/60 bg-[#6d0808]/5 px-2 py-0.5 rounded font-mono">
                      {item.filename}
                    </code>
                  </div>

                  {/* Descriptive Written Caption */}
                  <p className="text-xs text-[#6d0808]/85 leading-relaxed font-sans">
                    {item.caption}
                  </p>
                </div>

                {/* Tags and Metadata */}
                <div className="pt-3 border-t border-[#6d0808]/10 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium text-[#6d0808]/75 bg-[#faddb2]/25 px-2 py-0.5 rounded border border-[#6d0808]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Navigation CTA */}
        <div className="mt-16 p-8 bg-white/80 backdrop-blur-sm border border-[#6d0808]/15 rounded-2xl text-center space-y-4 max-w-2xl mx-auto shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#6d0808]/10 text-[#6d0808] flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6" />
          </div>
          <h2 className="font-serif font-bold text-2xl text-[#6d0808]">
            Craving these fresh bakes?
          </h2>
          <p className="text-xs text-[#6d0808]/85 leading-relaxed">
            All cookies featured above are handcrafted fresh to order for our weekly Iloilo dispatch batches. Order individual pieces or curate a custom Box of 5 or 6.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('catalog')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-[#6d0808] hover:bg-[#520505] transition-all cursor-pointer shadow-sm"
            >
              <span>View Product Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#6d0808] bg-white border border-[#6d0808] hover:bg-white/80 transition-all cursor-pointer shadow-2xs"
            >
              <span>Build Custom Box</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#6d0808]/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-[#6d0808]/15 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#6d0808]">
                  {activeModalImage.title}
                </h3>
                <span className="text-[11px] text-[#6d0808]/70 font-mono">
                  {activeModalImage.filename}
                </span>
              </div>
              <button
                onClick={() => setActiveModalImage(null)}
                className="p-1.5 rounded-full hover:bg-[#6d0808]/10 text-[#6d0808] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 bg-[#f6f0e4] flex items-center justify-center min-h-[320px]">
              <img
                src={activeModalImage.imageSrc}
                alt={activeModalImage.title}
                className="max-h-80 w-auto object-contain filter drop-shadow-md"
              />
            </div>

            <div className="p-6 bg-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6d0808]">
                Written Image Description &amp; Details
              </span>
              <p className="text-xs text-[#6d0808]/90 leading-relaxed">
                {activeModalImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
