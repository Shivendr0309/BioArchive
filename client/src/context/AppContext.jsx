import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Blogs
  const [blogs, setBlogs] = useState([]);

  // Selected Blog
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Category
  const [selectedCategory, setSelectedCategory] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        blogs,
        setBlogs,

        selectedBlog,
        setSelectedBlog,

        searchQuery,
        setSearchQuery,

        selectedCategory,
        setSelectedCategory,

        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}