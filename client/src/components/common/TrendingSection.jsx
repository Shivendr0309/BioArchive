import BlogCard from "./BlogCard";

function TrendingSection({ title, blogs }) {
  if (!blogs.length) return null;

  return (
    <section className="py-6">
      {/* Header */}

      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Discover
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Explore the most engaging articles from our community.
          </p>
        </div>
      </div>

      {/* Blogs */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;