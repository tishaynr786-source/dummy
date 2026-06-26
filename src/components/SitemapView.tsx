import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BLOGS } from '../data';
import { Map, ShoppingBag, BookOpen, User, Phone, FileText, ArrowRight, Layers, Tag } from 'lucide-react';

export default function SitemapView() {
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 space-y-12 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-[#b9425a] text-xs font-bold tracking-wider uppercase font-sans">
          <Map className="w-3.5 h-3.5 animate-pulse" /> Navigation Index
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-gray-900 tracking-tight">
          HTML <span className="text-[#b9425a] font-light">Sitemap</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
          Your complete portal to the B3 Blackberry Bags boutique. Discover our designer collections, style guides, contact channels, and system index configurations in one organized map.
        </p>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        {/* Card 1: Core Pages */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#b9425a] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">Core Directory</h2>
              <p className="text-xs text-gray-400 font-sans">Primary sections of our application</p>
            </div>
          </div>

          <ul className="space-y-4">
            <li>
              <Link to="/" className="group flex items-center justify-between text-sm text-gray-700 hover:text-[#b9425a] font-semibold transition-colors">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cf5e76]"></span>
                  Home Catalog / Landing Page
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#cf5e76] transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/products" className="group flex items-center justify-between text-sm text-gray-700 hover:text-[#b9425a] font-semibold transition-colors">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cf5e76]"></span>
                  Sling & Handbags Catalog
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#cf5e76] transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/about" className="group flex items-center justify-between text-sm text-gray-700 hover:text-[#b9425a] font-semibold transition-colors">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cf5e76]"></span>
                  Our Designing Heritage (About)
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#cf5e76] transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/blog" className="group flex items-center justify-between text-sm text-gray-700 hover:text-[#b9425a] font-semibold transition-colors">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cf5e76]"></span>
                  Style Journal & Guides (Blog)
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#cf5e76] transition-all" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="group flex items-center justify-between text-sm text-gray-700 hover:text-[#b9425a] font-semibold transition-colors">
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cf5e76]"></span>
                  Boutique Support & Location (Contact)
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 group-hover:text-[#cf5e76] transition-all" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Card 2: Shop Categories */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">Bespoke Collections</h2>
              <p className="text-xs text-gray-400 font-sans">Filter by accessory category</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                onClick={() => window.scrollTo(0,0)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-gray-50 hover:border-pink-100 hover:bg-pink-50/25 transition-all group"
              >
                <Tag className="w-3.5 h-3.5 text-[#cf5e76]" />
                <span className="text-xs font-semibold text-gray-700 group-hover:text-[#b9425a] transition-colors">{cat}</span>
              </Link>
            ))}
            <Link
              to="/products"
              onClick={() => window.scrollTo(0,0)}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-dashed border-gray-200 hover:border-[#b9425a] hover:bg-pink-50/25 transition-all group col-span-2 text-center justify-center"
            >
              <span className="text-xs font-extrabold text-[#b9425a] uppercase tracking-wider">Browse Entire Catalog</span>
            </Link>
          </div>
        </div>

        {/* Card 3: All Handbags Products List */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 space-y-6 md:col-span-2">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#b9425a] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">Designer Catalog Index</h2>
              <p className="text-xs text-gray-400 font-sans">Full listing of our individual luxury handbags</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-2xl border border-gray-50 hover:border-pink-50 hover:shadow-md transition-all flex items-start gap-3 bg-gray-50/30"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <h3 className="font-serif text-xs font-bold text-gray-900 truncate leading-snug">{prod.name}</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">{prod.category}</p>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="text-xs font-black text-[#cf5e76] font-sans">₹{prod.price}</span>
                    <Link
                      to={`/products?category=${encodeURIComponent(prod.category)}`}
                      className="text-[10px] font-extrabold text-gray-500 hover:text-[#b9425a] uppercase tracking-wide flex items-center gap-0.5"
                    >
                      View Category →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Style Journal & Blog posts */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#b9425a] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">Latest Style Journal Entries</h2>
              <p className="text-xs text-gray-400 font-sans">Style guides, trends, and product care guidelines</p>
            </div>
          </div>

          <ul className="space-y-4">
            {BLOGS.map((blog) => (
              <li key={blog.id}>
                <Link to="/blog" className="group block space-y-1">
                  <span className="text-xs text-gray-400 font-sans">{blog.date} • {blog.readTime}</span>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#b9425a] transition-colors leading-snug">{blog.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 5: Technical Feeds & Assets */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-gray-50 text-gray-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-gray-900">XML Sitemaps & Search Files</h2>
              <p className="text-xs text-gray-400 font-sans">Automated directory and configuration files</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              We maintain full machine-readable crawler protocols for search engines. Use the resources below to inspect search configurations:
            </p>
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-800">sitemap.xml</h4>
                <p className="text-[10px] text-gray-400 font-sans">XML Search Engine Schema Map</p>
              </div>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-xl text-[11px] font-bold border border-gray-200 transition-all flex items-center gap-1 shrink-0"
              >
                Inspect XML
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
