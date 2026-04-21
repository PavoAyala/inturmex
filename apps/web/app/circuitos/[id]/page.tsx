"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import { getCircuitoDetail } from "../../../src/dataconnect-generated";
import { dataconnect } from "../../../lib/firebase";

interface Itinerario {
  dia: number;
  titulo: string;
  descripcion: string;
}

interface Tarifa {
  tipo: string;
  precioUsd: number;
}

interface Hotel {
  nombre: string;
  ciudad: string;
  tipo: string;
}

interface Incluye {
  tipo: string;
  descripcion: string;
}

interface CircuitoDetail {
  id: string;
  nombre: string;
  paises: string;
  ciudades: string;
  duracionDias: number;
  precioUsd: number;
  imagenUrl: string;
  descripcion: string;
  itinerario: Itinerario[];
  tarifas: Tarifa[];
  incluye: Incluye[];
  hoteles: Hotel[];
}

export default function CircuitoDetailPage() {
  const { id } = useParams();
  const [circuito, setCircuito] = useState<CircuitoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("itinerario");

  useEffect(() => {
    if (!id) return;
    getCircuitoDetail(dataconnect, { id: id as string })
      .then(result => {
        const c = result.data.circuito;
        if (c) {
          setCircuito({
            id: c.id,
            nombre: c.nombre,
            paises: c.paises || "",
            ciudades: c.ciudades || "",
            duracionDias: c.duracionDias,
            precioUsd: c.precioUsd,
            imagenUrl: c.imagenUrl || "",
            descripcion: c.descripcion || "",
            itinerario: c.itinerarios_on_circuito || [],
            tarifas: c.tarifas_on_circuito || [],
            hoteles: c.hotels_on_circuito.map((h: any) => ({
              nombre: h.nombre,
              ciudad: h.ciudad || "",
              tipo: h.tipo || ""
            })),
            incluye: [] // To be handled if needed from schema
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching circuit detail from Data Connect:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-screen">Cargando detalles del circuito...</div>;
  if (!circuito) return <div className="error-screen">Circuito no encontrado.</div>;

  return (
    <main className="detail-page">
      <Navbar />
      
      <div className="hero-section">
        <Image 
          src={circuito.imagenUrl || "/images/placeholder.jpg"} 
          alt={circuito.nombre} 
          fill 
          className="hero-img"
          unoptimized={circuito.imagenUrl?.startsWith('http')}
        />
        <div className="hero-overlay">
          <div className="container">
            <nav className="breadcrumbs">Inicio / Circuitos / {circuito.nombre}</nav>
            <h1 className="hero-title">{circuito.nombre}</h1>
            <div className="hero-meta">
              <span>🕒 {circuito.duracionDias} días</span>
              <span>📍 {circuito.paises}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container content-grid">
        <aside className="tabs-nav">
          <button className={activeTab === "itinerario" ? "active" : ""} onClick={() => setActiveTab("itinerario")}>Itinerario</button>
          <button className={activeTab === "tarifas" ? "active" : ""} onClick={() => setActiveTab("tarifas")}>Tarifas</button>
          <button className={activeTab === "hoteles" ? "active" : ""} onClick={() => setActiveTab("hoteles")}>Hoteles</button>
          <button className={activeTab === "servicios" ? "active" : ""} onClick={() => setActiveTab("servicios")}>Servicios</button>
        </aside>

        <section className="tab-content">
          {activeTab === "itinerario" && (
            <div className="itinerary-list">
              {circuito.itinerario.map(item => (
                <div key={item.dia} className="itinerary-item">
                  <div className="day-badge">Día {item.dia}</div>
                  <div className="itinerary-info">
                    <h4>{item.titulo}</h4>
                    <p>{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tarifas" && (
            <div className="rates-table">
              <table>
                <thead>
                  <tr>
                    <th>Tipo de Habitación</th>
                    <th>Precio (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {circuito.tarifas.map((rate, i) => (
                    <tr key={i}>
                      <td>{rate.tipo}</td>
                      <td>${rate.precioUsd.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="prices-note">* Los precios no incluyen impuestos aéreos a menos que se especifique lo contrario.</p>
            </div>
          )}

          {activeTab === "hoteles" && (
            <div className="hotels-grid">
              {circuito.hoteles.map((hotel, i) => (
                <div key={i} className="hotel-card">
                  <h4>{hotel.nombre}</h4>
                  <div className="hotel-meta">
                    <span>🏢 {hotel.tipo}</span>
                    <span>📍 {hotel.ciudad}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "servicios" && (
            <div className="services-list">
              <h3>Lo que incluye:</h3>
              <ul>
                {circuito.incluye.filter(s => s.tipo === "incluye").map((s, i) => (
                  <li key={i}>✅ {s.descripcion}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .detail-page { background: #fff; min-height: 100vh; padding-bottom: 5rem; color: #1a1a1a; }
        .hero-section { position: relative; height: 60vh; width: 100%; }
        .hero-img { object-fit: cover; }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          padding-bottom: 4rem;
          color: white;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hero-title { font-size: 4rem; font-family: var(--font-playfair), serif; margin-bottom: 1rem; }
        .hero-meta { display: flex; gap: 2rem; font-size: 1.25rem; font-weight: 500; }
        .content-grid { display: grid; grid-template-columns: 250px 1fr; gap: 4rem; margin-top: 4rem; }
        .tabs-nav { display: flex; flex-direction: column; gap: 0.5rem; }
        .tabs-nav button {
          text-align: left;
          padding: 1rem 1.5rem;
          border: none;
          background: #f1f5f9;
          border-radius: 0.75rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .tabs-nav button:hover { background: #e2e8f0; color: #1e293b; }
        .tabs-nav button.active { background: var(--primary-orange); color: white; box-shadow: 0 4px 12px rgba(230, 138, 46, 0.2); }
        .tab-content { background: #fff; }
        .itinerary-list { display: flex; flex-direction: column; gap: 2.5rem; }
        .itinerary-item { display: flex; gap: 2rem; }
        .day-badge {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          background: #f1f5f9;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #0f172a;
        }
        .itinerary-info h4 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .itinerary-info p { color: #64748b; line-height: 1.6; }
        .rates-table table { width: 100%; border-collapse: collapse; }
        .rates-table th, .rates-table td { padding: 1.5rem; border-bottom: 1px solid #e2e8f0; text-align: left; }
        .rates-table th { background: #f8fafc; font-weight: 700; color: #0f172a; }
        .hotels-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .hotel-card { padding: 2rem; border: 1px solid #e2e8f0; border-radius: 1rem; }
        .hotel-card h4 { font-size: 1.25rem; margin-bottom: 0.75rem; }
        .hotel-meta { display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; color: #64748b; }
        .services-list ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem; }
        .services-list li { font-size: 1.1rem; color: #475569; }
        .loading-screen, .error-screen { height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #888; }
        @media (max-width: 1024px) {
          .content-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  );
}
