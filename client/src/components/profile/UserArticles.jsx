import BlogCard from "../common/BlogCard";

function UserArticles({ blogs = [] }) {
  return (
    <section className="mt-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Articles
        </p>

        <h2 className="mt-2 text-4xl font-black text-gray-900 dark:text-white">
          Published Articles
        </h2>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Explore all articles published by this author.
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
            No Articles Yet
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            This user hasn't published any articles.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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

export default UserArticles;