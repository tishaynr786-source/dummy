import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, ArrowRight, ShieldCheck, CheckCircle2, CreditCard, Award } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, color: string, q: number) => void;
  onRemoveItem: (id: string, color: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percentages
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Checkout workflow states
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    shippingAddress: '',
    postalCode: '',
    city: 'New Delhi',
    paymentMethod: 'UPI'
  });

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  React.useEffect(() => {
    const handleApplyEvent = (e: Event) => {
      const customEvt = e as CustomEvent<{ code: string; discount: number }>;
      if (customEvt.detail && customEvt.detail.code) {
        setPromoCode(customEvt.detail.code);
        setAppliedDiscount(customEvt.detail.discount || 35);
        setPromoSuccess(`Promo ${customEvt.detail.code} applied! You save ${customEvt.detail.discount}% (Special Day Offer).`);
        setPromoError('');
      }
    };
    window.addEventListener('apply-special-promo', handleApplyEvent);
    return () => window.removeEventListener('apply-special-promo', handleApplyEvent);
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLACKBERRY20') {
      setAppliedDiscount(20);
      setPromoSuccess('Promo BLACKBERRY20 applied! You save 20% on all items.');
      setPromoError('');
    } else if (code === 'ELEGANT10') {
      setAppliedDiscount(10);
      setPromoSuccess('Promo ELEGANT10 applied! You save 10% on all items.');
      setPromoError('');
    } else if (code === 'BAGSPECIAL35') {
      setAppliedDiscount(35);
      setPromoSuccess('Promo BAGSPECIAL35 applied! Special Day Celebration Discount of 35% applied.');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try: BAGSPECIAL35');
      setPromoSuccess('');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const shippingCost = subtotal > 2000 || subtotal === 0 ? 0 : 150;
  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);
    
    // Simulate real gateway latency
    setTimeout(() => {
      const generatedCode = 'BBB-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedCode);
      setPaymentProcessing(false);
      setCheckoutComplete(true);
    }, 2000);
  };

  const handleResetCheckout = () => {
    onClearCart();
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    setPromoCode('');
    setAppliedDiscount(0);
    setPromoSuccess('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#3d121b] text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-serif text-lg font-semibold tracking-wide">
                  {isCheckingOut ? 'Secure Checkout' : 'Your Shopping Bag'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 overflow-y-auto">
              {checkoutComplete ? (
                /* Order Success Block */
                <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 animate-pulse border border-emerald-100">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 leading-tight">Order Confirmed!</h3>
                    <p className="text-gray-500 text-sm mt-2">
                       Thank you for shopping at BlackberryBag, <span className="font-semibold text-gray-800">{formData.fullName}</span>. Your payment is verified.
                    </p>
                  </div>

                  {/* Printable Receipt Panel */}
                  <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5 w-full text-left font-mono text-xs text-gray-700 space-y-4">
                    <div className="text-center border-b border-gray-200 pb-3">
                      <p className="font-bold text-gray-900 uppercase tracking-widest text-[13px]">BlackberryBag Ind.</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Connaught Place, New Delhi</p>
                      <p className="text-[10px] text-gray-400">Order ID: <span className="text-[#b9425a] font-bold">{orderId}</span></p>
                    </div>

                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {cart.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{item.quantity}x {item.product.name.substring(0, 20)}.. ({item.selectedColor})</span>
                          <span>₹{item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-2 space-y-1">
                      <div className="flex justify-between text-gray-500">
                        <span>Items Subtotal:</span>
                        <span>₹{subtotal}</span>
                      </div>
                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-semibold">
                          <span>Discount Applied ({appliedDiscount}%):</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Charges:</span>
                        <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                      </div>
                      <div className="flex justify-between text-[#b9425a] font-bold text-sm border-t border-gray-100 pt-1.5 mt-1">
                        <span>Total Paid:</span>
                        <span>₹{grandTotal}</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-2 text-[10px] text-gray-400 leading-tight space-y-0.5">
                      <p><strong>Deliver To:</strong> {formData.shippingAddress}, {formData.postalCode}</p>
                      <p><strong>Method:</strong> {formData.paymentMethod}</p>
                      <p><strong>Est. Delivery:</strong> 3-5 Working Days</p>
                    </div>
                  </div>

                  <button
                    onClick={handleResetCheckout}
                    className="w-full bg-[#3d121b] hover:bg-[#b9425a] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Continue Shopping
                  </button>
                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Guarantee dispatch within 24 hours of checkout.
                  </p>
                </div>
              ) : isCheckingOut ? (
                /* Checkout Form Panel */
                <form onSubmit={executeOrder} className="p-6 space-y-5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-pink-50/50 p-2.5 rounded-lg border border-pink-50">
                    <Award className="w-4 h-4 text-[#b9425a]" />
                    <span>You are purchasing these high quality bag assets securely from Delhi boutique.</span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-gray-700">Shipping Details</h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-600 block">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g., Deepika Verma"
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 block">Email Address</label>
                        <input
                          type="email"
                          name="emailAddress"
                          required
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="deepika@email.com"
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 block">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+91 91234 56789"
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-600 block">Street Shipping Address</label>
                      <textarea
                        name="shippingAddress"
                        required
                        rows={2}
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        placeholder="House No, Street, Landmark details"
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 block">Postal Pincode</label>
                        <input
                          type="text"
                          name="postalCode"
                          required
                          maxLength={6}
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="110001"
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-600 block">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New Delhi"
                          className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-600 block">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full text-sm border border-gray-300 rounded-lg p-2.5 bg-white outline-none focus:border-[#b9425a] focus:ring-1 focus:ring-pink-200"
                      >
                        <option value="UPI">Google Pay / PhonePe UPI (Simulated)</option>
                        <option value="Card">Visa / MasterCard Credit Cards (Simulated)</option>
                        <option value="COD">Cash on Delivery (₹50 Extra fee waived)</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex justify-between items-center text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Total Purchase Value</p>
                      <p className="text-lg font-bold text-gray-900">₹{grandTotal}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs text-[#b9425a] hover:underline"
                    >
                      Return to Bag list
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={paymentProcessing}
                    className="w-full bg-[#1f090d] hover:bg-[#b9425a] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {paymentProcessing ? (
                      <>
                        <div className="animate-spin border-2 border-white/30 border-t-white h-4 w-4 rounded-full" />
                        Authorizing Payment...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Finalize Order &amp; Pay ₹{grandTotal}
                      </>
                    )}
                  </button>
                </form>
              ) : cart.length === 0 ? (
                /* Empty Bag Layout */
                <div className="p-12 text-center h-[50vh] flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">The Bag is Empty</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-[240px] mx-auto">
                      Explore our handcrafted purses and pick elements that match your taste!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#b9425a] hover:bg-[#9c3247] text-white text-xs font-semibold py-2.5 px-6 rounded-lg transition-transform hover:scale-105 duration-200 cursor-pointer shadow-xs"
                  >
                    View Boutique Catalog
                  </button>
                </div>
              ) : (
                /* Itemized List Panel */
                <div className="p-6 space-y-6">
                  {/* Cart List */}
                  <div className="space-y-4 divide-y divide-gray-100">
                    {cart.map((item, i) => (
                      <div key={`${item.product.id}-${item.selectedColor}`} className={`flex gap-4 pt-4 ${i === 0 ? 'pt-0' : ''}`}>
                        {/* Img */}
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-gray-50 border border-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        {/* Info details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{item.product.category}</p>
                          <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Color: <span className="font-medium text-gray-700">{item.selectedColor}</span></p>
                          
                          {/* Price & Quantity Controls */}
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-sm font-extrabold text-[#b9425a]">
                              ₹{item.product.price}
                            </span>
                            <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 scale-90 sm:scale-100 origin-right">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded-sm text-gray-500 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-sans text-xs font-bold w-5 text-center text-gray-700">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded-sm text-gray-500 transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Delete action button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="p-1 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-full transition-colors self-start cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promo Validation Form Block */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mt-6">
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="PROMO CODE (e.g. BLACKBERRY20)"
                          className="w-full text-xs border border-gray-200 rounded-lg pl-9 pr-3 py-2 bg-white uppercase outline-none focus:border-pink-300 font-sans tracking-wide"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#3d121b] hover:bg-pink-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                    {promoError && <p className="text-[11px] text-rose-500 font-sans mt-2">{promoError}</p>}
                    {promoSuccess && <p className="text-[11px] text-green-600 font-semibold font-sans mt-2">{promoSuccess}</p>}
                    
                    {appliedDiscount > 0 && (
                      <div className="inline-flex items-center gap-1.5 mt-2.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-sans font-medium">
                        <Tag className="w-3 h-3" /> Coupons discount of {appliedDiscount}% is active!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Static Totals Footer (Only when listing products list) */}
            {cart.length > 0 && !checkoutComplete && (
              <div className="p-6 bg-white border-t border-gray-100 space-y-4 shadow-inner">
                <div className="space-y-2 text-sm text-gray-600 font-sans">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-medium text-gray-900">₹{subtotal}</span>
                  </div>
                  
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Savings ({appliedDiscount}%)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivered Logistics</span>
                    <span className="font-medium text-gray-900">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-600 font-semibold">FREE Shipping</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] text-right text-gray-400 italic">
                      💡 Add ₹{2000 - subtotal} more of custom bags to grab FREE standard delivery!
                    </p>
                  )}

                  <div className="flex justify-between border-t border-gray-100 pt-3 text-base text-gray-900 font-extrabold">
                    <span>Estimated Total</span>
                    <span className="text-[#b9425a] text-lg">₹{grandTotal}</span>
                  </div>
                </div>

                <div className="pt-2">
                  {isCheckingOut ? (
                    <button
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full text-center text-xs text-gray-500 hover:text-gray-800 underline block"
                    >
                      Browse items inside bag list
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsCheckingOut(true)}
                      className="w-full bg-[#b9425a] hover:bg-[#9c3247] text-white text-sm font-semibold py-3 px-6 rounded-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      Process Checkout Securely <ArrowRight className="w-4 h-4 animate-pulse" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
