// import { Link } from "react-router-dom";
// import { PenSquare, Search } from "lucide-react";

// function Newsletter() {
//   return (
//     <section className="py-8">
//       <div
//         className="
//           overflow-hidden
//           rounded-[36px]
//           border
//           border-slate-200
//           bg-gradient-to-br
//           from-slate-900
//           via-slate-800
//           to-slate-900
//           p-10
//           shadow-xl
//           dark:border-slate-700
//           lg:p-16
//         "
//       >
//         <div className="mx-auto max-w-4xl text-center">
//           {/* Badge */}

//           <span
//             className="
//               inline-flex
//               items-center
//               rounded-full
//               border
//               border-white/10
//               bg-white/10
//               px-5
//               py-2
//               text-sm
//               font-semibold
//               text-slate-200
//             "
//           >
//              Join the Community
//           </span>

//           {/* Heading */}

//           <h2 className="mt-6 text-4xl font-black text-white md:text-6xl">
//             Ready to Share
//             <br />
//             Your Knowledge?
//           </h2>

//           {/* Description */}

//           <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
//             Publish technical articles, showcase your expertise,
//             and connect with developers from around the world.
//           </p>

//           {/* Buttons */}

//           <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
//             <Link
//               to="/create-blog"
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-2xl
//                 bg-white
//                 px-8
//                 py-4
//                 font-semibold
//                 text-slate-900
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//                 hover:shadow-xl
//               "
//             >
//               <PenSquare size={20} />
//               Start Writing
//             </Link>

//             <Link
//               to="/explore"
//               className="
//                 inline-flex
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-2xl
//                 border
//                 border-white/10
//                 bg-white/5
//                 px-8
//                 py-4
//                 font-semibold
//                 text-white
//                 backdrop-blur
//                 transition-all
//                 duration-300
//                 hover:bg-white/10
//               "
//             >
//               <Search size={20} />
//               Explore Articles
//             </Link>
//           </div>

//           {/* Stats */}

//           <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
//             <span>📝 Publish Blogs</span>
//             <span>🌍 Join Developers</span>
//             <span> Build Your Portfolio</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Newsletter;

import { Link } from "react-router-dom";
import { PenSquare, Search } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-20">
      <div className="border-t border-b border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}

          <span
            className="
              inline-flex
              rounded-full
              bg-indigo-100
              px-4
              py-2
              text-sm
              font-semibold
              text-indigo-700
              dark:bg-indigo-900/30
              dark:text-indigo-300
            "
          >
            BioArchive
          </span>

          {/* Heading */}

          <h2 className="mt-8 text-5xl font-black leading-tight text-slate-900 dark:text-white md:text-6xl">
            Build Your
            <br />
            Knowledge Archive.
          </h2>

          {/* Description */}

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Capture what you learn, share what you know, and create
            articles that continue helping developers long after they're
            published.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/create-blog"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-slate-900
                px-8
                py-4
                font-semibold
                text-white
                transition
                hover:-translate-y-1
                dark:bg-white
                dark:text-slate-900
              "
            >
              <PenSquare size={20} />
              Start Writing
            </Link>

            <Link
              to="/search"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-slate-300
                px-8
                py-4
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-100
                dark:border-slate-700
                dark:text-white
                dark:hover:bg-slate-900
              "
            >
              <Search size={20} />
              Explore Articles
            </Link>
          </div>

          {/* Bottom Line */}

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500 dark:text-slate-400">
            <span>📚 Build Your Archive</span>
            <span>✍️ Share Your Knowledge</span>
            <span> Grow as a Developer</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;