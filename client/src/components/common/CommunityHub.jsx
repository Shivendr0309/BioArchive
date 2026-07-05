import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityHub() {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchAuthors();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/categories/stats`
      );

      const icons = {
        React: "⚛️",
        JavaScript: "🟨",
        "Node.js": "🚀",
        MongoDB: "🍃",
        AI: "🤖",
        "Tailwind CSS": "💨",
      };

      const formatted = response.data.data.map(
        (item) => ({
          name: item._id,
          count: item.count,
          icon: icons[item._id] || "📚",
        })
      );

      setCategories(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/authors/top`
      );

      setAuthors(response.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="py-6">
      <div className="mb-10">
        <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Community Hub
        </span>

        <h2 className="mt-5 text-4xl font-black text-slate-900 dark:text-white">
          Explore & Connect
        </h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Discover popular topics and meet active contributors.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Categories */}

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-bold">
            Categories
          </h3>

          <div className="mt-8 space-y-4">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">
                    {category.icon}
                  </span>

                  <div>
                    <h4 className="font-semibold">
                      {category.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {category.count} articles
                    </p>
                  </div>
                </div>

                <ArrowRight size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* Authors */}

        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-bold">
            Top Authors
          </h3>

          <div className="mt-8 space-y-4">
            {authors.slice(0, 5).map((author) => (
              <Link
                key={author.userId}
                to={`/profile/${author.userId}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white font-bold">
                    {author.name?.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {author.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {author.articles} articles
                    </p>
                  </div>
                </div>

                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default CommunityHub;
