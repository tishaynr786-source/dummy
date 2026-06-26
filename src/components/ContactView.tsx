import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MessageSquare, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Where do you manufacture and ship from?',
      a: 'All BlackberryBag products are designed, handcrafted, and shipped from our master atelier located right in New Delhi, India. This guarantees strict oversight on quality and direct speed.'
    },
    {
      q: 'Do you use real animal skins or leather?',
      a: 'Never. We are highly committed to sustainable and cruelty-free fashion modes. BlackberryBags are created from premium-grain bio-based vegan leather substrates and high-density cotton/satin linings which feel luxurious and endure longer.'
    },
    {
      q: 'What is your countrywide return and exchange policy?',
      a: 'We offer an easy, hassle-free 10-day exchange and replacement window. If you register any stitching defects, broken clasps, or simply wish to choose a different color, drop us an email!'
    },
    {
      q: 'Is Cash on Delivery (COD) supported?',
      a: 'Yes, Cash on Delivery is entirely supported countrywide. There are no hidden or added transactional fees for choosing Cash on Delivery.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      const gennedTicket = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(gennedTicket);
      setFormSubmitted(true);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '' });
    setFormSubmitted(false);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Intro Editorial Cover */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#cf5e76] font-sans flex items-center justify-center gap-1.5">
          <MessageSquare className="w-4 h-4" /> Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-wide leading-tight">
          Connect with BlackberryBag
        </h1>
        <div className="w-12 h-1 bg-[#b9425a] mx-auto rounded-full" />
        <p className="text-sm text-gray-500 font-sans leading-relaxed">
          Have an inquiry about stock batches, customized corporate gifting orders, transit times, or corporate showroom reservations? Our elite support associates are here to serve.
        </p>
      </section>

      {/* Main Grid Contact and Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left card stats contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-6">
              <h3 className="font-serif text-lg font-bold text-[#3d121b] tracking-wide border-b border-gray-50 pb-3">
                Delhi Flagship Headquarters
              </h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50/80 text-[#b9425a] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Corporate Email</p>
                    <a href="mailto:support@blackberrybag.com" className="text-sm text-gray-800 font-medium hover:text-[#b9425a] transition-colors mt-0.5 block">
                      support@blackberrybag.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50/80 text-[#b9425a] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Boutique Hotline</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50/80 text-[#b9425a] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Physical Address</p>
                    <p className="text-sm text-gray-800 leading-relaxed mt-0.5">
                      <strong>BlackberryBag Boutique Store</strong><br />
                      Block H, Connaught Place, New Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50/80 text-[#b9425a] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">Business Hours</p>
                    <p className="text-sm text-gray-800 mt-0.5">
                      Monday - Saturday: 10:00 AM - 7:00 PM<br />
                      <span className="text-rose-500 font-semibold uppercase text-xs">Sunday: CLOSED</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#3d121b] to-black text-white rounded-3xl p-8 border border-white/5 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs text-pink-300 font-bold uppercase tracking-widest font-sans">
                <Sparkles className="w-3.5 h-3.5" /> Fast Response Guarantee
              </span>
              <p className="text-xs sm:text-sm text-pink-100/70 font-sans leading-relaxed font-light">
                We value your time. If you drop us a message using our automated hotline, our Delhi customer experience team will address your message and issue an elegant response in under 6 hours!
              </p>
            </div>
          </div>

          {/* Right form submission panel */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-150 shadow-md p-6 sm:p-10">
              {formSubmitted ? (
                /* Success submit message block */
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto animate-bounce border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-gray-900">Message Received!</h3>
                    <p className="text-sm text-gray-500 font-sans max-w-md mx-auto leading-relaxed">
                      Thank you for contacting BlackberryBag, <span className="font-bold text-gray-800">{formData.name}</span>. Your support request has been logged.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 text-left max-w-md mx-auto space-y-3 font-sans text-xs">
                    <p className="flex justify-between">
                      <span className="text-gray-400 uppercase font-bold text-[10px]">Reference Ticket ID</span>
                      <strong className="text-[#b9425a] font-mono">{ticketNumber}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400 uppercase font-bold text-[10px]">Email Registered</span>
                      <strong className="text-gray-800">{formData.email}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400 uppercase font-bold text-[10px]"> Hot Message</span>
                      <span className="text-gray-500 truncate max-w-[200px] italic">&quot;{formData.message}&quot;</span>
                    </p>
                    <p className="text-[10px] text-gray-400 italic text-center pt-2 border-t border-gray-150">
                      ⌛ Our dispatchers will reach out within 6 operating support hours!
                    </p>
                  </div>

                  <button
                    onClick={handleResetForm}
                    className="bg-[#2e0e4e] hover:bg-[#b9425a] text-white text-xs font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* Actual interactive contact forms */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#3d121b]">Send BlackberryBag a message</h3>
                    <p className="text-xs text-gray-400 font-sans">Complete the contact slots below. All details remain private.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 block">Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Deepika Padukone"
                        className="w-full text-sm border border-gray-200 rounded-xl p-3 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-100 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="deepika@fashions.com"
                        className="w-full text-sm border border-gray-200 rounded-xl p-3 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-100 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Contact Phone Number (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 01234"
                      className="w-full text-sm border border-gray-200 rounded-xl p-3 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-100 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 block">Your Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ask about dynamic colors availability, custom shipping logistics, or return questions..."
                      className="w-full text-sm border border-gray-200 rounded-xl p-3 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-100 resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3d121b] hover:bg-[#b9425a] text-white py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Secure Inquiry Ticket
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic FAQs Section with states */}
      <section className="bg-gray-50/60 py-16 rounded-3xl border border-gray-100 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold text-[#b9425a] uppercase tracking-widest font-sans flex items-center justify-center gap-1">
            <HelpCircle className="w-4 h-4 text-[#b9425a]" /> FAQ Knowledge base
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-gray-900 tracking-wide">Frequently Asked Questions</h2>
          <div className="w-12 h-0.5 bg-[#b9425a] mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xs transition-shadow"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50"
                >
                  <span className="font-serif font-bold text-sm sm:text-base text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-gray-500 font-sans border-t border-gray-50 bg-gray-50/10 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
