import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function RelatedArticles({ blogs = [] }) {
  if (!blogs.length) return null;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Related Articles
      </h3>

      <div className="mt-6 space-y-5">

        {blogs.slice(0, 4).map((blog) => (
          <Link
            key={blog._id}
            to={`/blogs/${blog._id}`}
            className="block rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <h4 className="line-clamp-2 font-semibold text-slate-900 dark:text-white">
              {blog.title}
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              {blog.author?.name ||
                blog.author ||
                "Unknown Author"}
            </p>
          </Link>
        ))}

      </div>

      <Link
        to="/blogs"
        className="mt-6 inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
      >
        View All

        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default RelatedArticles;