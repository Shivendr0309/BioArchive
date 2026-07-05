import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  User,
} from "lucide-react";

function BlogCard({ blog }) {
  const image = blog.image;

  const title =
    blog.title || "Untitled Article";

  const content =
    blog.content?.replace(/<[^>]*>/g, "") || "";

  const excerpt =
    content.length > 140
      ? content.substring(0, 140) + "..."
      : content;

  const author =
    blog.author?.name ||
    blog.author ||
    "Unknown Author";

  const readingTime = Math.max(
    1,
    Math.ceil(content.split(" ").length / 200)
  );

  const publishedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      )
    : "Recently";

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-2xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Cover Image */}

      <div className="relative overflow-hidden">

        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="
                aspect-[16/9]
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
            <div className="text-center text-white">

              <h2 className="text-4xl font-black">
                BioArchive
              </h2>

              <p className="mt-2 text-slate-300">
                Featured Article
              </p>

            </div>
          </div>
        )}

      </div>

      {/* Content */}

      <div className="p-7">

        {/* Category */}

        <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
          {blog.category || "Technology"}
        </span>

        {/* Title */}

        <h2
          className="
            mt-5
            line-clamp-2
            text-[28px]
            font-black
            leading-tight
            tracking-tight
            text-slate-900
            transition-colors
            duration-300
            group-hover:text-indigo-600
            dark:text-white
          "
        >
          {title}
        </h2>

        {/* Description */}

        <p
          className="
            mt-5
            line-clamp-3
            text-[16px]
            leading-8
            text-slate-600
            dark:text-slate-400
          "
        >
          {excerpt}
        </p>

        {/* Divider */}

        <div className="my-7 h-px bg-slate-200 dark:bg-slate-800" />

        {/* Author */}

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
            {author.charAt(0).toUpperCase()}
          </div>

          <div>

            <p className="font-semibold text-slate-900 dark:text-white">
              {author}
            </p>

            <div className="mt-1 flex items-center gap-4 text-sm text-slate-500">

              <span className="flex items-center gap-1">
                <CalendarDays size={14} />
                {publishedDate}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={14} />
                {readingTime} min
              </span>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="mt-8">

          <Link
            to={`/blogs/${blog._id || blog.id}`}
            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-indigo-600
              px-5
              py-3
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-indigo-700
            "
          >
            Continue Reading

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

        </div>

      </div>
    </article>
  );
}

export default BlogCard;