"use client";

import Navbar from "../../components/Navbar";

export default function Nosotros() {
  return (
    <main className="nosotros-page">
      <Navbar />
      
      {/* About Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="badge">
            <span className="dot"></span>
            Nuestra Trayectoria
          </div>
          <h1 className="title">
            60 Años Cumpliendo <br />
            Sueños desde Monterrey
          </h1>
          <p className="description">
            Desde 1964, transformamos la pasión por viajar en experiencias inolvidables. Una herencia regia que combina tradición, confianza y visión global.
          </p>
          <div className="divider"></div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container grid">
          
          {/* Card 1: Experiencia */}
          <div className="value-card">
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Experiencia</h3>
            <p>Seis décadas perfeccionando el arte de viajar y conociendo cada rincón del mundo para ti.</p>
          </div>

          {/* Card 2: Confianza */}
          <div className="value-card">
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 15 11"/>
              </svg>
            </div>
            <h3>Confianza</h3>
            <p>Raíces profundas en Monterrey. Somos la agencia de las familias que buscan seguridad y respaldo.</p>
          </div>

          {/* Card 3: Innovación */}
          <div className="value-card">
            <div className="icon-container">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/><path d="M12 12 16 10"/>
              </svg>
            </div>
            <h3>Innovación</h3>
            <p>Vanguardia tecnológica para diseñar rutas personalizadas y experiencias de viaje exclusivas.</p>
          </div>

        </div>
      </section>

      <style jsx>{`
        .nosotros-page {
          background: #ffffff;
          min-height: 100vh;
          padding-top: 8rem;
          color: #1a1a1a;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .about-hero {
          padding: 4rem 0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #f1f5f9;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #64748b;
          margin-bottom: 2rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--primary-orange);
          border-radius: 50%;
        }

        .title {
          font-family: var(--font-playfair), serif;
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .description {
          max-width: 800px;
          font-size: 1.2rem;
          line-height: 1.6;
          color: #475569;
          margin-bottom: 3rem;
        }

        .divider {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--primary-orange), transparent);
        }

        .values-section {
          padding: 4rem 0 8rem 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          text-align: left;
        }

        .value-card {
          background: #ffffff;
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #f1f5f9;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
        }

        .icon-container {
          width: 48px;
          height: 48px;
          background: #f8fafc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .value-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .value-card p {
          font-size: 1rem;
          line-height: 1.5;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .title { font-size: 2.5rem; }
          .grid { grid-template-columns: 1fr; }
          .nosotros-page { padding-top: 6rem; }
        }
      `}</style>
    </main>
  );
}
