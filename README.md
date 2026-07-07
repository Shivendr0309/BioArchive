<p align="center">
  <img src="README/assets/banner.png" alt="BioArchive Banner" width="100%">
</p>

<h1 align="center">📚 BioArchive</h1>

<p align="center">
Modern Full-Stack Blogging Platform
</p>

---

# ✨ Overview

BioArchive is a modern full-stack blogging platform where users can write, publish, discover, and manage articles through a clean and responsive interface.

The application focuses on delivering a professional blogging experience with secure authentication, rich text editing, Cloudinary-powered media uploads, user profiles, bookmarks, comments, and a personalized dashboard.

---


<div align="center">

## Live Demo

<a href="https://bioarchive-blog.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Website-00C853?style=for-the-badge" />
</a>

<a href="https://bioarchive.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/⚙️_Backend_API-Render-2962FF?style=for-the-badge" />
</a>

</div>

#  Key Features

| Feature | Status |
|----------|:------:|
| JWT Authentication | ✅ |
| User Profiles | ✅ |
| Rich Text Editor (TipTap) | ✅ |
| Blog Management | ✅ |
| Cloudinary Image Upload | ✅ |
| Dashboard | ✅ |
| Search Articles | ✅ |
| Category Filtering | ✅ |
| Comments | ✅ |
| Bookmarks | ✅ |
| Reading History | ✅ |
| Responsive Design | ✅ |
| Dark Mode | ✅ |

---
# 📸 Application Preview

<p align="center">
<img src="README/assets/home.png" width="90%">
</p>

<p align="center"><b>🏠 Home Page</b></p>

---

<p align="center">
<img src="README/assets/search.png" width="90%">
</p>

<p align="center"><b>🔍 Search Articles</b></p>

---

<p align="center">
<img src="README/assets/editor.png" width="90%">
</p>

<p align="center"><b>✍️ Rich Text Editor</b></p>

---

<p align="center">
<img src="README/assets/blog.png" width="90%">
</p>

<p align="center"><b>📖 Blog Details</b></p>

---

<p align="center">
<img src="README/assets/profile.png" width="90%">
</p>

<p align="center"><b>👤 User Profile</b></p>

---

<p align="center">
<img src="README/assets/dashboard.png" width="90%">
</p>

<p align="center"><b>📊 Dashboard</b></p>
# 🏗️ System Architecture

<p align="center">
<img src="README/assets/architecture.png" width="95%">
</p>

## 🛠 Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### Deployment

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

# 📂 Project Structure

```text
BioArchive
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Local Installation

### Clone Repository

```bash
git clone https://github.com/Shivendr0309/BioArchive.git
```

### Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the **server** directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME

CLOUDINARY_API_KEY=YOUR_API_KEY

CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

### Start Development Server

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# 📡 API Overview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login User |
| GET | `/api/blogs` | Fetch Blogs |
| POST | `/api/blogs` | Create Blog |
| PUT | `/api/blogs/:id` | Update Blog |
| DELETE | `/api/blogs/:id` | Delete Blog |
| PUT | `/api/profile` | Update Profile |

---

# 🎯 Roadmap

- ❤️ Persistent Likes
- 👥 Follow Authors
- 🔔 Notifications
- 📈 Article Analytics
- 🤖 AI-powered Article Summaries
- 🤖 AI-generated Tags
- 🌍 Multi-language Support

---

# 👨‍💻 Author

**Shivendra Singh**

GitHub

https://github.com/Shivendr0309

---

# ⭐ Support

If you enjoyed this project, consider giving it a **⭐** on GitHub.
