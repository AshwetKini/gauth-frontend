'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type HighlightCard = {
  href: string;
  title: string;
  desc: string;
  imgSrc?: string;            // now optional
  icon?: React.ReactNode;     // now optional
  gradient?: string;          // now optional
  bgColor?: string;           // now optional
  textColor?: string;         // now optional
};

const cards: HighlightCard[] = [
  {
    href: '/services',
    title: 'Boost Your Income',
    desc: 'Take on gigs like tutoring, writing, and more',
    imgSrc: '/images/money.png',                // make sure this file exists under /public/images
    gradient: 'from-amber-300 via-orange-300 to-rose-300',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
  },
  {
    href: '/products',
    title: 'Marketplace',
    desc: 'Sell your unique, handmade creations',
    imgSrc: '/images/money.png',          // add this image or change the name you have
    gradient: 'from-blue-400 via-purple-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    href: '/whatweoffer',
    title: 'What Do We Offer?',
    desc: 'Get the 411 on all the ways you can earn',
    imgSrc: '/images/money.png',                // add this image or change the name you have
    gradient: 'from-green-400 via-emerald-500 to-teal-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
  },
];

export default function HighlightsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Ways to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Earn & Grow
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to boost your income, sell your creations, or explore new opportunities, we&apos;ve got you covered.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Subtle gradient wash on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient ?? 'from-indigo-200 to-indigo-400'} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Image or Icon badge */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${card.bgColor ?? 'bg-gray-50'} ${card.textColor ?? 'text-gray-700'} rounded-2xl mb-6 ring-1 ring-black/5 overflow-hidden`}
                  >
                    {card.imgSrc ? (
                      <Image
                        src={card.imgSrc}
                        alt={card.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                        priority={index === 0}
                      />
                    ) : (
                      card.icon
                    )}
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                    <span>Explore now</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient ?? 'from-indigo-200 to-indigo-400'} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
