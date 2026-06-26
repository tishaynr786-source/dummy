import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Eye, Star, Check, HelpCircle, ShoppingCart, Info, Sparkles, X, ChevronRight, AlertTriangle } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { useSearchParams } from 'react-router-dom';

interface ProductsViewProps {
  onAddToCart: (product: Product, color: string) => void;
  onQuickView: (product: Product) => void;
  activeQuickViewProduct: Product | null;
  onCloseQuickView: () => void;
}

export default function ProductsView({
  onAddToCart,
  onQuickView,
  activeQuickViewProduct,
  onCloseQuickView
}: ProductsViewProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Featured');
  const [activeColorSelector, setActiveColorSelector] = useState<Record<string, string>>({});

  // Quick view internal selections
  const [modalSelectedColor, setModalSelectedColor] = useState('');

  // Handle category sync from URL search parameters
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  // Listen to Global Search Event from Header
  useEffect(() => {
    const handleGlobalSearch = (event: Event) => {
      const query = (event as CustomEvent).detail;
      setSearchQuery(query);
      setSelectedCategory('All'); // reset to show all matching
    };
    window.addEventListener('app-search', handleGlobalSearch);
    return () => {
      window.removeEventListener('app-search', handleGlobalSearch);
    };
  }, []);

  const categories = ['All', 'Handbags', 'Shoulder Bags', 'Sling Bags', 'Clutches', 'Wallets', 'Travel Bags'];

  // Filter & Search Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'PriceLowHigh') {
      return a.price - b.price;
    }
    if (sortBy === 'PriceHighLow') {
      return b.price - a.price;
    }
    if (sortBy === 'Rating') {
      return b.rating - a.rating;
    }
    return 0; // Default Featured sorting
  });

  // Initialize first color for active selectors
  const getSelectedColor = (productId: string, productColors: string[]) => {
    return activeColorSelector[productId] || productColors[0];
  };

  const handleColorChange = (productId: string, col: string) => {
    setActiveColorSelector(prev => ({ ...prev, [productId]: col }));
  };

  // Open modal config
  useEffect(() => {
    if (activeQuickViewProduct) {
      setModalSelectedColor(activeQuickViewProduct.colors[0]);
    }
  }, [activeQuickViewProduct]);

  return (
    <div className="space-y-10 py-6">
      {/* Header banner summary */}
      <section className="bg-gradient-to-r from-[#3d121b] to-black text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1598532187889-556fc1838cfc?q=80&w=400&fit=crop"
            alt="accessory materials background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs uppercase font-bold tracking-widest text-pink-300 font-sans">The Boutique Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wide leading-tight">Our Blackberry Collection</h1>
          <p className="text-sm text-pink-100/70 font-sans font-light leading-relaxed">
            Elevate your personal look with our meticulously engineered ladies hand bags, smart cross-body purses, and luxury wedding clutches. Filter by categories to narrow your choice.
          </p>
        </div>
      </section>

      {/* Primary Search and Filters Control bar */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          
          {/* Search bar inside Catalog */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for custom bags, velvet clutches, travel totes..."
              className="w-full text-sm border border-gray-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-100 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort bar selection */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-gray-500 font-sans flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" /> Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 bg-white font-medium text-gray-700 focus:border-[#b9425a] focus:outline-none"
            >
              <option value="Featured">Featured Curation</option>
              <option value="PriceLowHigh">Price: Low to High</option>
              <option value="PriceHighLow">Price: High to Low</option>
              <option value="Rating">Rating Score: High to Low</option>
            </select>
          </div>
        </div>

         {/* Categories Horizontal filter list */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === 'All') {
                      searchParams.delete('category');
                    } else {
                      searchParams.set('category', cat);
                    }
                    setSearchParams(searchParams);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#b9425a] text-white shadow-xs'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Catalog Display Grid */}
      <section>
        {sortedProducts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center space-y-4 shadow-xs">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-900">No matching models found</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1 font-sans">
                We couldn&apos;t find bags relating to &quot;<span className="text-[#b9425a] font-semibold">{searchQuery}</span>&quot; in category &quot;{selectedCategory}&quot;. Please adjust your filters.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="bg-[#3d121b] text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b9425a] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((prod) => {
              const activeColor = getSelectedColor(prod.id, prod.colors);
              return (
                <div
                  key={prod.id}
                  className="group bg-white rounded-2xl p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative border border-gray-100"
                >
                  {/* Absolute tags */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {prod.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/95 text-gray-900 border border-gray-100 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-sans shadow-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* image layout container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 mb-4 shrink-0">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover trigger overlay controls */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 px-2">
                      <button
                        onClick={() => onQuickView(prod)}
                        className="bg-white text-gray-900 hover:bg-[#b9425a] hover:text-white transition-colors duration-200 p-2.5 rounded-full shadow-md cursor-pointer"
                        title="Quick view specifications"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onAddToCart(prod, activeColor)}
                        className="bg-[#cf5e76] text-white hover:bg-[#b9425a] transition-colors duration-200 py-2.5 px-5 rounded-lg font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <ShoppingCart className="w-4 h-4" /> Add to Bag
                      </button>
                    </div>
                  </div>

                  {/* Body textual content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-xs text-[#cf5e76] font-semibold uppercase tracking-widest font-sans">
                        {prod.category}
                      </p>
                      
                      {/* Interactive Custom ratings details */}
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-bold px-1.5 py-0.5 rounded-md border border-amber-100 font-sans">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {prod.rating}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 mt-1 line-clamp-1 group-hover:text-[#cf5e76] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    {/* Color Swatch selectors */}
                    <div className="my-3 py-1.5">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2 font-sans">Colors Available</p>
                      <div className="flex flex-wrap gap-2.5">
                        {prod.colors.map((col) => {
                          const isSelected = col === activeColor;
                          return (
                            <button
                              key={col}
                              onClick={() => handleColorChange(prod.id, col)}
                              className={`text-[11px] font-medium font-sans px-2.5 py-1 rounded-md transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-pink-50 text-[#b9425a] border-[#b9425a] font-semibold'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                              }`}
                              title={col}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pricing, quick shop button */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-[#b9425a] font-sans">₹{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-gray-400 line-through font-sans">₹{prod.originalPrice}</span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(prod, activeColor)}
                        className="bg-[#cf5e76] hover:bg-[#b9425a] hover:scale-105 active:scale-95 text-white transition-all duration-200 px-4 py-2.5 rounded-lg text-xs font-bold font-sans cursor-pointer flex items-center gap-1"
                        id={`add-${prod.id}`}
                      >
                        Add to Bag
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick View Modal Dialog */}
      {activeQuickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left image area */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-gray-50 shrink-0">
              <img
                src={activeQuickViewProduct.imageUrl}
                alt={activeQuickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 z-10 bg-black/75 text-white/95 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider font-sans">
                {activeQuickViewProduct.category}
              </div>
            </div>

            {/* Right content details */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto flex flex-col justify-between space-y-5">
              
              {/* Top row with dismiss trigger */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[#cf5e76] text-xs font-bold uppercase tracking-wider font-sans">
                    <Sparkles className="w-3.5 h-3.5" /> Curative Details
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                    {activeQuickViewProduct.name}
                  </h2>
                </div>
                <button
                  onClick={onCloseQuickView}
                  className="p-1 px-2 border rounded-lg hover:bg-gray-100 text-gray-500 cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price & Star description */}
              <div className="flex items-center gap-4 text-sm font-sans border-b border-gray-100 pb-3">
                <span className="text-xl font-bold text-[#b9425a]">₹{activeQuickViewProduct.price}</span>
                {activeQuickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">₹{activeQuickViewProduct.originalPrice}</span>
                )}
                <span className="text-xs text-gray-400">|</span>
                <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" /> {activeQuickViewProduct.rating} ({activeQuickViewProduct.reviewCount} customer reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-light">
                {activeQuickViewProduct.description}
              </p>

              {/* Spec list bullet layout */}
              <div className="space-y-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider font-sans flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-gray-400" /> Premium Specifications
                </p>
                <ul className="space-y-1 text-xs text-gray-600 font-sans leading-relaxed">
                  {activeQuickViewProduct.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#cf5e76] font-semibold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color selections chip inside quickview */}
              <div>
                <p className="text-xs font-semibold text-gray-600 mb-2 font-sans">Select Colour Preference</p>
                <div className="flex flex-wrap gap-2">
                  {activeQuickViewProduct.colors.map((col) => {
                    const isSelected = col === modalSelectedColor;
                    return (
                      <button
                        key={col}
                        onClick={() => setModalSelectedColor(col)}
                        className={`text-xs px-3.5 py-1.5 rounded-lg border font-sans transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#b9425a] text-white border-[#b9425a] font-bold shadow-xs'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {col}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alert inventory trigger and final buy */}
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-orange-600 text-xs font-sans font-medium">
                  <AlertTriangle className="w-4 h-4" /> <span>Limited Inventory: Only 4 leather models are left in stock!</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(activeQuickViewProduct, modalSelectedColor);
                      onCloseQuickView();
                    }}
                    className="flex-1 bg-[#b9425a] hover:bg-[#9c3247] text-white py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add selected to Bag • ₹{activeQuickViewProduct.price}
                  </button>
                  <button
                    onClick={onCloseQuickView}
                    className="border border-gray-200 hover:bg-gray-50 text-gray-600 py-3 px-4 rounded-xl text-xs font-semibold font-sans transition-colors cursor-pointer"
                  >
                    Close View
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
