import React from 'react';
import { Shield, Sparkles, AlertCircle, ShoppingBag, CheckCircle, Award, Milestone, Compass, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutView() {
  const brandValues = [
    {
      title: 'Quality First',
      desc: 'We utilize double-reinforced stitching, high-grain water-repellent vegan substrates, and premium electroplated buckles to ensure durable endurance.',
      icon: Shield
    },
    {
      title: 'Customer Satisfaction',
      desc: 'Our customer support functions countrywide—answering configuration, styling, and order delivery queries in less than 12 hours.',
      icon: Heart
    },
    {
      title: 'Modern Fashion Trends',
      desc: 'We design fluidly throughout the seasons, continuously checking global styles to supply contemporary structures and pastel tones.',
      icon: Sparkles
    },
    {
      title: 'Affordable Elegance',
      desc: 'By sourcing and crafting directly via master artisans, we avoid redundant retail showrooms, translating savings directly back to you.',
      icon: Award
    }
  ];

  const timelineSteps = [
    {
      year: '2022',
      title: 'Boutique Inception',
      desc: 'BlackberryBag was founded in a humble creative workshop in New Delhi with one simple vision: creating beautiful, robust bags for the everyday woman.'
    },
    {
      year: '2024',
      title: 'Bespoke Vegan Era',
      desc: 'We committed fully to sustainability, transitioning 100% of our catalog to premium cruelty-free bio-leather substitutes and recyclable satins.'
    },
    {
      year: '2026',
      title: 'Delhi Showroom & Global Reach',
      desc: 'Opened our flagship store in Connaught Place, serving over 10,000 active fashionistas and establishing countrywide secure transit.'
    }
  ];

  return (
    <div className="space-y-20 py-8">
      {/* Editorial Headline Cover */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-[#b9425a] uppercase tracking-widest font-sans flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#b9425a] animate-spin" /> Our True North
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-gray-900 tracking-wide leading-tight">
              A Reflection of <br />
              Your Personal Style
            </h1>
            <p className="text-gray-500 font-sans leading-relaxed text-sm sm:text-base">
              At BlackberryBag, we believe a handbag is more than an accessory—it is an elegant extension of your character, an organizer for your dreams, and a companion through key milestones.
            </p>
            <p className="text-gray-500 font-sans leading-relaxed text-sm sm:text-base">
              Founded with an uncompromising passion for high fashion, BlackberryBag designs durable, modern, and highly structural accessories. Every curve, compartment, zipper, and stitch is calculated to solve real-world daily needs while keeping you looking pristine.
            </p>
            <div className="bg-[#f5d5db]/30 rounded-2xl p-6 border border-[#ecb3be]/30 flex gap-4 items-start">
              <CheckCircle className="w-6 h-6 text-[#b9425a] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-sm font-bold text-gray-900">Zero Compromise Heritage</p>
                <p className="text-xs text-gray-500 mt-1 font-sans">
                  From robust laptop protection straps to sparkling evening rhinestone meshes, we use premium raw material batches and carry out deep quality verification.
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl max-h-[550px] lg:max-h-full">
            <img
              src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
              alt="BlackberryBag styling story"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e0e4e]/40 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-lg">
              <p className="font-serif text-base font-extrabold text-[#3d121b]">“Perfect bag matching every lifestyle—from office keynotes to glamorous midnight parties.”</p>
              <p className="text-xs text-[#cf5e76] uppercase tracking-wider font-bold mt-2 font-sans">— Founders Circle, BlackberryBag</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gradient-to-r from-[#3d121b] to-[#1f090d] text-white py-16 sm:py-24 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&fit=crop"
            alt="textured material pattern"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-pink-300 mb-2">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide">Our Mission</h2>
            <p className="text-sm sm:text-base text-pink-100/75 leading-relaxed font-sans">
              To bring fashionable, premium quality, and highly functional bags that elevate everyday lifestyles countrywide. We seek to make modern styling accessible without compromising on sustainable production patterns or ethical labor codes.
            </p>
          </div>
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-pink-300 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-wide">Our Vision</h2>
            <p className="text-sm sm:text-base text-pink-100/75 leading-relaxed font-sans">
              To become India&apos;s leading digital-first luxury boutique for smart accessories, setting trends in modular, climate-conscious materials and durable daily aesthetics. We want every woman to walk with complete style confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-[#b9425a] uppercase tracking-widest font-sans">Corporate Pillars</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-wide">What We Believe In</h2>
          <div className="w-16 h-1 bg-[#b9425a] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brandValues.map((val, i) => {
            const Icon = val.icon;
            return (
              <div 
                key={i} 
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-pink-100 transition-all duration-300 flex flex-col h-full"
                id={`about-value-card-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#b9425a] flex items-center justify-center mb-6 shrink-0 shadow-inner">
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed flex-1">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Boutique Journey Timeline */}
      <section className="bg-gray-50/50 py-16 rounded-3xl border border-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-[#b9425a] uppercase tracking-widest font-sans">Our Milestones</span>
          <h2 className="text-3xl font-serif font-black text-gray-900 tracking-wide">A Story of True Progress</h2>
          <div className="w-16 h-1 bg-[#b9425a] mx-auto rounded-full" />
        </div>

        {/* Timeline Path */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line helper */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-pink-200/50 transform -translate-x-1/2" />

          <div className="space-y-12">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-stretch">
                  {/* Bullet */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#b9425a] text-white flex items-center justify-center font-bold text-xs ring-4 ring-pink-100 transform -translate-x-1/2 z-10">
                    <Milestone className="w-3.5 h-3.5" />
                  </div>

                  {/* Left layout panel */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 ${isEven ? 'md:text-right' : 'md:text-left order-last md:pl-12 md:pr-0'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 inline-block w-full hover:shadow-md transition-shadow">
                      <span className="inline-block font-mono text-xs font-bold text-[#b9425a] bg-pink-50 px-2.5 py-1 rounded-full mb-3">
                        {step.year}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-gray-900 mb-1.5">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Spacer for MD screens to align properly */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
