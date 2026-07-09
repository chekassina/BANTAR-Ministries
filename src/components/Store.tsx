import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Trash2, X, Sparkles, CheckCircle2, CreditCard, ChevronRight, Phone, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface StoreProps {
  products: Product[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function Store({ products }: StoreProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeType, setActiveType] = useState<'all' | 'book' | 'merch' | 'teaching' | 'digital'>('all');
  
  // Checkout & Payment State
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'card'>('mtn');
  const [momoNumber, setMomoNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [txId, setTxId] = useState('');

  const filteredProducts = products.filter(p => activeType === 'all' || p.type === activeType);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.product.id !== id));
  };

  const getSubtotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    // Simulate payment processing for Cameroun networks
    setTimeout(() => {
      setPaymentLoading(false);
      setCheckoutStep('success');
      setTxId(`CRIC-TX-${Math.floor(Math.random() * 10000000)}`);
      setCart([]); // Clear cart
    }, 2500);
  };

  return (
    <div id="church-store-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow matching the homepage theme */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Store Header - Page Header with Premium Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.11]">
            <ImageWithFallback 
              src="/images/lat1(27).jpg" 
              alt="Books Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 max-w-2xl z-10">
            <span className="inline-block text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full w-fit">Kingdom Resources</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Ministry Online Store</h2>
            <p className="text-sm text-slate-650 leading-relaxed">
              Get books by Apostle Godwin BANTAR, ministerial Polo Shirts, teachings, and downloadable PDF study guides. Support our missions and community outreaches in Cameroon.
            </p>
          </div>
          <div className="shrink-0 z-10 w-full md:w-auto flex items-center justify-center gap-4">
            <ImageWithFallback 
              src="/images/lat1(28).jpg" 
              alt="Spiritual book" 
              className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover border border-slate-200 shadow-md -rotate-6 hover:rotate-0 transition-all duration-300"
            />
            <ImageWithFallback 
              src="/images/lat1(29).jpg" 
              alt="Ministerial Polo" 
              className="w-16 h-20 sm:w-20 sm:h-24 rounded-xl object-cover border border-slate-200 shadow-md rotate-6 hover:rotate-0 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            {/* Kept thin filter header/subtext below for fine context or alignment */}
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest">Filter by Category</span>
          </div>

          {/* Cart Icon / Action */}
          <button
            id="store-cart-toggle"
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-50 border border-slate-200 hover:border-brand-green/35 p-4 rounded-2xl flex items-center space-x-3 transition-all shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-brand-green" />
            <div className="text-left">
              <p className="text-[9px] text-slate-550 uppercase font-bold tracking-wider leading-none">Your Cart</p>
              <p className="text-sm font-bold text-slate-900 mt-1">
                {cart.length > 0 ? `${getSubtotal().toLocaleString()} XAF` : 'Empty'}
              </p>
            </div>
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-brand-green text-white rounded-full text-xs font-bold flex items-center justify-center animate-bounce">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2 shadow-xs">
          {([
            { id: 'all', label: 'All Products' },
            { id: 'book', label: 'Books' },
            { id: 'merch', label: 'Merchandise' },
            { id: 'teaching', label: 'Teachings' },
            { id: 'digital', label: 'Digital PDFs' },
          ] as const).map((cat) => (
            <button
              key={cat.id}
              id={`store-filter-${cat.id}`}
              onClick={() => setActiveType(cat.id)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeType === cat.id
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-550 hover:text-brand-green hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-brand-green/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <ImageWithFallback 
                  src={prod.imageUrl} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {prod.type}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-green transition-colors leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-base font-black text-brand-green font-mono">
                    {prod.price.toLocaleString()} XAF
                  </span>
                  <button
                    id={`add-to-cart-btn-${prod.id}`}
                    onClick={() => addToCart(prod)}
                    className="bg-white hover:bg-brand-green text-slate-500 hover:text-white p-2.5 rounded-xl border border-slate-200 hover:border-transparent transition-all cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Side Drawer / Modal */}
        {isCartOpen && (
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col text-slate-800">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-brand-green" />
                <span>Your Ministry Cart</span>
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {checkoutStep === 'cart' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-500 space-y-2">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-400 animate-pulse" />
                    <p className="font-bold text-slate-800">Your cart is currently empty</p>
                    <p className="text-xs text-slate-550">Browse the bookstore or apparel categories to add items.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 items-center justify-between border-b border-slate-200 pb-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <ImageWithFallback src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                        <p className="text-xs text-brand-green font-bold mt-1 font-mono">{(item.product.price * item.quantity).toLocaleString()} XAF</p>
                        
                        <div className="flex items-center space-x-3 mt-2">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 cursor-pointer">-</button>
                          <span className="text-xs font-mono font-bold text-slate-900">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 cursor-pointer">+</button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Payment step for Cameroon networks */}
            {checkoutStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">Select Your Network / Card</h4>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* MTN MoMo */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mtn')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'mtn'
                          ? 'border-yellow-500 bg-yellow-500/10 text-yellow-600 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-black tracking-widest">MTN MOMO</span>
                    </button>

                    {/* Orange Money */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('orange')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'orange'
                          ? 'border-orange-500 bg-orange-500/10 text-orange-600 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] font-black tracking-widest">ORANGE</span>
                    </button>

                    {/* Bank Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-brand-green bg-brand-green/10 text-brand-green font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span className="text-[9px] font-bold">BANK CARD</span>
                    </button>
                  </div>
                </div>

                {/* MTN/Orange Mobile Money forms */}
                {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-brand-green/10 p-4 rounded-xl border border-brand-green/25 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <p className="text-xs text-slate-700 leading-relaxed">
                        A Cameroon Mobile Money push notification will be triggered on your device. Please enter your MoMo code to approve.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">MoMo Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                        <input
                          type="tel"
                          required
                          value={momoNumber}
                          onChange={(e) => setMomoNumber(e.target.value)}
                          placeholder="e.g. +237 677 123 456"
                          className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• ••••"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Products Subtotal</span>
                    <span className="font-mono">{getSubtotal().toLocaleString()} XAF</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Processing Fee</span>
                    <span>0 XAF</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-200 pt-3">
                    <span>Total Amount</span>
                    <span className="text-brand-green font-mono">{getSubtotal().toLocaleString()} XAF</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  {paymentLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Confirm & Authorize</span>
                  )}
                </button>
              </form>
            )}

            {/* Success step */}
            {checkoutStep === 'success' && (
              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">Payment Approved!</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Thank you for your order. A digital invoice and downlinks (for eBooks or sermons) have been prepared for you.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl w-full text-left space-y-2.5 text-xs font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Receipt ID</span>
                    <span className="text-brand-green font-bold">{txId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Network Channel</span>
                    <span className="text-slate-900 font-bold uppercase">{paymentMethod === 'mtn' ? 'MTN MoMo' : paymentMethod === 'orange' ? 'Orange Money' : 'Bank Card'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status</span>
                    <span className="text-emerald-600 font-bold">SUCCESS</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCheckoutStep('cart');
                  }}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer"
                >
                  Back to Store
                </button>
              </div>
            )}

            {/* Cart Drawer Footer */}
            {checkoutStep === 'cart' && cart.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Total:</span>
                  <span className="text-brand-green text-xl font-black font-mono">{getSubtotal().toLocaleString()} XAF</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
