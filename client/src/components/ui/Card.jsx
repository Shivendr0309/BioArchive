function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        bg-white
        p-6
        shadow-md
        transition
        hover:shadow-xl
        dark:bg-slate-900
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;