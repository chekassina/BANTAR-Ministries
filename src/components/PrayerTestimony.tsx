import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, User, Phone, Mail, Award, MessageSquare, Star, Eye } from 'lucide-react';
import { store } from '../firebase';

export default function PrayerTestimony() {
  const [activeTab, setActiveTab] = useState<'partnership' | 'prayer' | 'distant' | 'testimony' | 'counselling'>('partnership');
  
  // Universal Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Cameroon');
  const [message, setMessage] = useState('');
  
  // Specific Form States
  const [partnerCategory, setPartnerCategory] = useState<'vision' | 'global' | 'revival'>('vision');
  const [partnerAmount, setPartnerAmount] = useState('10000');
  const [testimonyTitle, setTestimonyTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTestimonyTitle('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (activeTab === 'partnership') {
        await store.addDocument('partnerships', {
          name,
          email,
          phone,
          country,
          category: partnerCategory,
          amount: partnerAmount,
          frequency: 'monthly',
          date: new Date().toISOString()
        });
      } else if (activeTab === 'prayer' || activeTab === 'distant' || activeTab === 'counselling') {
        await store.addDocument('prayer_requests', {
          name,
          email,
          phone,
          requestType: activeTab === 'prayer' ? 'prayer' : activeTab === 'distant' ? 'distant' : 'counselling',
          message,
          date: new Date().toISOString(),
          status: 'pending'
        });
      } else if (activeTab === 'testimony') {
        await store.addDocument('testimonies', {
          name,
          title: testimonyTitle,
          message,
          date: new Date().toISOString(),
          approved: false
        });
      }

      setSubmitting(false);
      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("Failed to submit form:", error);
      setSubmitting(false);
    }
  };

  return (
    <div id="prayer-testimonies-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        
        {/* View Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3.5 py-1 rounded-full">Connection Hub</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Partnership & Prayers</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Submit your prayer requests, share mighty testimonies of what God has done, or partner with Apostle Godwin BANTAR ministries.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex flex-wrap gap-1.5 justify-center shadow-xs">
          {([
            { id: 'partnership', label: 'Partnership Sign-up' },
            { id: 'prayer', label: 'Prayer Request' },
            { id: 'distant', label: 'One-on-One Distant Prayer' },
            { id: 'testimony', label: 'Share Testimony' },
            { id: 'counselling', label: 'Counselling Request' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              id={`prayer-tab-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                setSubmitted(false);
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex-1 md:flex-none text-center cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-500 hover:text-brand-green hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden text-slate-800">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/5 rounded-full blur-2xl"></div>

          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              <h3 className="text-lg font-black text-slate-900 border-b border-slate-200 pb-3 uppercase tracking-wider flex items-center space-x-2">
                <Send className="w-5 h-5 text-brand-green animate-pulse" />
                <span>
                  {activeTab === 'partnership' && 'Global Partnership Registry'}
                  {activeTab === 'prayer' && 'Submit Prayer Request'}
                  {activeTab === 'distant' && 'One-on-One Distant Prayer Covenant'}
                  {activeTab === 'testimony' && 'Share Your Mighty Testimony'}
                  {activeTab === 'counselling' && 'Ministerial Counselling Request'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Godwin"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-3 rounded-xl outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Email address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. bantar@gmail.com"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-3 rounded-xl outline-none shadow-xs"
                    />
                  </div>
                </div>

                {/* Phone number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number (MTN/Orange)</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +237 677 12 34 56"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-3 rounded-xl outline-none font-mono shadow-xs"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Country of Residence</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Cameroon"
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none shadow-xs"
                  />
                </div>
              </div>

              {/* Partnership specific elements */}
              {activeTab === 'partnership' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-white border border-slate-200 animate-fadeIn shadow-xs">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Partnership Pillar</label>
                    <select
                      id="partnership-category"
                      value={partnerCategory}
                      onChange={(e) => setPartnerCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green"
                    >
                      <option className="bg-white text-slate-900" value="vision">Vision Partner (Community Support)</option>
                      <option className="bg-white text-slate-900" value="global">Global Envoy (CRISOM & Missions)</option>
                      <option className="bg-white text-slate-900" value="revival">Revival Sponsor (Crusades & Media)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Covenant Amount (XAF)</label>
                    <input
                      type="number"
                      id="partnership-amount"
                      value={partnerAmount}
                      onChange={(e) => setPartnerAmount(e.target.value)}
                      placeholder="10000"
                      className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Testimony title */}
              {activeTab === 'testimony' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Testimony Title</label>
                  <input
                    type="text"
                    required
                    value={testimonyTitle}
                    onChange={(e) => setTestimonyTitle(e.target.value)}
                    placeholder="e.g. Healing of Chronic Diabetes / Business Breakout"
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none shadow-xs"
                  />
                </div>
              )}

              {/* Message field */}
              {activeTab !== 'partnership' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeTab === 'testimony' ? 'Describe Your Testimony' : 'Write Your Request / Message'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={activeTab === 'testimony' ? 'Detail what the Lord did through the prayers of the Apostle...' : 'Write clearly here. Our intercession department will review this...'}
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed shadow-xs"
                  />
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
              >
                {submitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Submit Connection Registry</span>
                )}
              </button>
            </form>
          ) : (
            <div className="p-6 text-center space-y-6 animate-fadeIn text-slate-800">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-250 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Registry Received!</h3>
                <p className="text-sm text-slate-650 max-w-md mx-auto leading-relaxed">
                  Your submission has been securely written to Christ's Revelation database records. Our prayer department and Apostle Godwin BANTAR will join hands with you.
                </p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="w-full sm:w-auto px-8 bg-brand-green text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-brand-green-dark transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
