import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, User, Phone, Mail, Award, X } from 'lucide-react';
import { Event } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface EventsProps {
  events: Event[];
  onRegister: (eventId: string) => void;
}

export default function Events({ events, onRegister }: EventsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'conference' | 'crusade' | 'weekly' | 'special'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Registration form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  const filteredEvents = events.filter(e => activeCategory === 'all' || e.category === activeCategory);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setRegistered(true);
      onRegister(selectedEvent.id);
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
    }, 1500);
  };

  return (
    <div id="events-programs-view" className="bg-white text-slate-850 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow matching the homepage theme */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Events Header with Premium Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.11]">
            <ImageWithFallback 
              src="/images/lat1(30).jpg" 
              alt="Crusade Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 max-w-2xl z-10">
            <span className="inline-block text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">Upcoming Encounters</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Events & Programs</h2>
            <p className="text-sm text-slate-650 leading-relaxed">
              Join Apostle Godwin BANTAR and Christ's Revelation International Church for life-transforming conferences, local crusades, and weekly services.
            </p>
          </div>
          <div className="shrink-0 z-10 w-full md:w-auto flex justify-center">
            <ImageWithFallback 
              src="/images/lat1(31).jpg" 
              alt="Revival conference" 
              className="w-28 h-20 sm:w-36 sm:h-24 rounded-2xl object-cover border border-slate-200 shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2 shadow-xs">
          {([
            { id: 'all', label: 'All Events' },
            { id: 'weekly', label: 'Weekly Services' },
            { id: 'conference', label: 'Conferences' },
            { id: 'crusade', label: 'Crusades' },
            { id: 'special', label: 'Special Programs' },
          ] as const).map((cat) => (
            <button
              key={cat.id}
              id={`events-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-transparent text-slate-500 hover:text-brand-green hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-brand-green/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
            >
              <div className="md:w-2/5 aspect-video md:aspect-auto min-h-[200px] relative bg-slate-100 shrink-0 border-r border-slate-200">
                <ImageWithFallback 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold text-white bg-slate-900/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {event.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">{event.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{event.description}</p>
                </div>

                <div className="space-y-2 text-xs text-slate-505 border-t border-slate-200 pt-4 font-semibold">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-brand-green animate-pulse" />
                    <span className="text-slate-900 font-bold">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-brand-green" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-green" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {event.registrantsCount !== undefined && (
                    <span className="text-[10px] text-slate-500 font-bold flex items-center space-x-1 uppercase">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.registrantsCount} Registered</span>
                    </span>
                  )}
                  
                  {event.category !== 'weekly' && (
                    <button
                      id={`register-btn-${event.id}`}
                      onClick={() => {
                        setSelectedEvent(event);
                        setRegistered(false);
                      }}
                      className="bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer border border-brand-green/20"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-550 space-y-2 bg-slate-50 rounded-3xl border border-slate-200 shadow-xs">
              <Calendar className="w-12 h-12 mx-auto text-slate-400 animate-pulse" />
              <p className="font-bold text-slate-900">No events scheduled currently in this category</p>
              <p className="text-xs text-slate-500">Check our "Weekly Services" or check back later.</p>
            </div>
          )}
        </div>

        {/* Registration Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full overflow-hidden flex flex-col shadow-xl animate-fadeIn">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <span className="text-[9px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full">Admission Registry</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3">Register for Event</h3>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!registered ? (
                <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Event: {selectedEvent.title}</p>
                    <p>Date: {selectedEvent.date} at {selectedEvent.time}</p>
                    <p>Venue: {selectedEvent.location}</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Samuel Mbunwe"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. samuel@gmail.com"
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

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
                        className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-200 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <span>Complete Registration</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-6 text-center space-y-6 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-250 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-slate-900">Registered Successfully!</h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                      Your seat has been reserved for <strong className="text-slate-900">{selectedEvent.title}</strong>. An entry pass details has been logged in our databases.
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
