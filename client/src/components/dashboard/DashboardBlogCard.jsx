import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";

function DashboardBlogCard({
  blog,
  onDelete,
}) {
  const content =
    blog.content?.replace(/<[^>]*>/g, "") || "";

  const excerpt =
    content.length > 120
      ? content.substring(0, 120) + "..."
      : content;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Cover Image */}

      {blog.image ? (
        <div className="overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="
              h-56
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>
      ) : (
      <div className="flex h-56 w-full flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white">

  <span className="self-start rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
    {blog.category || "Technology"}
  </span>

  <div>
    <h2 className="line-clamp-3 text-2xl font-black leading-tight">
      {blog.title}
    </h2>

    <p className="mt-3 text-sm text-slate-300">
      {new Date(
        blog.createdAt || Date.now()
      ).toLocaleDateString()}
    </p>
  </div>

</div>
      )}

      {/* Content */}

      <div className="p-6">
        {/* Category */}

        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {blog.category || "Technology"}
        </span>

        {/* Title */}

        <h2
          className="
            mt-4
            line-clamp-2
            text-xl
            font-black
            leading-snug
            text-slate-900
            dark:text-white
          "
        >
          {blog.title}
        </h2>

        {/* Excerpt */}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {excerpt || "No description available."}
        </p>

        {/* Stats */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-5
            border-t
            border-slate-200
            pt-4
            text-sm
            text-slate-500
            dark:border-slate-800
            dark:text-slate-400
          "
        >
          <div className="flex items-center gap-2">
            <Heart size={16} />
            {blog.likes?.length || 0}
          </div>

          <div className="flex items-center gap-2">
            <Eye size={16} />
            {blog.views || 0}
          </div>
        </div>

        {/* Actions */}

        <div className="mt-6 flex gap-3">
          <Link
            to={`/blogs/${blog._id || blog.id}`}
            className="
              flex-1
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              text-center
              font-medium
              transition
              hover:bg-slate-100
              dark:border-slate-700
              dark:hover:bg-slate-800
            "
          >
            View
          </Link>

          <Link
            to={`/edit-blog/${blog._id || blog.id}`}
            className="
              flex
              items-center
              justify-center
              rounded-xl
              bg-amber-500
              px-4
              text-white
              transition
              hover:bg-amber-600
            "
          >
            <Pencil size={18} />
          </Link>

          <button
            onClick={() => onDelete(blog)}
            className="
              flex
              items-center
              justify-center
              rounded-xl
              bg-red-500
              px-4
              text-white
              transition
              hover:bg-red-600
            "
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Read More */}

        <Link
          to={`/blogs/${blog._id || blog.id}`}
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-900
            transition-all
            duration-300
            group-hover:gap-3
            dark:text-white
          "
        >
          Read Article
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default DashboardBlogCard;