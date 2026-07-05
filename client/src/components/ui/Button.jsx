function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  const defaultClasses =
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50";

  const primaryClasses =
    "bg-gradient-to-r from-indigo-600 to-blue-600 text-white";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${defaultClasses} ${primaryClasses} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;