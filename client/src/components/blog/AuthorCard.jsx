import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

function AuthorCard({ author }) {
  if (!author) return null;

  const name = author.name || "Unknown Author";

  const bio =
    author.bio ||
    "Passionate developer sharing knowledge with the community.";

  const avatar =
    author.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0f172a&color=fff&size=200`;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      
      <div className="text-center">

        <img
          src={avatar}
          alt={name}
          className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800"
        />

        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-500">
          Author
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
          {name}
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
          {bio}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2 text-slate-500">
          <FileText size={16} />

          <span>
            {author.articleCount || 0} Articles
          </span>
        </div>

        <Link
          to={`/profile/${author._id || ""}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-slate-900
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-black
          "
        >
          View Profile

          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default AuthorCard;