import React, { useState, useEffect } from "react";
import { updateUserProfile, fetchUserProfile, uploadUserAvatar } from "../../api/user";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile as updateUserProfileThunk } from "../../store/slices/profileSlice";

const ProfileTab = () => {
  const dispatch = useDispatch();
  const profileState = useSelector(state => state.auth);
  const profileInfo = profileState?.user || {};

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [validation, setValidation] = useState({});
  const [avatarUploading, setAvatarUploading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile()
      .then((data) => {
        console.log("Fetched user profile:", data); // Debugging log
        let p = { ...data };
        // Prefill name if missing
        if (!p.name && p.email) {
          p.name = p.email.split('@')[0];
        }
        // Prefill username if missing (undefined or null only)
        if ((p.username === undefined || p.username === null) && p.email) {
          p.username = p.email.split('@')[0];
        }
        // Prefill avatar fallback if missing
        if (!p.avatar && p.email) {
          p.avatar = null;
        }
        console.log("Processed profile data:", p); // Debugging log
        // Update Redux state with the fetched profile
        dispatch(updateUserProfileThunk(p));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err); // Debugging log
        setError("Failed to load profile");
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [dispatch]);

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    setError("");
    setSuccess("");
    setAvatarUploading(true);
    try {
      const data = await uploadUserAvatar(e.target.files[0]);
      const newAvatar = data.avatar ? `${data.avatar}?t=${Date.now()}` : null;
      // Update profile in Redux (triggers global sync)
      await dispatch(updateUserProfileThunk({ ...profileInfo, avatar: newAvatar }));
      setSuccess("Profile image updated.");
    } catch (err) {
      setError("Failed to upload image.");
    }
    setAvatarUploading(false);
  };

  const handleAvatarRemove = () => {
    dispatch(updateUserProfileThunk({ ...profileInfo, avatar: null }));
    setSuccess("Avatar removed. Save to apply.");
  };

  const handleChange = (e) => {
    // Update Redux state directly when form fields change
    const updatedField = { [e.target.name]: e.target.value };
    dispatch(updateUserProfileThunk({ ...profileInfo, ...updatedField }));
  };

  const validate = () => {
    const v = {};
    if (!profileInfo.name || profileInfo.name.length < 2) v.name = "Name is required.";
    if (!profileInfo.email || !/^\S+@\S+\.\S+$/.test(profileInfo.email)) v.email = "Valid email required.";
    if (!profileInfo.phone || !/^\+?\d{7,15}$/.test(profileInfo.phone)) v.phone = "Valid phone required.";
    if (!profileInfo.gender) v.gender = "Gender required.";
    if (!profileInfo.country) v.country = "Country required.";
    setValidation(v);
    return v;
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    const v = validate();
    setValidation(v);
    if (Object.keys(v).length > 0) return;
    try {
      await dispatch(updateUserProfileThunk(profileInfo)).unwrap();
      setSuccess("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!profileInfo) return null;

  // Ensure avatar and username rendering conditions are robust
  const avatarUrl = profileInfo.avatar && typeof profileInfo.avatar === 'string' && profileInfo.avatar.trim() !== '' ? profileInfo.avatar : null;
  const usernameDisplay = profileInfo.username && typeof profileInfo.username === 'string' && profileInfo.username.trim() !== '' ? profileInfo.username : null;

  console.log("Rendering profile data:", profileInfo); // Debugging log
  console.log("Avatar URL:", avatarUrl);
  console.log("Username:", usernameDisplay);

  // Ensure avatar and username are rendered correctly
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Welcome, {usernameDisplay || 'User'}
          </h2>
          {usernameDisplay && (
            <div className="text-green-700 text-base font-mono mb-1">@{usernameDisplay}</div>
          )}
          <p className="text-gray-400 text-sm">{profileInfo.joined || 'Joined recently'}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search profile fields..."
            className="w-56 bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 text-gray-800 placeholder-gray-400 transition-all duration-200"
            value={search}
            onChange={e => setSearch(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-6 mb-8">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
              />
            ) : (
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-200 text-green-700 text-3xl font-bold border-4 border-white shadow">
                {usernameDisplay ? usernameDisplay[0].toUpperCase() : (profileInfo.email ? profileInfo.email[0].toUpperCase() : '?')}
              </div>
            )}
            {isEditing && (
              <>
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ border: 'none', background: 'none' }}
                  onClick={() => document.getElementById('avatar-upload-input').click()}
                  type="button"
                  aria-label="Edit Avatar"
                >
                  <FaEdit className="text-white text-2xl" />
                </button>
                <input
                  id="avatar-upload-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <button
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow"
                  onClick={handleAvatarRemove}
                  type="button"
                >Remove</button>
                {avatarUploading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 rounded-full"><span className="text-green-700 font-bold">Uploading...</span></div>}
              </>
            )}
          </div>
          <div>
            <div className="font-semibold text-lg text-gray-800">
              {usernameDisplay ? `@${usernameDisplay}` : (profileInfo.email ? `@${profileInfo.email.split('@')[0]}` : '@user')}
            </div>
            <div className="text-gray-400 text-sm">{profileInfo.email || ''}</div>
            <div className="text-gray-600 text-sm mt-1">
              {profileInfo.bio && profileInfo.bio.trim() !== '' ? profileInfo.bio : 'No bio provided.'}
            </div>
          </div>
          <button
            className="ml-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => setIsEditing((v) => !v)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-500 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Full Name"
            value={profileInfo.name || ''}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.name && <div className="text-red-500 text-xs mb-2">{validation.name}</div>}

          <label className="block text-gray-500 mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Username"
            value={profileInfo.username || ''}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.username && <div className="text-red-500 text-xs mb-2">{validation.username}</div>}
          <label className="block text-gray-500 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Phone"
            value={profileInfo.phone || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.phone && <div className="text-red-500 text-xs mb-2">{validation.phone}</div>}
          <label className="block text-gray-500 mb-1">Gender</label>
          <input
            type="text"
            name="gender"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Gender"
            value={profileInfo.gender || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.gender && <div className="text-red-500 text-xs mb-2">{validation.gender}</div>}
          <label className="block text-gray-500 mb-1">Address</label>
          <input
            type="text"
            name="address"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Address"
            value={profileInfo.address || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <label className="block text-gray-500 mb-1">Date of Birth</label>
          <input
            type="text"
            name="dob"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="YYYY-MM-DD"
            value={profileInfo.dob || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">City</label>
          <input
            type="text"
            name="city"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your City"
            value={profileInfo.city || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <label className="block text-gray-500 mb-1">Region</label>
          <input
            type="text"
            name="region"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Region"
            value={profileInfo.region || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          <label className="block text-gray-500 mb-1">Country</label>
          <input
            type="text"
            name="country"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Country"
            value={profileInfo.country || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.country && <div className="text-red-500 text-xs mb-2">{validation.country}</div>}
          <label className="block text-gray-500 mb-1">Bio</label>
          <textarea
            name="bio"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Bio"
            value={profileInfo.bio || ""}
            onChange={handleChange}
            readOnly={!isEditing}
            rows={2}
          />
          <label className="block text-gray-500 mb-1">Location</label>
          <input
            type="text"
            name="location"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Location"
            value={profileInfo.location || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </div>
      {isEditing && (
        <div className="flex items-center gap-4 mb-8">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-6 py-3 rounded-xl border-2 border-green-200 text-green-700 font-semibold bg-white hover:bg-green-50"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {success && <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-2">{success}</div>}
      {error && <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-2">{error}</div>}
      <div className="bg-gray-50 rounded-xl p-6 mt-6 text-sm text-gray-500">
        <div><b>Role:</b> {profileInfo.role || 'user'}</div>
        <div><b>Joined:</b> {profileInfo.createdAt ? new Date(profileInfo.createdAt).toLocaleDateString() : ''}</div>
        <div className="mt-4">
          <label className="block text-gray-500 mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full bg-transparent border-0 border-b-2 border-green-400 focus:border-green-600 focus:shadow-[0_2px_0_0_#22c55e] focus:outline-none px-0 py-2 mb-1 text-gray-800 placeholder-gray-400 transition-all duration-200"
            placeholder="Your Email"
            value={profileInfo.email || ''}
            onChange={handleChange}
            readOnly={!isEditing}
          />
          {validation.email && <div className="text-red-500 text-xs mb-2">{validation.email}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
