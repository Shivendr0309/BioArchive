import DashboardBlogCard from "./DashboardBlogCard";

function RecentBlogs({
  blogs = [],
  onDelete,
}) {
  return (
    <section className="mt-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Content
        </p>

        <h2 className="mt-2 text-4xl font-black text-gray-900 dark:text-white">
          Your Recent Blogs
        </h2>

        <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
          Manage, edit or delete your published articles.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            No blogs found
          </h3>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Start writing your first article and it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => (
            <DashboardBlogCard
              key={blog._id || blog.id}
              blog={blog}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RecentBlogs;