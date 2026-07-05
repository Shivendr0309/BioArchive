import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const [avatarPreview, setAvatarPreview] =
    useState("");

  const [bannerPreview, setBannerPreview] =
    useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile =
        response.data.data;

      setFormData({
        bio: profile.bio || "",
        github:
          profile.github || "",
        linkedin:
          profile.linkedin || "",
        twitter:
          profile.twitter || "",
        website:
          profile.website || "",
      });

      setAvatarPreview(
        profile.avatar || ""
      );

      setBannerPreview(
        profile.banner || ""
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("bio", formData.bio);
    data.append("github", formData.github);
    data.append("linkedin", formData.linkedin);
    data.append("twitter", formData.twitter);
    data.append("website", formData.website);

    if (avatar) {
      data.append("avatar", avatar);
    }

    if (banner) {
      data.append("banner", banner);
    }

    await axios.put(
      `${
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      }/api/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    toast.success(
      "Profile updated successfully!"
    );

    navigate("/profile");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to update profile."
    );
  }
};

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-50 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
        <h1 className="mb-8 text-center text-4xl font-black text-gray-900 dark:text-white">
          Edit Profile
        </h1>

       <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
  {/* Banner */}

  <div>
    <label className="mb-2 block font-semibold">
      Banner Image
    </label>

    {bannerPreview && (
      <img
        src={
          banner
            ? URL.createObjectURL(
                banner
              )
            : bannerPreview
        }
        alt="Banner"
        className="mb-3 h-48 w-full rounded-xl object-cover"
      />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files[0]) {
          setBanner(
            e.target.files[0]
          );
        }
      }}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* Avatar */}

  <div>
    <label className="mb-2 block font-semibold">
      Profile Picture
    </label>

    {avatarPreview && (
      <img
        src={
          avatar
            ? URL.createObjectURL(
                avatar
              )
            : avatarPreview
        }
        alt="Avatar"
        className="mb-3 h-32 w-32 rounded-full object-cover"
      />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files[0]) {
          setAvatar(
            e.target.files[0]
          );
        }
      }}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* Bio */}

  <div>
    <label className="mb-2 block font-semibold">
      Bio
    </label>

    <textarea
      rows={4}
      name="bio"
      value={formData.bio}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* GitHub */}

  <div>
    <label className="mb-2 block font-semibold">
      GitHub
    </label>

    <input
      type="text"
      name="github"
      value={formData.github}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* LinkedIn */}

  <div>
    <label className="mb-2 block font-semibold">
      LinkedIn
    </label>

    <input
      type="text"
      name="linkedin"
      value={formData.linkedin}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* Twitter */}

  <div>
    <label className="mb-2 block font-semibold">
      Twitter
    </label>

    <input
      type="text"
      name="twitter"
      value={formData.twitter}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  {/* Website */}

  <div>
    <label className="mb-2 block font-semibold">
      Website
    </label>

    <input
      type="text"
      name="website"
      value={formData.website}
      onChange={handleChange}
      className="w-full rounded-xl border p-3 dark:bg-slate-800 dark:text-white"
    />
  </div>

  <div className="flex gap-4 pt-4">
    <button
      type="submit"
      className="
        flex-1
        rounded-xl
        bg-gradient-to-r
        from-indigo-600
        to-blue-600
        py-3
        font-semibold
        text-white
      "
    >
      Save Changes
    </button>

    <button
      type="button"
      onClick={() =>
        navigate("/profile")
      }
      className="
        flex-1
        rounded-xl
        border
        py-3
        font-semibold
      "
    >
      Cancel
    </button>
  </div>
</form>
      </div>
    </div>
  );
}

export default EditProfile;