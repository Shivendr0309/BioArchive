import { useRef } from "react";

function ImageUploader({
  image,
  setImage,
}) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const preview = URL.createObjectURL(file);

      setImage({
        file,
        preview,
      });
    }
  };

  return (
    <div className="space-y-4">
      <label className="font-medium text-gray-700 dark:text-gray-300">
        Cover Image
      </label>

      <div
        onClick={() => inputRef.current.click()}
        className="
          flex
          h-64
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          border-indigo-300
          bg-indigo-50
          transition
          hover:border-indigo-500
          hover:bg-indigo-100
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <p className="text-5xl">📷</p>

        <p className="mt-3 font-semibold">
          Click to upload image
        </p>

        <p className="text-sm text-gray-500">
          JPG, PNG or WEBP
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </div>

      {image?.preview && (
        <img
          src={image.preview}
          alt="Preview"
          className="h-80 w-full rounded-2xl object-cover shadow-lg"
        />
      )}
    </div>
  );
}

export default ImageUploader;