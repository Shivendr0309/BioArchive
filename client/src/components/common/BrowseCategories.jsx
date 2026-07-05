import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function BrowseCategories() {
 const [categories, setCategories] = useState([]);

useEffect(() => {
  fetchCategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/blogs/categories/stats`
    );

    const icons = {
      React: "⚛️",
      JavaScript: "🟨",
      "Node.js": "🚀",
      MongoDB: "🍃",
      AI: "🤖",
      "Tailwind CSS": "💨",
    };

    const formatted = response.data.data.map((item) => ({
      name: item._id,
      count: item.count,
      icon: icons[item._id] || "📚",
    }));

    setCategories(formatted);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="py-8">
      {/* Heading */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Categories
        </p>

       <h2 className="text-4xl font-extrabold tracking-tight">
  Browse Categories
</h2>

        <p className="mt-3 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          Explore articles by your favorite technologies.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <button
            key={category.name || category._id}
            className="
              group
              rounded-[28px]
              border
              border-gray-200
              bg-white
              p-8
              text-left
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <div className="text-5xl">
              {category.icon}
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              {category.name}
            </h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {category.count} Articles
            </p>

            <div className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo-600 transition-all group-hover:gap-3">
              Explore

              <ArrowRight
  size={18}
  className="transition-transform duration-300 group-hover:translate-x-2"
/>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default BrowseCategories;