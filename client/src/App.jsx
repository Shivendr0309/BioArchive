import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/home/Home";
import BlogDetails from "./pages/blog/BlogDetails";
import CreateBlog from "./pages/blog/CreateBlog";
import EditBlog from "./pages/blog/EditBlog";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Drafts from "./pages/profile/Drafts";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import SavedArticles from "./pages/profile/SavedArticles";
import NotFound from "./pages/NotFound";
import Search from "./pages/search/Search";
import Bookmarks from "./pages/profile/Bookmarks";
import ReadingHistory from "./pages/profile/ReadingHistory";
function App() {
  return (
    <Routes>

      {/* Routes with Navbar & Footer */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route path="/blogs/:id" element={<BlogDetails />} />

        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/saved-articles" element={<SavedArticles />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/reading-history" element={<ReadingHistory />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/edit-profile" element={<EditProfile />} />

      </Route>

      {/* Auth pages (no Navbar/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>)
  
};

export default App;