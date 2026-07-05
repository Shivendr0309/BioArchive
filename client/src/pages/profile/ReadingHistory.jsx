import {
  useEffect,
  useState,
} from "react";
import axios from "axios";

import BlogCard from "../../components/common/BlogCard";

function ReadingHistory() {
  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `${
            import.meta.env
              .VITE_API_URL ||
            "http://localhost:5000"
          }/api/profile/history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setBlogs(
        response.data.data || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-5xl font-black">
          Reading History
        </h1>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadingHistory;