import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileHeader({
  user,
  isOwner = false,
}) {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* Cover */}
      <div className="relative h-64 w-full overflow-hidden">
        {user.banner ? (
          <img
            src={user.banner}
            alt="Profile Banner"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700"></div>
        )}
      </div>

      {/* Profile */}
      <div className="relative px-8 pb-8">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
          {/* Left Side */}
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-6">
            <img
              src={
                user.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=4f46e5&color=fff&size=300`
              }
              alt={user.name}
              className="
                h-40
                w-40
                rounded-full
                border-4
                border-white
                object-cover
                shadow-xl
                dark:border-slate-900
              "
            />

            <div className="mt-4 text-center md:mt-8 md:text-left">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white">
                {user.name}
              </h1>

              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {user.bio || "No bio available."}
              </p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Joined {user.joined || "2025"}
              </p>
            </div>
          </div>

          {/* Right Side */}
          {isOwner && (
            <button
              onClick={() => navigate("/edit-profile")}
              className="
                mt-6
                rounded-2xl
                bg-slate-900
                hover:bg-black
                px-6
                py-3
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-105
                md:mt-8
              "
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;