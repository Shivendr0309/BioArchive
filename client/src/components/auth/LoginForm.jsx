import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";

function LoginForm({
  onSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      email,
      password,
    });
  };

  return (
  <>
  {/* Header */}

  <div className="mb-10">

    <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:border-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
      Welcome Back
    </span>

    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
      Sign in to BioArchive
    </h2>

    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
      Continue your knowledge journey and access your articles,
      drafts, bookmarks and reading history.
    </p>

  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-6"
  >
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
rounded-xl
border
border-slate-300
bg-slate-50
px-5
py-4
text-slate-900
placeholder:text-slate-400
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
                setPassword(
                  e.target.value
                )
              }
              placeholder="Enter your password"
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

        {/* Forgot */}

        <div className="text-right">
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
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
  <LogIn size={18} />

  Continue
</button>

        {/* Register */}

        <p className="text-center text-gray-600 dark:text-gray-400">
         <div className="pt-4 text-center">

  <p className="text-slate-500 dark:text-slate-400">
    New to BioArchive?
  </p>

  <Link
    to="/register"
    className="mt-2 inline-block font-semibold text-indigo-600 transition hover:text-indigo-700"
  >
    Create your account →
  </Link>

</div>
        </p>
      </form>
    </>
  );
}

export default LoginForm;