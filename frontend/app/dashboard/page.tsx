"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

type Device = {
  id: number;
  name: string;
  api_key: string;
};

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("Sem token. Faca login para ver seus dispositivos.");
      return;
    }

    fetch(`${apiUrl}/devices`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setDevices(data))
      .catch(() => setStatus("Nao foi possivel carregar dispositivos."));
  }, []);

  return (
    <section className="hero">
      <div>
        <h1>Dashboard</h1>
        <p>
          Crie dispositivos, receba dados e use Grafana para graficos de series
          temporais.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <Link className="button" href="/login">
            Login
          </Link>
          <Link className="button secondary" href="/">
            Home
          </Link>
        </div>
        {status ? <p style={{ color: "var(--muted)", marginTop: 12 }}>{status}</p> : null}
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 12, fontFamily: "var(--font-display)" }}>
          Dispositivos
        </h3>
        {devices.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>Nenhum dispositivo ainda.</p>
        ) : (
          <div className="grid">
            {devices.map((device) => (
              <div key={device.id}>
                <strong>{device.name}</strong>
                <p style={{ color: "var(--muted)", marginTop: 6 }}>
                  Chave: {device.api_key}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
