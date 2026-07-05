function Avatar({ name }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
      {name?.charAt(0)}
    </div>
  );
}

export default Avatar;