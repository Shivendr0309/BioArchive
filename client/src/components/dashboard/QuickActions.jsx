import { Link } from "react-router-dom";
import {
  PenSquare,
  User,
  FileText,
  ArrowRight,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Write Blog",
      description: "Create a new article",
      icon: PenSquare,
      link: "/create-blog",
    },
    {
      title: "Profile",
      description: "Manage your profile",
      icon: User,
      link: "/profile",
    },
   {
  title: "Drafts",
  description: "Manage your unpublished articles",
  icon: FileText,
  link: "/drafts",
},
  ];

  return (
    <section className="mb-10">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Quick Actions
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            Manage Your Workspace
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.link}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-slate-200
                  p-5
                  transition-all
                  duration-300
                  hover:border-slate-300
                  hover:bg-slate-50
                  dark:border-slate-700
                  dark:hover:bg-slate-800
                "
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Icon
                      size={22}
                      className="text-slate-700 dark:text-slate-300"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {action.title}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="
                    text-slate-400
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickActions;