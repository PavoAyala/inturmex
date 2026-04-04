"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background Image Container */}
      <div className="bg-container">
        <Image
          src="/images/hero-bg.png"
          alt="Coastline"
          fill
          priority
          className="bg-img"
        />
        <div className="bg-overlay" />
      </div>

      {/* Content Container */}
      <div className="content">
        {/* Badge */}
        <div className="badge">
          Orgullosamente Regiomontanos
        </div>

        {/* Title */}
        <h1 className="title">
          60 Años <br />
          <span className="hl">Explorando el</span> <br />
          Mundo Contigo.
        </h1>

        {/* Description */}
        <p className="description">
          Desde Monterrey para el mundo. Tres generaciones creando las mejores experiencias de viaje con la confianza y el respaldo que solo la experiencia otorga.
        </p>

        {/* Buttons Row */}
        <div className="btn-row">
          <button className="primary-btn">
            Ver Destinos
            <div className="icon-badge">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m16 12-4-4v8l4-4Z" />
              </svg>
            </div>
          </button>
          
          <button className="secondary-btn">
            Nuestra Historia
          </button>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .bg-container {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-img {
          object-fit: cover;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
          z-index: 10;
        }

        .content {
          position: relative;
          z-index: 20;
          max-width: 900px;
          padding: 5rem 5rem 0 5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          text-align: left;
          color: white;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          background: var(--primary-cyan);
          color: #1a1a1a;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .title {
          font-family: var(--font-playfair), serif;
          font-size: 5.5rem;
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-weight: 500;
          margin: 0;
          text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
        }

        .hl {
          color: var(--primary-orange);
          font-style: italic;
          padding-right: 0.5rem;
        }

        .description {
          font-family: var(--font-inter), sans-serif;
          font-size: 1.25rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin: 0;
        }

        .btn-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-top: 1rem;
        }

        .primary-btn {
          background: var(--primary-orange);
          color: white;
          padding: 1rem 2.5rem;
          border-radius: 2rem;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(230, 138, 46, 0.3);
        }

        .primary-btn:hover {
          background: var(--primary-orange-hover);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 40px rgba(230, 138, 46, 0.4);
        }

        .icon-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.6rem;
          border-radius: 1rem;
          transition: background 0.3s ease;
        }

        .primary-btn:hover .icon-badge {
          background: rgba(255, 255, 255, 0.3);
        }

        .secondary-btn {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          color: white;
          padding: 1.1rem 2.5rem;
          border-radius: 2rem;
          border: 1px solid var(--glass-border);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .title { font-size: 4rem; }
          .content { padding: 4rem 2rem 0 2rem; }
          .btn-row { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  );
}
