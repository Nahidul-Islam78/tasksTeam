import {
  Building2,
  KanbanSquare,
  UserCheck,
  Users,
  BarChart3,
  Bell,
} from 'lucide-react';


const features = [
  {
    id: 1,
    icon: Building2,
    title: 'Workspace Management',
    description:
      'Create and manage multiple workspaces with members, roles, and permissions.',
  },
  {
    id: 2,
    icon: KanbanSquare,
    title: 'Kanban Board',
    description:
      'Organize tasks visually with customizable columns and drag-and-drop workflow.',
  },
  {
    id: 3,
    icon: UserCheck,
    title: 'Task Assignment',
    description:
      'Assign tasks to team members, set priorities, and manage deadlines efficiently.',
  },
  {
    id: 4,
    icon: Users,
    title: 'Team Collaboration',
    description:
      'Invite teammates, collaborate on projects, and keep everyone aligned.',
  },
  {
    id: 5,
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track project progress, task completion, productivity, and team performance.',
  },
  {
    id: 6,
    icon: Bell,
    title: 'Notifications',
    description:
      'Stay updated with task assignments, project changes, invitations, and mentions.',
  },
];

const Features = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
            Powerful Features
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything your team needs
            <span className="block text-indigo-600">to get work done</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Manage projects, collaborate with your team, and track progress from
            one powerful workspace.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(feature => {
            const Icon = feature.icon;

            return (
              <div
                data-aos="fade-up"
                key={feature.id}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={24} strokeWidth={1.8} />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {feature.description}
                </p>

                {/* Learn More */}
                <button className="mt-5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                  Learn more →
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
