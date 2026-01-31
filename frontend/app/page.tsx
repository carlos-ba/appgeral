import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div>
        <span className="badge">Monitoramento IoT</span>
        <h1>Temperatura e pressao em tempo real, com visao que convence.</h1>
        <p>
          Receba dados dos controladores, armazene com seguranca e entregue dashboards
          de alto impacto. Comece simples e evolua para SaaS.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <Link className="button" href="/login">
            Entrar
          </Link>
          <Link className="button secondary" href="/dashboard">
            Ver dashboard
          </Link>
        </div>
      </div>
      <div className="card">
        <h3 style={{ marginBottom: 12, fontFamily: "var(--font-display)" }}>
          Fluxo de dados pronto para crescer
        </h3>
        <div className="grid">
          <div>
            <strong>Dispositivo</strong>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              HTTP/MQTT para enviar medicao com chave segura.
            </p>
          </div>
          <div>
            <strong>API</strong>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              FastAPI + PostgreSQL para armazenamento confiavel.
            </p>
          </div>
          <div>
            <strong>Dashboard</strong>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              Grafana ou UI web moderna com dados em series temporais.
            </p>
          </div>
          <div>
            <strong>SaaS</strong>
            <p style={{ color: "var(--muted)", marginTop: 6 }}>
              Multi-tenant, billing, alertas e muito mais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
