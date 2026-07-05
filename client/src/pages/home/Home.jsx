// import { useEffect, useState } from "react";
// import axios from "axios";

// import Hero from "../../components/common/Hero";
// import DiscoveryHub from "../../components/common/DiscoveryHub";
// import FeaturedArticle from "../../components/common/FeaturedArticle";
// import LatestArticles from "../../components/common/LatestArticles";
// import Newsletter from "../../components/common/Newsletter";
// import BrowseCategories from "../../components/common/BrowseCategories";
// import TopAuthors from "../../components/common/TopAuthors";
// import CommunityHub from "../../components/common/CommunityHub";
// import TrendingSection from "../../components/common/TrendingSection";
// function Home() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get(
//         `${
//           import.meta.env.VITE_API_URL ||
//           "http://localhost:5000"
//         }/api/blogs`
//       );

//       setBlogs(response.data.data || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const featuredBlog =
//     blogs.length > 0 ? blogs[0] : null;

//   const latestBlogs =
//     blogs.length > 1 ? blogs.slice(1) : [];
// const mostViewedBlogs = [...blogs]
//   .sort((a, b) => b.views - a.views)
//   .slice(0, 4);

// const mostLikedBlogs = [...blogs]
//   .sort(
//     (a, b) =>
//       (b.likes?.length || 0) -
//       (a.likes?.length || 0)
//   )
//   .slice(0, 4);
//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
//         <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
//           Loading articles...
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
//       <div className="space-y-16 px-4 py-8 lg:px-8">
//         {/* Hero */}
//         <Hero />

//         {/* Discovery Hub */}
//         {/* <DiscoveryHub /> */}

//         {/* Featured */}
//         <FeaturedArticle blog={featuredBlog} />

//         {/* Latest */}
//         {/* <LatestArticles blogs={latestBlogs} /> */}
// <TrendingSection
//   title="🔥 Trending Articles"
//   blogs={mostViewedBlogs}
// />

// {/* <TrendingSection
//   title="❤️ Most Liked Articles"
//   blogs={mostLikedBlogs}
// /> */}
//        <TopAuthors />
//        {/* <CommunityHub /> */}

//         {/* Newsletter */}
//         <Newsletter />
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../../components/common/Hero";
import DiscoveryHub from "../../components/common/DiscoveryHub";
import FeaturedArticle from "../../components/common/FeaturedArticle";
import LatestArticles from "../../components/common/LatestArticles";
import Newsletter from "../../components/common/Newsletter";
import BrowseCategories from "../../components/common/BrowseCategories";
import TopAuthors from "../../components/common/TopAuthors";
import CommunityHub from "../../components/common/CommunityHub";
import TrendingSection from "../../components/common/TrendingSection";
import Skeleton from "../../components/ui/Skeleton";
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs`
      );

      setBlogs(response.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const featuredBlog =
    blogs.length > 0 ? blogs[0] : null;

  const latestBlogs =
    blogs.length > 1 ? blogs.slice(1) : [];
const mostViewedBlogs = [...blogs]
  .sort((a, b) => b.views - a.views)
  .slice(0, 4);

const mostLikedBlogs = [...blogs]
  .sort(
    (a, b) =>
      (b.likes?.length || 0) -
      (a.likes?.length || 0)
  )
  .slice(0, 4);
if (loading) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Hero Skeleton */}

      <div className="rounded-[40px] border border-slate-200 bg-white p-10 dark:border-slate-800 dark:bg-slate-900">

        <Skeleton className="h-8 w-40" />

        <Skeleton className="mt-6 h-16 w-3/4" />

        <Skeleton className="mt-5 h-6 w-full" />
        <Skeleton className="mt-3 h-6 w-5/6" />

        <div className="mt-8 flex gap-4">
          <Skeleton className="h-12 w-40 rounded-xl" />
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>

      </div>

      {/* Blog Cards */}

      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <Skeleton className="aspect-[16/9] rounded-2xl" />

            <Skeleton className="mt-6 h-4 w-24" />

            <Skeleton className="mt-5 h-8 w-full" />

            <Skeleton className="mt-3 h-5 w-5/6" />

            <Skeleton className="mt-2 h-5 w-3/4" />

            <div className="mt-8 flex items-center gap-4">

              <Skeleton className="h-12 w-12 rounded-full" />

              <div className="flex-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>

            </div>

            <Skeleton className="mt-8 h-12 w-44 rounded-xl" />

          </div>
        ))}

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-8 lg:px-8">
        {/* Hero */}
        <Hero />

        {/* Discovery Hub */}
        {/* <DiscoveryHub /> */}

        {/* Featured */}
        <FeaturedArticle blog={featuredBlog} />

        {/* Latest */}
        {/* <LatestArticles blogs={latestBlogs} /> */}
<TrendingSection
  title="🔥 Trending Articles"
  blogs={mostViewedBlogs}
/>

{/* <TrendingSection
  title="❤️ Most Liked Articles"
  blogs={mostLikedBlogs}
/> */}
       <TopAuthors />
       {/* <CommunityHub /> */}

        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;