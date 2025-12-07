import React from "react";

const FeedbackState = ({ loading, error, empty, emptyMsg }) => {
  if (loading) return <div role="status" aria-live="polite" className="flex items-center gap-2 text-green-600"><svg className="animate-spin h-5 w-5 mr-2 text-green-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Loading...</div>;
  if (error) {
    let msg = typeof error === 'string' ? error : (error?.message || 'An error occurred');
    return <div role="alert" className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2">{msg}</div>;
  }
  if (empty) return <div role="status" aria-live="polite" className="text-gray-400 italic text-center py-8">{emptyMsg}</div>;
  return null;
};

export default FeedbackState;
