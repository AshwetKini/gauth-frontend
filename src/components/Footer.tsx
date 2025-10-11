'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type NavLink = { label: string; href: string };

const explore: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Tutors', href: '/services?category=Tutor' },
  { label: 'Categories', href: '/services#categories' },
];

const company: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

const support: NavLink[] = [
  { label: 'Help Center', href: '/help' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Terms', href: '/legal/terms' },
  { label: 'Privacy', href: '/legal/privacy' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [locale, setLocale] = useState('en-IN');
  const [currency, setCurrency] = useState('INR');
  const [submitted, setSubmitted] = useState(false);

  const year = new Date().getFullYear();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Hook to backend or ESP here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEmail('');
  }

  return (
    <footer className="border-t bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-800">
      {/* Top CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-10 sm:py-12 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Stay updated with new tutors, services, and deals
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join the newsletter to receive hand‑picked content and platform updates.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Subscribe
              </button>
            </form>
            {submitted && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                Thanks for subscribing! Please check your inbox.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold group-hover:rotate-6 transition">
                E
              </span>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                TeenHustler
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Learn from verified experts or sell skills as a hustler—simple, secure, and built for growth.
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon label="Twitter" href="#" svgPath="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.273 8.273 0 01-2.357.636 4.07 4.07 0 001.804-2.23 8.19 8.19 0 01-2.605.981A4.108 4.108 0 0015.448 4c-2.266 0-4.103 1.82-4.103 4.065 0 .319.038.63.106.93-3.41-.17-6.437-1.788-8.46-4.248a3.993 3.993 0 00-.556 2.043 4.05 4.05 0 001.828 3.384 4.096 4.096 0 01-1.858-.51v.05c0 1.975 1.429 3.623 3.323 3.996a4.124 4.124 0 01-1.852.07c.522 1.61 2.038 2.783 3.833 2.816A8.233 8.233 0 012 18.41 11.616 11.616 0 008.29 20" />
              <SocialIcon label="LinkedIn" href="#" svgPath="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v12H0zM8 8h4.8v1.7h.1c.7-1.2 2.3-2.5 4.7-2.5 5 0 5.9 3.3 5.9 7.6V20h-5v-6.1c0-1.5 0-3.4-2.1-3.4-2.1 0-2.5 1.6-2.5 3.3V20H8z" />
              <SocialIcon label="YouTube" href="#" svgPath="M23.499 6.203a2.999 2.999 0 00-2.11-2.121C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.389.582A3 3 0 00.5 6.203C0 8.101 0 12 0 12s0 3.899.5 5.797a3 3 0 002.111 2.121C4.5 20.5 12 20.5 12 20.5s7.5 0 9.389-.582a3 3 0 002.11-2.121C24 15.899 24 12 24 12s0-3.899-.501-5.797zM9.75 15.02V8.98l6.25 3.02-6.25 3.02z" />
            </div>

            {/* App badges placeholders */}
            {/* <div className="mt-6 flex items-center gap-3">
              <Badge>App Store</Badge>
              <Badge>Google Play</Badge>
            </div> */}
          </div>

          {/* Columns */}
          <div className="lg:col-span-8 grid gap-8 sm:grid-cols-3">
            <LinkColumn title="Explore" links={explore} />
            <LinkColumn title="Company" links={company} />
            <LinkColumn title="Support" links={support} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {year} TeenHustler. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {/* <select
              aria-label="Language"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="en-IN">English (India)</option>
              <option value="en-US">English (US)</option>
              <option value="mr-IN">Marathi</option>
            </select>

            <select
              aria-label="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="INR">INR ₹</option>
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
            </select> */}

            <div className="hidden sm:block h-5 w-px bg-gray-300 dark:bg-gray-700" />

            <div className="flex items-center gap-4">
              <Link className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" href="/legal/privacy">
                Privacy
              </Link>
              <Link className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" href="/legal/terms">
                Terms
              </Link>
              <Link className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" href="/sitemap">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={`${title}-${l.href}`}>
            <Link
              href={l.href}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialIcon({ label, href, svgPath }: { label: string; href: string; svgPath: string }) {
  return (
    <Link
      aria-label={label}
      href={href}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 hover:text-white hover:bg-indigo-600 transition"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d={svgPath} />
      </svg>
    </Link>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-200">
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M10 0l3 6 7 1-5 5 1 7-6-3-6 3 1-7L0 7l7-1 3-6z" />
      </svg>
      {children}
    </span>
  );
}
