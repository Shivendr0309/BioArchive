import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import BlogHero from "../../components/blog/BlogHero";
import ReadingProgress from "../../components/blog/ReadingProgress";
import ArticleActions from "../../components/blog/ArticleActions";
import ArticleContent from "../../components/blog/ArticleContent";
import AuthorCard from "../../components/blog/AuthorCard";
import RelatedArticles from "../../components/blog/RelatedArticles";
import CommentsSection from "../../components/blog/CommentsSection";
import SkeletonArticle from "../../components/ui/SkeletonArticle";
function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      // Fetch current blog
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/${id}`
      );

      const currentBlog = response.data.data;

      setBlog(currentBlog);
      await addToHistory(
  currentBlog._id
);

      // Fetch all blogs for related section
      const blogsResponse = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs`
      );

      const filtered =
        blogsResponse.data.data.filter(
          (item) => item._id !== currentBlog._id
        );

      setRelatedBlogs(filtered);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load article.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/blogs/${blog._id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setBlog((prev) => ({
      ...prev,
      likes: Array(
        response.data.likes
      ).fill("liked"),
    }));

    toast.success(
      response.data.message
    );
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to update like."
    );
  }
};

  const handleBookmark = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/profile/bookmark/${blog._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(response.data.message);
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to update bookmark."
    );
  }
};

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      toast.success("🔗 Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link.");
    }
  };

 if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <SkeletonArticle />
    </div>
  );
}

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold">
          Blog not found.
        </h2>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <BlogHero blog={blog} />

<div className="mt-10 grid gap-10 lg:grid-cols-[2fr_0.75fr]">

  {/* Main Content */}

  <div>
    <ArticleContent
      content={blog.content}
    />
  </div>

  {/* Sidebar */}

  <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">

    <ArticleActions
      likes={blog.likes?.length || 0}
      onLike={handleLike}
      onBookmark={handleBookmark}
      onShare={handleShare}
    />

    <AuthorCard
      author={blog.author}
    />

    <RelatedArticles
      blogs={relatedBlogs.slice(0, 4)}
    />

  </div>

</div>

<CommentsSection
  blogId={blog._id}
/>
        </div>
      </div>
    </>
  );
}
const addToHistory = async (
  blogId
) => {
  try {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    await axios.put(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/profile/history/${blogId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
export default BlogDetails;