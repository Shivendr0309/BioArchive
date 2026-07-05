import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../components/common/BlogCard";

function Bookmarks() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const token =
        localStorage.getItem("token");

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Library
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-900 dark:text-white">
            Saved Articles
          </h1>

          <p className="mt-4 text-slate-500">
            Articles you've bookmarked.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">
              No saved articles
            </h2>
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

export default Bookmarks;