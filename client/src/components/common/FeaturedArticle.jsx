import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  ArrowRight,
} from "lucide-react";

function FeaturedArticle({ blog }) {
  if (!blog) return null;

  const author =
    blog.author?.name ||
    blog.author ||
    "Unknown Author";

  const plainText =
    blog.content?.replace(/<[^>]+>/g, "") || "";

  const excerpt =
    plainText.length > 220
      ? plainText.substring(0, 220) + "..."
      : plainText;

  const readingTime = Math.max(
    1,
    Math.ceil(plainText.split(" ").length / 200)
  );

  return (
    <section className="py-16">
      {/* Heading */}

      <div className="mb-12 text-center">
        <span className="inline-flex rounded-full bg-indigo-100 px-5 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
          ✨ Featured Story
        </span>

        <h2 className="mt-5 text-5xl font-black text-slate-900 dark:text-white">
          Editor's Pick
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Discover one carefully selected article from the BioArchive
          community.
        </p>
      </div>

      {/* Card */}

      <div
        className="
          overflow-hidden
          rounded-[36px]
          border
          border-slate-200
          bg-white
          shadow-sm
          transition-all
          duration-300
          hover:shadow-xl
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="grid lg:grid-cols-[42%_58%]">

          {/* Image */}

          <div className="relative h-[280px] lg:h-full">

            {blog.image ? (
              <img
                src={blog.image}
                alt={blog.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-700
                  hover:scale-105
                "
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
                <div className="text-center text-white">
                  <h2 className="text-5xl font-black">
                    BioArchive
                  </h2>

                  <p className="mt-3 text-slate-300">
                    Featured Article
                  </p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />
          </div>

          {/* Content */}

          <div className="flex flex-col justify-center p-10 lg:p-14">

            {/* Meta */}

            <div className="flex flex-wrap items-center gap-4 text-sm">

              <span className="font-semibold text-indigo-600">
                {blog.category || "Technology"}
              </span>

              <span className="text-slate-400">
                •
              </span>

              <div className="flex items-center gap-1 text-slate-500">
                <Clock3 size={16} />
                {readingTime} min read
              </div>

              <span className="text-slate-400">
                •
              </span>

              <div className="flex items-center gap-1 text-slate-500">
                <CalendarDays size={16} />
                {blog.createdAt
                  ? new Date(
                      blog.createdAt
                    ).toLocaleDateString()
                  : "Recently"}
              </div>

            </div>

            {/* Title */}

            <h3 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              {blog.title}
            </h3>

            {/* Description */}

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {excerpt}
            </p>

            {/* Bottom */}

            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {author.charAt(0).toUpperCase()}
                </div>

                <div>

                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {author}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Featured Author
                  </p>

                </div>

              </div>

              <Link
                to={`/blogs/${blog._id || blog.id}`}
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-indigo-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-indigo-700
                "
              >
                Read Now

                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedArticle;