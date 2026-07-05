function CategorySelect({
  category,
  setCategory,
}) {
  const categories = [
    "React",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "TypeScript",
    "Next.js",
    "AI",
    "Cyber Security",
    "DevOps",
    "Cloud",
    "Programming",
    "Career",
    "Other",
  ];

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Category
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Select Category
        </h2>
      </div>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="
          w-full
          rounded-[24px]
          border
          border-gray-300
          bg-white
          px-6
          py-4
          text-lg
          outline-none
          transition-all
          duration-300
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:focus:ring-indigo-900
        "
      >
        <option value="">
          Choose a category
        </option>

        {categories.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </section>
  );
}

export default CategorySelect;