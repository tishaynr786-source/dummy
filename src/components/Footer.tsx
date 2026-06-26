import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Mail, Phone, MapPin, Sparkles, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#1f090d] text-gray-200 border-t border-gray-900">
      {/* Newsletter bar */}
      <div className="border-b border-[#311116] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-wide">
                Join the Blackberry Circle
              </h3>
              <p className="text-sm text-pink-200/60 mt-1.5 font-sans">
                Subscribe to receive early catalog previews, VIP promotions, and modern bag trends.
              </p>
            </div>
            <div className="lg:col-span-7">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-lg lg:ml-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="bg-[#2e1318] text-white border border-[#4d1f27] focus:border-pink-400 focus:outline-none rounded-lg px-4 py-3 text-sm flex-1 placeholder-gray-400 font-sans"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="bg-[#cf5e76] hover:bg-[#b9425a] active:bg-[#9c3247] text-white text-sm font-semibold tracking-wide px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-green-200 animate-bounce" /> Subscribed!
                    </>
                  ) : (
                    <>
                      Reserve Access <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Logo & Intro */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                B3 Blackberry<span className="text-[#df8899]">Bag</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-pink-100/60 leading-relaxed font-sans mt-3">
              We believe a handbag is more than an accessory—it is an elegant extension of your personal style and dynamic life choices. Meticulously engineered, built to last.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[#df8899] text-xs">
              <Sparkles className="w-4 h-4" />
              <span className="tracking-widest uppercase font-serif font-semibold">Elegant. Luxury. Honest.</span>
            </div>
          </div>

          {/* Quick Nav Options */}
          <div>
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#df8899] font-semibold mb-5 font-sans">
              Collection Menu
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-pink-100/60 font-sans">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
                  Home Catalog
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
                  Sling & Handbags
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
                  Clutches & Partywear
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
                  Style Journal
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none">
                  Mission & Values
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#df8899] font-semibold mb-5 font-sans">
              Customer Support
            </h4>
            <ul className="space-y-4 text-xs sm:text-sm text-pink-100/60 font-sans">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4.5 h-4.5 text-[#df8899] shrink-0 mt-0.5" />
                <a href="mailto:support@blackberrybag.com" className="hover:text-white transition-colors">
                  support@blackberrybag.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#df8899] shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#df8899] shrink-0 mt-0.5" />
                <span>
                  BlackberryBag Fashion Store<br/>
                  Connaught Place, New Delhi, India
                </span>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-[#df8899] font-semibold mb-5 font-sans">
              Boutique Hours
            </h4>
            <div className="bg-[#2e1318]/50 p-4 rounded-xl border border-[#4c1822]/40 text-xs sm:text-sm text-pink-100/60 space-y-2 font-sans">
              <p className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span className="text-white font-medium">10:00 AM - 7:00 PM</span>
              </p>
              <p className="flex justify-between border-t border-[#4c1822]/30 pt-2 mt-2">
                <span>Sunday:</span>
                <span className="text-rose-300 font-semibold uppercase">Closed</span>
              </p>
              <p className="text-[10px] text-pink-100/45 italic leading-relaxed pt-2">
                *Support answers to email queries within 12 hours.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom copyright banner */}
      <div className="border-t border-[#311116] bg-[#170609] py-6 text-center text-xs text-pink-100/40 font-sans space-y-2">
        <p>© {new Date().getFullYear()} BlackberryBag Fashion. All Rights Reserved.</p>
        <p className="mt-1 text-[10px] tracking-wide text-pink-100/20 uppercase">
          Elegant bags designed to stay in style forever
        </p>
        <div className="flex justify-center gap-4 text-[11px] text-pink-100/50 pt-2 border-t border-[#311116]/30 max-w-xs mx-auto">
          <Link to="/sitemap" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition-colors">
            HTML Sitemap
          </Link>
          <span className="text-pink-100/20">•</span>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            XML Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
