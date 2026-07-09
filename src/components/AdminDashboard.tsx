import React, { useState, useEffect } from 'react';
import { Lock, Award, LayoutDashboard, PlusCircle, BookOpen, ShoppingBag, Send, Users, Heart, School, Trash2, CheckCircle2, RefreshCw, Eye } from 'lucide-react';
import { store } from '../firebase';
import { Sermon, Event, Product, BlogPost, PrayerRequest, CrisomApplication, PartnershipApplication } from '../types';

interface AdminDashboardProps {
  onAddSermon: (sermon: Sermon) => void;
  onAddProduct: (product: Product) => void;
  onAddEvent: (event: Event) => void;
  onAddPost: (post: BlogPost) => void;
}

export default function AdminDashboard({ onAddSermon, onAddProduct, onAddEvent, onAddPost }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'stats' | 'sermon' | 'product' | 'event' | 'blog' | 'prayer_submissions' | 'crisom_submissions'>('stats');

  // Submissions lists
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [crisomApps, setCrisomApps] = useState<CrisomApplication[]>([]);
  const [partnerships, setPartnerships] = useState<PartnershipApplication[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // New item form states
  // Sermon Form
  const [serTitle, setSerTitle] = useState('');
  const [serSpeaker, setSerSpeaker] = useState('Apostle Godwin BANTAR');
  const [serType, setSerType] = useState<'video' | 'audio' | 'written'>('written');
  const [serCategory, setSerCategory] = useState('Apostolic Mandate');
  const [serDesc, setSerDesc] = useState('');
  const [serUrl, setSerUrl] = useState('');
  const [serThumb, setSerThumb] = useState('https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800');

  // Product Form
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodType, setProdType] = useState<'book' | 'merch' | 'digital' | 'teaching'>('book');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImg, setProdImg] = useState('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800');

  // Event Form
  const [evTitle, setEvTitle] = useState('');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('');
  const [evLoc, setEvLoc] = useState('CRIC Yaoundé HQ, Cameroon');
  const [evDesc, setEvDesc] = useState('');
  const [evCat, setEvCat] = useState<'conference' | 'crusade' | 'weekly' | 'special'>('conference');
  const [evImg, setEvImg] = useState('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800');

  // Blog Form
  const [blTitle, setBlTitle] = useState('');
  const [blAuthor, setBlAuthor] = useState('Apostle Godwin BANTAR');
  const [blCat, setBlCat] = useState<'devotional' | 'announcement' | 'article'>('devotional');
  const [blContent, setBlContent] = useState('');
  const [blExcerpt, setBlExcerpt] = useState('');
  const [blImg, setBlImg] = useState('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800');

  const [formSuccess, setFormSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'cricadmin' || password === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Password. Use code "admin" or "cricadmin" to log in.');
    }
  };

  const loadSubmissions = async () => {
    setRefreshing(true);
    try {
      const prayerData = await store.getCollection('prayer_requests');
      const crisomData = await store.getCollection('crisom_applications');
      const partnerData = await store.getCollection('partnerships');
      
      setPrayers(prayerData as PrayerRequest[]);
      setCrisomApps(crisomData as CrisomApplication[]);
      setPartnerships(partnerData as PartnershipApplication[]);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadSubmissions();
    }
  }, [isAuthenticated]);

  const handleCreateSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    const newSer: Sermon = {
      id: `sermon_${Date.now()}`,
      title: serTitle,
      speaker: serSpeaker,
      date: new Date().toISOString().split('T')[0],
      type: serType,
      url: serUrl,
      thumbnail: serThumb,
      category: serCategory,
      description: serDesc,
      duration: serType === 'written' ? '10 min read' : '30:00'
    };

    await store.addDocument('sermons', newSer);
    onAddSermon(newSer);
    setFormSuccess('Sermon published successfully!');
    
    // Reset Form
    setSerTitle('');
    setSerDesc('');
    setSerUrl('');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `product_${Date.now()}`,
      name: prodName,
      price: parseFloat(prodPrice),
      description: prodDesc,
      type: prodType,
      imageUrl: prodImg
    };

    await store.addDocument('products', newProd);
    onAddProduct(newProd);
    setFormSuccess('Store Product created successfully!');
    
    // Reset Form
    setProdName('');
    setProdPrice('');
    setProdDesc('');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEv: Event = {
      id: `event_${Date.now()}`,
      title: evTitle,
      date: evDate,
      time: evTime,
      location: evLoc,
      description: evDesc,
      category: evCat,
      imageUrl: evImg,
      registrantsCount: 0
    };

    await store.addDocument('events', newEv);
    onAddEvent(newEv);
    setFormSuccess('Event scheduled successfully!');
    
    // Reset Form
    setEvTitle('');
    setEvDate('');
    setEvTime('');
    setEvDesc('');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: BlogPost = {
      id: `blog_${Date.now()}`,
      title: blTitle,
      author: blAuthor,
      date: new Date().toISOString().split('T')[0],
      category: blCat,
      content: blContent,
      imageUrl: blImg,
      excerpt: blExcerpt || blContent.substring(0, 120) + '...'
    };

    await store.addDocument('blog_posts', newPost);
    onAddPost(newPost);
    setFormSuccess('Devotional published successfully!');
    
    // Reset Form
    setBlTitle('');
    setBlContent('');
    setBlExcerpt('');
    setTimeout(() => setFormSuccess(''), 3000);
  };

  const updateSubmissionStatus = async (col: string, id: string, newStatus: string) => {
    await store.updateDocument(col, id, { status: newStatus });
    loadSubmissions();
  };

  const deleteSubmission = async (col: string, id: string) => {
    await store.deleteDocument(col, id);
    loadSubmissions();
  };

  if (!isAuthenticated) {
    return (
      <div id="admin-login-view" className="bg-white text-slate-800 min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>

        <form onSubmit={handleLogin} className="bg-slate-50 border border-slate-200 p-8 sm:p-10 rounded-3xl max-w-sm w-full text-center space-y-6 shadow-sm relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-2xl"></div>

          <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto border border-brand-green/20 shadow-xs">
            <Lock className="w-5 h-5 animate-pulse text-brand-green" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wider">CRIC Staff Login</h3>
            <p className="text-xs text-slate-600 leading-normal">
              Please provide the administrative access key to manage church content records.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-200 text-red-600 text-xs rounded-xl text-left font-semibold">
              {authError}
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Access Code</label>
            <input
              type="password"
              required
              id="admin-password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter administrative code..."
              className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 px-4 py-3 rounded-xl outline-none shadow-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Authenticate Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div id="admin-panel-view" className="bg-white text-slate-800 min-h-screen py-16 px-4 sm:px-6 lg:px-8 animate-fadeIn relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-center shadow-xs">
            <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20 shadow-xs">
              <Award className="w-6 h-6 animate-pulse text-brand-green" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-3 uppercase tracking-wider">Apostle Godwin BANTAR</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Super Administrator</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 flex flex-col gap-1 shadow-xs">
            {([
              { id: 'stats', label: 'Management Stats', icon: LayoutDashboard },
              { id: 'sermon', label: 'Publish Sermon', icon: BookOpen },
              { id: 'product', label: 'Create Product', icon: ShoppingBag },
              { id: 'event', label: 'Schedule Event', icon: Send },
              { id: 'blog', label: 'Write Devotional', icon: PlusCircle },
              { id: 'prayer_submissions', label: 'Prayers & Counselling', icon: Heart },
              { id: 'crisom_submissions', label: 'CRISOM Applications', icon: School },
            ] as const).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  id={`admin-tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFormSuccess('');
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all flex items-center space-x-3 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-brand-green text-white shadow-md'
                      : 'text-slate-555 hover:text-brand-green hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-center py-3 border border-red-200 hover:bg-red-50 text-red-500 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer bg-slate-50 shadow-xs"
          >
            Lock Dashboard
          </button>
        </div>

        {/* Form contents */}
        <div className="lg:col-span-9 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs min-h-[60vh] relative text-slate-800">
          
          {/* Header section with refresh */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider">
              {activeTab === 'stats' && 'System Analytics Overview'}
              {activeTab === 'sermon' && 'Publish Anointed Sermons'}
              {activeTab === 'product' && 'Add Kingdom Store Resources'}
              {activeTab === 'event' && 'Schedule Upcoming Program'}
              {activeTab === 'blog' && 'Publish Daily Devotionals'}
              {activeTab === 'prayer_submissions' && 'Review Submitted Prayers & Counselling'}
              {activeTab === 'crisom_submissions' && 'Review CRISOM Admissions'}
            </h2>
            
            {(activeTab === 'stats' || activeTab.includes('submission')) && (
              <button 
                onClick={loadSubmissions}
                disabled={refreshing}
                className="p-2.5 rounded-xl bg-white border border-slate-200 hover:text-brand-green hover:bg-slate-100 text-slate-600 transition-all flex items-center gap-1.5 text-xs font-bold uppercase cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            )}
          </div>

          {/* Alert of form success */}
          {formSuccess && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-250 text-emerald-600 text-xs font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{formSuccess}</span>
            </div>
          )}

          {/* Tab 1: Statistics */}
          {activeTab === 'stats' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Prayer Requests Logged</p>
                  <p className="text-3xl font-black text-brand-green mt-2">{prayers.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <p className="text-[10px] uppercase text-slate-500 font-bold">CRISOM Applications</p>
                  <p className="text-3xl font-black text-brand-green mt-2">{crisomApps.length}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
                  <p className="text-[10px] uppercase text-slate-500 font-bold">Global Partnerships</p>
                  <p className="text-3xl font-black text-brand-green mt-2">{partnerships.length}</p>
                </div>
              </div>

              <div className="p-6 bg-brand-green/5 rounded-2xl border border-brand-green/10 space-y-3">
                <h3 className="text-xs font-bold uppercase text-brand-green tracking-widest">Live Connection Status</h3>
                <p className="text-xs text-slate-650 leading-relaxed">
                  The church website is connected to real-time Firebase Firestore database clusters. Local sandbox storage fallbacks are also enabled to avoid latency blockages.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Publish Sermon Form */}
          {activeTab === 'sermon' && (
            <form onSubmit={handleCreateSermon} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sermon Title</label>
                  <input type="text" required value={serTitle} onChange={e => setSerTitle(e.target.value)} placeholder="The Power of Faith" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Speaker Preacher</label>
                  <input type="text" required value={serSpeaker} onChange={e => setSerSpeaker(e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category Topic</label>
                  <input type="text" required value={serCategory} onChange={e => setSerCategory(e.target.value)} placeholder="Purpose / Deliverance" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Media Format Type</label>
                  <select value={serType} onChange={e => setSerType(e.target.value as any)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs">
                    <option className="bg-white text-slate-900" value="written">Written Article</option>
                    <option className="bg-white text-slate-900" value="audio">Audio Sermon</option>
                    <option className="bg-white text-slate-900" value="video">Video Sermon</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stream Url / Audio MP3</label>
                  <input type="text" value={serUrl} onChange={e => setSerUrl(e.target.value)} placeholder="https://..." className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sermon Brief / Full Content Description</label>
                <textarea required rows={4} value={serDesc} onChange={e => setSerDesc(e.target.value)} placeholder="Type sermon scripture outlines or details..." className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed focus:border-brand-green shadow-xs" />
              </div>

              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-md">Publish Sermon Announcement</button>
            </form>
          )}

          {/* Tab 3: Create Product Form */}
          {activeTab === 'product' && (
            <form onSubmit={handleCreateProduct} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                  <input type="text" required value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Unlocking purpose eBook" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Price (CFA / XAF)</label>
                  <input type="number" required value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="3500" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Resource Category</label>
                  <select value={prodType} onChange={e => setProdType(e.target.value as any)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs">
                    <option className="bg-white text-slate-900" value="book">Books</option>
                    <option className="bg-white text-slate-900" value="merch">Merchandise Apparel</option>
                    <option className="bg-white text-slate-900" value="digital">Digital PDF Guidelines</option>
                    <option className="bg-white text-slate-900" value="teaching">Teaching Compilations</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Item Details & Descriptions</label>
                <textarea required rows={4} value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="Describe physical sizing or download instructions..." className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed focus:border-brand-green shadow-xs" />
              </div>

              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-md">Save Product to Catalogue</button>
            </form>
          )}

          {/* Tab 4: Schedule Event Form */}
          {activeTab === 'event' && (
            <form onSubmit={handleCreateEvent} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Program Title</label>
                  <input type="text" required value={evTitle} onChange={e => setEvTitle(e.target.value)} placeholder="Donga Mantung Crusades" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location Venue</label>
                  <input type="text" required value={evLoc} onChange={e => setEvLoc(e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Program Date</label>
                  <input type="text" required value={evDate} onChange={e => setEvDate(e.target.value)} placeholder="2026-09-22" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service Start Time</label>
                  <input type="text" required value={evTime} onChange={e => setEvTime(e.target.value)} placeholder="17:00 (GMT+1)" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Program Category</label>
                  <select value={evCat} onChange={e => setEvCat(e.target.value as any)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs">
                    <option className="bg-white text-slate-900" value="conference">Conferences</option>
                    <option className="bg-white text-slate-900" value="crusade">Local Crusades</option>
                    <option className="bg-white text-slate-900" value="weekly">Weekly Sabbath Services</option>
                    <option className="bg-white text-slate-900" value="special">Special Assemblies</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service Descriptions</label>
                <textarea required rows={4} value={evDesc} onChange={e => setEvDesc(e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed focus:border-brand-green shadow-xs" />
              </div>

              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-md">Save Scheduled Program</button>
            </form>
          )}

          {/* Tab 5: Write Devotional Form */}
          {activeTab === 'blog' && (
            <form onSubmit={handleCreatePost} className="space-y-5 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Post Title</label>
                  <input type="text" required value={blTitle} onChange={e => setBlTitle(e.target.value)} placeholder="Understanding your spiritual walk" className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Author Name</label>
                  <input type="text" required value={blAuthor} onChange={e => setBlAuthor(e.target.value)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Topic Classification</label>
                  <select value={blCat} onChange={e => setBlCat(e.target.value as any)} className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-3 py-2.5 rounded-xl outline-none focus:border-brand-green shadow-xs">
                    <option className="bg-white text-slate-900" value="devotional">Devotionals</option>
                    <option className="bg-white text-slate-900" value="article">Articles & Teaching</option>
                    <option className="bg-white text-slate-900" value="announcement">Ministry News</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Devotional Content Body</label>
                <textarea required rows={6} value={blContent} onChange={e => setBlContent(e.target.value)} placeholder="Type devotional paragraphs..." className="w-full bg-white border border-slate-200 text-sm text-slate-900 px-4 py-3 rounded-xl outline-none resize-none leading-relaxed focus:border-brand-green shadow-xs" />
              </div>

              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer shadow-md">Publish Daily devotions</button>
            </form>
          )}

          {/* Tab 6: View Submitted Prayers */}
          {activeTab === 'prayer_submissions' && (
            <div className="space-y-6 animate-fadeIn">
              {prayers.length === 0 ? (
                <div className="text-center py-20 text-slate-550 text-xs bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <Heart className="w-8 h-8 mx-auto text-slate-400 mb-2 animate-pulse" />
                  <p className="font-bold text-slate-800">No submitted prayer requests logged yet</p>
                </div>
              ) : (
                prayers.map((pr) => (
                  <div key={pr.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-slate-800 shadow-xs">
                    <div className="flex justify-between items-start text-xs border-b border-slate-150 pb-2.5">
                      <div>
                        <p className="font-bold text-slate-900">{pr.name}</p>
                        <p className="text-slate-500 font-mono mt-0.5">{pr.phone} • {pr.email}</p>
                      </div>
                      <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        pr.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-600 border-amber-200'
                          : 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                      }`}>
                        {pr.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{pr.message}"
                    </p>

                    <div className="flex gap-2 justify-end text-[10px] font-bold uppercase">
                      <button 
                        onClick={() => updateSubmissionStatus('prayer_requests', pr.id, 'prayed')}
                        className="px-3 py-1.5 bg-brand-green/10 text-brand-green border border-brand-green/20 hover:bg-brand-green hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        Mark as Prayed
                      </button>
                      <button 
                        onClick={() => deleteSubmission('prayer_requests', pr.id)}
                        className="p-1.5 rounded-lg bg-slate-100 text-red-500 hover:bg-red-50 hover:text-red-650 transition-all cursor-pointer border border-slate-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 7: View CRISOM Applications */}
          {activeTab === 'crisom_submissions' && (
            <div className="space-y-6 animate-fadeIn">
              {crisomApps.length === 0 ? (
                <div className="text-center py-20 text-slate-550 text-xs bg-white rounded-2xl border border-slate-200 shadow-xs">
                  <School className="w-8 h-8 mx-auto text-slate-400 mb-2 animate-pulse" />
                  <p className="font-bold text-slate-800">No submitted CRISOM admission forms logged yet</p>
                </div>
              ) : (
                crisomApps.map((app) => (
                  <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-slate-800 shadow-xs">
                    <div className="flex justify-between items-start text-xs border-b border-slate-150 pb-2.5">
                      <div>
                        <p className="font-bold text-slate-900">{app.name}</p>
                        <p className="text-brand-green mt-0.5 font-bold uppercase tracking-wider text-[9px]">{app.selectedCourse}</p>
                        <p className="text-slate-500 font-mono mt-0.5">{app.phone} • {app.email}</p>
                      </div>
                      <span className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                        app.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-600 border-amber-200'
                          : 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      "{app.essay}"
                    </p>

                    <div className="flex gap-2 justify-end text-[10px] font-bold uppercase">
                      <button 
                        onClick={() => updateSubmissionStatus('crisom_applications', app.id, 'approved')}
                        className="px-3 py-1.5 bg-brand-green/10 text-brand-green border border-brand-green/20 hover:bg-brand-green hover:text-white rounded-lg transition-all cursor-pointer"
                      >
                        Approve Enrollment
                      </button>
                      <button 
                        onClick={() => deleteSubmission('crisom_applications', app.id)}
                        className="p-1.5 rounded-lg bg-slate-100 text-red-500 hover:bg-red-50 hover:text-red-650 transition-all cursor-pointer border border-slate-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
