import { Link } from "react-router-dom";
import {
  BookOpen,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr]">

          {/* Brand */}

          <div>

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <BookOpen
                size={30}
                className="text-indigo-600"
              />

              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                BioArchive
              </h2>
            </Link>

            <p className="mt-6 max-w-md leading-8 text-slate-600 dark:text-slate-400">
              Create your personal knowledge archive.
              Publish technical articles, document what you
              learn, and inspire developers around the world.
            </p>

            <div className="mt-8 flex items-center gap-4">

              <a
                href="#"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-500"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-500"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="mailto:support@bioarchive.com"
                className="rounded-xl border border-slate-200 p-3 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:hover:border-indigo-500"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="font-bold text-slate-900 dark:text-white">
              Product
            </h3>

            <div className="mt-6 flex flex-col gap-4">

              <Link
                to="/"
                className="transition hover:translate-x-1 hover:text-indigo-600"
              >
                Home
              </Link>

              <Link
                to="/search"
                className="transition hover:translate-x-1 hover:text-indigo-600"
              >
                Search
              </Link>

              <Link
                to="/create-blog"
                className="transition hover:translate-x-1 hover:text-indigo-600"
              >
                Write
              </Link>

              <Link
                to="/dashboard"
                className="transition hover:translate-x-1 hover:text-indigo-600"
              >
                Dashboard
              </Link>

            </div>

          </div>

          {/* Community */}

<div>

  <h3 className="font-bold text-slate-900 dark:text-white">
    Community
  </h3>

  <div className="mt-6 flex flex-col gap-4">

    <Link
      to="/search"
      className="transition hover:translate-x-1 hover:text-indigo-600"
    >
      Explore Blogs
    </Link>

    <Link
      to="/bookmarks"
      className="transition hover:translate-x-1 hover:text-indigo-600"
    >
      Bookmarks
    </Link>

    <Link
      to="/reading-history"
      className="transition hover:translate-x-1 hover:text-indigo-600"
    >
      Reading History
    </Link>

    <Link
      to="/profile"
      className="transition hover:translate-x-1 hover:text-indigo-600"
    >
      Profile
    </Link>

  </div>

</div>

          

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 dark:border-slate-800 md:flex-row">

          <p>
            © {new Date().getFullYear()} BioArchive.
            All rights reserved.
          </p>

          <p>
            Created with ❤️ by Shivendra Singh
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;