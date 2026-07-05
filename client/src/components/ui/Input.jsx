function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-200
          dark:border-slate-700
          dark:bg-slate-900
        "
      />
    </div>
  );
}

export default Input;