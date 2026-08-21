import { Check } from 'lucide-react';
import { Link } from 'react-router';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for individuals and small teams getting started.',
    features: [
      '2 Workspaces',
      '10 Members',
      'Basic Kanban Boards',
      'Task Management',
    ],
    button: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$12',
    period: '/month',
    description: 'For growing teams that need more powerful collaboration.',
    features: [
      'Unlimited Workspaces',
      'Unlimited Members',
      'Unlimited Projects',
      'Advanced Analytics',
      'Real-time Collaboration',
      'Priority Support',
    ],
    button: 'Choose Plan',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Advanced features and support for larger organizations.',
    features: [
      'Everything in Professional',
      'Advanced Permissions',
      'Custom Workspace Controls',
      'Dedicated Support',
      'Custom Integrations',
    ],
    button: 'Contact Sales',
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            Pricing
          </span>

          <h2
            data-aos="fade-up"
            className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Simple pricing for every team
          </h2>

          <p
            data-aos="fade-up"
            className="mt-5 text-base leading-7 text-slate-600 sm:text-lg"
          >
            Start for free and upgrade when your team needs more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div data-aos="fade-up" className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-xl lg:-translate-y-2'
                  : 'border-slate-200 bg-white text-slate-900 hover:-translate-y-1 hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-indigo-600 shadow">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3
                className={`text-xl font-semibold ${
                  plan.popular ? 'text-white' : 'text-slate-900'
                }`}
              >
                {plan.name}
              </h3>

              {/* Description */}
              <p
                className={`mt-3 text-sm leading-6 ${
                  plan.popular ? 'text-indigo-100' : 'text-slate-600'
                }`}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-8 flex items-end gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>

                {plan.period && (
                  <span
                    className={`mb-1 text-sm ${
                      plan.popular ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Button */}
              <Link
                to='auth/sign-up'
                className={`mt-8 w-full rounded-lg px-5 py-3 text-sm font-semibold transition ${
                  plan.popular
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {plan.button}
              </Link>

              {/* Divider */}
              <div
                className={`my-8 h-px ${
                  plan.popular ? 'bg-indigo-400' : 'bg-slate-200'
                }`}
              />

              {/* Features */}
              <div data-aos="fade-up" className="space-y-4">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.popular
                          ? 'bg-white text-indigo-600'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </div>

                    <span
                      className={`text-sm ${
                        plan.popular ? 'text-indigo-50' : 'text-slate-600'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-10 text-center text-sm text-slate-500">
          No credit card required for the Starter plan.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
