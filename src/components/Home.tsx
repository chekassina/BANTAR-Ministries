import React from 'react';
import { ArrowRight, Calendar, Heart, Shield, Award, Users, BookOpen, Star, HelpCircle, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { Event, BlogPost } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  events: Event[];
  posts: BlogPost[];
}

export default function Home({ setCurrentTab, events, posts }: HomeProps) {
  // Get upcoming event
  const upcomingEvent = events.find(e => e.category === 'conference') || events[0];
  // Get latest announcements
  const latestPost = posts[0];

  const stats = [
    { value: '15+', label: 'Years of Ministry', icon: Calendar },
    { value: '25+', label: 'Empowered Outreaches', icon: Heart },
    { value: '2,500+', label: 'Disciples Raised', icon: BookOpen },
    { value: '5,000+', label: 'Families Empowered', icon: Users },
  ];

  return (
    <div id="home-view" className="bg-white text-slate-800 min-h-screen relative overflow-hidden">
      {/* High-quality background image with premium light overlay and blend modes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ImageWithFallback 
          src="/images/lat1(19).jpg" 
          alt="Ministry Worship Background" 
          className="w-full h-full object-cover opacity-[0.14] scale-105"
        />
        {/* Cinematic rich light gradient overlays to ensure text is highly readable */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/95 to-white/70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white"></div>
      </div>

      {/* Premium ambient light effects suited for light background */}
      <div className="absolute top-0 right-0 w-[90vw] h-[90vh] bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.06),transparent_70%)] pointer-events-none z-0"></div>
      <div className="absolute top-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03),transparent_60%)] pointer-events-none z-0 blur-3xl"></div>
      <div className="absolute top-[30%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0 blur-3xl"></div>

      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-transparent px-4 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full text-xs font-bold text-brand-green uppercase tracking-widest"
            >
              <Flame className="w-4 h-4 text-brand-green fill-brand-green/10 animate-pulse" />
              <span>Apostolic & Revival Commission</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.95] text-slate-900"
            >
              Apostle Godwin <br/><span className="text-brand-green">BANTAR</span> Ministry
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-slate-650 max-w-xl leading-relaxed mx-auto lg:mx-0"
            >
              Empowering lives through faith, spiritual growth, and transformative leadership education. Join thousands of believers on their journey to spiritual excellence.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-explore-btn"
                onClick={() => setCurrentTab('programs')}
                className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-dark text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-brand-green-light/10 transition-all duration-300 flex items-center justify-center space-x-2 text-xs"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                id="hero-partner-btn"
                onClick={() => setCurrentTab('giving')}
                className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 hover:border-slate-350 font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 text-xs"
              >
                <span>Partner With Us</span>
              </button>
            </motion.div>

            {/* Micro-interaction SCROLL exactly like the photo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="hidden lg:flex items-center space-x-3 pt-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] select-none pointer-events-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping"></span>
              <span>Scroll</span>
            </motion.div>
          </div>

          {/* Quick Info / Live card */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative group"
            >
              <ImageWithFallback 
                src="/images/lat1(20).jpg" 
                alt="Worship Sanctuary" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-[9px] font-bold text-white bg-brand-green px-3 py-1 rounded-full uppercase tracking-widest">
                CRIC Yaoundé HQ Sanctuary
              </span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-50 border border-slate-200/85 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-md relative overflow-hidden"
            >
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl"></div>
              
              <div className="flex items-center justify-between mb-6 z-10 relative">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse"></span>
                  <span>Sunday Transformation Service</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green">Every Sunday</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4 z-10 relative">
                "No one who passes through your hands shall be the same."
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 leading-relaxed z-10 relative">
                Experience powerful, purpose-driven teachings on Global Revival, Spiritual Excellence, and Community Development. Let God's mandate transform your life.
              </p>

              <div className="space-y-4 border-t border-slate-200 pt-6 z-10 relative text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-550 uppercase tracking-widest font-semibold">Morning Glory Service</span>
                  <span className="font-bold text-slate-800">08:00 AM - 11:30 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-550 uppercase tracking-widest font-semibold">Yaoundé HQ Location</span>
                  <span className="font-bold text-slate-800">Opposite Camp Sonel</span>
                </div>
              </div>

              <button
                id="hero-school-cta"
                onClick={() => setCurrentTab('school')}
                className="mt-6 w-full py-3 bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 z-10 relative"
              >
                <span>Enroll in CRISOM</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats-section" className="bg-slate-50/80 border-b border-slate-200 py-12 backdrop-blur-xs z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-center p-4">
                  <div className="inline-flex p-3 rounded-2xl bg-brand-green/10 text-brand-green mb-3 border border-brand-green/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1.5 font-bold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ministry Focus / Pillars */}
      <section id="pillars-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">Our Mandate</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">The Core Pillars of Our Commission</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            God gave this mandate to His servant Apostle Godwin BANTAR back in 2013 to raise a generation carrying unusual passion for purpose and community empowerment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:border-brand-green/30 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="p-4 rounded-2xl bg-brand-green/10 text-brand-green w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-brand-green/20">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Global Revival</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Igniting the fire of true spiritual awakening across Cameroon and internationally, bringing souls to the revelation of Jesus Christ.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:border-brand-green/30 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="p-4 rounded-2xl bg-brand-green/10 text-brand-green w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-brand-green/20">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Spiritual Excellence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nurturing character, doctrine, and depth to live a life aligned with the Holy Spirit, excelling in both faith and leadership.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 hover:border-brand-green/30 transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="p-4 rounded-2xl bg-brand-green/10 text-brand-green w-fit mb-6 group-hover:scale-110 transition-transform duration-300 border border-brand-green/20">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wide">Community Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Practicing active, compassionate empowerment out of Yaoundé HQ, supporting less privileged families, and uplifting community welfare.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements / Upcoming Highlights */}
      <section id="highlights-section" className="bg-transparent py-24 border-t border-slate-200 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Upcoming Event card */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">Featured Event</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Prepare for Encounter</h2>
              
              {upcomingEvent && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row gap-6 hover:border-brand-green/20 transition-all shadow-sm">
                  <div className="md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <ImageWithFallback 
                      src={upcomingEvent.imageUrl} 
                      alt={upcomingEvent.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-brand-green uppercase bg-brand-green/10 px-2.5 py-1 rounded-full">{upcomingEvent.category}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-3 mb-1.5 leading-snug">{upcomingEvent.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{upcomingEvent.description}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200/80 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span>{upcomingEvent.date}</span>
                      <span className="text-brand-green">{upcomingEvent.location}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                id="all-events-btn"
                onClick={() => setCurrentTab('programs')}
                className="inline-flex items-center space-x-2 text-brand-green hover:text-brand-green-dark text-xs font-bold uppercase tracking-wider"
              >
                <span>View Full Calendar</span>
                <ArrowRight className="w-4 h-4 text-brand-green" />
              </button>
            </div>

            {/* Latest News / Announcements */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">Ministry Voice</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Announcements</h2>

              {latestPost && (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 hover:border-brand-green/20 transition-all shadow-sm flex flex-col justify-between h-fit">
                  <div>
                    <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4">
                      <span className="font-bold text-brand-green">{latestPost.category}</span>
                      <span>•</span>
                      <span>{latestPost.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-brand-green transition-colors leading-snug">{latestPost.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-4 mb-6">
                      {latestPost.excerpt}
                    </p>
                  </div>
                  <button
                    id="read-latest-announcement"
                    onClick={() => setCurrentTab('blog')}
                    className="text-xs font-bold text-brand-green uppercase tracking-wider flex items-center space-x-1 hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Life at CRIC Gallery */}
      <section id="life-at-cric-gallery" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">Ministry Life</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Our Ministry in Action</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Glimpses of spiritual awakening, heartfelt praise, interactive discipleship study, and community empowerment activities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src="/images/lat1(21).jpg" 
                alt="Worship Conference" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 bg-white border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Anointed Praise</h4>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">Lifting Up Holy Hands</p>
            </div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src="/images/lat1(22).jpg" 
                alt="Scripture Teachings" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 bg-white border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Apostolic Teachings</h4>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">Deep Scriptural Guides</p>
            </div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src="/images/lat1(23).jpg" 
                alt="Outreach Help" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 bg-white border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Active Compassion</h4>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">Yaoundé & Nkambe Outreaches</p>
            </div>
          </div>

          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs hover:shadow-md transition-all duration-300">
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <ImageWithFallback 
                src="/images/lat1(24).jpg" 
                alt="CRISOM Disciples" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 bg-white border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Youth Discipleship</h4>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold tracking-wider">School of Ministry classes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Give Back banner */}
      <section id="give-back-banner" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-200">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl"></div>
          
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest">Generosity & Empowerment</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mt-4 mb-6 leading-tight max-w-3xl mx-auto">
            Supporting the Work of God & Giving Hope to Communities
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Your tithes, offerings, and partnerships enable Apostle Godwin BANTAR and CRIC to support the suffering in the church, build community infrastructure, and take the gospel to the ends of the earth.
          </p>

          <button
            id="cta-give-now"
            onClick={() => setCurrentTab('giving')}
            className="bg-brand-green hover:bg-brand-green-dark text-white font-bold uppercase tracking-wider px-10 py-4 rounded-xl shadow-lg transition-all duration-300 inline-flex items-center space-x-2.5 text-xs shadow-brand-green-light/10"
          >
            <Heart className="w-4 h-4 text-white fill-white" />
            <span>Give Online Now</span>
          </button>
        </div>
      </section>
    </div>
  );
}
