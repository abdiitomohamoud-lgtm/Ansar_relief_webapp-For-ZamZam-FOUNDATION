import { useState, useEffect } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../services/adminApi';

export function useAdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const addCategory = async category => {
    await createCategory(category);
    await loadCategories();
  };
  const editCategory = async (id, category) => {
    await updateCategory(id, category);
    await loadCategories();
  };
  const removeCategory = async id => {
    await deleteCategory(id);
    await loadCategories();
  };

  return { categories, loading, error, addCategory, editCategory, removeCategory, reload: loadCategories };
}
