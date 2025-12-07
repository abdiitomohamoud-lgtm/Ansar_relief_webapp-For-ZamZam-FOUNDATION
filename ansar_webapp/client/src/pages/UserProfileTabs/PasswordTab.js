import React, { useState } from "react";
import { updateUserPassword } from "../../api/user";

const PasswordTab = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    setError("");
    setSuccess("");
    if (!current || !newPass || !confirm) {
      setError("All fields are required.");
      return false;
    }
    if (newPass.length < 8) {
      setError("New password must be at least 8 characters.");
      return false;
    }
    if (!/[A-Z]/.test(newPass) || !/[a-z]/.test(newPass) || !/[0-9]/.test(newPass)) {
      setError("Password must include uppercase, lowercase, and a number.");
      return false;
    }
    if (newPass !== confirm) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await updateUserPassword({ current, newPass });
      setSuccess("Password updated successfully.");
      setCurrent("");
      setNewPass("");
      setConfirm("");
    } catch (err) {
      setError("Failed to update password.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setCurrent("");
    setNewPass("");
    setConfirm("");
    setError("");
    setSuccess("");
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit} onReset={handleReset} autoComplete="off">
      {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2" role="alert">{error}</div>}
      {success && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-2" role="status">{success}</div>}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Current Password</label>
        <div className="relative">
          <input type={showCurrent ? 'text' : 'password'} value={current} onChange={e => setCurrent(e.target.value)} className="w-full border-0 border-b-2 border-green-400 bg-transparent focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-3 text-gray-800 placeholder-gray-400 transition-all duration-200 pr-12" placeholder="Enter current password" />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700" onClick={() => setShowCurrent(v => !v)} tabIndex={-1}>
            {showCurrent ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1A8.963 8.963 0 0112 3c4.97 0 9 4.03 9 9 0-1.657-.403-3.22-1.125 4.575m-2.1 2.1A8.963 8.963 0 0112 21c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1L21 21" /></svg>
            )}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">New Password</label>
        <div className="relative">
          <input type={showNew ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full border-0 border-b-2 border-green-400 bg-transparent focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-3 text-gray-800 placeholder-gray-400 transition-all duration-200 pr-12" placeholder="Enter new password" />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700" onClick={() => setShowNew(v => !v)} tabIndex={-1}>
            {showNew ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1A8.963 8.963 0 0112 3c4.97 0 9 4.03 9 9 0-1.657-.403-3.22-1.125 4.575m-2.1 2.1A8.963 8.963 0 0112 21c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1L21 21" /></svg>
            )}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Confirm New Password</label>
        <div className="relative">
          <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full border-0 border-b-2 border-green-400 bg-transparent focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-3 text-gray-800 placeholder-gray-400 transition-all duration-200 pr-12" placeholder="Re-enter new password" />
          <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 hover:text-green-700" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
            {showConfirm ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9S3 17 3 12 7.03 3 12 3s9 4.03 9 9z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1A8.963 8.963 0 0112 3c4.97 0 9 4.03 9 9 0-1.657-.403-3.22-1.125 4.575m-2.1 2.1A8.963 8.963 0 0112 21c-4.97 0-9-4.03-9-9 0-1.657.403-3.22 1.125-4.575m2.1-2.1L21 21" /></svg>
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-10">
        <button type="submit" className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
        <button type="reset" className="ml-4 px-6 py-3 rounded-xl border-2 border-green-200 text-green-700 font-semibold bg-white hover:bg-green-50 transition-all duration-200">
          Clear
        </button>
      </div>
    </form>
  );
};

export default PasswordTab;
