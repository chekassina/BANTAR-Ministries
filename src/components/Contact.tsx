import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Navigation, Compass, Calendar, Clock } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock Map parameters
  const [zoom, setZoom] = useState(14);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  const services = [
    { name: 'Sunday Transformation Service', day: 'Sunday', time: '08:00 AM - 11:30 AM' },
    { name: 'Wednesday Communion Revival', day: 'Wednesday', time: '05:00 PM - 07:30 PM' },
    { name: 'Friday Fire Deliverance Vigil', day: 'Friday', time: '10:00 PM - 02:00 AM' },
  ];

  return (
    <div id="contact-info-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3.5 py-1 rounded-full">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Contact Our Ministry</h2>
          <p className="text-sm text-slate-600">
            Have questions about CRISOM, partnerships, store items, or service schedules? Reach out and we will assist you.
          </p>
        </div>

        {/* Schedule & Info panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contacts & Services Schedule */}
          <div className="lg:col-span-5 space-y-8 text-slate-800">
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">Ministry Coordinates</h3>
              
              <ul className="space-y-4 text-xs">
                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="p-2 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                    <MapPin className="w-5 h-5 text-brand-green shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Headquarters Address</h4>
                    <p className="text-slate-600 leading-relaxed">Opposite Camp Sonel Total, Yaoundé, Cameroun</p>
                  </div>
                </li>

                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="p-2 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                    <Phone className="w-5 h-5 text-brand-green shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Mobile Lines</h4>
                    <p className="text-slate-600 font-mono">+237 677 12 34 56</p>
                    <p className="text-slate-600 font-mono mt-0.5">+237 699 98 76 54</p>
                  </div>
                </li>

                <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="p-2 bg-brand-green/10 border border-brand-green/20 rounded-xl">
                    <Mail className="w-5 h-5 text-brand-green shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-0.5">Electronic Mail</h4>
                    <p className="text-slate-600 break-all font-mono">info@bantar-ministries.org</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Weekly Calendar Schedule list */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 pb-2">Weekly Service Times</h3>
              
              <div className="space-y-3.5">
                {services.map((serv, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center justify-between text-xs shadow-sm">
                    <div>
                      <p className="font-bold text-slate-900 mb-1">{serv.name}</p>
                      <span className="text-[10px] uppercase font-bold text-slate-500 font-mono">{serv.day}</span>
                    </div>
                    <span className="font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full font-mono text-[10px]">
                      {serv.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm text-slate-800">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <Send className="w-5 h-5 text-brand-green" />
                  <span>Send a Message</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Godwin"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+237 ••• ••• •••"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none font-mono shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject Topic</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. CRISOM Inquiries"
                      className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Write Your Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your email body or inquiry here. Our administration team will respond soon..."
                    className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Submit Inquiry</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-950 uppercase tracking-wider leading-none">Inquiry Dispatched!</h3>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Thank you. Your message has been sent to the CRIC administrative email queues. We will get back to you shortly.
                  </p>
                </div>

                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-brand-green text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-brand-green-dark transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Styled Google Map Mock */}
        <section id="google-map-mock-container" className="space-y-4 text-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                <Compass className="w-5 h-5 text-brand-green" />
                <span>Church Location Map</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">Simulated Live Google Maps view of Christ's Revelation HQ Yaoundé, Cameroon</p>
            </div>
            
            {/* Map Controls */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 1, 18))} 
                className="px-3 py-1 text-xs bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-800 font-bold cursor-pointer"
              >
                +
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(prev - 1, 10))} 
                className="px-3 py-1 text-xs bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-800 font-bold cursor-pointer"
              >
                -
              </button>
            </div>
          </div>

          <div className="h-96 w-full rounded-3xl border border-slate-200 overflow-hidden bg-slate-50 relative shadow-md">
            {/* Satellite/map overlay (light mode theme) */}
            <div className="absolute inset-0 z-0 bg-slate-50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
              
              {/* Fake Road Lines representing Yaoundé */}
              <div className="absolute w-[200%] h-1 bg-slate-200 rotate-12 -translate-x-10 translate-y-12"></div>
              <div className="absolute w-[200%] h-1 bg-slate-200 -rotate-45 translate-x-32 -translate-y-8"></div>
              <div className="absolute w-[200%] h-1.5 bg-brand-green/10 rotate-[80deg] translate-x-20"></div>

              {/* Surrounding landmarks */}
              <div className="absolute top-20 left-1/4 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Yaoundé IV District</div>
              <div className="absolute bottom-24 right-1/4 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider">Opposite Total Sonel Camp</div>
              
              {/* Map pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-brand-green rounded-full animate-ping absolute"></div>
                <div className="p-3 bg-brand-green rounded-full border border-brand-green/30 shadow-xl relative z-10">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="mt-2 text-center bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl shadow-md">
                  <p className="text-[10px] font-black text-slate-900 tracking-wide uppercase">Christ's Revelation Church HQ</p>
                  <p className="text-[8px] text-brand-green font-semibold mt-0.5 font-mono">Opposite Camp Sonel, Yaoundé</p>
                </div>
              </div>
            </div>

            {/* Scale overlay details */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 border border-slate-200 rounded-lg text-[9px] text-slate-500 font-mono flex items-center space-x-2">
              <span>Zoom Level: {zoom}x</span>
              <span>•</span>
              <span>Coordinates: 3.8480° N, 11.5021° E</span>
            </div>

            <a
              href="https://maps.google.com/?q=Yaounde+Cameroon"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-2.5 rounded-lg flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
