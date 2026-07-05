import { useEffect, useState } from "react";
import axios from "axios";

import SearchHero from "../../components/search/SearchHero";
import SearchBar from "../../components/search/SearchBar";
import SearchResults from "../../components/search/SearchResults";
import EmptyState from "../../components/search/EmptyState";

function Search() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const categories = [
    "All",
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "TypeScript",
    "Next.js",
    "AI",
    "Cyber Security",
    "DevOps",
    "Cloud",
    "Programming",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs`,
        {
          params: {
            search: searchQuery,
          },
        }
      );

      setBlogs(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            (
              blog.category || ""
            ).toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}

        <SearchHero />

        {/* Search */}

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Filter Bar */}

        <div className="mt-10 flex flex-col gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Results
            </p>

            <h2 className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
              Search Results
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-indigo-600">
                {filteredBlogs.length}
              </span>{" "}
              article
              {filteredBlogs.length !== 1
                ? "s"
                : ""}
              .
            </p>

          </div>

          <div className="w-full lg:w-72">

            <label className="mb-2 block text-sm font-semibold text-slate-600 dark:text-slate-300">
              Filter by Category
            </label>

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-5
                py-3.5
                text-sm
                font-medium
                outline-none
                transition-all
                duration-300
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
                dark:focus:ring-indigo-900/30
              "
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>

          </div>

        </div>

        {/* Results */}

        <div className="mt-10">

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      h-96
                      animate-pulse
                      rounded-[32px]
                      bg-slate-200
                      dark:bg-slate-800
                    "
                  />
                )
              )}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <SearchResults
              blogs={filteredBlogs}
            />
          ) : (
            <EmptyState />
          )}

        </div>

      </div>
    </div>
  );
}

export default Search;