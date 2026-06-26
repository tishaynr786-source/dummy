import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Palette, Crown, ShieldCheck, Check, ShoppingBag, RotateCcw, Award, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import B3Logo from './B3Logo';

interface B3CustomizerProps {
  onAddToCart: (product: Product, color: string) => void;
  triggerToast: (msg: string) => void;
  b3LogoFinish?: 'gold' | 'silver';
}

export default function B3Customizer({ onAddToCart, triggerToast, b3LogoFinish = 'gold' }: B3CustomizerProps) {
  // Option states
  const [selectedColor, setSelectedColor] = useState('Crimson Red');
  const [selectedHardware, setSelectedHardware] = useState(b3LogoFinish === 'silver' ? 'Sterling Silver' : '24K Gold');
  const [selectedScarf, setSelectedScarf] = useState('Classic Silk Scarves');
  const [selectedStrap, setSelectedStrap] = useState('Luxury Chain Strap');
  const [customInitials, setCustomInitials] = useState('');
  const [activeTab, setActiveTab] = useState<'leather' | 'monogram' | 'scarf' | 'strap'>('leather');
  const [isAssembling, setIsAssembling] = useState(false);

  // Synchronize with global B3Logo finish selection
  useEffect(() => {
    setSelectedHardware(b3LogoFinish === 'silver' ? 'Sterling Silver' : '24K Gold');
  }, [b3LogoFinish]);

  // Configuration definitions
  const colors = [
    { name: 'Crimson Red', hex: '#8F1E33', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=600&auto=format&fit=crop', desc: 'Indulgent, majestic burgundy red leather for high-profile evenings.' },
    { name: 'Desert Camel', hex: '#C18854', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', desc: 'Warm, editorial natural tan leather. Effortlessly matches neutral trenchcoats.' },
    { name: 'Sleek Obsidian', hex: '#1C1C1E', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=600&auto=format&fit=crop', desc: 'Timeless deep charcoal black leather with a subtle satin texture.' },
    { name: 'Champagne Beige', hex: '#E5D3BD', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop', desc: 'Creamy soft sand beige leather that radiates day-time chic.' }
  ];

  const hardwares = [
    { name: '24K Gold', gradient: 'from-amber-200 via-yellow-400 to-amber-600', desc: 'Brilliant mirror-touch yellow gold monogram crest.' },
    { name: 'Sterling Silver', gradient: 'from-slate-100 via-slate-300 to-slate-500', desc: 'Cool, contemporary chrome metallic crest with dynamic light reflections.' },
    { name: 'Sovereign Rose', gradient: 'from-pink-200 via-rose-400 to-red-400', desc: 'Warm, soft copper rose gold for subtle feminine splendor.' }
  ];

  const scarves = [
    { name: 'Classic Silk Scarves', pattern: 'bg-[#cf5e76] text-white', styleDesc: 'Premium floral print wrapped snugly around the handle.' },
    { name: 'Chic Monochrome Ribbons', pattern: 'bg-black text-white border border-gray-800', styleDesc: 'Sleek geometric checker pattern of pure silk.' },
    { name: 'Royal Gold Brocade', pattern: 'bg-yellow-400 text-gray-950', styleDesc: 'Champagne gold with intricate damask patterns.' },
    { name: 'Minimalist Clean', pattern: 'bg-gray-100 text-gray-500', styleDesc: 'No added wraps, letting the leather-bound handle speak for itself.' }
  ];

  const straps = [
    { name: 'Luxury Chain Strap', detail: '24K Gold-matching chain linked with comfortable leather shoulder path.', addonPrice: 0 },
    { name: 'Premium Leather Sling', detail: 'Full-leather matching adjustable double-stitched strap.', addonPrice: 0 },
    { name: 'Nouveau Street Webbing', detail: 'Retro jacquard woven high-street wide utility strap.', addonPrice: 150 }
  ];

  // Selected Color detail
  const currentColorObj = colors.find(c => c.name === selectedColor) || colors[0];
  const currentHardwareObj = hardwares.find(h => h.name === selectedHardware) || hardwares[0];

  const handleReset = () => {
    setSelectedColor('Crimson Red');
    setSelectedHardware('24K Gold');
    setSelectedScarf('Classic Silk Scarves');
    setSelectedStrap('Luxury Chain Strap');
    setCustomInitials('');
  };

  const handleAddCustomToCart = () => {
    setIsAssembling(true);

    const basePrice = 3499;
    const addedCost = selectedStrap === 'Nouveau Street Webbing' ? 150 : 0;
    const finalPrice = basePrice + addedCost;

    const customBagProduct: Product = {
      id: `p_b3_custom_${Date.now()}`,
      name: `B3 Atelier Custom Handbag (${selectedColor})`,
      price: finalPrice,
      originalPrice: finalPrice + 1200,
      category: 'Handbags',
      description: `Bespoke customizable ladies handbag. Color: ${selectedColor} premium leather. Metal accents: ${selectedHardware} premium monogram. Accessory: ${selectedScarf}. Strap: ${selectedStrap}. Personalized Initials: "${customInitials || 'None'}".`,
      details: [
        `Authentic custom-cast B3 metal monogram in ${selectedHardware}`,
        `Bespoke body premium leather dyed in unique "${selectedColor}"`,
        `Luxury carrying dynamic option: ${selectedStrap}`,
        `Matching accentuation: ${selectedScarf}`,
        `Engraved Interior Monogram plaque: [ ${customInitials.toUpperCase() || 'B3 ORIGINAL'} ]`,
        'Includes signature protective dustbag & authenticity certificate'
      ],
      imageUrl: currentColorObj.image,
      colors: [selectedColor],
      tags: ['Bespoke', 'Metallic B3 Logo', 'Made-to-Order'],
      rating: 5.0,
      reviewCount: 1
    };

    setTimeout(() => {
      onAddToCart(customBagProduct, selectedColor);
      setIsAssembling(false);
      triggerToast(`Successfully added your custom B3 bag to your bag!`);

      // Automatically pop open the cart drawer if requested
      const cartBtn = document.getElementById('cart-trigger');
      if (cartBtn) {
        cartBtn.click();
      }
    }, 1200);
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl max-w-7xl mx-auto mb-16 px-4 py-8 sm:p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: LIVE B3 PREVIEW FRAME (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-[420px] rounded-3xl bg-slate-50 border border-pink-100 flex items-center justify-center overflow-hidden p-6 shadow-md shadow-pink-900/5 group">
            
            {/* Interactive Grid Lines Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#b9425a10_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-pink-50/40 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Aura depending on metal */}
            <div className={`absolute w-36 h-36 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none top-1/2 -mt-18 left-1/2 -ml-18 bg-yellow-400`} />

            {/* Main Handbag Image Layer */}
            <motion.div
              key={selectedColor}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-10 border border-white"
            >
              <img
                src={currentColorObj.image}
                alt={`Customized ${selectedColor} design`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* B3 Monogram Overlay Shield */}
              <div className="absolute bottom-6 left-6 z-20 backdrop-blur-md bg-white/90 px-3.5 py-1.5 rounded-2xl border border-yellow-400 shadow-xl flex items-center gap-1.5 transition-transform duration-300 hover:scale-105">
                <span className="bg-gradient-to-r from-yellow-500 via-rose-500 to-amber-600 text-transparent bg-clip-text font-serif font-black text-xs uppercase tracking-tight">Logo</span>
                <span className="font-serif font-black text-sm text-gray-900 bg-gray-50/50 px-1 rounded border border-gray-100">B3</span>
              </div>
            </motion.div>

            {/* Floating Live Logo Emblem Mockup in center-top to showcase "B3" logo */}
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div className="relative pointer-events-auto group/logo">
                {/* Monogram emblem preview using B3Logo component representing hardware selection */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="flex flex-col items-center justify-center"
                >
                  <B3Logo color={selectedHardware === 'Sterling Silver' ? 'silver' : 'gold'} size="lg" />
                  {customInitials && (
                    <span className="mt-1 text-[8.5px] font-mono font-extrabold tracking-widest uppercase bg-black/85 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full shadow-md leading-none border border-white/20">
                      {customInitials.toUpperCase()}
                    </span>
                  )}
                </motion.div>
                
                {/* Decorative floating highlight particles */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping opacity-80" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              </div>
            </div>

            {/* Accessory Ribbon Badge */}
            {selectedScarf !== 'Minimalist Clean' && (
              <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-pink-200 text-[10px] font-bold text-[#b9425a] flex items-center gap-1 shadow-sm font-sans animate-bounce">
                🎗️ {selectedScarf} Tied!
              </div>
            )}
          </div>

          {/* Quick Specifications list */}
          <div className="w-full max-w-[420px] mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#cf5e76] font-sans">Active Blueprint Specs</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <p className="text-gray-500 font-sans">Leather: <strong className="text-gray-800">{selectedColor}</strong></p>
              <p className="text-gray-500 font-sans">Hardware Logo: <strong className="text-gray-800">{selectedHardware} Crest</strong></p>
              <p className="text-gray-500 font-sans">Handle Tie: <strong className="text-gray-800 truncate block max-w-[120px]">{selectedScarf}</strong></p>
              <p className="text-gray-500 font-sans">Selected Sling: <strong className="text-gray-800">{selectedStrap}</strong></p>
              {customInitials && (
                <p className="text-gray-500 font-sans col-span-2">Initials Plaque: <strong className="text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">[ {customInitials.toUpperCase()} ]</strong></p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE TABS & SELECTION SYSTEM (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-[#b9425a] text-white text-[10px] font-black uppercase tracking-widest font-sans shadow-sm">
              <Crown className="w-3.5 h-3.5" /> B3 Bespoke Customizer Lab
            </span>
            <h3 className="text-3xl font-serif font-black text-gray-900 tracking-tight">
              B3 Women&apos;s Signature Handbag Builder
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
              Design the iconic B3 luxury handbag to your precise tastes. Swap natural drum-dyed micrograin vegan leather finishes, choose your custom-plated metallics, engrave your personal initials, and preview in real-time.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-gray-100 pb-1.5 overflow-x-auto gap-1 sm:gap-2 no-scrollbar scroll-smooth">
            {[
              { id: 'leather', label: '1. Leather Tone', icon: Palette },
              { id: 'monogram', label: '2. B3 Monogram Logo', icon: Crown },
              { id: 'scarf', label: '3. Satin Ribbon Accs', icon: Award },
              { id: 'strap', label: '4. Carrying Style', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold font-sans tracking-wide rounded-t-xl transition-all cursor-pointer whitespace-nowrap border-b-2 shrink-0 ${
                    isActive
                      ? 'border-[#b9425a] text-[#b9425a] bg-pink-50/40 font-black'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#b9425a]' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          <div className="min-h-[180px] py-2 bg-slate-50/50 p-5 rounded-2xl border border-gray-100">
            <AnimatePresence mode="wait">
              {activeTab === 'leather' && (
                <motion.div
                  key="leather-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 font-sans">Aura Vegan Leathers</h4>
                    <p className="text-xs text-gray-500 mt-1 font-sans">Select from our certified vegetable drum-dyed premium substrates.</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'bg-white border-[#b9425a] shadow-md ring-2 ring-pink-100'
                              : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full border border-black/10 shrink-0 block"
                            style={{ backgroundColor: c.hex }}
                          />
                          <div>
                            <span className="text-xs font-bold text-gray-800 tracking-wide font-sans block">{c.name}</span>
                            <span className="text-[10px] text-gray-400 font-sans">Selected finish</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-[#cf5e76] bg-pink-50/50 p-2.5 rounded-lg border border-pink-100/50 font-sans leading-normal">
                    <strong>Designer Tip: </strong>{currentColorObj.desc}
                  </p>
                </motion.div>
              )}

              {activeTab === 'monogram' && (
                <motion.div
                  key="monogram-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 font-sans">B3 Monogram Hardware Finish</h4>
                    <p className="text-xs text-gray-500 mt-1 font-sans">The custom physical &quot;B3&quot; luxury relief badge attached to the locking mechanism.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {hardwares.map((h) => {
                      const isSelected = selectedHardware === h.name;
                      return (
                        <button
                          key={h.name}
                          onClick={() => setSelectedHardware(h.name)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-white border-[#b9425a] shadow-md ring-2 ring-pink-100'
                              : 'bg-white/80 hover:bg-white border-gray-200'
                          }`}
                        >
                          <div className={`w-full h-3 rounded-md bg-gradient-to-r ${h.gradient} mb-2 border border-black/10`} />
                          <span className="text-xs font-black text-gray-900 font-sans">{h.name}</span>
                          <p className="text-[10px] text-gray-500 leading-tight mt-1 font-sans">{h.desc}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Engraved Initials Sub-Section */}
                  <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-4 mt-2 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-700" />
                      <span className="text-xs font-bold text-amber-800 font-sans">Engrave Personal Plaque (Optional Extra)</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-sans">Type up to 3 letters to engrave your initials onto the inner certification brass plate!</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={3}
                        value={customInitials}
                        onChange={(e) => setCustomInitials(e.target.value)}
                        placeholder="e.g. T.S"
                        className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold font-mono tracking-widest text-center uppercase focus:outline-none focus:ring-2 focus:ring-[#cf5e76] focus:border-transparent w-24 shadow-xs"
                      />
                      <div className="flex-1 flex items-center justify-between text-xs text-amber-900 font-mono bg-white px-3 rounded-xl border border-gray-200 shadow-2xs">
                        <span>Preview: [ {customInitials.toUpperCase() || 'B3 ORIGINAL'} ]</span>
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">Free Guest Bonus</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'scarf' && (
                <motion.div
                  key="scarf-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 font-sans">Silk Scarf wrap tie (Free Anniversary Gift)</h4>
                    <p className="text-xs text-gray-500 mt-1 font-sans">A luxurious 100% fine mulberry silk accessory wrapped beautifully around the top handle.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {scarves.map((s) => {
                      const isSelected = selectedScarf === s.name;
                      return (
                        <button
                          key={s.name}
                          onClick={() => setSelectedScarf(s.name)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-white border-[#b9425a] shadow-md ring-2 ring-pink-100'
                              : 'bg-white/80 hover:bg-white border-gray-200'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-black ${s.pattern}`}>
                            Silk
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-gray-900 font-sans block truncate">{s.name}</span>
                            <span className="text-[10px] text-gray-400 font-sans block mt-0.5 leading-snug">{s.styleDesc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'strap' && (
                <motion.div
                  key="strap-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-gray-400 font-sans">Dynamic Shoulder strap styles</h4>
                    <p className="text-xs text-gray-500 mt-1 font-sans">Determine how you sling or hold your B3 bag through different dress settings.</p>
                  </div>

                  <div className="space-y-2.5">
                    {straps.map((st) => {
                      const isSelected = selectedStrap === st.name;
                      return (
                        <button
                          key={st.name}
                          onClick={() => setSelectedStrap(st.name)}
                          className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-white border-[#b9425a] shadow-md ring-2 ring-pink-100'
                              : 'bg-white/80 hover:bg-white border-gray-200'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-extrabold text-gray-900 font-sans block">{st.name}</span>
                            <span className="text-[10px] text-gray-500 font-sans mt-0.5 block leading-relaxed">{st.detail}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-black text-[#b9425a] font-mono">
                              {st.addonPrice === 0 ? 'Included' : `+₹${st.addonPrice}`}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pricing area & CTA action buttons */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-gray-400 tracking-wider font-sans block">TOTAL COUTURIER PRICE</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-[#b9425a] font-serif text-3xl font-black">
                  ₹{3499 + (selectedStrap === 'Nouveau Street Webbing' ? 150 : 0)}
                </span>
                <span className="text-sm text-gray-400 line-through font-mono">
                  ₹{4699 + (selectedStrap === 'Nouveau Street Webbing' ? 150 : 0)}
                </span>
                <span className="bg-[#cf5e76] text-white text-[10px] font-bold px-2 py-0.5 rounded-full font-sans tracking-wide">
                  BAGSPECIAL35 Code Active!
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 font-sans">
                Includes complimentary boutique dust protection bag, custom handbox packing, and 1 year artisan repair warranty.
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                title="Reset custom configuration options"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={handleAddCustomToCart}
                disabled={isAssembling}
                className="flex-1 bg-gradient-to-r from-[#cf5e76] via-[#b9425a] to-[#3d121b] text-white font-extrabold text-xs sm:text-sm tracking-wide px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-pink-900/10 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isAssembling ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                    Assembling Custom B3 Bag...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add Custom B3 Bag to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-[11px] text-emerald-800 leading-snug font-sans">
              <strong>Artisan Commitment:</strong> Every bespoke B3 order is handcrafted by dedicated artisans within 24 hours of confirmation and dispatched with premium tracked air courier shipping.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
