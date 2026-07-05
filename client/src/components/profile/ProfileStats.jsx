import {
  FileText,
  Heart,
  Eye,
  Calendar,
} from "lucide-react";

function ProfileStats({
  articles = 0,
  likes = 0,
  views = 0,
  memberSince = "",
}) {
  const stats = [
  {
    label: "Articles",
    value: articles,
    icon: FileText,
  },
  {
    label: "Likes",
    value: likes,
    icon: Heart,
  },
  {
    label: "Views",
    value: views,
    icon: Eye,
  },
  {
    label: "Member Since",
    value: memberSince,
    icon: Calendar,
  },
];

  return (
    <section className="mt-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
              "
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <Icon
                  size={22}
                  className="text-slate-500"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {item.label}
                </p>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ProfileStats;