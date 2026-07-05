import { BookOpen } from "lucide-react";

function AuthBanner() {
  return (
    <div
      className="
        relative
        hidden
        overflow-hidden
        rounded-[36px]
        border
        border-slate-200
        bg-white
        p-14
        lg:flex
        lg:flex-col
        lg:justify-between
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Decorative Background */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-100 blur-3xl dark:bg-indigo-900/30" />

      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-100 blur-3xl dark:bg-violet-900/20" />

      {/* Logo */}

      <div className="relative z-10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">

          <BookOpen size={30} />

        </div>

        <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white">
          BioArchive
        </h2>

        <p className="mt-4 max-w-md text-lg leading-8 text-slate-600 dark:text-slate-400">
          Every developer learns.
          <br />
          The best developers document it.
        </p>

      </div>

      {/* Features */}

      <div className="relative z-10 mt-16 space-y-6">

        <Feature text="Publish technical articles" />

        <Feature text="Build your developer portfolio" />

        <Feature text="Save drafts & reading history" />

        <Feature text="Share knowledge with the community" />

      </div>

      {/* Bottom */}

      <div className="relative z-10 mt-16">

        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
          CREATE • SHARE • INSPIRE
        </p>

      </div>

    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />

      <span className="text-lg text-slate-700 dark:text-slate-300">
        {text}
      </span>

    </div>
  );
}

export default AuthBanner;