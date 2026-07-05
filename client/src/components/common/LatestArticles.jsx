import BlogCard from "./BlogCard";

function TrendingSection({
  title,
  blogs,
}) {
  if (!blogs.length) return null;

  return (
    <section className="py-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {blogs.map((blog, index) => (
          <div key={blog._id}>
            <div className="mb-3">
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-yellow-100
                  px-3
                  py-1
                  text-sm
                  font-bold
                  text-yellow-700
                  dark:bg-yellow-900/30
                  dark:text-yellow-300
                "
              >
                #{index + 1} Trending
              </span>
            </div>

            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;