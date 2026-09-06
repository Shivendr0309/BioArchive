import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PenSquare,
  Search,
  BookOpen,
  Users,
  Heart,
  Eye,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Clock3,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

// =========================
// Format statistics
// =========================
const formatStat = (num) => {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K+`;
  }

  return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M+`;
};

// =========================
// Calculate reading time
// =========================
const getReadingTime = (content = "") => {
  const text = content.replace(/<[^>]*>/g, "").trim();

  if (!text) return 1;

  const words = text.split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 200));
};

// =========================
// Create article excerpt
// =========================
const getExcerpt = (content = "") => {
  const text = content.replace(/<[^>]*>/g, "").trim();

  if (!text) {
    return "Discover ideas, insights, and knowledge from the BioArchive community.";
  }

  return text.length > 180
    ? `${text.substring(0, 180)}...`
    : text;
};

function Hero({ blog }) {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalUsers: 0,
    totalLikes: 0,
    totalViews: 0,
  });

  // =========================
  // Fetch statistics
  // =========================
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/stats`
      );

      if (response.data?.data) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  // =========================
  // Real blog data
  // =========================

  const blogId = blog?._id || blog?.id;

  const title = blog?.title || "Build. Learn. Share.";

  const category = blog?.category || "Technology";

  const author =
    blog?.author?.name ||
    blog?.author?.username ||
    blog?.author ||
    "BioArchive Author";

  const image = blog?.image || null;

  const excerpt = getExcerpt(blog?.content);

  const readingTime = getReadingTime(blog?.content);

  const createdDate = blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <section
      className="
        relative
        left-1/2
        w-[calc(100vw-32px)]
        -translate-x-1/2
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* ===================================================== */}
      {/* BACKGROUND */}
      {/* ===================================================== */}

      {/* Light background */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_10%_25%,rgba(99,102,241,0.10),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.08),transparent_30%),linear-gradient(to_bottom,#ffffff,#f8fafc)]
          dark:hidden
        "
      />

      {/* Dark background */}
      <div
        className="
          absolute
          inset-0
          hidden
          bg-[radial-gradient(circle_at_10%_25%,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(59,130,246,0.14),transparent_30%),linear-gradient(to_bottom,#020617,#0b1120)]
          dark:block
        "
      />

      {/* Light grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.035]
          dark:hidden
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,70,229,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(79,70,229,0.7) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Dark grid */}
      <div
        className="
          absolute
          inset-0
          hidden
          opacity-[0.055]
          dark:block
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Light glows */}
      <div
        className="
          absolute
          -left-40
          top-1/4
          hidden
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/10
          blur-[130px]
          dark:block
        "
      />

      <div
        className="
          absolute
          -right-40
          top-0
          hidden
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/10
          blur-[130px]
          dark:block
        "
      />

      {/* Soft light-mode glow */}
      <div
        className="
          absolute
          -left-40
          top-1/4
          h-[450px]
          w-[450px]
          rounded-full
          bg-indigo-500/5
          blur-[120px]
          dark:hidden
        "
      />

      <div
        className="
          absolute
          -right-40
          top-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-blue-500/5
          blur-[120px]
          dark:hidden
        "
      />

      {/* ===================================================== */}
      {/* DECORATIVE DOTS */}
      {/* ===================================================== */}

      <div
        className="
          absolute
          right-8
          top-8
          hidden
          opacity-20
          lg:block
          xl:right-14
          dark:opacity-30
        "
      >
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, index) => (
            <span
              key={index}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-indigo-400
              "
            />
          ))}
        </div>
      </div>

      <div
        className="
          absolute
          bottom-16
          left-8
          hidden
          opacity-10
          lg:block
          xl:left-14
          dark:opacity-20
        "
      >
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <span
              key={index}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-indigo-400
              "
            />
          ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1750px]
          px-6
          py-12
          sm:px-8
          sm:py-14
          lg:px-12
          lg:py-16
          xl:px-16
        "
      >
        {/* =================================================== */}
        {/* MAIN HERO */}
        {/* =================================================== */}

        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[1fr_0.9fr]
            xl:gap-20
          "
        >
          {/* ================================================= */}
          {/* LEFT CONTENT */}
          {/* ================================================= */}

          <div className="max-w-3xl">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-500/30
                bg-indigo-500/10
                px-4
                py-2
                text-sm
                font-semibold
                text-indigo-600
                backdrop-blur
                dark:text-indigo-300
              "
            >
              <Sparkles size={15} />

              <span>Welcome to BioArchive</span>
            </div>

            {/* Heading */}

            <h1
              className="
                mt-7
                text-6xl
                font-black
                leading-[0.9]
                tracking-[-0.04em]
                text-slate-950
                sm:text-7xl
                lg:text-[5.8rem]
                xl:text-[7rem]
                dark:text-white
              "
            >
              Write.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-indigo-500
                  via-violet-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                  dark:from-indigo-400
                  dark:via-violet-400
                  dark:to-blue-400
                "
              >
                Share.
              </span>

              <br />

              Inspire.
            </h1>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-2xl
                text-base
                leading-7
                text-slate-600
                sm:text-lg
                lg:text-xl
                lg:leading-8
                dark:text-slate-400
              "
            >
              Create technical articles, document what you learn,
              and build a personal knowledge archive that inspires
              developers around the world.
            </p>

            {/* Buttons */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {/* Start Writing */}

              <Link
                to="/create-blog"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-slate-950
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-slate-950/10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  dark:bg-white
                  dark:text-slate-950
                  dark:shadow-black/20
                "
              >
                <PenSquare size={17} />

                Start Writing

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              {/* Explore */}

              <Link
                to="/search"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-100/80
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-slate-900
                  backdrop-blur
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-indigo-400
                  hover:bg-indigo-50
                  dark:border-slate-700
                  dark:bg-slate-900/70
                  dark:text-white
                  dark:hover:border-indigo-500/60
                  dark:hover:bg-slate-800
                "
              >
                <Search size={17} />

                Explore Articles

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </div>

            {/* Trust text */}

            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-2
                text-xs
                text-slate-500
                dark:text-slate-500
              "
            >
              <span className="flex items-center gap-2">
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                    dark:bg-emerald-400
                  "
                />

                Built for developers
              </span>

              <span>Write & Share Knowledge</span>

              <span>Discover New Ideas</span>
            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT BLOG CARD */}
          {/* ================================================= */}

          <div className="relative w-full">
            {/* Glow */}

            <div
              className="
                absolute
                inset-8
                rounded-[36px]
                bg-indigo-500/10
                blur-[70px]
                dark:bg-indigo-500/20
              "
            />

            {/* Main card */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white/90
                p-5
                shadow-xl
                shadow-slate-900/5
                backdrop-blur-xl
                sm:p-6
                dark:border-slate-700
                dark:bg-slate-900/90
                dark:shadow-black/30
              "
            >
              {/* ================================================= */}
              {/* CARD HEADER */}
              {/* ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-200
                  pb-5
                  dark:border-slate-800
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-500/10
                      text-indigo-600
                      dark:bg-indigo-500/15
                      dark:text-indigo-400
                    "
                  >
                    <BookOpen size={21} />
                  </div>

                  <div>
                    <p
                      className="
                        text-sm
                        font-bold
                        text-slate-900
                        sm:text-base
                        dark:text-white
                      "
                    >
                      Knowledge Archive
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      Ideas worth remembering
                    </p>
                  </div>
                </div>

                <div
                  className="
                    rounded-full
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  <span className="mr-1">●</span>
                  Active
                </div>
              </div>

              {/* ================================================= */}
              {/* REAL BLOG */}
              {/* ================================================= */}

              {blog ? (
                <Link
                  to={`/blogs/${blogId}`}
                  className="
                    group
                    mt-5
                    block
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    transition-all
                    duration-300
                    hover:border-indigo-400/50
                    dark:border-slate-800
                    dark:bg-slate-950
                    dark:hover:border-indigo-500/40
                  "
                >
                  {/* Blog Image */}

                  <div
                    className="
                      relative
                      h-48
                      overflow-hidden
                      sm:h-52
                    "
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                          bg-gradient-to-br
                          from-indigo-100
                          via-violet-100
                          to-blue-100
                          dark:from-indigo-600/30
                          dark:via-violet-600/20
                          dark:to-blue-600/30
                        "
                      >
                        <BookOpen
                          size={48}
                          className="
                            text-indigo-400/70
                            dark:text-indigo-300/60
                          "
                        />
                      </div>
                    )}

                    {/* Image overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                      "
                    />

                    {/* Featured badge */}

                    <div
                      className="
                        absolute
                        left-5
                        top-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/20
                        bg-black/60
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-white
                        backdrop-blur
                      "
                    >
                      <TrendingUp size={13} />

                      Featured Story
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* BLOG CONTENT */}
                  {/* ================================================= */}

                  <div className="p-5 sm:p-6">
                    {/* Meta */}

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        text-xs
                      "
                    >
                      <span
                        className="
                          rounded-full
                          bg-indigo-500/10
                          px-3
                          py-1.5
                          font-semibold
                          text-indigo-600
                          dark:text-indigo-400
                        "
                      >
                        {category}
                      </span>

                      <span
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-slate-500
                        "
                      >
                        <Clock3 size={13} />

                        {readingTime} min read
                      </span>

                      <span
                        className="
                          flex
                          items-center
                          gap-1.5
                          text-slate-500
                        "
                      >
                        <CalendarDays size={13} />

                        {createdDate}
                      </span>
                    </div>

                    {/* Title */}

                    <h2
                      className="
                        mt-4
                        line-clamp-2
                        text-xl
                        font-bold
                        leading-snug
                        text-slate-900
                        transition-colors
                        duration-300
                        group-hover:text-indigo-600
                        sm:text-2xl
                        dark:text-white
                        dark:group-hover:text-indigo-300
                      "
                    >
                      {title}
                    </h2>

                    {/* Excerpt */}

                    <p
                      className="
                        mt-3
                        line-clamp-3
                        text-sm
                        leading-6
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      {excerpt}
                    </p>

                    {/* Author */}

                    <div
                      className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-indigo-600
                            text-sm
                            font-bold
                            text-white
                            dark:bg-indigo-500
                          "
                        >
                          {author.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p
                            className="
                              text-xs
                              font-bold
                              text-slate-900
                              dark:text-white
                            "
                          >
                            {author}
                          </p>

                          <p className="text-[11px] text-slate-500">
                            Author
                          </p>
                        </div>
                      </div>

                      {/* Read */}

                      <span
                        className="
                          inline-flex
                          shrink-0
                          items-center
                          gap-1.5
                          text-xs
                          font-semibold
                          text-indigo-600
                          dark:text-indigo-400
                        "
                      >
                        Read story

                        <ArrowUpRight
                          size={14}
                          className="
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                          "
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                /* ================================================= */
                /* EMPTY STATE */
                /* ================================================= */

                <div
                  className="
                    mt-5
                    flex
                    min-h-[420px]
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    bg-slate-50
                    text-center
                    dark:border-slate-700
                    dark:bg-slate-950
                  "
                >
                  <div>
                    <BookOpen
                      size={40}
                      className="mx-auto text-slate-400 dark:text-slate-600"
                    />

                    <p
                      className="
                        mt-4
                        font-semibold
                        text-slate-600
                        dark:text-slate-400
                      "
                    >
                      No articles available yet
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-500
                        dark:text-slate-600
                      "
                    >
                      Be the first to share your knowledge.
                    </p>
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* BOTTOM CARDS */}
              {/* ================================================= */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    transition-all
                    duration-300
                    hover:border-indigo-400/40
                    hover:bg-indigo-50/50
                    dark:border-slate-800
                    dark:bg-slate-950
                    dark:hover:border-indigo-500/30
                  "
                >
                  <p className="text-xs text-slate-500">
                    Discover
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    New perspectives
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-4
                    transition-all
                    duration-300
                    hover:border-indigo-400/40
                    hover:bg-indigo-50/50
                    dark:border-slate-800
                    dark:bg-slate-950
                    dark:hover:border-indigo-500/30
                  "
                >
                  <p className="text-xs text-slate-500">
                    Create
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Share your knowledge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* DIVIDER */}
        {/* ===================================================== */}

        <div className="my-10 flex items-center gap-4 lg:my-12">
          <div
            className="
              h-px
              flex-1
              bg-gradient-to-r
              from-transparent
              via-slate-300
              to-slate-300
              dark:via-slate-700
              dark:to-slate-700
            "
          />

          <div
            className="
              h-2
              w-2
              rounded-full
              bg-indigo-500
              shadow-[0_0_12px_rgba(99,102,241,0.5)]
              dark:shadow-[0_0_12px_rgba(99,102,241,0.8)]
            "
          />

          <div
            className="
              h-px
              flex-1
              bg-gradient-to-l
              from-transparent
              via-slate-300
              to-slate-300
              dark:via-slate-700
              dark:to-slate-700
            "
          />
        </div>

        {/* ===================================================== */}
        {/* STATISTICS */}
        {/* ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-6
            lg:grid-cols-4
            lg:gap-0
          "
        >
          {/* ================= ARTICLES ================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              lg:border-r
              lg:border-slate-200
              dark:lg:border-slate-800
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <BookOpen size={20} />
            </div>

            <div>
              <p
                className="
                  text-xl
                  font-black
                  text-slate-950
                  dark:text-white
                "
              >
                {formatStat(stats.totalBlogs)}
              </p>

              <p className="text-xs text-slate-500">
                Published Articles
              </p>
            </div>
          </div>

          {/* ================= AUTHORS ================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              lg:border-r
              lg:border-slate-200
              dark:lg:border-slate-800
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <Users size={20} />
            </div>

            <div>
              <p
                className="
                  text-xl
                  font-black
                  text-slate-950
                  dark:text-white
                "
              >
                {formatStat(stats.totalUsers)}
              </p>

              <p className="text-xs text-slate-500">
                Active Authors
              </p>
            </div>
          </div>

          {/* ================= LIKES ================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              lg:border-r
              lg:border-slate-200
              dark:lg:border-slate-800
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <Heart size={20} />
            </div>

            <div>
              <p
                className="
                  text-xl
                  font-black
                  text-slate-950
                  dark:text-white
                "
              >
                {formatStat(stats.totalLikes)}
              </p>

              <p className="text-xs text-slate-500">
                Community Likes
              </p>
            </div>
          </div>

          {/* ================= VIEWS ================= */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/10
                text-indigo-600
                dark:text-indigo-400
              "
            >
              <Eye size={20} />
            </div>

            <div>
              <p
                className="
                  text-xl
                  font-black
                  text-slate-950
                  dark:text-white
                "
              >
                {formatStat(stats.totalViews)}
              </p>

              <p className="text-xs text-slate-500">
                Total Views
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;