import { useState, useEffect } from 'react';
import { fetchVolunteers, createVolunteer, updateVolunteer, deleteVolunteer } from '../services/adminApi';

export function useAdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadVolunteers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchVolunteers();
      setVolunteers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadVolunteers(); }, []);

  const addVolunteer = async volunteer => {
    await createVolunteer(volunteer);
    await loadVolunteers();
  };
  const editVolunteer = async (id, volunteer) => {
    await updateVolunteer(id, volunteer);
    await loadVolunteers();
  };
  const removeVolunteer = async id => {
    await deleteVolunteer(id);
    await loadVolunteers();
  };

  return { volunteers, loading, error, addVolunteer, editVolunteer, removeVolunteer, reload: loadVolunteers };
}
