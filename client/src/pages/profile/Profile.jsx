import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileBio from "../../components/profile/ProfileBio";
import UserArticles from "../../components/profile/UserArticles";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
 useEffect(() => {
  fetchProfile();

  if (!userId) {
    fetchMyBlogs();
  } else {
    fetchUserBlogs();
  }
}, [userId]);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

   const endpoint = userId
  ? `/api/profile/${userId}`
  : "/api/profile/me";

const response = await axios.get(
  `${
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
  }${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load profile.");
    }
  };

  const fetchMyBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/blogs/my/blogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };
const fetchUserBlogs = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/blogs/user/${userId}`
    );

    setBlogs(response.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-slate-950">
        <h2 className="text-2xl font-semibold">
          Loading profile...
        </h2>
      </div>
    );
  }

  const user = {
    name:
      profile?.user?.name || "User",

    avatar: profile?.avatar || "",
    banner: profile?.banner || "",


    bio:
      profile?.bio ||
      "No bio available.",

    joined: profile?.createdAt
      ? new Date(
          profile.createdAt
        ).toLocaleDateString()
      : "",

    github: profile?.github || "",

    linkedin:
      profile?.linkedin || "",

    website:
      profile?.website || "",
  };

  const articles = blogs.length;

  const likes = blogs.reduce(
    (total, blog) =>
      total + (blog.likes?.length || 0),
    0
  );

  const views = blogs.reduce(
    (total, blog) =>
      total + (blog.views || 0),
    0
  );

 
    return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}

       <ProfileHeader
  user={user}
  isOwner={!userId}
/>

        {/* Statistics */}

        <ProfileStats
  articles={articles}
  likes={likes}
  views={views}
  memberSince={user.joined}
/>

        {/* Bio */}

        <ProfileBio user={user} />

        {/* User Articles */}

        <UserArticles blogs={blogs} />
      </div>
    </div>
  );
}

export default Profile;