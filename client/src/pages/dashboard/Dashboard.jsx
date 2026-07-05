import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RecentBlogs from "../../components/dashboard/RecentBlogs";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/my/blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your blogs.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blog) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${blog._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs((prev) =>
        prev.filter((item) => item._id !== blog._id)
      );

      toast.success("Blog deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog.");
    }
  };

  // Dashboard Stats
  const published = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const drafts = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const likes = blogs.reduce(
    (total, blog) =>
      total + (blog.likes?.length || 0),
    0
  );

  const views = blogs.reduce(
    (total, blog) =>
      total + (blog.views || 0),
    0
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold">
          Loading dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader
          username={user.name || "User"}
        />

        <StatsGrid
          published={published}
          drafts={drafts}
          likes={likes}
          views={views}
        />

        <QuickActions />

        <RecentBlogs
          blogs={blogs}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Dashboard;