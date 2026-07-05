import api from "./api";

// Get all blogs
export const getAllBlogs = async () => {
  const response = await api.get("/blogs");
  return response.data;
};

// Get single blog
export const getBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
};

// Create blog
export const createBlog = async (formData) => {
  const response = await api.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update blog
export const updateBlog = async (id, formData) => {
  const response = await api.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`);
  return response.data;
};

// Like blog
export const likeBlog = async (id) => {
  const response = await api.put(`/blogs/${id}/like`);
  return response.data;
};

// Add comment
export const addComment = async (id, text) => {
  const response = await api.post(`/blogs/${id}/comments`, {
    text,
  });

  return response.data;
};