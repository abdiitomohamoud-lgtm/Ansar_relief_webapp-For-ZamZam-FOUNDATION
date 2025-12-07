import { useState, useEffect } from 'react';
import { fetchCampaigns, createCampaign, updateCampaign, deleteCampaign } from '../services/adminApi';

export function useAdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCampaigns(); }, []);

  const addCampaign = async campaign => {
    await createCampaign(campaign);
    await loadCampaigns();
  };
  const editCampaign = async (id, campaign) => {
    await updateCampaign(id, campaign);
    await loadCampaigns();
  };
  const removeCampaign = async id => {
    await deleteCampaign(id);
    await loadCampaigns();
  };

  return { campaigns, loading, error, addCampaign, editCampaign, removeCampaign, reload: loadCampaigns };
}
