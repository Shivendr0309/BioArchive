import { useRef } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

function CoverUploader({
  image,
  setImage,
}) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    setImage(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Cover Image
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          Upload Cover
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Drag & drop an image or click to browse.
        </p>
      </div>

      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="
          group
          relative
          flex
          min-h-[320px]
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
          rounded-[32px]
          border-2
          border-dashed
          border-indigo-300
          bg-indigo-50
          transition-all
          duration-300
          hover:border-indigo-500
          hover:bg-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        {image ? (
          <>
            <img
              src={URL.createObjectURL(image)}
              alt="Cover Preview"
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
              }}
              className="
                absolute
                right-5
                top-5
                rounded-full
                bg-red-500
                p-3
                text-white
                shadow-lg
                transition
                hover:scale-105
              "
            >
              <Trash2 size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-white p-5 shadow-lg dark:bg-slate-800">
              <ImagePlus
                size={42}
                className="text-indigo-600"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              Upload Cover Image
            </h3>

            <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
              Drag & drop an image here or click anywhere
              inside this area.
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
    </section>
  );
}

export default CoverUploader;