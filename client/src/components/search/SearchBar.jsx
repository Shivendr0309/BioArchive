import { Search } from "lucide-react";

function SearchBar({
  searchQuery,
  setSearchQuery,
}) {
  return (
    <section className="mt-10">
      <div
        className="
          flex
          items-center
          gap-4
          rounded-[32px]
border
border-slate-200
bg-white
px-8
py-6
shadow-lg
dark:border-slate-800
dark:bg-slate-900
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <Search
          size={28}
          className="text-gray-500"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search articles, authors, categories..."
          className="
            flex-1
            bg-transparent
            text-xl
            font-medium
            outline-none
            placeholder:text-gray-400
            dark:text-white
          "
        />
      </div>
    </section>
  );
}

export default SearchBar;