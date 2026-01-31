"use client";

import { useState } from "react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const body = new URLSearchParams();
    body.set("username", email);
    body.set("password", password);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) {
        setStatus("Falha no login. Verifique email e senha.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      setStatus("Login ok. Va para o dashboard.");
    } catch (error) {
      setStatus("Erro de conexao com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero">
      <div>
        <h1>Entrar</h1>
        <p>Use o mesmo email do cadastro na API.</p>
        <Link className="button secondary" href="/">
          Voltar
        </Link>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {status ? <p style={{ color: "var(--muted)" }}>{status}</p> : null}
        </form>
      </div>
    </section>
  );
}
