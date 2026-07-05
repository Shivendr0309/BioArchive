import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PenSquare,
  Search,
  BookOpen,
  Users,
  Heart,
  Eye,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";

// Helper to format large numbers like 12600 to 12.6K
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

function Hero() {
  const [stats, setStats] = useState({
    totalBlogs: 120,
    totalUsers: 34,
    totalLikes: 560,
    totalViews: 12600,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/stats`
      );
      // Assuming response.data.data returns the actual numbers
      if (response.data?.data) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 min-h-screen flex items-center justify-center">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="absolute -left-24 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-400/20 blur-[120px]" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-[120px]" />

      {/* Decorative Dots - Left */}
      <div className="absolute left-10 bottom-40 hidden lg:block opacity-20">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>
      </div>

      {/* Decorative Dots - Right */}
      <div className="absolute right-10 top-20 hidden lg:block opacity-20">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
          Welcome to BioArchive
        </span>

        {/* Heading */}
        <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-7xl lg:text-[5.5rem]">
          Write.<br />
          <span className="text-indigo-600 dark:text-indigo-500">
            Share.
          </span><br />
          Inspire.
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Create technical articles, document what you learn,
          and build a personal knowledge archive that inspires
          developers around the world.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row w-full">
          <Link
            to="/create-blog"
            className="group flex items-center justify-center gap-3 rounded-xl bg-[#0f172a] px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:shadow-lg dark:bg-white dark:text-slate-900"
          >
            <PenSquare size={18} />
            Start Writing
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/search"
            className="group flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-medium text-slate-700 transition-all duration-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <Search size={18} />
            Explore Articles
            <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Tech Stack Tags */}
        {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "JavaScript",
            "AI",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-50/80 px-5 py-2 text-sm font-medium text-indigo-600 transition-all hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              #{tag}
            </span>
          ))}
        </div> */}

        {/* Divider with Center Dot */}
        <div className="mt-16 flex w-full max-w-4xl items-center justify-center opacity-70">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-300 to-indigo-300 dark:via-indigo-700 dark:to-indigo-700" />
          <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
          <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-indigo-300 to-indigo-300 dark:via-indigo-700 dark:to-indigo-700" />
        </div>

        {/* Statistics */}
        <div className="mt-12 flex w-full max-w-4xl flex-wrap justify-between gap-8 sm:grid-cols-2 lg:grid lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <BookOpen
              className="mb-3 text-indigo-500 dark:text-indigo-400"
              size={32}
              strokeWidth={1.5}
            />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {stats.totalBlogs}+
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Published Articles
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Users
              className="mb-3 text-indigo-500 dark:text-indigo-400"
              size={32}
              strokeWidth={1.5}
            />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {stats.totalUsers}+
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Active Authors
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Heart
              className="mb-3 text-indigo-500 dark:text-indigo-400 fill-indigo-500/20"
              size={32}
              strokeWidth={1.5}
            />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {stats.totalLikes}+
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Community Likes
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Eye
              className="mb-3 text-indigo-500 dark:text-indigo-400"
              size={32}
              strokeWidth={1.5}
            />
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              {formatNumber(stats.totalViews)}+
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Total Views
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;