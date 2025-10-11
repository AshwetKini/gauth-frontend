// // File: src/app/about/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* HERO — Slogan + Social Proof */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="h-[320px] bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-cyan-400 blur-3xl opacity-20" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 md:pt-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            {/* Photo Left */}
            <div className="md:col-span-2">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl ring-4 ring-indigo-100 bg-slate-100">
                {/* Put your real photo at /public/images/ishika.jpg */}
                <Image
                  src="/images/ishika.jpg"
                  alt="Ishika"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    const fallback = document.getElementById('ishika-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div id="ishika-fallback" className="hidden absolute inset-0 items-center justify-center text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 5v3h16v-3c0-3-4-5-8-5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="md:col-span-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-xs font-semibold">
                TeenHustle • Built by Teens
              </span>

              <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Join TeenHustle — Learn, Earn, Lead
              </h1>

              <p className="mt-4 text-lg text-slate-700">
                A platform by teens, for teens, to build real skills, earn real money, and launch real careers with confidence.
              </p>

              {/* Slogan / selling points */}
              <div className="mt-6 rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-4 flex flex-col md:flex-row items-start md:items-center gap-3">
                <Badge>Learn by doing</Badge>
                <Badge>Earn with gigs</Badge>
                <Badge>Build your portfolio</Badge>
                <Badge>Unlock internships</Badge>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
                >
                  Explore Services
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-slate-900 font-semibold ring-1 ring-slate-200 hover:bg-slate-50 transition"
                >
                  Browse Products
                </Link>
                <button
                  onClick={() => (window.location.href = 'http://localhost:3000/auth/google')}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-black transition"
                >
                  Sign up with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION — Cardboard with tape + glare */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardboardPanel
            eyebrow="Our Mission"
            title="Make teen talent visible, valuable, and unstoppable"
            desc="We help teens gain practical experience, earn fairly, and build confidence by shipping real work — not just collecting grades."
            tape="left"
          />
          <CardboardPanel
            eyebrow="Our Vision"
            title="A world where age is an advantage — not a barrier"
            desc="We’re building a teen creator economy where young people learn fast, earn fair, and lead early with integrity and skill."
            tape="right"
          />
        </div>
      </section>

      {/* POPULAR GIGS — Cardboard grid with subtle tilt & glare */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Popular Gigs</h2>
          <span className="text-xs font-semibold tracking-wide text-indigo-700 bg-indigo-50 rounded-full px-2 py-1">
            Curated for beginners and pros
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          <CardboardGig icon="✏️" title="Graphic Design" desc="Logos, posters, thumbnails" />
          <CardboardGig icon="📲" title="Social Media Marketing" desc="Reels, captions, growth" />
          <CardboardGig icon="💻" title="Web Development" desc="Portfolio, landing pages" />
          <CardboardGig icon="📝" title="Writing" desc="Blogs, scripts, copy" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 text-center">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step num="1" title="Find a gig" desc="Browse services or post what you need." />
          <Step num="2" title="Hire a teen" desc="Pick the best fit and align goals." />
          <Step num="3" title="Get it done" desc="Track progress, approve, and rate." />
        </div>
      </section>

      {/* ===== FOUNDER STORY — Enhanced (Photo left, rich content) ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="relative">
          {/* Gradient frame */}
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-cyan-400 p-[1px] shadow-lg">
            <div className="rounded-2xl bg-white">
              {/* Inner content */}
              <div className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-start">
                  {/* Photo (left) */}
                  <div className="md:col-span-1">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-indigo-100 bg-slate-100 shadow-md">
                      <Image
                        src="/images/ishika.jpg"
                        alt="Ishika Singh"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          const fb = document.getElementById('founder-fallback');
                          if (fb) fb.style.display = 'flex';
                        }}
                      />
                      <div
                        id="founder-fallback"
                        className="hidden absolute inset-0 items-center justify-center text-slate-400"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 5v3h16v-3c0-3-4-5-8-5z" />
                        </svg>
                      </div>
                    </div>

                    {/* Small badges */}
                    <div className="mt-4 hidden md:flex flex-col gap-2">
                      <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-1 text-[10px] font-semibold ring-1 ring-indigo-200">
                        Teen Founder
                      </span>
                      <span className="inline-flex items-center rounded-full bg-fuchsia-50 text-fuchsia-700 px-2 py-1 text-[10px] font-semibold ring-1 ring-fuchsia-200">
                        Builder & Creator
                      </span>
                    </div>
                  </div>

                  {/* Content (right) */}
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                        Founder Story
                      </h3>
                      <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" />
                    </div>

                    {/* Decorative quote icon */}
                    <div className="mt-4 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M7.17 6.17A5.5 5.5 0 0 1 12 2v3a2.5 2.5 0 0 0-2.5 2.5V8H12v8H4v-6c0-1.99.78-3.9 2.17-5.33ZM17.17 6.17A5.5 5.5 0 0 1 22 2v3a2.5 2.5 0 0 0-2.5 2.5V8H22v8h-8v-6c0-1.99.78-3.9 2.17-5.33Z" />
                      </svg>
                    </div>

                    <div className="mt-3 space-y-4 text-slate-700 leading-relaxed">
                      <p>
                        Heyy! I’m Ishika, a 15-year-old who was tired of hearing “you’re too young” every time I wanted to start something cool. Like a lot of teens, I wanted to earn my own money, get real experience, and try out my ideas — but there was literally no platform made for us. Everything out there was either for adults, too complicated, or just didn’t trust teens to be capable. Sooo… I decided to change that.
                      </p>
                      <p>
                        That’s why I created TeenHustle — a space built by a teen, for teens, where we can actually hustle, grow, and glow. Whether you want to tutor younger kids, sell your designs, build your own mini business, or just learn something useful (like how to talk in interviews or speak better English), this is your zone.
                      </p>
                      <p>
                        We’re making money. We’re building skills. We’re getting internships (yep, that’s coming soon). We’re stacking experience and certificates — all while being our unfiltered, creative, Gen Z selves.
                      </p>
                      <p>
                        Because who said you need to be 25 with a degree to be taken seriously? Not us. Not anymore.
                      </p>
                      <p className="text-slate-900 font-semibold">
                        This is your space. Your hustle. Your rules. Let’s get it.
                      </p>
                    </div>

                    {/* Signature bar */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-[2px] w-16 bg-slate-200" />
                      <p className="text-sm font-semibold text-slate-900">
                        — Ishika, Founder, TeenHustle
                      </p>
                    </div>

                    {/* Micro highlights */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Highlight label="Learn fast" />
                      <Highlight label="Earn fairly" />
                      <Highlight label="Build proof" />
                      <Highlight label="Lead early" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Soft background accents */}
          <div className="pointer-events-none absolute -z-10 -left-6 -bottom-6 h-24 w-24 rounded-full bg-fuchsia-200/40 blur-2xl" />
          <div className="pointer-events-none absolute -z-10 right-0 -top-6 h-24 w-24 rounded-full bg-indigo-200/40 blur-2xl" />
        </div>
      </section>

      {/* CLOSING CTA — Conversion Bar */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-cyan-400 p-[1px] shadow-lg">
          <div className="rounded-2xl bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Ready to start your first hustle?</h3>
              <p className="mt-1 text-slate-700">Build skills, earn money, and grow your reputation — one gig at a time.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/services" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 transition">
                Explore Services
              </Link>
              <button
                onClick={() => (window.location.href = 'http://localhost:3000/auth/google')}
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-black transition"
              >
                Join TeenHustle
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ========== UI Subcomponents ========== */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-medium ring-1 ring-slate-200">
      {children}
    </span>
  );
}

/* Cardboard primitives (tape, glare, subtle rotation) */
function CardboardWrapper({
  children,
  rotate = 0,
}: {
  children: React.ReactNode;
  rotate?: number;
}) {
  return (
    <div className="relative group" style={{ transform: `rotate(${rotate}deg)` }}>
      {/* soft drop shadow behind the paper */}
      <div className="absolute inset-0 translate-x-1 translate-y-2 rounded-xl bg-slate-300/30 blur-[2px]" />
      {/* border + subtle gradient paper */}
      <div className="relative rounded-xl bg-white border border-slate-200 p-[1px] shadow-xl">
        <div className="rounded-xl bg-gradient-to-br from-slate-50 to-white p-4 md:p-5">
          {/* glare layer follows cursor */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.12), transparent 40%)',
            }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}

function Tape({ side = 'left' }: { side?: 'left' | 'right' }) {
  const pos = side === 'left' ? 'left-6 -top-3 rotate-[-6deg]' : 'right-6 -top-3 rotate-[6deg]';
  return (
    <div
      className={`absolute ${pos} h-6 w-16 rounded-[2px] bg-yellow-200/90 shadow-sm ring-1 ring-yellow-300`}
      aria-hidden
    />
  );
}

function CardboardPanel({
  eyebrow,
  title,
  desc,
  tape = 'left',
}: {
  eyebrow: string;
  title: string;
  desc: string;
  tape?: 'left' | 'right';
}) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
  return (
    <div onMouseMove={onMove} className="transition-transform duration-300 hover:-translate-y-1">
      <div className="relative">
        <Tape side={tape} />
        <CardboardWrapper rotate={tape === 'left' ? -0.6 : 0.6}>
          <span className="text-xs font-semibold tracking-wide text-indigo-700 bg-indigo-50 rounded-full px-2 py-1">
            {eyebrow}
          </span>
          <h3 className="mt-3 text-xl md:text-2xl font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-slate-700 leading-relaxed">{desc}</p>
        </CardboardWrapper>
      </div>
    </div>
  );
}

function CardboardGig({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
  return (
    <div onMouseMove={onMove} className="transition-transform duration-300 hover:-translate-y-1">
      <CardboardWrapper>
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 text-xl">
            <span aria-hidden>{icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>
        </div>
      </CardboardWrapper>
    </div>
  );
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="absolute -top-3 left-6 inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white text-sm font-bold shadow">
        {num}
      </div>
      <h4 className="mt-4 text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Highlight({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-white hover:shadow-sm transition">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" />
      {label}
    </div>
  );
}
