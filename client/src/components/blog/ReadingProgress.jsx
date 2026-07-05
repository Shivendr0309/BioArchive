import { useEffect, useState } from "react";

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        docHeight > 0
          ? (scrollTop / docHeight) * 100
          : 0;

      setProgress(percentage);
    };

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    return () =>
      window.removeEventListener(
        "scroll",
        updateProgress
      );
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 transition-all duration-150"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

export default ReadingProgress;