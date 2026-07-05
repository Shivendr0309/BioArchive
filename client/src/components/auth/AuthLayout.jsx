import AuthBanner from "./AuthBanner";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
     <div className="mx-auto flex min-h-screen max-w-screen-2xl items-center px-6 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          {/* Left Banner */}

          <AuthBanner
            title={title}
            subtitle={subtitle}
          />

          {/* Right Form */}

          <div
            className="
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                w-full
                max-w-xl
                rounded-[32px]
                border
                border-gray-200
                bg-white
                p-8
                shadow-xl
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;