import {
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

function ArticleActions({
  likes = 0,
  onLike,
  onBookmark,
  onShare,
}) {
  return (
    <aside
      className="
        rounded-[28px]
        border
        border-slate-200
        bg-white/90
        p-6
        shadow-sm
        backdrop-blur-xl
        dark:border-slate-800
        dark:bg-slate-900/90
      "
    >
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
        Article Actions
      </h3>

      <div className="space-y-4">

        {/* Like */}

        <button
          onClick={onLike}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            px-5
            py-4
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-red-300
            hover:bg-red-50
            dark:border-slate-700
            dark:hover:bg-red-950/20
          "
        >
          <div className="flex items-center gap-3">

            <Heart
              size={20}
              className="transition group-hover:text-red-500"
            />

            <span className="font-medium">
              Like
            </span>

          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-slate-800">
            {likes}
          </span>
        </button>

        {/* Bookmark */}

        <button
          onClick={onBookmark}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            px-5
            py-4
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-indigo-300
            hover:bg-indigo-50
            dark:border-slate-700
            dark:hover:bg-indigo-950/20
          "
        >
          <Bookmark
            size={20}
            className="transition group-hover:text-indigo-600"
          />

          <span className="font-medium">
            Save for later
          </span>
        </button>

        {/* Share */}

        <button
          onClick={onShare}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-2xl
            border
            border-slate-200
            px-5
            py-4
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-cyan-300
            hover:bg-cyan-50
            dark:border-slate-700
            dark:hover:bg-cyan-950/20
          "
        >
          <Share2
            size={20}
            className="transition group-hover:text-cyan-600"
          />

          <span className="font-medium">
            Share Article
          </span>
        </button>

      </div>

    </aside>
  );
}

export default ArticleActions;