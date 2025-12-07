import React, { useState, useEffect } from 'react';
import { useAdminSettings } from '../../hooks/useAdminSettings';

const Settings = () => {
  const { settings, loading, error, saveSettings } = useAdminSettings();
  const [formValues, setFormValues] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (settings) setFormValues(settings);
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else if (name.startsWith('socialMedia.')) {
      const key = name.split('.')[1];
      setFormValues(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [key]: value
        }
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveSettings(formValues);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (loading || !formValues) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error.message || 'Error loading settings.'}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      {success && <div className="mb-4 text-green-600">Settings updated successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={formValues.siteName || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                Site Description
              </label>
              <input
                type="text"
                id="siteDescription"
                name="siteDescription"
                value={formValues.siteDescription || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formValues.contactEmail || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <input
                type="text"
                id="contactPhone"
                name="contactPhone"
                value={formValues.contactPhone || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formValues.address || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <input
                type="text"
                name="socialMedia.facebook"
                value={formValues.socialMedia?.facebook || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <input
                type="text"
                name="socialMedia.twitter"
                value={formValues.socialMedia?.twitter || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                type="text"
                name="socialMedia.instagram"
                value={formValues.socialMedia?.instagram || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-4">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formValues.notifications?.emailNotifications || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                Email Notifications
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="orderNotifications"
                  checked={formValues.notifications?.orderNotifications || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                Order Notifications
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="userNotifications"
                  checked={formValues.notifications?.userNotifications || false}
                  onChange={handleChange}
                  className="mr-2"
                />
                User Notifications
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;