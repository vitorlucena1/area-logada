import { useEffect, useState } from 'react';
import api from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState('');

  function handleAutoLogout() {
    logout();
    toast.error("Sessão expirada. Faça login novamente.");
    navigate('/login');
  }

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await api.get('/contacts', handleAutoLogout);
      if (!data) return;
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Erro ao buscar itens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem) return;
    setLoading(true);
    try {
      const data = await api.post('/contacts', { name: newItem }, handleAutoLogout);
      if (!data) return;
      setItems([...items, data]);
      setNewItem('');
      toast.success('Item criado!');
    } catch (err) {
      toast.error('Erro ao criar item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const result = await api.delete(`/contacts/${id}`, handleAutoLogout);
      if (!result) return;
      setItems(items.filter(item => item.id !== id));
      toast.success('Item removido!');
    } catch (err) {
      toast.error('Erro ao remover item');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Área Logada</h2>
      <button onClick={handleLogout}>Sair</button>
      <form onSubmit={handleAdd}>
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Novo item"
        />
        <button type="submit" disabled={loading}>Adicionar</button>
      </form>
      {loading && <div>Carregando...</div>}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)} disabled={loading}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}