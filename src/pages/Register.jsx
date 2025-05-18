import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register({ setLoading }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => document.body.classList.remove('login-page');
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao cadastrar");
      toast.success("Cadastro realizado! Faça login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h2 style={{ color: "#1976d2", marginBottom: 20, textAlign: "center" }}>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Nome de usuário"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      <div className="form-link" style={{ textAlign: "center" }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </div>
    </div>
  );
}