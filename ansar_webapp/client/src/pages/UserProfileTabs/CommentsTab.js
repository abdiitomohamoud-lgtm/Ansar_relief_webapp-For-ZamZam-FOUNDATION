
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserComments, deleteUserComment, updateUserComment } from "../../api/user";

const CommentsTab = () => {
  const queryClient = useQueryClient();
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["userComments"],
    queryFn: fetchUserComments
  });
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [feedback, setFeedback] = useState("");

  const deleteMutation = useMutation({
    mutationFn: deleteUserComment,
    onSuccess: () => {
      setFeedback("Comment deleted.");
      queryClient.invalidateQueries(["userComments"]);
      setDeleteId(null);
    },
    onError: () => setFeedback("Failed to delete comment."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, content }) => updateUserComment(id, content),
    onSuccess: () => {
      setFeedback("Comment updated.");
      queryClient.invalidateQueries(["userComments"]);
      setEditId(null);
    },
    onError: () => setFeedback("Failed to update comment."),
  });

  if (isLoading) {
    return (
      <div className="text-green-600 flex items-center gap-2">
        <svg className="animate-spin h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading comments...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2" role="alert">
        {error.message || "Failed to load comments"}
      </div>
    );
  }
  if (!comments || comments.length === 0) {
    return <div className="text-gray-400 italic text-center py-8">No comments found.</div>;
  }
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-8 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V10a2 2 0 012-2h2m2-4h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
        My Comments
      </h2>
      {feedback && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">{feedback}</div>}
      <ul className="space-y-6">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-white rounded-xl shadow p-6 border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-green-700">{comment.author}</span>
              <span className="text-xs text-gray-400">{comment.date}</span>
            </div>
            {editId === comment.id ? (
              <div className="mb-2">
                <textarea
                  className="w-full border border-green-200 rounded-lg p-2 mb-2"
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg font-medium"
                    onClick={() => updateMutation.mutate({ id: comment.id, content: editContent })}
                    disabled={updateMutation.isLoading}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-1 rounded-lg border border-green-200 text-green-700 bg-white hover:bg-green-50"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-800 mb-2">{comment.content}</div>
            )}
            <div className="text-xs text-gray-500 mb-2">
              Related to: <span className="font-medium text-green-600">{comment.related}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="text-green-600 hover:underline text-sm"
                onClick={() => { setEditId(comment.id); setEditContent(comment.content); }}
                disabled={editId === comment.id}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => setDeleteId(comment.id)}
                disabled={deleteMutation.isLoading}
              >
                Delete
              </button>
            </div>
            {/* Delete confirmation modal */}
            {deleteId === comment.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-red-200">
                  <h3 className="text-lg font-bold text-red-700 mb-4">Confirm Delete</h3>
                  <p className="mb-4 text-gray-700">Are you sure you want to delete this comment?</p>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => setDeleteId(null)}
                      disabled={deleteMutation.isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold"
                      onClick={() => deleteMutation.mutate(comment.id)}
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsTab;
