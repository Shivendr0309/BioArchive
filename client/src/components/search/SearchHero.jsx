import { Search } from "lucide-react";

function SearchHero() {
  return (
    <section
      className="
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-br
        from-slate-900
        via-slate-800
        to-slate-900
        px-8
        py-20
        text-center
        text-white
        shadow-xl
      "
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur">
          <Search size={40} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Search
        </p>

        <h1 className="mt-4 text-5xl font-black md:text-6xl">
          Discover Knowledge
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Explore articles, tutorials, and developer insights
          from the BioArchive community.
        </p>
      </div>
    </section>
  );
}

export default SearchHero;