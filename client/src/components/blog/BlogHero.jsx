import { Clock3, Heart } from "lucide-react";

function BlogHero({ blog }) {
  if (!blog) return null;

 const image = blog.image;

  const author =
    blog.author?.name ||
    blog.author ||
    "Unknown Author";

  const publishedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently Published";

  const plainText =
    blog.content?.replace(/<[^>]*>/g, "") || "";

  const excerpt =
    plainText.length > 180
      ? plainText.substring(0, 180) + "..."
      : plainText;

  return (
    <section
  className="
    overflow-hidden
    rounded-[36px]
    border
    border-slate-200
    bg-white
    shadow-sm
    dark:border-slate-800
    dark:bg-slate-900
  "
>
      {/* Cover Image */}

    <div
  className="
    relative
    h-[380px]
    overflow-hidden
    md:h-[600px]
  "
>
  {image ? (
    <>
      <img
        src={image}
        alt={blog.title}
        className="
  h-full
  w-full
  object-cover
  transition-transform
  duration-[6000ms]
  hover:scale-105
"
      />

      <>
  {/* Dark Overlay */}

  <div className="absolute inset-0 bg-black/20" />

  {/* Bottom Gradient */}

  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

  {/* Top Glow */}

  <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
</>
    </>
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div className="text-center text-white">
        <h2 className="text-5xl font-black">
          BioArchive
        </h2>

        <p className="mt-3 text-indigo-100">
          No cover image available
        </p>
      </div>
    </div>
  )}
</div>

      {/* Content */}
<div className="mx-auto max-w-4xl px-8 py-12 md:px-14">

  {/* Category */}

  <div className="flex items-center gap-3">

    <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">

      {blog.category || "Technology"}

    </span>

    <span className="text-sm text-slate-400">

      •

    </span>

   <span>
  {Math.max(
    1,
    Math.ceil(
      plainText.split(" ").length / 200
    )
  )}{" "}
  min read
</span>

  </div>

  {/* Title */}

  <h1
    className="
      mt-8
      text-5xl
      font-black
      leading-[1.1]
      tracking-tight
      text-slate-900
      dark:text-white
      md:text-6xl
    "
  >
    {blog.title}
  </h1>

  {/* Excerpt */}

  <p
    className="
      mt-8
      max-w-3xl
      text-xl
      leading-9
      text-slate-600
      dark:text-slate-400
    "
  >
    {excerpt}
  </p>

  {/* Divider */}

  <div className="mt-10 h-px bg-slate-200 dark:bg-slate-800" />

  {/* Bottom Meta */}

  <div className="mt-8 flex flex-wrap items-center justify-between gap-6">

    <div className="flex items-center gap-4">

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-indigo-600
          font-bold
          text-white
        "
      >
        {author.charAt(0).toUpperCase()}
      </div>

      <div>

        <h3 className="font-semibold text-slate-900 dark:text-white">

          {author}

        </h3>

        <p className="text-sm text-slate-500">

          Published {publishedDate}

        </p>

      </div>

    </div>

    <div className="flex items-center gap-8 text-slate-500">

      <div className="flex items-center gap-2">

        <Heart size={18} />

        <span>{blog.likes?.length || 0}</span>

      </div>

      <div className="flex items-center gap-2">

        <Clock3 size={18} />

        <span>
  {Math.max(
    1,
    Math.ceil(
      plainText.split(" ").length / 200
    )
  )}{" "}
  min
</span>

      </div>

    </div>

  </div>

</div>
    </section>
  );
}

export default BlogHero;