import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";

function RegisterForm({
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <>
    <div className="mb-10">

  <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
    Join BioArchive
  </span>

  <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
    Create your account
  </h2>

  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
    Start publishing articles, save your drafts,
    and build your developer portfolio.
  </p>

</div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your full name"
            required
           className="
w-full
rounded-xl
border
border-slate-300
bg-slate-50
px-5
py-4
text-slate-900
placeholder:text-slate-400
outline-none
transition-all
duration-300
focus:border-indigo-500
focus:bg-white
focus:ring-4
focus:ring-indigo-100
dark:border-slate-700
dark:bg-slate-950
dark:text-white
dark:focus:bg-slate-900
"
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
            className="
              w-full
              rounded-2xl
              border
              border-gray-300
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-white
            "
          />
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Password
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Create a password"
              required
              className="
                w-full
                rounded-2xl
                border
                border-gray-300
                bg-white
                px-5
                py-4
                pr-14
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
              required
              className="
                w-full
                rounded-2xl
                border
                border-gray-300
                bg-white
                px-5
                py-4
                pr-14
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-4
                focus:ring-indigo-100
                dark:border-slate-700
                dark:bg-slate-900
                dark:text-white
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
<button
  type="submit"
  className="
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-indigo-600
    px-6
    py-4
    font-semibold
    text-white
    transition-all
    duration-300
    hover:bg-indigo-700
    hover:-translate-y-0.5
    active:scale-[0.98]
  "
>
  <UserPlus size={18} />

  Create Account
</button>

        {/* Login */}

      <div className="pt-4 text-center">

  <p className="text-slate-500 dark:text-slate-400">
    Already have an account?
  </p>

  <Link
    to="/login"
    className="mt-2 inline-block font-semibold text-indigo-600 transition hover:text-indigo-700"
  >
    Sign in →
  </Link>

</div>
      </form>
    </>
  );
}

export default RegisterForm;