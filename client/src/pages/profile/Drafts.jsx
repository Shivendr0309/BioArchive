import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../../components/common/BlogCard";

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrafts((prev) =>
        prev.filter(
          (draft) => draft._id !== blogId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete draft");
    }
  };

  const handlePublish = async (blogId) => {
    const confirmed = window.confirm(
      "Publish this draft?"
    );

    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${blogId}`,
        {
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrafts((prev) =>
        prev.filter(
          (draft) => draft._id !== blogId
        )
      );

      alert("Draft published successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to publish draft.");
    }
  };

  const fetchDrafts = async () => {
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

      const onlyDrafts =
        response.data.data.filter(
          (blog) => blog.status === "draft"
        );

      setDrafts(onlyDrafts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading drafts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
            Writing
          </p>

          <h1 className="mt-2 text-5xl font-black text-slate-900 dark:text-white">
            My Drafts
          </h1>
        </div>

        {drafts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">
              No drafts yet
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {drafts.map((draft) => (
              <div key={draft._id}>
                <BlogCard blog={draft} />

                <Link
                  to={`/edit-blog/${draft._id}`}
                  className="mb-3 block w-full rounded-xl bg-blue-500 px-4 py-3 text-center font-medium text-white transition hover:bg-blue-600"
                >
                  Edit Draft
                </Link>

                <button
                  onClick={() =>
                    handlePublish(draft._id)
                  }
                  className="mb-3 w-full rounded-xl bg-green-500 px-4 py-3 font-medium text-white transition hover:bg-green-600"
                >
                  Publish Draft
                </button>

                <button
                  onClick={() =>
                    handleDelete(draft._id)
                  }
                  className="w-full rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
                >
                  Delete Draft
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Drafts;