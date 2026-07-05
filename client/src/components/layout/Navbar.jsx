import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  HiOutlineMenu,
  HiOutlineX,
} from "react-icons/hi";

import {
  FiSearch,
  FiMoon,
  FiSun,
  FiEdit3,
} from "react-icons/fi";

import { BookOpen } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const { darkMode, toggleTheme } =
    useTheme();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  const avatarLetter =
    user?.name?.charAt(0)?.toUpperCase() ||
    "U";

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `relative transition-colors duration-300 font-medium ${
      isActive
        ? "text-indigo-600"
        : "text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-2xl dark:border-slate-800/60 dark:bg-slate-950/80">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          {/* <BookOpen
            size={26}
            className="text-indigo-600"
          /> */}
          

          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            BioArchive
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-10 lg:flex">

          <NavLink
            to="/"
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={navClass}
          >
            Search
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={navClass}
            >
              Dashboard
            </NavLink>
          )}

        </nav>

        {/* Right Side */}

        <div className="hidden items-center gap-3 lg:flex">

          {/* Search */}

          <Link
            to="/search"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
          >
            <FiSearch size={18} />
          </Link>

          {/* Theme */}

          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
          >
            {darkMode ? (
              <FiSun size={18} />
            ) : (
              <FiMoon size={18} />
            )}
          </button>

          {isAuthenticated ? (
            <>
              <Link
                to="/create-blog"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                <FiEdit3 size={17} />

                Write
              </Link>

              <div
                className="relative"
                ref={dropdownRef}
              >
                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white shadow-lg transition hover:scale-105"
                >
                  {avatarLetter}
                </button>
                                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                    <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Profile
                    </Link>

                    <Link
                      to="/bookmarks"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Saved Articles
                    </Link>

                    <Link
                      to="/reading-history"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Reading History
                    </Link>

                    <Link
                      to="/drafts"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Drafts
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full border-t border-slate-200 px-5 py-3 text-left text-red-600 transition hover:bg-red-50 dark:border-slate-700 dark:hover:bg-red-900/20"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-5 py-2.5 font-medium transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 lg:hidden"
        >
          {menuOpen ? (
            <HiOutlineX size={24} />
          ) : (
            <HiOutlineMenu size={24} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden">

          <div className="space-y-2 px-6 py-6">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Home
            </NavLink>

            <NavLink
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Search
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/create-blog"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Write Article
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-3 w-full rounded-xl bg-red-50 px-4 py-3 text-left text-red-600 dark:bg-red-900/20"
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </NavLink>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;