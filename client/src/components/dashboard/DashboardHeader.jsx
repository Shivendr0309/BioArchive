function DashboardHeader({ username = "User" }) {
  return (
    <section className="mb-10">
      <div className="rounded-[36px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl dark:border-slate-700 lg:p-14">
        
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
          Dashboard
        </p>

        <h1 className="mt-4 text-4xl font-black md:text-5xl">
          Welcome back, {username} 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          Manage your articles, track engagement,
          and continue building your knowledge archive.
        </p>
      </div>
    </section>
  );
}

export default DashboardHeader;