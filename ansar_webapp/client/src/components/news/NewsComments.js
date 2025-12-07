import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock, FaTag, FaUser, FaArrowLeft, FaCommentDots } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosConfig';

const NewsComments = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const fetchComments = () => {
    setLoading(true);
    axiosInstance.get(`/news/${newsId}/comments`)
      .then(res => {
        // Always set comments as an array
        let data = res.data;
        if (!Array.isArray(data)) {
          if (data && Array.isArray(data.items)) {
            data = data.items;
          } else {
            data = [];
          }
        }
        setComments(data);
        setLoading(false);
      })
      .catch(() => {
        setComments([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [newsId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    try {
      await axiosInstance.post(`/news/${newsId}/comments`, form);
      setForm({ name: '', email: '', content: '' });
      setSuccess('Comment posted!');
      fetchComments();
    } catch {
      setSuccess('Failed to post comment.');
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary-700">
        <FaCommentDots /> Comments ({comments.length})
      </h3>
      {loading ? <div>Loading comments...</div> : (
        <ul className="mb-6 space-y-4">
          {(Array.isArray(comments) ? comments : []).map(c => (
            <li key={c._id} className="bg-primary-50/50 rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-primary-800">{c.name}</span>
                <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-gray-700">{c.content}</div>
            </li>
          ))}
          {comments.length === 0 && <li className="text-gray-500">No comments yet.</li>}
        </ul>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-2">Leave a Comment</h4>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name*"
            className="w-full border rounded px-3 py-2 mb-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (optional)"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Your Comment*"
          className="w-full border rounded px-3 py-2 mb-2"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
          disabled={submitting}
        >
          {submitting ? 'Posting...' : 'Post Comment'}
        </button>
        {success && <div className="mt-2 text-sm text-primary-700">{success}</div>}
      </form>
    </div>
  );
};

export default NewsComments;
