import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, Phone, Mail } from 'lucide-react';
import { PageId, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
}

export default function Header({
  cart,
  setIsCartOpen
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const getPageIdFromPath = (path: string): PageId => {
    if (path === '/') return 'home';
    if (path.startsWith('/product')) return 'products';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const currentPage = getPageIdFromPath(location.pathname);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Collection' },
    { id: 'about', label: 'Our Story' },
    { id: 'blog', label: 'Journal' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <>
      {/* Top micro-banner */}
      <div className="bg-[#3d121b] text-white text-[11px] sm:text-xs py-2 px-4 transition-colors font-sans w-full">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-2">
          <p className="tracking-wide">✨ Special Handbag Celebration! Use Code <span className="font-semibold text-pink-300">BAGSPECIAL35</span> for 35% Flat Off! Free Shipping Above ₹2000</p>
          <div className="hidden md:flex items-center space-x-4 text-pink-100">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> +91 98765 43210
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> support@blackberrybag.com
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo with beautiful custom B3Logo render */}
            <Link 
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center group text-left cursor-pointer focus:outline-none animate-fadeIn"
              id="brand-logo"
            >
              <div>
                <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-gray-900 block leading-tight">
                  B3 <span className="text-[#b9425a] font-light">Blackberry</span>
                </span>
                <span className="text-[9.5px] uppercase tracking-widest text-[#cf5e76] block font-extrabold font-sans">
                  Luxury Handbags
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                const path = item.id === 'home' ? '/' : `/${item.id}`;
                return (
                  <Link
                    key={item.id}
                    to={path}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`relative py-2 text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer focus:outline-none ${
                      isActive ? 'text-[#b9425a] font-semibold' : 'text-gray-600 hover:text-gray-900'
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div 
                        layoutId="navUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b9425a]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Icons & Actions */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Quick Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-[#b9425a] hover:bg-gray-50 rounded-full transition-colors cursor-pointer"
                aria-label="Search items"
                id="search-trigger"
              >
                <Search className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
              </button>

              {/* Shopping Bag Icon with Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-gray-800 hover:text-white bg-gray-50 hover:bg-[#b9425a] rounded-full transition-all duration-300 group cursor-pointer focus:outline-none"
                aria-label="Open Shopping Cart"
                id="cart-trigger"
              >
                <ShoppingBag className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                <AnimatePresence>
                  {cartTotalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      key={cartTotalItems}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white font-sans text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartTotalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-1 text-gray-700 hover:text-[#b9425a] lg:hidden rounded-md cursor-pointer focus:outline-none"
                aria-label="Toggle menu"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-inner"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;
                  const path = item.id === 'home' ? '/' : `/${item.id}`;
                  return (
                    <Link
                      key={item.id}
                      to={path}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0,0);
                      }}
                      className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive 
                          ? 'bg-pink-50/50 text-[#b9425a] font-semibold' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#b9425a]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-gray-100 px-4 mt-2 grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Call Support</p>
                    <p>+91 98765 43210</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Store Hours</p>
                    <p>Mon - Sat, 10am - 7pm</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Overlay Panel */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3d121b]/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for backpacks, shoulder bags, luxury clutches..."
                    className="w-full text-base text-gray-900 border-none outline-none placeholder-gray-400 focus:ring-0"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsSearchOpen(false);
                        navigate('/products');
                        // Trigger search filter in products through session/handling, we can convey via state
                        const searchEvent = new CustomEvent('app-search', { detail: searchQuery });
                        window.dispatchEvent(searchEvent);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded shadow-xs font-mono">Enter</kbd> to search Blackberry products</span>
                <button 
                  onClick={() => {
                    setSearchQuery('Sling');
                    setIsSearchOpen(false);
                    navigate('/products');
                    setTimeout(() => {
                      const searchEvent = new CustomEvent('app-search', { detail: 'Sling' });
                      window.dispatchEvent(searchEvent);
                    }, 100);
                  }}
                  className="text-[#b9425a] hover:underline"
                >
                  Try &quot;Sling&quot;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
