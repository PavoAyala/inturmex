"use client";

import Navbar from "../../components/Navbar";
import Image from "next/image";

const destinations = [
  {
    name: "América",
    image: "/images/destinos/machu_picchu.png",
    description: "Machu Picchu, Perú"
  },
  {
    name: "Europa",
    image: "/images/destinos/eiffel_tower.png",
    description: "París, Francia"
  },
  {
    name: "Asia",
    image: "/images/destinos/mount_fuji.png",
    description: "Monte Fuji, Japón"
  },
  {
    name: "Norteamérica",
    image: "/images/destinos/ny_skyline.png",
    description: "Nueva York, USA"
  }
];

export default function Destinos() {
  return (
    <main className="destinos-page">
      <Navbar />
      
      {/* Destinations Header */}
      <section className="destinos-header">
        <div className="container">
          <div className="badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            EXPLORA EL MUNDO
          </div>
          <h1 className="title">Catálogo de Destinos <br /> Globales</h1>
          <p className="description">
            Descubre el mundo con Inturmex. Un viaje diseñado para cada explorador, desde las cumbres de los Andes hasta las luces de Tokio.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="grid-section">
        <div className="container grid">
          {destinations.map((dest, index) => (
            <div key={index} className="dest-card">
              <Image 
                src={dest.image} 
                alt={dest.name} 
                fill 
                className="dest-img"
              />
              <div className="dest-overlay">
                <div className="dest-info">
                  <h2>{dest.name}</h2>
                  <span>{dest.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .destinos-page {
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
        }

        .destinos-header {
          padding: 3rem 0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(230, 138, 46, 0.1);
          color: var(--primary-orange);
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .title {
          font-family: var(--font-playfair), serif;
          font-size: 4.5rem;
          line-height: 1.1;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1.5rem 0;
          letter-spacing: -0.01em;
        }

        .description {
          max-width: 600px;
          font-size: 1.15rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        .grid-section {
          padding: 2rem 0 8rem 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .dest-card {
          position: relative;
          height: 500px;
          border-radius: 2rem;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .dest-img {
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dest-card:hover .dest-img {
          transform: scale(1.1);
        }

        .dest-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 60%);
          display: flex;
          align-items: flex-end;
          padding: 3rem;
          z-index: 10;
        }

        .dest-info h2 {
          color: white;
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .dest-info span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .title { font-size: 3rem; }
          .grid { grid-template-columns: 1fr; }
          .dest-card { height: 400px; }
        }
      `}</style>
    </main>
  );
}
