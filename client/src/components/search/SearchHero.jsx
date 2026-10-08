import { Search } from "lucide-react";

function SearchHero() {
  return (
    <section
      className="
        overflow-hidden
        rounded-[28px]
        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-slate-900
        px-6
        py-12 md:py-14
        text-center
        text-white
        shadow-xl
      "
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <Search size={32} />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Search
        </p>

        <h1 className="mt-3 text-4xl font-black md:text-5xl">
          Discover Knowledge
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 md:text-lg text-slate-300">
          Explore articles, tutorials, and developer insights
          from the BioArchive community.
        </p>
      </div>
    </section>
  );
}

export default SearchHero;