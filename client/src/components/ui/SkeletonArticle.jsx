import Skeleton from "./Skeleton";

function SkeletonArticle() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      {/* Hero */}

      <Skeleton className="h-[320px] w-full rounded-[32px]" />

      {/* Title */}

      <Skeleton className="mt-10 h-12 w-3/4" />

      <Skeleton className="mt-4 h-6 w-1/2" />

      {/* Meta */}

      <div className="mt-8 flex gap-6">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_0.75fr]">

        {/* Article */}

        <div className="space-y-5">

          {[...Array(12)].map((_, index) => (
            <Skeleton
              key={index}
              className={`h-5 ${
                index % 3 === 0
                  ? "w-full"
                  : index % 3 === 1
                  ? "w-5/6"
                  : "w-4/6"
              }`}
            />
          ))}

        </div>

        {/* Sidebar */}

        <div className="space-y-6">

          <Skeleton className="h-60 rounded-3xl" />

          <Skeleton className="h-44 rounded-3xl" />

          <Skeleton className="h-72 rounded-3xl" />

        </div>

      </div>
    </div>
  );
}

export default SkeletonArticle;