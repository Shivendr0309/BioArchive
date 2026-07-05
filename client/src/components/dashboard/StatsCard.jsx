function StatsCard({
  title,
  value,
  icon: Icon,
  color = "text-slate-400",
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:border-slate-300
        hover:shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        {Icon && (
          <Icon
            size={22}
            className={color}
          />
        )}
      </div>

      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default StatsCard;