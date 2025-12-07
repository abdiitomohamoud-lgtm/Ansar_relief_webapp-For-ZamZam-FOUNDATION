import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../services/adminApi';

export function useAdminSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchSettings();
      setSettings(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSettings(); }, []);

  const saveSettings = async (newSettings) => {
    await updateSettings(newSettings);
    await loadSettings();
  };

  return { settings, loading, error, saveSettings, reload: loadSettings };
}
