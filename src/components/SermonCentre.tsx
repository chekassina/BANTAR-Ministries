import React, { useState, useRef } from 'react';
import { Search, Play, Volume2, BookOpen, Clock, User, ArrowRight, X, Pause, PlayCircle } from 'lucide-react';
import { Sermon } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface SermonCentreProps {
  sermons: Sermon[];
}

export default function SermonCentre({ sermons }: SermonCentreProps) {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<'all' | 'video' | 'audio' | 'written'>('all');
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  
  // Audio state
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = 
      sermon.title.toLowerCase().includes(search.toLowerCase()) ||
      sermon.speaker.toLowerCase().includes(search.toLowerCase()) ||
      sermon.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = activeType === 'all' || sermon.type === activeType;
    
    return matchesSearch && matchesType;
  });

  const handlePlayAudio = (sermon: Sermon) => {
    if (playingAudio === sermon.id) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = sermon.url;
        audioRef.current.play();
        setPlayingAudio(sermon.id);
      }
    }
  };

  const handleOpenSermon = (sermon: Sermon) => {
    setSelectedSermon(sermon);
    if (sermon.type === 'audio') {
      handlePlayAudio(sermon);
    }
  };

  return (
    <div id="sermon-centre-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow matching the homepage theme */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Page Header with Premium Visual Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.11]">
            <ImageWithFallback 
              src="/images/lat1(25).jpg" 
              alt="Scripture Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4 max-w-2xl z-10">
            <span className="inline-block text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3 py-1 rounded-full">Ministry Archives</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Sermon Centre</h2>
            <p className="text-sm text-slate-650 leading-relaxed">
              Search and listen to apostolic messages, video highlights, and written archives by Apostle Godwin BANTAR and partners. No one who passes through our hands shall be the same.
            </p>
          </div>
          <div className="shrink-0 z-10 w-full md:w-auto flex justify-center">
            <ImageWithFallback 
              src="/images/lat1(26).jpg" 
              alt="Microphone worship" 
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-slate-200 shadow-md rotate-3 hover:rotate-0 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Hidden audio tag for background playing */}
        <audio 
          ref={audioRef} 
          onEnded={() => setPlayingAudio(null)} 
          className="hidden"
        />

        {/* Filters and Search Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              id="sermon-search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic, speaker, category..."
              className="w-full bg-white border border-slate-200 focus:border-brand-green text-sm text-slate-900 pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all shadow-xs"
            />
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(['all', 'video', 'audio', 'written'] as const).map((type) => (
              <button
                key={type}
                id={`filter-type-${type}`}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeType === type
                    ? 'bg-brand-green text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-550 hover:text-brand-green hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSermons.map((sermon) => {
            const isPlayingThis = playingAudio === sermon.id;
            return (
              <div 
                key={sermon.id} 
                className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-brand-green/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image/Thumbnail Area with overlay */}
                <div className="relative aspect-video bg-slate-100 overflow-hidden group">
                  <ImageWithFallback 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {sermon.type === 'video' && (
                      <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-110 transition-transform" onClick={() => handleOpenSermon(sermon)}>
                        <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                      </div>
                    )}
                    {sermon.type === 'audio' && (
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform ${
                          isPlayingThis ? 'bg-brand-green text-white' : 'bg-white/30 text-white backdrop-blur-xs hover:bg-brand-green hover:text-white'
                        }`} 
                        onClick={() => handlePlayAudio(sermon)}
                      >
                        {isPlayingThis ? <Pause className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                      </div>
                    )}
                    {sermon.type === 'written' && (
                      <div className="w-12 h-12 rounded-full bg-white/30 text-white backdrop-blur-xs flex items-center justify-center hover:bg-white/45 cursor-pointer shadow-lg hover:scale-110 transition-transform" onClick={() => handleOpenSermon(sermon)}>
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <span className="absolute bottom-3 right-3 text-[9px] font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {sermon.type}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-brand-green">
                      <span>{sermon.category}</span>
                      <span className="text-slate-500">{sermon.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-brand-green transition-colors cursor-pointer" onClick={() => handleOpenSermon(sermon)}>
                      {sermon.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {sermon.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1 font-semibold text-slate-600">
                      <User className="w-3.5 h-3.5 text-brand-green" />
                      <span>{sermon.speaker}</span>
                    </span>
                    {sermon.duration && (
                      <span className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-brand-green" />
                        <span>{sermon.duration}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer action button */}
                <button
                  onClick={() => handleOpenSermon(sermon)}
                  className="w-full text-center py-3 bg-white border-t border-slate-200 text-xs font-bold text-brand-green hover:bg-brand-green hover:text-white uppercase tracking-wider transition-all cursor-pointer"
                >
                  {sermon.type === 'written' ? 'Read Sermon Archive' : sermon.type === 'video' ? 'Watch Sermon' : isPlayingThis ? 'Pause Audio' : 'Listen Now'}
                </button>
              </div>
            );
          })}

          {filteredSermons.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-550 space-y-2 bg-slate-50 rounded-3xl border border-slate-200 shadow-xs">
              <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
              <p className="font-bold text-slate-900">No sermons found matching your filter</p>
              <p className="text-xs text-slate-500">Try choosing another tab or adjusting your search term.</p>
            </div>
          )}
        </div>

        {/* Sermon Detail Modal / Panel */}
        {selectedSermon && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-xl">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <span className="text-[9px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full">{selectedSermon.category}</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3">{selectedSermon.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedSermon(null)}
                  className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-750 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
                {selectedSermon.type === 'video' && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-sm">
                    <video 
                      src={selectedSermon.url} 
                      controls 
                      autoPlay
                      className="w-full h-full"
                    />
                  </div>
                )}

                {selectedSermon.type === 'audio' && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center border border-brand-green/20 animate-pulse">
                      <Volume2 className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Streaming Audio Message</p>
                      <p className="text-xs text-slate-500 mt-1">{selectedSermon.speaker} • {selectedSermon.duration}</p>
                    </div>
                    {/* Standard HTML5 audio bar inside modal */}
                    <audio src={selectedSermon.url} controls className="w-full mt-2" autoPlay />
                  </div>
                )}

                {selectedSermon.type === 'written' && (
                  <div className="prose prose-sm max-w-none text-slate-700 space-y-6">
                    <p className="font-bold text-slate-950 italic text-base leading-relaxed">
                      "Apostle Godwin BANTAR delivers this timeless written archive detailing our commission and mandate..."
                    </p>
                    <p className="leading-relaxed text-sm">
                      Back in 2013, seeking God alone in the quietness of the Cameroon wilderness, the call was heavy. It was a seek to receive the mind of God about this generation.
                    </p>
                    <p className="leading-relaxed text-sm">
                      God, in His divine sovereignty, laid down a blueprint for a revival movement named <strong className="text-slate-950">Christ's Revelation International Church</strong>. Along with this name, God spoke a powerful covenant mandate: 
                      <span className="text-brand-green font-bold block my-3 text-center text-lg italic bg-brand-green/10 py-4 border-l-4 border-brand-green">
                        "No one who passes through your hands shall be the same."
                      </span>
                    </p>
                    <p className="leading-relaxed text-sm">
                      To accomplish this, we must build on true spiritual excellence. The modern believer is called to be a purpose-driven leader in both marketplace business and ministry. We cannot afford undivided focus or secondary motives. Let the revival fire burn today!
                    </p>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Speaker</span>
                    <span className="font-bold text-slate-900">{selectedSermon.speaker}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Date Published</span>
                    <span className="font-bold text-slate-900">{selectedSermon.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
