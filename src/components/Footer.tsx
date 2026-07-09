import React from 'react';
import { Heart, Mail, Phone, MapPin, Youtube, Facebook, Send, Award, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
  isAdminUnlocked?: boolean;
}

export default function Footer({ setCurrentTab, onAdminClick, isAdminUnlocked = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container" className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200 relative overflow-hidden">
      {/* Footer subtle lighting reflection */}
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[radial-gradient(circle_at_bottom_right,rgba(61,178,194,0.02),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 relative z-10">
        {/* Ministry Intro */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center border border-brand-green/30 shadow-sm">
              <span className="text-xl font-black text-white tracking-tighter">B</span>
            </div>
            <div>
              <div className="text-sm font-black tracking-widest text-brand-green">BANTAR</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-none">Ministries</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Christ's Revelation International Church (CRIC) is a global movement built on global revival, spiritual excellence, and community development. Headquartered in Yaoundé, Cameroon.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-brand-green hover:text-white text-slate-600 hover:border-transparent transition-all duration-300 border border-slate-200">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-brand-green hover:text-white text-slate-600 hover:border-transparent transition-all duration-300 border border-slate-200">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-brand-green hover:text-white text-slate-600 hover:border-transparent transition-all duration-300 border border-slate-200">
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-brand-green pl-3">Quick Links</h4>
          <ul className="space-y-3.5 text-xs font-semibold">
            {['home', 'about', 'programs', 'sermons', 'store', 'school'].map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setCurrentTab(tab)}
                  className="hover:text-brand-green text-slate-700 transition-colors duration-200 capitalize text-left flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-brand-green font-bold">›</span>
                  <span>{tab === 'school' ? 'CRISOM' : tab}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Schedule */}
        <div>
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-brand-green pl-3">Service Times</h4>
          <ul className="space-y-4 text-xs font-normal">
            <li className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-bold text-xs">Sunday Worship Celebration</p>
                <p className="text-[10px] text-slate-500 mt-0.5">08:00 AM - 11:30 AM (GMT+1)</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-bold text-xs">Wednesday Communion & Revival</p>
                <p className="text-[10px] text-slate-500 mt-0.5">05:00 PM - 07:30 PM (GMT+1)</p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-900 font-bold text-xs">Friday Fire & Deliverance Vigil</p>
                <p className="text-[10px] text-slate-500 mt-0.5">10:00 PM - 02:00 AM (GMT+1)</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-slate-900 text-xs font-black uppercase tracking-widest mb-6 border-l-2 border-brand-green pl-3">Contact Ministry</h4>
          <ul className="space-y-4 text-xs font-normal">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
              <span className="text-xs leading-relaxed text-slate-700">
                Christ's Revelation HQ, Opposite Camp Sonel, Yaoundé, Cameroun
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-green shrink-0" />
              <span className="text-slate-700 font-mono">+237 677 12 34 56</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-brand-green shrink-0" />
              <span className="text-slate-700 font-mono">+237 699 98 76 54</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-brand-green shrink-0" />
              <span className="break-all text-slate-700 font-mono">info@bantar-ministries.org</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-semibold text-slate-500 relative z-10">
        <div>
          <p>© {currentYear} Christ's Revelation International Church (CRIC). All Rights Reserved.</p>
          <p className="text-slate-600 mt-1">Founding Apostle: Godwin BANTAR | Co-Founder: Pastor Ethel Bantar</p>
        </div>
        
        {isAdminUnlocked && (
          <div className="flex items-center space-x-6">
            <button
              onClick={onAdminClick}
              className="hover:text-brand-green font-bold flex items-center space-x-1.5 uppercase tracking-widest cursor-pointer text-slate-500 hover:text-brand-green transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-brand-green animate-pulse" />
              <span>Staff Portal (Admin)</span>
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
