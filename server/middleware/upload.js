const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder:
      file.fieldname === "avatar"
        ? "BioArchive/Profile/Avatar"
        : file.fieldname === "banner"
        ? "BioArchive/Profile/Banner"
        : "BioArchive",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: `${Date.now()}-${file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-")}`,
  }),
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});