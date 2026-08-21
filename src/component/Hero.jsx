import React from 'react';
import { ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import DashBoardImage from './../assets/Dashboard.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div data-aos="fade-right" className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Simple project management for modern teams
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-6xl">
              Plan Better.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Collaborate Smarter.
              </span>
              <br />
              Deliver Faster.
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg lg:mx-0">
              Manage projects, assign tasks, track progress, and collaborate
              with your entire team — all from one powerful workspace.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/auth/sign-up"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600 hover:shadow-indigo-500/30"
              >
                Get Started Free
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-slate-400 lg:justify-start">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-400" />
                Free to get started
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-400" />
                No credit card required
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT DASHBOARD IMAGE */}
          {/* ================================================= */}

          <div data-aos="fade-up" className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-2xl" />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">
              {/* Browser Header */}
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                <div className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
              </div>

              {/* Dashboard */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={DashBoardImage}
                  alt="TaskFlow Dashboard"
                  className="block w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
