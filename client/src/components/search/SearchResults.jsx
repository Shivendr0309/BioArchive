import BlogCard from "../common/BlogCard";

function SearchResults({
  blogs = [],
}) {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Results
        </p>

        <h2 className="mt-2 text-4xl font-black text-gray-900 dark:text-white">
          Search Results
        </h2>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Showing {blogs.length} result
          {blogs.length !== 1 ? "s" : ""}.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div
          className="
            rounded-[28px]
            border
            border-dashed
            border-gray-300
            bg-white
            p-12
            text-center
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            No Articles Found
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Try searching with different keywords or choose
            another category.
          </p>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id || blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchResults;