function BlogTitleInput({
  title,
  setTitle,
}) {
  const maxLength = 120;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Title
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Blog Title
          </h2>
        </div>

        <span
          className={`text-sm font-medium ${
            title.length > maxLength
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {title.length}/{maxLength}
        </span>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Enter an engaging blog title..."
        maxLength={maxLength}
        className="
          w-full
          rounded-[24px]
          border
          border-gray-300
          bg-white
          px-6
          py-5
          text-3xl
          font-bold
          outline-none
          transition-all
          duration-300
          placeholder:text-gray-400
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:focus:ring-indigo-900
        "
      />
    </section>
  );
}

export default BlogTitleInput;