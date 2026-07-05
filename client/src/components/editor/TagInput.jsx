import { useState } from "react";
import { X } from "lucide-react";

function TagInput({
  tags,
  setTags,
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    if (tags.includes(value)) {
      setInput("");
      return;
    }

    setTags([...tags, value]);
    setInput("");
  };

  const removeTag = (tag) => {
    setTags(
      tags.filter((item) => item !== tag)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Tags
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Add Tags
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Press Enter to add a tag.
        </p>
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="e.g. react"
        className="
          w-full
          rounded-[24px]
          border
          border-gray-300
          bg-white
          px-6
          py-4
          text-lg
          outline-none
          transition-all
          duration-300
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:focus:ring-indigo-900
        "
      />

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <div
              key={tag}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-indigo-100
                px-4
                py-2
                text-sm
                font-medium
                text-indigo-700
                dark:bg-indigo-900
                dark:text-indigo-200
              "
            >
              #{tag}

              <button
                type="button"
                onClick={() =>
                  removeTag(tag)
                }
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TagInput;