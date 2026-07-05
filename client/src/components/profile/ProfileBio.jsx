import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ProfileBio({ user }) {
  return (
    <section className="mt-10 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
        About
      </p>

      <h2 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
        Bio
      </h2>

      <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
        {user.bio ||
          "Passionate Full Stack Developer with a strong interest in web development, problem solving, and creating impactful applications. Loves sharing knowledge through technical articles and open-source projects."}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        {user.github && (
          <a
            href={user.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <FaGithub size={18} />
            GitHub
          </a>
        )}

        {user.linkedin && (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>
        )}

        {user.website && (
          <a
            href={user.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 transition hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Globe size={18} />
            Website
          </a>
        )}
      </div>
    </section>
  );
}

export default ProfileBio;