import { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/adminApi';

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const addUser = async user => {
    await createUser(user);
    await loadUsers();
  };
  const editUser = async (id, user) => {
    await updateUser(id, user);
    await loadUsers();
  };
  const removeUser = async id => {
    await deleteUser(id);
    await loadUsers();
  };

  return { users, loading, error, addUser, editUser, removeUser, reload: loadUsers };
}
