import React, { useState } from 'react';
import { Calendar, User, ArrowRight, X, BookOpen, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'devotional' | 'announcement' | 'article'>('all');

  const filteredPosts = posts.filter(post => activeCategory === 'all' || post.category === activeCategory);

  return (
    <div id="blog-devotions-view" className="bg-white text-slate-800 min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,rgba(61,178,194,0.02),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_bottom_left,rgba(217,119,6,0.02),transparent_60%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 border border-brand-green/20 px-3.5 py-1 rounded-full">Voice of Truth</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">Blog & Devotionals</h2>
          <p className="text-sm text-slate-600">
            Read daily devotionals, articles, and announcements from Apostle Godwin BANTAR and partners.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-2 shadow-xs">
          {([
            { id: 'all', label: 'All Content' },
            { id: 'devotional', label: 'Devotionals' },
            { id: 'article', label: 'Articles' },
            { id: 'announcement', label: 'Announcements' },
          ] as const).map((cat) => (
            <button
              key={cat.id}
              id={`blog-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-green text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-500 hover:text-brand-green hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden hover:border-brand-green/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <ImageWithFallback 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                />
                <span className="absolute bottom-3 right-3 text-[9px] font-bold text-white bg-slate-900/90 border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Text info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-brand-green font-bold">{post.category}</span>
                  </div>

                  <h3 
                    className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-green transition-colors line-clamp-2 cursor-pointer" 
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </h3>
                  
                  <p className="text-xs text-slate-650 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-555 font-semibold">
                  <span className="flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.author}</span>
                  </span>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-xs font-bold text-brand-green uppercase tracking-wider flex items-center space-x-1 hover:text-brand-green-dark cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed blog modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl text-slate-800 animate-scaleUp">
              <div className="p-6 border-b border-slate-150 flex items-center justify-between shrink-0 bg-slate-50">
                <div>
                  <span className="text-[9px] font-bold text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full uppercase">{selectedPost.category}</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3">{selectedPost.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-700 leading-relaxed">
                {/* Embedded image */}
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <ImageWithFallback src={selectedPost.imageUrl} alt={selectedPost.title} className="w-full h-full object-cover filter brightness-95" />
                </div>

                {/* Main body content */}
                <div className="whitespace-pre-line space-y-4 font-normal text-slate-650">
                  {selectedPost.content}
                </div>

                <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Author: <strong className="text-slate-900 font-bold">{selectedPost.author}</strong></span>
                  <span>Published: <strong className="text-slate-900 font-bold">{selectedPost.date}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
