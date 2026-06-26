import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import ProductsView from './components/ProductsView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import SEO from './components/SEO';
import SitemapView from './components/SitemapView';
import { PRODUCTS, BLOGS } from './data';
import { CartItem, Product } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Quick view triggers
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Floating responsive UI toasts
  const [toastMessage, setToastMessage] = useState('');
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  // 1. Initial cart loaders from localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem('blackberry_cart_v1');
      if (cached) {
        setCart(JSON.parse(cached));
      }
    } catch (e) {
      console.warn("Storage warning: Could not read cached cart items.", e);
    }
  }, []);

  // 2. Persists cart quantities to localStorage
  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    try {
      localStorage.setItem('blackberry_cart_v1', JSON.stringify(updatedCart));
    } catch (e) {
      console.warn("Storage warning: Could not persist cart item changes.", e);
    }
  };

  const triggerToast = (msg: string) => {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 4000);
    setToastTimer(timer);
  };

  const handleAddToCart = (product: Product, color: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedColor === color
    );

    let nextCart: CartItem[] = [];
    if (existingIndex > -1) {
      nextCart = [...cart];
      nextCart[existingIndex].quantity += 1;
      triggerToast(`Added another "${product.name}" (${color}) to your bag!`);
    } else {
      nextCart = [...cart, { product, quantity: 1, selectedColor: color }];
      triggerToast(`Success! "${product.name}" (${color}) added to your bag.`);
    }
    saveCart(nextCart);
  };

  const handleUpdateQuantity = (productId: string, color: string, q: number) => {
    if (q <= 0) {
      handleRemoveItem(productId, color);
      return;
    }
    if (q > 12) {
      triggerToast("Wholesale notice: Orders capped at maximum 12 units per bag model.");
      return;
    }
    const nextCart = cart.map((item) => {
      if (item.product.id === productId && item.selectedColor === color) {
        return { ...item, quantity: q };
      }
      return item;
    });
    saveCart(nextCart);
  };

  const handleRemoveItem = (productId: string, color: string) => {
    const removedItem = cart.find(
      (item) => item.product.id === productId && item.selectedColor === color
    );
    const nextCart = cart.filter(
      (item) => !(item.product.id === productId && item.selectedColor === color)
    );
    saveCart(nextCart);
    if (removedItem) {
      triggerToast(`Removed "${removedItem.product.name}" (${color}) from your bag.`);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleQuickViewProduct = (product: Product) => {
    setActiveQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setActiveQuickViewProduct(null);
  };

  // Structured schemas for premium JSON-LD SEO injection
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "B3 Blackberry Bags",
    "image": "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800",
    "description": "Discover the exclusive Blackberry collection of elegant ladies structured handbags, smart cross-body bags, and stunning wedding party clutches.",
    "telephone": "+1-800-555-0199",
    "priceRange": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B3 Blackberry Boutique, Luxury Lane",
      "addressLocality": "Mumbai",
      "addressRegion": "MH",
      "postalCode": "400001",
      "addressCountry": "IN"
    }
  };

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Blackberry Luxury Handbags Collection",
    "description": "Shop luxurious shoulder bags, leather cross-body backpacks, and gorgeous evening clutches.",
    "itemListElement": PRODUCTS.map((prod, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": prod.name,
        "image": prod.imageUrl,
        "description": prod.description,
        "brand": {
          "@type": "Brand",
          "name": "B3 Blackberry"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": prod.price,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "B3 Blackberry Bags",
      "description": "Bespoke handcrafted ladies' luxury handbags, clutches, and travel gear.",
      "foundingDate": "2020",
      "url": "https://blackberrybag.com/"
    }
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blackberry Style Journal",
    "description": "Expert fashion advice, handbag care tips, and style curations.",
    "blogPost": BLOGS.map((blog) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "image": blog.imageUrl,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "datePublished": blog.date
    }))
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "B3 Blackberry Boutique Customer Care",
      "telephone": "+1-800-555-0199",
      "email": "support@blackberrybag.com"
    }
  };

  const sitemapSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "HTML Sitemap - B3 Blackberry Bags",
    "description": "A comprehensive table of contents for the B3 Blackberry Bags online boutique catalog and resources."
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between font-sans selection:bg-pink-100 selection:text-[#b9425a] antialiased">
      <div>
        {/* Navigation Header */}
        <Header
          cart={cart}
          setIsCartOpen={setIsCartOpen}
        />

        {/* Dynamic page render with elegant fade animated wrappers */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={
                  <>
                    <SEO 
                      title="B3 Blackberry Bags | Handbags, Sling Bags & Luxury Clutches" 
                      description="Discover the exclusive Blackberry collection of elegant ladies structured hand bags, smart cross-body bags, and stunning wedding party clutches." 
                      schema={homeSchema}
                    />
                    <HomeView
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickViewProduct}
                      triggerToast={triggerToast}
                    />
                  </>
                } />
                <Route path="/products" element={
                  <>
                    <SEO 
                      title="Sling & Handbags Catalog | Blackberry Bags" 
                      description="Shop luxurious shoulder bags, leather cross-body backpacks, and gorgeous evening clutches with premium fabrics and flawless quality." 
                      schema={productsSchema}
                    />
                    <ProductsView
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickViewProduct}
                      activeQuickViewProduct={activeQuickViewProduct}
                      onCloseQuickView={handleCloseQuickView}
                    />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <SEO 
                      title="About Blackberry Bags | Our Designing Heritage" 
                      description="Read about BlackberryBag's core values, brand heritage, and deliberate accessory engineering craftsmanship." 
                      schema={aboutSchema}
                    />
                    <AboutView />
                  </>
                } />
                <Route path="/blog" element={
                  <>
                    <SEO 
                      title="Style Journal & Fashion Guide | Blackberry Bags" 
                      description="Get the latest fashion insights, style inspiration, color pairings, and handbag longevity tips from the Blackberry studio." 
                      schema={blogSchema}
                    />
                    <BlogView />
                  </>
                } />
                <Route path="/contact" element={
                  <>
                    <SEO 
                      title="Contact Customer Support | Blackberry Bags" 
                      description="Get help with orders, product inventory, corporate showrooms, or transit query assistance for BlackberryBag Boutique." 
                      schema={contactSchema}
                    />
                    <ContactView />
                  </>
                } />
                <Route path="/sitemap" element={
                  <>
                    <SEO 
                      title="HTML Sitemap & Navigation Index | Blackberry Bags" 
                      description="Explore the complete structure of B3 Blackberry Bags website. Navigate easily through our categories, products, support channels, and editorial logs." 
                      schema={sitemapSchema}
                    />
                    <SitemapView />
                  </>
                } />
                <Route path="*" element={
                  <>
                    <SEO 
                      title="B3 Blackberry Bags | Page Not Found" 
                      description="The page you are looking for does not exist. Return to main catalog." 
                    />
                    <HomeView
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickViewProduct}
                      triggerToast={triggerToast}
                    />
                  </>
                } />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer component */}
      <Footer />

      {/* Static Drawer Shopping Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Animated Toast Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-gray-800 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#cf5e76] text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 font-sans font-medium">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage('')}
              className="text-gray-400 hover:text-white text-xs font-bold font-sans self-start ml-2 focus:outline-none"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
