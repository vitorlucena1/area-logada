import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ContactCard from "../components/ContactCard";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Contacts({ setLoading }) {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleAutoLogout() {
    logout();
    toast.error("Sessão expirada. Faça login novamente.");
    navigate("/login");
  }

  async function fetchContacts() {
    setLoading(true);
    try {
      const data = await api.get('/contacts', handleAutoLogout);
      if (!data) return;
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleEditClick(contact) {
    setForm({
      name: contact.name,
      email: contact.email || "",
      phone: contact.phone,
      address: contact.address || "",
      notes: contact.notes || ""
    });
    setEditing(contact._id);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const result = await api.put(`/contacts/${editing}`, form, handleAutoLogout);
        if (!result) return;
        toast.success("Contato editado!");
        setEditing(null);
      } else {
        const result = await api.post('/contacts', form, handleAutoLogout);
        if (!result) return;
        toast.success("Contato criado!");
      }
      setForm({ name: "", email: "", phone: "", address: "", notes: "" });
      fetchContacts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCancelEdit() {
    setEditing(null);
    setForm({ name: "", email: "", phone: "", address: "", notes: "" });
  }

  async function handleDelete(id) {
    if (!window.confirm("Deseja excluir este contato?")) return;
    setLoading(true);
    try {
      const result = await api.delete(`/contacts/${id}`, handleAutoLogout);
      if (!result) return;
      toast.success("Contato excluído!");
      fetchContacts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <header className="main-header">
        <span>Seus contatos</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="E-mail (opcional)"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="address"
            placeholder="Endereço (opcional)"
            value={form.address}
            onChange={handleChange}
          />
          <input
            name="notes"
            placeholder="Anotação (opcional)"
            value={form.notes}
            onChange={handleChange}
          />
          <button type="submit">{editing ? "Salvar edição" : "Adicionar contato"}</button>
          {editing && (
            <button type="button" onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
              Cancelar
            </button>
          )}
        </form>
        <div className="contact-list">
          {contacts.map(c => (
            <ContactCard key={c._id} contact={c} onDelete={handleDelete} onEdit={handleEditClick} />
          ))}
        </div>
      </div>
    </>
  );
}