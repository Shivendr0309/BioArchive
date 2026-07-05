import { useEffect, useState } from "react";
import axios from "axios";
import { Bookmark } from "lucide-react";
import { toast } from "react-toastify";

import BlogCard from "../../components/common/BlogCard";

function SavedArticles() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/profile/bookmarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load bookmarked articles.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Loading saved articles...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <Bookmark
              size={36}
              className="text-indigo-600"
            />
          </div>

          <h1 className="mt-6 text-5xl font-black text-gray-900 dark:text-white">
            Saved Articles
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Access all your bookmarked blogs in one place.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-gray-300 bg-white p-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <Bookmark
              size={48}
              className="mx-auto text-indigo-500"
            />

            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              No Saved Articles
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Bookmark your favorite blogs and they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedArticles;