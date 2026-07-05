import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

function TopAuthors() {
const [authors, setAuthors] = useState([]);

useEffect(() => {
  fetchTopAuthors();
}, []);

const fetchTopAuthors = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/blogs/authors/top`
    );

    setAuthors(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="py-8">
      {/* Header */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Community
        </p>

        <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          Top Authors
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Meet some of the most active contributors on BioArchive.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {authors.map((author) => (
          <div
            key={author.name}
            className="
              group
              rounded-[28px]
              border
              border-gray-200
              bg-white
              p-10
              text-center
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-2
              hover:shadow-2xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            {/* Avatar */}

            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-indigo-100 shadow-xl transition-transform duration-300 group-hover:scale-105 dark:ring-indigo-900">
  {author.avatar ? (
    <img
      src={author.avatar}
      alt={author.name}
      className="h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
      {author.name.charAt(0)}
    </div>
  )}
</div>

            {/* Name */}

            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              {author.name}
            </h3>

            {/* Role */}

            <p className="mt-2 text-gray-500 dark:text-gray-400">
  Community Contributor
</p>

            {/* Stats */}
<div className="mt-6 space-y-3">
  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
    <span>📝 Articles</span>
    <span className="font-bold">
      {author.articles}
    </span>
  </div>

  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
    <span>❤️ Likes</span>
    <span className="font-bold">
      {author.totalLikes}
    </span>
  </div>

  <div className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
    <span>👁 Views</span>
    <span className="font-bold">
      {author.totalViews}
    </span>
  </div>
</div>

            {/* CTA */}

            <Link
  to={`/profile/${author.userId}`}
  className="mt-8 inline-flex items-center gap-2 font-semibold text-indigo-600 transition-all group-hover:gap-3"
>
  View Profile

  <ArrowRight
  size={18}
  className="transition-transform duration-300 group-hover:translate-x-2"
/>
</Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopAuthors;