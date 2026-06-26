import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, X, Heart, MessageSquare, Search, Award, Sparkles, BookOpen } from 'lucide-react';
import { Blog } from '../types';
import { BLOGS } from '../data';

export default function BlogView() {
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  // Static tags list
  const tags = ['All', 'Style Guide', 'Basics', 'Trends', '2026 Season', 'Care Tips', 'Leather'];

  const filteredBlogs = BLOGS.filter((post) => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                          post.summary.toLowerCase().includes(blogSearchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="space-y-12 py-6">
      {/* Editorial Header Cover */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#cf5e76] font-sans flex items-center justify-center gap-1.5">
          <BookOpen className="w-4 h-4" /> Blackberry Style Journal
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-wide leading-tight">
          Fashion Tips &amp; Bag Trends
        </h1>
        <div className="w-12 h-1 bg-[#b9425a] mx-auto rounded-full" />
        <p className="text-sm text-gray-500 font-sans leading-relaxed">
          Unlock styling concepts, color guidelines, and long-life bag preservation techniques curated directly by the Blackberry Delhi design studio.
        </p>
      </section>

      {/* Blog query and tags bar */}
      <section className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={blogSearchQuery}
              onChange={(e) => setBlogSearchQuery(e.target.value)}
              placeholder="Search fashion articles..."
              className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#b9425a] font-sans"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                  selectedTag === tag
                    ? 'bg-[#b9425a] text-white shadow-xs'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-5xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400 space-y-2">
            <p className="font-serif text-lg">No matching articles</p>
            <p className="text-xs font-sans">Please check other filters or adjust your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Image thumb */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-50 shrink-0">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-1">
                    {post.tags.slice(0, 1).map((t, idx) => (
                      <span key={idx} className="bg-white text-gray-900 text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-sans shadow-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Meta rows */}
                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-sans">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#cf5e76] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-sans font-light leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-gray-50 mt-5 flex justify-between items-center text-xs">
                    <span className="font-semibold text-gray-700 flex items-center gap-1 font-sans">
                      <User className="w-3.5 h-3.5 text-gray-400" /> By {post.author}
                    </span>

                    <button
                      onClick={() => setActiveBlog(post)}
                      className="text-[#b9425a] font-bold tracking-wide flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Styled Article Modal Reader */}
      {activeBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
            
            {/* Top Close bar */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-pink-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-spin" /> Fashion Journal
              </span>
              <button
                onClick={() => setActiveBlog(null)}
                className="p-1 px-2.5 border rounded-lg hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main content reader */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
              
              {/* Header Title */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                  {activeBlog.title}
                </h2>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-sans border-y border-gray-100 py-3">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4 text-[#b9425a]" /> By <strong className="text-gray-800">{activeBlog.author}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {activeBlog.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {activeBlog.readTime}
                  </span>
                </div>
              </div>

              {/* Cover Photo */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img
                  src={activeBlog.imageUrl}
                  alt={activeBlog.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Text paragraphs */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                {activeBlog.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Helpful sign */}
              <div className="bg-pink-50/50 border border-pink-100/40 rounded-2xl p-5 flex items-start gap-3.5">
                <Award className="w-6 h-6 text-[#b9425a] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm font-sans text-gray-600">
                  <p className="font-bold text-gray-900">Loved this article?</p>
                  <p className="mt-1">
                    Share these tips with friends or check out BlackberryBag&apos;s latest handcrafted purses collections!
                  </p>
                </div>
              </div>

            </div>

            {/* Read more footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setActiveBlog(null)}
                className="bg-[#3d121b] text-white text-xs font-semibold py-2.5 px-6 rounded-lg hover:bg-pink-700 cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
