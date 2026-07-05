import { Search, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";

function DiscoveryHub() {
  const [search, setSearch] = useState("");

  const popularTopics = [
    "React",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "AI",
    "Next.js",
    "Tailwind",
    "DevOps",
  ];

  const browseOptions = [
    "Latest",
    "Trending",
    "Featured",
    "Most Liked",
  ];

  return (
    <section className="py-8">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        
        {/* Header */}

        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Sparkles size={16} />
            Discover Knowledge
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Find Your Next Read
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Explore articles, tutorials, technologies, and authors
            from the BioArchive community.
          </p>
        </div>

        {/* Search */}

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row">
            
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search
                size={22}
                className="text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search articles, authors, technologies..."
                className="w-full bg-transparent py-3 text-lg outline-none"
              />
            </div>

            <button className="rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-black dark:bg-white dark:text-slate-900">
              Search
            </button>
          </div>
        </div>

        {/* Popular Topics */}

        <div className="mt-12">
          <h3 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
            Popular Topics
          </h3>

          <div className="flex flex-wrap gap-3">
            {popularTopics.map((topic) => (
              <button
                key={topic}
                className="
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-2
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-slate-900
                  hover:text-white
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                #{topic}
              </button>
            ))}
          </div>
        </div>

        {/* Browse Filters */}

        <div className="mt-12">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <TrendingUp size={20} />
            Browse By
          </h3>

          <div className="flex flex-wrap gap-3">
            {browseOptions.map((option) => (
              <button
                key={option}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-5
                  py-3
                  font-medium
                  transition-all
                  duration-300
                  hover:border-slate-900
                  hover:bg-slate-900
                  hover:text-white
                  dark:border-slate-700
                  dark:bg-slate-800
                "
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Text */}

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Explore hundreds of articles from developers and creators.
        </div>
      </div>
    </section>
  );
}

export default DiscoveryHub;