import { useEffect, useState } from "react";
import {
  MessageCircle,
  Send,
  Trash2,
  Pencil,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function CommentsSection({ blogId }) {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/comments/${blogId}`
      );

      setComments(response.data.data || []);
      setCommentCount(response.data.count || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/comments/${blogId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      fetchComments();

      toast.success("Comment added.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment.");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) =>
        prev.filter(
          (item) => item._id !== commentId
        )
      );

      setCommentCount((prev) => prev - 1);

      toast.success("Comment deleted.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment.");
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${
          import.meta.env.VITE_API_URL ||
          "http://localhost:5000"
        }/api/comments/${commentId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                text: editText,
              }
            : comment
        )
      );

      setEditingId(null);
      setEditText("");

      toast.success("Comment updated.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update comment.");
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor(
      (new Date() - new Date(date)) / 1000
    );

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(
      intervals
    )) {
      const count = Math.floor(seconds / value);

      if (count > 0) {
        return `${count} ${unit}${
          count > 1 ? "s" : ""
        } ago`;
      }
    }

    return "Just now";
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading comments...
      </div>
    );
  }

  return (
    <section className="my-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-400">
          Discussion
        </p>

        <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
          Comments ({commentCount})
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Join the conversation and share your thoughts.
        </p>
      </div>

      <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <textarea
          rows={4}
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          placeholder="Write your comment..."
          className="w-full resize-none rounded-2xl border border-gray-300 p-4 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          onClick={handleSubmit}
          className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          <Send size={18} />
          Post Comment
        </button>
      </div>

      {comments.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
            <MessageCircle size={36} />
          </div>

          <h3 className="mt-6 text-2xl font-bold">
            No comments yet
          </h3>

          <p className="mt-3 text-gray-500">
            Be the first to start the discussion.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg font-bold text-white dark:bg-white dark:text-slate-900">
                    {comment.user?.name?.charAt(0) ||
                      "U"}
                  </div>

                  <div>
                    <h4 className="font-semibold">
                      {comment.user?.name ||
                        "Anonymous"}
                    </h4>

                    {editingId ===
                    comment._id ? (
                      <>
                        <textarea
                          value={editText}
                          onChange={(e) =>
                            setEditText(
                              e.target.value
                            )
                          }
                          className="mt-3 w-full rounded-xl border p-3 dark:bg-slate-800"
                        />

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(
                                comment._id
                              )
                            }
                            className="rounded-lg bg-green-500 px-4 py-2 text-white"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => {
                              setEditingId(
                                null
                              );
                              setEditText("");
                            }}
                            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                        {comment.text}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-gray-500">
                      {getTimeAgo(
                        comment.createdAt
                      )}
                    </p>
                  </div>
                </div>

                {(currentUser?.id ||
 currentUser?._id) ===
 comment.user?._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(
                          comment._id
                        );
                        setEditText(
                          comment.text
                        );
                      }}
                      className="rounded-xl bg-blue-500 p-3 text-white hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          comment._id
                        )
                      }
                      className="rounded-xl bg-red-500 p-3 text-white hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommentsSection;

