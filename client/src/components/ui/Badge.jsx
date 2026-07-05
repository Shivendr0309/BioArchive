function Badge({ children }) {
  return (
    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
      {children}
    </span>
  );
}

export default Badge;