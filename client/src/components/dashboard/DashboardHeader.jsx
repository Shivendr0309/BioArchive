function DashboardHeader({ username = "User" }) {
  return (
    <section className="mb-10">
      <div className="rounded-[28px] border border-slate-800 bg-[#151517] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] lg:p-12 dark:border-slate-700">
        
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