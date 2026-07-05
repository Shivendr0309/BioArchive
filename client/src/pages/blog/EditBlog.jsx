import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [preview, setPreview] = useState("");

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${id}`
      );

      const blog = response.data.data;

      setTitle(blog.title);
      setContent(blog.content);

      setPreview(blog.image || "");
    } catch (error) {
      console.error(error);

      toast.error("Failed to load blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);

      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog updated successfully.");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update blog."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
          Edit Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}

          <div>
            <label className="mb-2 block text-lg font-medium text-gray-700 dark:text-gray-300">
              Blog Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                p-3
                outline-none
                focus:border-indigo-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block text-lg font-medium text-gray-700 dark:text-gray-300">
              Blog Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-72 w-full rounded-lg object-cover"
              />
            )}
          </div>

          {/* Content */}

          <div>
            <label className="mb-2 block text-lg font-medium text-gray-700 dark:text-gray-300">
              Blog Content
            </label>

            <textarea
              rows={12}
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                p-3
                outline-none
                focus:border-indigo-500
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              type="submit"
              className="
                rounded-lg
                bg-indigo-600
                px-6
                py-3
                text-white
                transition
                hover:bg-indigo-700
              "
            >
              Update Blog
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard")
              }
              className="
                rounded-lg
                bg-gray-300
                px-6
                py-3
                transition
                hover:bg-gray-400
                dark:bg-slate-700
                dark:text-white
                dark:hover:bg-slate-600
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlog;