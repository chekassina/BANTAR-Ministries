import React from 'react';
import { Calendar, Heart, Shield, Award, Users, BookOpen, Star, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';

export default function About() {
  const leadership = [
    {
      name: 'Apostle Godwin BANTAR',
      role: 'Founding Apostle & General Overseer',
      image: '/images/lat1(16).jpg', // Mock representation of pastor
      bio: 'Called and ordained servant of God serving as an apostolic voice. Passionate entrepreneur, father, and visionary, dedicated to spiritual excellence and global revival.'
    },
    {
      name: 'Pastor Mrs Ethel Bantar',
      role: 'Co-Founder & Discipleship Director',
      image: '/images/lat1(17).jpg', // Mock representation of co-pastor
      bio: 'A passionate mother, teacher of the word, and co-leader of CRIC. She drives human empowerment activities assisting less privileged members in our community.'
    }
  ];

  const articles = [
    {
      title: 'Our Trinity Confession',
      desc: 'We believe in one God eternally co-existing as three persons: God the Father, God the Son, and God the Holy Spirit.'
    },
    {
      title: 'Apostolic Mandate',
      desc: 'The mandate of spiritual excellence and global revival, equipping believers to fulfill their divine destiny with undivided focus.'
    },
    {
      title: 'Active Compassion',
      desc: 'True religion is visiting orphans, widows, and assisting those suffering in the church and the community with empowerment.'
    }
  ];

  return (
    <div id="about-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glowing gradients adjusted for light background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* Biography Hero */}
        <section id="biography-hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="absolute inset-0 bg-brand-green/10 rounded-3xl blur-2xl group-hover:bg-brand-green/15 transition-all duration-300"></div>
            <div className="aspect-[4/5] bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl relative z-10">
              <ImageWithFallback 
                src="/images/lat1(18).jpg" 
                alt="Apostle Godwin BANTAR" 
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-6 text-center">
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block mb-1">Apostolic Voice of Revival</span>
                <h3 className="text-xl font-bold text-white">Apostle Godwin BANTAR</h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full w-fit block">Meet the Apostle</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Apostle Godwin BANTAR
            </h2>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Godwin Bantar, widely known as <strong className="text-slate-900">Apostle Godwin BANTAR</strong>, is a Cameroonian purpose-driven leader who rises from the locality of Nkambe, the division of Donga Mantung in the North West Region of Cameroon.
            </p>
            
            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Born and raised by two godly parents, <strong className="text-slate-900">Pa Joseph Mbunwe</strong> and <strong className="text-slate-900">Ma Odilia Munkeng</strong> (who are both already sleeping in the Lord), Apostle Godwin BANTAR is a called and ordained servant of God serving as an apostolic voice. He is equally a passionate entrepreneur who seeks to invest in many fields of life.
            </p>

            <div className="bg-slate-50 border-l-4 border-l-brand-green rounded-2xl p-6 border border-slate-200">
              <h4 className="font-bold text-brand-green text-xs uppercase tracking-widest mb-2">The Wilderness Encounter (2013)</h4>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                "It was back in 2013 when he was alone with the Lord in the wilderness seeking his face to get his mind about his generation, in an encounter, God handed him this vocation... and assured him in his own word 'No one who passes through your hands shall be the same.'"
              </p>
            </div>

            <p className="text-slate-650 text-sm sm:text-base leading-relaxed">
              Apostle Godwin BANTAR is married to <strong className="text-slate-900">Pastor Mrs Ethel Bantar</strong> and they are blessed with three beautiful children: one handsome boy and two beautiful girls. Together, they lead a dynamic congregation based in Yaoundé, Cameroon, with a focus on spiritual awakening, training, and robust human empowerment programs.
            </p>
          </div>
        </section>

        {/* Vision & Mission section */}
        <section id="vision-mission-section" className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-sm">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 text-slate-800">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block">Our Vision</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">Igniting Spiritual & Community Revival</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To build a global community of fully empowered, purpose-driven believers who carry an unusual passion for God and His mandate on earth. We envision a movement where spiritual excellence transforms physical communities.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest block">Our Mission</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">Raising Leaders, Supporting Families</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We exist to recruit and train spiritual leaders through CRISOM, preach the gospel of Jesus Christ, and execute repeated human empowerment projects that assist less privileged and suffering individuals across Yaoundé, Nkambe, and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Statement of Faith */}
        <section id="statement-of-faith" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">What We Believe</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Statement of Faith</h2>
            <p className="text-sm text-slate-550">
              Anchored in biblical truths and apostolic instruction, we remain committed to foundational Christian doctrines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-brand-green/30 transition-all shadow-sm">
                <span className="text-[10px] font-mono text-brand-green font-bold">Confession {idx + 1}</span>
                <h3 className="text-base font-bold text-slate-900 mt-3 mb-2 uppercase tracking-wide">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Leaders */}
        <section id="meet-the-leaders" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">Leadership Team</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Meet the Pastoral Leadership</h2>
            <p className="text-sm text-slate-550">
              Anointed servants of God leading the commission with humility, power, and administrative precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {leadership.map((person, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-brand-green/30 transition-all text-center shadow-sm">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-2 border-brand-green bg-slate-100 shadow-sm">
                  <ImageWithFallback 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover filter brightness-95"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{person.name}</h3>
                <p className="text-[10px] text-brand-green font-bold uppercase tracking-wider mb-4 bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full w-fit mx-auto">{person.role}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
