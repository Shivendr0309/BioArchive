import { useState } from "react";
import { toast } from "react-toastify";

import CoverUploader from "../../components/editor/CoverUploader";
import BlogTitleInput from "../../components/editor/BlogTitleInput";
import CategorySelect from "../../components/editor/CategorySelect";
import TagInput from "../../components/editor/TagInput";
import RichEditor from "../../components/editor/RichEditor";
import PublishPanel from "../../components/editor/PublishPanel";

function CreateBlog() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  const handleSaveDraft = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title || "Untitled Draft");
    formData.append("content", content || "<p></p>");
    formData.append("category", category || "Draft");
    formData.append("tags", JSON.stringify(tags));
    formData.append("status", "draft");

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/blogs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to save draft."
      );
    }

    toast.success("Draft saved successfully!");
  } catch (error) {
    console.error(error);

    toast.error(
      error.message || "Failed to save draft."
    );
  }
};

  const handlePublish = async () => {
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    const plainText = content.replace(/<[^>]*>/g, "").trim();

    if (!plainText) {
      toast.error("Please write some content.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
formData.append("content", content);
formData.append("category", category);
formData.append(
  "status",
  "published"
);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/blogs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to publish blog."
        );
      }

      toast.success("Article published successfully!");

     

      // Reset form
      setImage(null);
      setTitle("");
      setCategory("");
      setTags([]);
      setContent("");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            BioArchive
          </p>

          <h1 className="mt-3 text-5xl font-black text-gray-900 dark:text-white">
            Create New Article
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Share your knowledge and ideas with the community.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Section */}

          <div className="space-y-8 lg:col-span-2">
            <CoverUploader
              image={image}
              setImage={setImage}
            />

            <BlogTitleInput
              title={title}
              setTitle={setTitle}
            />

            <CategorySelect
              category={category}
              setCategory={setCategory}
            />

            <TagInput
              tags={tags}
              setTags={setTags}
            />

            <RichEditor
              content={content}
              setContent={setContent}
            />
          </div>

          {/* Right Section */}

          <div className="lg:sticky lg:top-28 lg:self-start">
            <PublishPanel
              title={title}
              category={category}
              tags={tags}
              content={content}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;