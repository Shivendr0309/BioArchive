import { SearchX } from "lucide-react";

function EmptyState() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border
        border-dashed
        border-gray-300
        bg-white
        px-8
        py-20
        text-center
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
        <SearchX
          size={40}
          className="text-indigo-600"
        />
      </div>

      <h2 className="mt-8 text-3xl font-black text-gray-900 dark:text-white">
        No Articles Found
      </h2>

      <p className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-400">
        We couldn't find any articles matching your search.
        Try different keywords or select another category.
      </p>
    </div>
  );
}

export default EmptyState;