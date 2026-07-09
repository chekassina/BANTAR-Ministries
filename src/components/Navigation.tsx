import { useState } from 'react';
import { Menu, X, Heart, School, BookOpen, Calendar, HelpCircle, User } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onAdminClick: () => void;
  isAdminUnlocked?: boolean;
}

export default function Navigation({ currentTab, setCurrentTab, onAdminClick, isAdminUnlocked = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'sermons', label: 'Sermons' },
    { id: 'store', label: 'Store' },
    { id: 'school', label: 'CRISOM', icon: School },
    { id: 'prayer', label: 'Prayer & Testimonies' },
    { id: 'giving', label: 'Giving' },
    { id: 'blog', label: 'Blog & News' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav id="nav-container" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <div id="brand-logo" className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-xl shadow-sm">
              <span className="tracking-tighter">B</span>
            </div>
            <div>
              <div id="brand-title" className="text-sm font-black tracking-tighter leading-none text-slate-900">BANTAR</div>
              <div id="brand-subtitle" className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Ministries</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-brand-green bg-brand-green/10 font-bold'
                      : 'text-slate-650 hover:bg-slate-100 hover:text-brand-green'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Partner CTA & Admin Entry */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="nav-partner-btn"
              onClick={() => setCurrentTab('giving')}
              className="bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-xl shadow-md shadow-brand-green-light/20 transition-all duration-300 hover:-translate-y-0.5 flex items-center space-x-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Partner</span>
            </button>
            
            {isAdminUnlocked && (
              <button
                id="nav-admin-btn"
                onClick={onAdminClick}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Admin Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            {isAdminUnlocked && (
              <button
                id="mobile-admin-btn"
                onClick={onAdminClick}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-900"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu-container" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 animate-fadeIn shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all flex items-center space-x-3 ${
                  isActive
                    ? 'bg-brand-green/10 text-brand-green font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-brand-green'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            <button
              id="mobile-partner-cta"
              onClick={() => {
                setCurrentTab('giving');
                setIsOpen(false);
              }}
              className="w-full bg-brand-green hover:bg-brand-green-dark text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl text-center shadow-lg flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Partner With Us</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
