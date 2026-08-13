const steps = [
  {
    id: 1,
    title: 'Create Workspace',
    description:
      'Create your workspace and set up a central place for your team and projects.',
  },
  {
    id: 2,
    title: 'Invite Team',
    description:
      'Invite your teammates and bring everyone together in one collaborative workspace.',
  },
  {
    id: 3,
    title: 'Create Projects',
    description:
      'Create projects, organize tasks with Kanban boards, and assign work to team members.',
  },
  {
    id: 4,
    title: 'Complete Tasks',
    description:
      'Track progress, collaborate in real time, and complete your tasks efficiently.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-600">
            How It Works
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Get started in four simple steps
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Set up your workspace, bring your team together, and start managing
            projects in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Desktop connecting line */}
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(step => (
              <div key={step.id} className="relative text-center">
                {/* Number */}
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-lg font-bold text-white shadow-md">
                  {step.id}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600 sm:text-base">
                  {step.description}
                </p>

                {/* Arrow for mobile/tablet */}
                {step.id !== 4 && (
                  <div className="mt-6 text-2xl text-indigo-400 lg:hidden">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
