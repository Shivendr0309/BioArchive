import {
  Save,
  Send,
  FileText,
  Clock3,
  Tag,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";

function PublishPanel({
  title,
  content,
  tags,
  category,
  onSaveDraft,
  onPublish,
}) {
  const plainText = content.replace(/<[^>]*>/g, "");

  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const readTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  const ready =
    title.trim() &&
    category &&
    wordCount > 0;

  return (
    <aside
      className="
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}

      <div>

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Publish
          </h2>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold

              ${
                ready
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
              }
            `}
          >
            {ready
              ? "Ready"
              : "Draft"}
          </span>

        </div>

        <p className="mt-2 text-sm text-slate-500">
          Review your article before publishing.
        </p>

      </div>

      {/* Stats */}

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">

          <div className="flex items-center gap-3">

            <FileText
              size={18}
              className="text-indigo-600"
            />

            <span className="font-medium">
              Words
            </span>

          </div>

          <span className="font-bold">
            {wordCount}
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-indigo-600"
            />

            <span className="font-medium">
              Reading Time
            </span>

          </div>

          <span className="font-bold">
            {readTime} min
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">

          <div className="flex items-center gap-3">

            <FolderOpen
              size={18}
              className="text-indigo-600"
            />

            <span className="font-medium">
              Category
            </span>

          </div>

          <span className="text-sm font-semibold">
            {category || "Not selected"}
          </span>

        </div>

        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">

          <div className="flex items-center gap-3">

            <Tag
              size={18}
              className="text-indigo-600"
            />

            <span className="font-medium">
              Tags
            </span>

          </div>

          <span className="font-bold">
            {tags.length}
          </span>

        </div>

      </div>

      {/* Checklist */}

      <div className="mt-8 rounded-3xl border border-slate-200 p-5 dark:border-slate-800">

        <h3 className="font-bold">
          Checklist
        </h3>

        <div className="mt-4 space-y-3 text-sm">

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={18}
              className={
                title
                  ? "text-emerald-500"
                  : "text-slate-400"
              }
            />

            Title added

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={18}
              className={
                category
                  ? "text-emerald-500"
                  : "text-slate-400"
              }
            />

            Category selected

          </div>

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={18}
              className={
                wordCount
                  ? "text-emerald-500"
                  : "text-slate-400"
              }
            />

            Content written

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 space-y-4">

        <button
          onClick={onPublish}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-indigo-600
            px-6
            py-4
            font-semibold
            text-white
            transition-all
            hover:bg-indigo-700
          "
        >
          <Send size={18} />

          Publish Article

        </button>

        <button
          onClick={onSaveDraft}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-slate-300
            px-6
            py-4
            font-semibold
            transition
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          <Save size={18} />

          Save Draft

        </button>

      </div>

    </aside>
  );
}

export default PublishPanel;