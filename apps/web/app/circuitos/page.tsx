"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getCircuitos } from "../../src/dataconnect-generated";
import { dataconnect } from "../../lib/firebase";

interface Circuito {
  id: string;
  nombre: string;
  paises: string;
  ciudades: string;
  duracionDias: number;
  precioUsd: number;
  imagenUrl: string;
  destacado: boolean;
}

export default function CircuitosPage() {
  const [circuitos, setCircuitos] = useState<Circuito[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCircuitos(dataconnect)
      .then(result => {
        setCircuitos(result.data.circuitos.map((c: any) => ({
          id: c.id,
          nombre: c.nombre,
          paises: c.paises || "",
          ciudades: c.ciudades || "",
          duracionDias: c.duracionDias,
          precioUsd: c.precioUsd,
          imagenUrl: c.imagenUrl || "",
          destacado: c.destacado
        })));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching circuitos from Data Connect:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="circuitos-page">
      <Navbar />
      
      <div className="container">
        <header className="page-header">
          <div className="badge">CATÁLOGO 2026</div>
          <h1 className="title">Circuitos por el Mundo</h1>
          <p className="subtitle">Explora nuestras rutas curadas y vive experiencias auténticas en cada destino.</p>
        </header>

        <section className="circuitos-grid">
          {loading ? (
            <div className="loading">Cargando circuitos...</div>
          ) : (
            circuitos.map(circ => (
              <div key={circ.id} className="circuito-card">
                <div className="card-image">
                  <Image 
                    src={circ.imagenUrl || "/images/placeholder.jpg"} 
                    alt={circ.nombre} 
                    fill 
                    className="img"
                    unoptimized={circ.imagenUrl?.startsWith('http')}
                  />
                  {circ.destacado && <div className="card-badge">DESTACADO</div>}
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span className="duration">🕒 {circ.duracionDias} días</span>
                    <span className="location">📍 {circ.paises}</span>
                  </div>
                  <h3 className="card-title">{circ.nombre}</h3>
                  <div className="card-footer">
                    <div className="price">
                      <span className="label">DESDE</span>
                      <span className="amount">${circ.precioUsd.toLocaleString()} <small>USD</small></span>
                    </div>
                    <div className="card-actions">
                      <Link href={`/circuitos/${circ.id}`} className="btn-outline">Ver Detalles</Link>
                      <Link href={`/circuitos/${circ.id}/reservar/pasajeros`} className="btn-yellow">Reservar Ya</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      <style jsx>{`
        .circuitos-page {
          background: #fdfdfd;
          min-height: 100vh;
          padding-top: 8rem;
          padding-bottom: 5rem;
          color: #1a1a1a;
          font-family: var(--font-inter), sans-serif;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .page-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .badge {
          display: inline-block;
          background: rgba(230, 138, 46, 0.1);
          color: var(--primary-orange);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }
        .title {
          font-family: var(--font-playfair), serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .subtitle {
          color: #666;
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        .circuitos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2.5rem;
        }
        .circuito-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
          border: 1px solid #eee;
          text-decoration: none;
          color: inherit;
        }
        .circuito-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .card-image {
          position: relative;
          height: 250px;
        }
        .img { object-fit: cover; }
        .card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary-orange);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
        }
        .card-content {
          padding: 2rem;
        }
        .card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #888;
          margin-bottom: 1rem;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .card-desc {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.5;
          margin-bottom: 2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid #f0f0f0;
        }
        .price .label {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          color: #aaa;
        }
        .price .amount {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary-orange);
        }
        .price .amount small { font-size: 0.8rem; }
        .card-actions {
          display: flex;
          gap: 0.5rem;
        }
        .card-actions {
          display: flex;
          gap: 0.5rem;
        }
        .loading { text-align: center; grid-column: 1 / -1; padding: 5rem; color: #888; }
        .loading { text-align: center; grid-column: 1 / -1; padding: 5rem; color: #888; }
      `}</style>
    </main>
  );
}
