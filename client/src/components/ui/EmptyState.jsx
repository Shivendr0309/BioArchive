import { Link } from "react-router-dom";

function EmptyState({
  icon,
  title,
  description,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-white px-8 py-20 text-center dark:border-slate-700 dark:bg-slate-900">

      <div className="text-6xl">
        {icon}
      </div>

      <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-4 max-w-md text-lg leading-8 text-slate-500">
        {description}
      </p>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;