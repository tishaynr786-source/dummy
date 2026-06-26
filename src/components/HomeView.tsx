import React, { useState } from 'react';
import { ArrowRight, Star, ShieldCheck, Heart, Sparkles, Award, ArrowRightLeft, Smile, Quote, ChevronLeft, ChevronRight, Gift, Percent, Clock, Zap, Ticket } from 'lucide-react';
import { Product, Review, PageId } from '../types';
import { PRODUCTS, REVIEWS } from '../data';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HomeViewProps {
  onAddToCart: (product: Product, color: string) => void;
  onQuickView: (product: Product) => void;
  triggerToast: (msg: string) => void;
}

export default function HomeView({ onAddToCart, onQuickView, triggerToast }: HomeViewProps) {
  const navigate = useNavigate();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Live countdown for Special Day Offers
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 51, seconds: 28 });
  const [openedBox, setOpenedBox] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [claimedCode, setClaimedCode] = useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleApplySpecialPromo = (code: string, discount: number) => {
    const event = new CustomEvent('apply-special-promo', {
      detail: { code, discount }
    });
    window.dispatchEvent(event);
    setClaimedCode(true);

    const cartBtn = document.getElementById('cart-trigger');
    if (cartBtn) {
      setTimeout(() => {
        cartBtn.click();
      }, 800);
    }
  };

  // Filter 4 popular products
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categories = [
    { name: 'Handbags', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&fit=crop', count: 'Premium & Structured' },
    { name: 'Sling Bags', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&fit=crop', count: 'Chic & Compact' },
    { name: 'Clutches', img: 'https://images.unsplash.com/photo-1524498250077-390f9e378db0?q=80&w=400&fit=crop', count: 'Sparkling Partywear' },
    { name: 'Shoulder Bags', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&fit=crop', count: 'Work & Spacious' }
  ];

  const handleCategorySelect = (cat: string) => {
    navigate(`/products?category=${encodeURIComponent(cat)}`);
    window.scrollTo(0, 0);
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1920&auto=format&fit=crop"
            alt="Elegance fashion handbag hero"
            className="w-full h-full object-cover opacity-35 object-center scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left text-white space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#df8899]/20 border border-[#df8899]/30 text-pink-200 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest font-sans"
          >
            <Sparkles className="w-4.5 h-4.5 text-pink-300 animate-pulse" /> BlackberryBag Summer Launch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-wide leading-none max-w-3xl"
          >
            Elegant Bags for Every <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df8899] via-pink-300 to-[#cf5e76]">
              Beautiful Moment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-pink-100/80 max-w-xl font-sans font-light leading-relaxed"
          >
            Discover premium ladies handbags, clutches, and travel companion totes designed to accentuate the modern woman. Realized with high quality stitching, luxurious clasp details, and affordable elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={() => { navigate('/products'); window.scrollTo(0,0); }}
              className="bg-[#cf5e76] hover:bg-[#b9425a] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] flex items-center gap-2 cursor-pointer shadow-lg shadow-pink-900/10"
            >
              Explore Collection <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => { navigate('/about'); window.scrollTo(0, 0); }}
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
            >
              Our Heritage
            </button>
          </motion.div>
        </div>
      </section>

      {/* Special Day Handbag Carnival & Interactive Offers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-[#fdf2f4] via-[#fbf8f9] to-[#fff9fa] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#fbdde2] shadow-xl relative overflow-hidden">
          {/* Subtle luxurious decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b9425a]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Countdown & Mystery Box */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 bg-[#cf5e76] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full font-sans shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Ladies Handbag Day Celebration
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-tight">
                  Today&apos;s Special Handbag Offers
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans max-w-xl">
                  Celebrate our Boutique Anniversary &amp; Handbag Day Special with double gifts, premium reductions, and mystery voucher reveals! Offers end when the clock strikes zero.
                </p>
              </div>

              {/* Countdown Board */}
              <div className="flex flex-wrap items-center gap-4 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-pink-100 max-w-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4 text-[#cf5e76]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-sans text-gray-800">Ends In:</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex flex-col items-center">
                    <span className="bg-gray-950 text-white min-w-9 h-9 flex items-center justify-center rounded-lg font-mono text-sm font-bold shadow-md">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-gray-400 mt-1 font-sans">Hrs</span>
                  </div>
                  <span className="font-mono text-gray-950 font-bold -mt-3.5">:</span>
                  <div className="flex flex-col items-center">
                    <span className="bg-gray-950 text-white min-w-9 h-9 flex items-center justify-center rounded-lg font-mono text-sm font-bold shadow-md">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-gray-400 mt-1 font-sans">Mins</span>
                  </div>
                  <span className="font-mono text-gray-950 font-bold -mt-3.5">:</span>
                  <div className="flex flex-col items-center">
                    <span className="bg-[#cf5e76] text-white min-w-9 h-9 flex items-center justify-center rounded-lg font-mono text-sm font-bold shadow-md animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-gray-400 mt-1 font-sans">Secs</span>
                  </div>
                </div>
              </div>

              {/* Interactive Mystery Unlock Boxes */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#b9425a]" />
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider font-sans">Choose Your Mystery Bag Box:</h3>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-sm">
                  {[
                    { id: 1, name: 'The Ruby Box', color: 'bg-gradient-to-tr from-[#6e2938] to-[#ab3e52]', shadow: 'shadow-red-900/20' },
                    { id: 2, name: 'The Emerald Box', color: 'bg-gradient-to-tr from-[#164e32] to-[#268555]', shadow: 'shadow-emerald-900/20' },
                    { id: 3, name: 'The Aureate Box', color: 'bg-gradient-to-tr from-[#7c530c] to-[#b37712]', shadow: 'shadow-amber-900/20' }
                  ].map((box) => {
                    const isCurrent = openedBox === box.id;
                    return (
                      <button
                        key={box.id}
                        onClick={() => {
                          if (openedBox === null) {
                            setOpenedBox(box.id);
                            setTimeout(() => setIsRevealed(true), 600);
                          }
                        }}
                        disabled={openedBox !== null}
                        className={`relative aspect-square rounded-2xl p-4 flex flex-col justify-between items-center text-center transition-all duration-300 shadow-lg ${box.shadow} ${box.color} ${
                          openedBox === null ? 'hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer ' : ''
                        } ${openedBox !== null && !isCurrent ? 'opacity-30 grayscale saturate-50' : 'opacity-100 scale-100'}`}
                      >
                        <div className="w-2.5 h-10 bg-amber-400 absolute left-1/2 -ml-1.25 top-0 bottom-0 pointer-events-none opacity-40 mix-blend-overlay" />
                        <div className="h-2.5 w-full bg-amber-400 absolute top-1/2 -mt-1.25 left-0 right-0 pointer-events-none opacity-40 mix-blend-overlay" />

                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/95 text-[10px] font-mono leading-none">
                          {box.id}
                        </div>
                        
                        <div className="my-1.5 text-white">
                          <Gift className={`w-8 h-8 mx-auto transition-transform duration-500 ${openedBox === box.id ? 'scale-125 rotate-12 text-amber-300' : 'animate-bounce'}`} />
                        </div>

                        <span className="text-[10px] text-white/90 font-semibold tracking-wide truncate max-w-full font-sans">
                          {box.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Opened box reveal feedback */}
                {openedBox !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-white rounded-2xl border border-pink-200 shadow-sm max-w-sm space-y-3.5 relative"
                  >
                    {!isRevealed ? (
                      <div className="flex items-center gap-2 text-gray-500 py-3 justify-center text-xs">
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#b9425a] border-t-transparent" />
                        Unlocking your mystery reward box...
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] text-[#cf5e76] font-bold uppercase tracking-widest font-sans">Mystery Prize Unlocked!</span>
                            <h4 className="font-serif text-base font-bold text-gray-900">35% Flat Coupon + Free Silk Bag-Scarf!</h4>
                          </div>
                          <div className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full font-sans shrink-0">
                            VIP DAY
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-normal font-sans">
                          Apply coupon <strong className="text-gray-900 bg-pink-50 px-1 rounded">BAGSPECIAL35</strong> at checkout for 35% Flat off your entire cart!
                        </p>

                        <div className="flex gap-2">
                          {!claimedCode ? (
                            <button
                              onClick={() => handleApplySpecialPromo('BAGSPECIAL35', 35)}
                              className="w-full bg-[#b9425a] hover:bg-[#8f2c3f] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                            >
                              <Ticket className="w-4 h-4" /> Apply Code Instantly
                            </button>
                          ) : (
                            <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5">
                              <Star className="w-4 h-4 fill-emerald-500 text-emerald-600" /> Voucher Active!
                            </div>
                          )}
                          <button
                            onClick={() => {
                              setOpenedBox(null);
                              setIsRevealed(false);
                              setClaimedCode(false);
                            }}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-4 rounded-xl transition-all cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column: Flash Sales Products */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#cf5e76] font-sans">1-Hour Solstice Deals</span>
                </div>
                <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest font-sans">Limit 1 per user</span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: 'p2',
                    name: 'Velvet Charm Party Clutch',
                    origPrice: 1299,
                    flashPrice: 844,
                    img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15a490?q=80&w=400&auto=format&fit=crop',
                    stockLeft: 3,
                    prog: 80,
                    tag: 'Evening Wear',
                    col: 'Wine Red'
                  },
                  {
                    id: 'p5',
                    name: 'Blackberry Royal Handbag',
                    origPrice: 2999,
                    flashPrice: 1949,
                    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&auto=format&fit=crop',
                    stockLeft: 4,
                    prog: 65,
                    tag: 'Classic Luxury',
                    col: 'Classic Beige'
                  }
                ].map((deal) => {
                  const matchingProduct = PRODUCTS.find(p => p.id === deal.id);
                  return (
                    <div key={deal.id} className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm flex gap-4 transition-all hover:shadow-md">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <img src={deal.img} alt={deal.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute top-1 left-1 bg-amber-400 text-gray-900 text-[8px] font-black px-1.5 py-0.5 rounded-full font-sans">
                          -35%
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-[#cf5e76] tracking-widest font-sans block">{deal.tag}</span>
                          <h4 className="font-serif text-sm sm:text-base font-black text-gray-900 truncate mt-0.5">{deal.name}</h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-[#b9425a] font-black text-base">₹{deal.flashPrice}</span>
                            <span className="text-xs text-gray-400 line-through">₹{deal.origPrice}</span>
                          </div>
                        </div>

                        {/* Stock Left */}
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-rose-600 font-bold font-sans">🔥 Only {deal.stockLeft} units left</span>
                            <span className="text-gray-400">Limited Batch</span>
                          </div>
                          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${deal.prog}%` }} />
                          </div>
                        </div>

                        {/* Claim Button */}
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              if (matchingProduct) {
                                onAddToCart(matchingProduct, deal.col);
                                handleApplySpecialPromo('BAGSPECIAL35', 35);
                              }
                            }}
                            className="bg-pink-50 hover:bg-[#b9425a] text-[#b9425a] hover:text-white border border-pink-100 hover:border-transparent text-xs font-bold py-1.5 px-3 rounded-lg transition-all w-full flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" /> Claim &amp; Apply Coupon
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs uppercase tracking-widest text-[#cf5e76] font-bold font-sans">
            Handpicked Curations
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-wide">
            Filter by Premium Categories
          </h2>
          <div className="w-16 h-1 bg-[#cf5e76] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative h-72 w-full rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 text-left"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <p className="text-[10px] uppercase font-bold text-pink-300 tracking-widest font-sans">{cat.count}</p>
                <h3 className="font-serif text-xl font-bold tracking-wide">{cat.name}</h3>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-sans group-hover:text-pink-300 transition-colors pt-1">
                  View Catalogue <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Products Catalogue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 border-b border-gray-100 pb-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#cf5e76] font-bold font-sans">Modern Trends</p>
            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-wide">Bestselling Curations</h2>
          </div>
          <button
            onClick={() => { navigate('/products'); window.scrollTo(0,0); }}
            className="text-sm font-semibold text-[#b9425a] hover:text-[#9c3247] flex items-center gap-1 group"
          >
            View all 9 bespoke products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="group relative bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-xl flex flex-col h-full border border-gray-100">
              {/* Product Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="bg-[#3d121b] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-sans">
                  {prod.tags[0] || 'Popular'}
                </span>
              </div>

              {/* Product Image Area */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4 shrink-0">
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay quick view button */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <button
                    onClick={() => onQuickView(prod)}
                    className="bg-white/95 text-gray-900 hover:bg-[#b9425a] hover:text-white transition-colors duration-200 text-xs font-bold py-2.5 px-5 rounded-lg shadow-md hover:scale-105 duration-200 cursor-pointer"
                  >
                    Quick View Details
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs text-[#cf5e76] font-semibold uppercase tracking-widest font-sans">{prod.category}</p>
                <h3 className="font-serif text-base font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-[#cf5e76] transition-colors">{prod.name}</h3>
                
                {/* Star rating */}
                <div className="flex items-center gap-1.5 mt-1.5 text-amber-500 text-xs">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(prod.rating) ? 'fill-amber-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-gray-500 font-sans">({prod.reviewCount})</span>
                </div>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Price and Cart checkout */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-gray-900">₹{prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">₹{prod.originalPrice}</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onAddToCart(prod, prod.colors[0])}
                    className="bg-[#faf5ff] hover:bg-[#b9425a] text-[#b9425a] hover:text-white transition-all duration-300 p-2 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer border border-pink-100"
                    id={`add-home-${prod.id}`}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose BlackberryBag */}
      <section className="bg-gradient-to-b from-[#fdf4f5] to-white py-16 sm:py-24 border-y border-pink-100/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-bold text-[#b9425a] uppercase tracking-widest font-sans">Bespoke Manufacturing</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-wide max-w-xl mx-auto">
              Our Craftsmanship Standards
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Meticulous engineering, sustainable sourcing, and modern trends. Making luxury affordable without cuts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#b9425a] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Trendy &amp; Stylish</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Each product highlights curated colors, sleek hardware, and modern textures matching international runway lookups.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#b9425a] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Premium Materials</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Sturdy stitching, scratch-resistant vegan panels, soft anti-dust microfiber coatings, and durable metals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#b9425a] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Affordable Luxury</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                We cut down middleman distributors to ship directly from master craftsman to your wardrobe, offering pristine luxury for less.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#b9425a] flex items-center justify-center mb-6">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">Perfect For All</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                Our bags support flexible modular uses—ideal for high-pressure corporate office hours, lazy lunch dates, or cocktail weddings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Review Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#3d121b] text-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden">
          {/* Subtle background abstract circles */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pink-500/10 -mr-20 -mt-20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#df8899]/10 -ml-20 -mb-20 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md w-full shrink-0 space-y-4 text-center md:text-left">
              <p className="text-xs font-bold uppercase text-pink-300 tracking-widest font-sans">Reviews &amp; Stories</p>
              <h2 className="text-3xl font-serif font-black tracking-wide leading-tight">
                Loved by Ten Thousand Modern Women
              </h2>
              <div className="h-1 w-12 bg-pink-400 mx-auto md:mx-0 rounded-full" />
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                <div className="bg-[#2e0e4e]/40 p-4 rounded-xl border border-white/5">
                  <p className="font-bold text-2xl">4.8★</p>
                  <p className="text-[10px] text-pink-100/50 uppercase tracking-widest">Global Score</p>
                </div>
                <div className="bg-[#2e0e4e]/40 p-4 rounded-xl border border-white/5">
                  <p className="font-bold text-2xl">99.4%</p>
                  <p className="text-[10px] text-pink-100/50 uppercase tracking-widest">Happy Checkout</p>
                </div>
              </div>
            </div>

            <div className="w-full relative flex flex-col justify-between md:min-h-72">
              <Quote className="text-pink-300/20 w-16 h-16 absolute -top-4 -left-4 pointer-events-none" />
              
              {/* Review Testimonial block */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < REVIEWS[activeReviewIndex].rating ? 'fill-yellow-400' : 'text-gray-500'}`} />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl italic line-clamp-4 leading-relaxed text-pink-50">
                  &quot;{REVIEWS[activeReviewIndex].comment}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={REVIEWS[activeReviewIndex].avatarUrl}
                    alt={REVIEWS[activeReviewIndex].name}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{REVIEWS[activeReviewIndex].name}</h4>
                    <p className="text-[11px] text-pink-200/50">Verified Purchase • Item: <span className="text-pink-200 font-semibold">{REVIEWS[activeReviewIndex].productJoined}</span></p>
                  </div>
                </div>
              </div>

              {/* Slider Control buttons */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={prevReview}
                  className="p-2 border border-white/10 hover:border-white/30 rounded-lg text-pink-100 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-pink-100/40">
                  {activeReviewIndex + 1} / {REVIEWS.length}
                </span>
                <button
                  onClick={nextReview}
                  className="p-2 border border-white/10 hover:border-white/30 rounded-lg text-pink-100 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-3xl overflow-hidden py-16 sm:py-20 px-8 sm:px-16 text-center text-white bg-[#170609]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop"
              alt="Luxury bag background CTA"
              className="w-full h-full object-cover opacity-15"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#3d121b]/40 backdrop-blur-xs" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
              Empower Your Wardrobe
            </h2>
            <p className="text-sm sm:text-base text-pink-100/80 leading-relaxed font-sans">
              Be it professional tote compartments or velvet clutch statements—BlackberryBag styles always look effortlessly cohesive. Claim your limited launch code and enjoy luxury today.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { navigate('/products'); window.scrollTo(0,0); }}
                className="w-full sm:w-auto bg-[#cf5e76] hover:bg-[#b9425a] active:bg-[#9c3247] text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer"
                id="cta-shop-now"
              >
                Shop the Entire Catalogue
              </button>
              <div className="text-xs text-pink-200 bg-white/10 px-4 py-2.5 rounded-full border border-white/5 font-sans">
                 Apply promo <span className="font-extrabold text-white">BLACKBERRY20</span> for 20% off!
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
