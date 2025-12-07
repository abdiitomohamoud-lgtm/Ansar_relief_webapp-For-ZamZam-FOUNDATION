import { useState, useEffect } from 'react';
import { fetchMessages, replyMessage, deleteMessage } from '../services/adminApi';

export function useAdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await fetchMessages();
      setMessages(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadMessages(); }, []);

  const reply = async (id, replyData) => {
    await replyMessage(id, replyData);
    await loadMessages();
  };
  const remove = async id => {
    await deleteMessage(id);
    await loadMessages();
  };

  return { messages, loading, error, reply, remove, reload: loadMessages };
}
