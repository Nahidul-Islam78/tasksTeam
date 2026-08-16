import { ArrowRight } from 'lucide-react';
import React from 'react';

const WelcomeStep= ({ next }) => {
  
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className='flex flex-col items-center justify-center'>
        {/* Heading */}
        <div className="text-center">
          <h1 className="mt-7 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome to taskTeam
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Let&apos;s get your workspace ready. In just a few quick steps,
            you&apos;ll be ready to organize projects, manage tasks, and
            collaborate with your team.
          </p>
        </div>
        <button
          onClick={next}
          className="mx-auto mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          get started
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default WelcomeStep;