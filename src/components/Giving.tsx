import React, { useState } from 'react';
import { Heart, CreditCard, Phone, CheckCircle2, DollarSign, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Giving() {
  const [amount, setAmount] = useState('5000'); // Default amount in CFA (XAF)
  const [customAmount, setCustomAmount] = useState('');
  const [givingType, setGivingType] = useState<'tithe' | 'offering' | 'donation' | 'partnership'>('tithe');
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'orange' | 'card'>('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  const quickAmounts = ['2000', '5000', '10000', '25000', '50000'];

  const handleGiveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalAmount = customAmount || amount;

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setRefId(`CRIC-GIV-${Math.floor(Math.random() * 10000000)}`);
    }, 2500);
  };

  return (
    <div id="giving-portal-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* Giving Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3.5 py-1 rounded-full">Scriptural Generosity</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Online Giving & Seeds</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            "Bring the whole tithe into the storehouse, that there may be food in my house." Support the global revival move, less privileged assists, and community development.
          </p>
        </div>

        {!success ? (
          <form onSubmit={handleGiveSubmit} className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 text-slate-800">
            {/* Step 1: Giving Types & Amounts */}
            <div className="md:col-span-7 space-y-6">
              {/* Category selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Giving Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { id: 'tithe', label: 'Tithe' },
                    { id: 'offering', label: 'Offering' },
                    { id: 'donation', label: 'Donation' },
                    { id: 'partnership', label: 'Partnership' },
                  ] as const).map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      id={`giving-cat-${type.id}`}
                      onClick={() => setGivingType(type.id)}
                      className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        givingType === type.id
                          ? 'bg-brand-green border-transparent text-white shadow-md'
                          : 'border-slate-200 bg-white text-slate-500 hover:text-brand-green hover:bg-slate-100'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Amounts selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giving Amount (XAF / CFA)</label>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((val) => (
                    <button
                      key={val}
                      type="button"
                      id={`giving-quick-val-${val}`}
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                        amount === val && !customAmount
                          ? 'bg-brand-green text-white shadow-md'
                          : 'bg-white border border-slate-200 text-slate-500 hover:text-brand-green hover:bg-slate-100'
                      }`}
                    >
                      {parseInt(val).toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative mt-2">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-brand-green font-bold font-mono">XAF</div>
                  <input
                    type="number"
                    value={customAmount}
                    id="giving-custom-amount"
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount('');
                    }}
                    placeholder="Enter custom amount..."
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-12 pr-4 py-3 rounded-xl outline-none transition-all font-mono shadow-xs"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Godwin"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none font-medium shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. godwin@gmail.com"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none shadow-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway (Cameroon) */}
            <div className="md:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">Select Network</h4>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mtn')}
                    className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'mtn'
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-600 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-widest">MTN MOMO</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('orange')}
                    className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      paymentMethod === 'orange'
                        ? 'border-orange-500 bg-orange-500/10 text-orange-600 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-widest">ORANGE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-3.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-brand-green bg-brand-green/10 text-brand-green font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[9px] font-bold">CARD</span>
                  </button>
                </div>

                {/* MTN or Orange MoMo */}
                {(paymentMethod === 'mtn' || paymentMethod === 'orange') && (
                  <div className="space-y-2 animate-fadeIn">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">MoMo Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-450" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +237 677 12 34 56"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Approval message triggers instantly. Verify the transaction prompt on your screen to complete.
                    </p>
                  </div>
                )}

                {/* Card input */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4000 •••• •••• ••••"
                        className="w-full bg-white border border-slate-200 text-xs text-slate-900 px-3.5 py-2 rounded-xl outline-none font-mono focus:border-brand-green"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Expiry</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="w-full bg-white border border-slate-200 text-xs text-slate-900 px-3.5 py-2 rounded-xl outline-none focus:border-brand-green"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CVV</label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          className="w-full bg-white border border-slate-200 text-xs text-slate-900 px-3.5 py-2 rounded-xl outline-none focus:border-brand-green"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic total checkout block */}
              <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Total Giving:</span>
                  <span className="text-brand-green text-xl font-black font-mono">
                    {parseInt(customAmount || amount || '0').toLocaleString()} XAF
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2.5 transition-all shadow-md cursor-pointer"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Process Gift</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-brand-green font-bold tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Secure SSL Secured Transaction</span>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 max-w-lg mx-auto text-center space-y-6 shadow-sm animate-fadeIn text-slate-800">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-250 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Generosity Received!</h3>
              <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                Thank you, beloved <strong className="text-slate-900">{name}</strong>. Your tithe/offering has been registered in the ministry accounts. May the Lord multiply your seeds of faith.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl text-left space-y-2.5 text-xs font-mono text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt reference</span>
                <span className="text-brand-green font-bold">{refId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Donated</span>
                <span className="text-slate-900 font-bold">{parseInt(customAmount || amount || '0').toLocaleString()} XAF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Giving Type</span>
                <span className="text-brand-green font-bold uppercase">{givingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Network Provider</span>
                <span className="text-slate-900 font-bold uppercase">{paymentMethod}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSuccess(false);
                setPhoneNumber('');
                setCustomAmount('');
                setName('');
                setEmail('');
              }}
              className="w-full bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-brand-green-dark transition-all cursor-pointer"
            >
              Give Another Seed
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
