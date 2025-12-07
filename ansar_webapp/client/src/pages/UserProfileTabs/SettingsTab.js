import React, { useState } from "react";
import { deleteUserAccount } from "../../api/user";

const SettingsTab = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setDeleteError("");
    setDeleteSuccess("");
    setLoading(true);
    try {
      await deleteUserAccount();
      setDeleteSuccess("Account deleted successfully.");
      // Clear tokens and redirect after short delay
      setTimeout(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }, 1200);
    } catch (err) {
      setDeleteError("Failed to delete account.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white/90 rounded-2xl shadow-xl p-10 border border-green-100">
      <h2 className="text-2xl font-bold text-green-700 mb-8 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m0 14v1m8-8h1M4 12H3m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707" /></svg>
        Settings
      </h2>
      <div className="mb-8">
        <div className="font-semibold text-gray-800 mb-2">Account</div>
        <button
          className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={() => { setShowDeleteDialog(true); setDeleteError(""); setDeleteSuccess(""); }}
        >
          Delete Account
        </button>
        <p className="text-xs text-gray-500 mt-2">This action is irreversible. All your data will be permanently deleted.</p>
      </div>
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full border border-red-200">
            <h3 className="text-lg font-bold text-red-700 mb-4">Confirm Account Deletion</h3>
            <p className="mb-4 text-gray-700">Are you sure you want to delete your account? This action cannot be undone.</p>
            {deleteError && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2" role="alert">{deleteError}</div>}
            {deleteSuccess && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-2" role="status">{deleteSuccess}</div>}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setShowDeleteDialog(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleDelete}
                disabled={loading || !!deleteSuccess}
              >
                {loading ? "Deleting..." : deleteSuccess ? "Deleted" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
