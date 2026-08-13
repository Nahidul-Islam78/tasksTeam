import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What is TaskFlow?',
    answer:
      'TaskFlow is a project management platform that helps teams organize workspaces, projects, tasks, and team collaboration from one place.',
  },
  {
    id: 2,
    question: 'How many members can join a workspace?',
    answer:
      'The number of members depends on your workspace plan. The Starter plan is designed for small teams, while higher plans can support larger teams.',
  },
  {
    id: 3,
    question: 'Is there a free plan?',
    answer:
      'Yes. TaskFlow includes a free Starter plan with basic workspace and task management features.',
  },
  {
    id: 4,
    question: 'Can I invite guests?',
    answer:
      'Yes. Workspace owners and administrators can invite members and guests with different access levels.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = id => {
    setOpenId(currentId => (currentId === id ? null : id));
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to know about TaskFlow.
          </p>
        </div>

        {/* FAQ List */}
        <div className="mt-12 space-y-4">
          {faqs.map(faq => {
            const isOpen = openId === faq.id;

            return (
              <div
                data-aos="fade-up"
                key={faq.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-5">
                    <p className="text-sm leading-6 text-slate-600 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
