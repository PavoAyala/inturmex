"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../../../components/Navbar";
import Image from "next/image";
import { getCircuitoDetail } from "../../../../../src/dataconnect-generated";
import { dataconnect } from "../../../../../lib/firebase";
import { useAuth } from "../../../../../context/AuthContext";
import Link from "next/link";

export default function ConfirmacionPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [circuito, setCircuito] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confId, setConfId] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    // Generate random confirmation ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    setConfId(`#ITX-CIR-${year}-${randomNum}`);

    getCircuitoDetail(dataconnect, { id: id as string })
      .then((result) => {
        setCircuito(result.data.circuito);
        setLoading(false);
        // Simulate email sending
        setTimeout(() => {
          setEmailSent(true);
        }, 2000);
      })
      .catch((err) => {
        console.error("Error fetching circuit info:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Cargando confirmación...</div>;

  const startDate = "12 Oct, 2024"; // Placeholder or based on selection if implemented
  const endDate = "23 Oct, 2024";
  const cities = circuito?.ciudades?.split(",") || ["México", "Destino", "México"];
  const originPoint = { name: "México (Salida)", type: "origin" };
  const routePoint = { name: cities.join(" - "), type: "route" };
  const returnPoint = { name: "México (Regreso)", type: "return" };

  return (
    <main className="confirmation-page">
      <Navbar />
      
      <div className="container">
        <div className="header-section">
          <div className="badge">PAQUETE CONFIRMADO</div>
          <h1 className="main-thanks">¡Gracias por confiar en Inturmex!</h1>
          <h2 className="main-adventure">Tu aventura comienza ahora.</h2>
          
          {emailSent && (
            <div className="email-notification">
              <span className="check-icon">📧</span>
              <p>Se ha enviado una copia de este resumen a <strong>{user?.email || "tu correo"}</strong></p>
            </div>
          )}

          <p className="conf-id">Confirmación de Compra: <strong>{confId}</strong></p>
          
          <div className="header-actions">
            <button className="btn-teal">
              <span className="icon">⬇️</span> Descargar Itinerario
            </button>
            <button className="btn-orange">
              <span className="icon">🖨️</span> Imprimir Confirmación
            </button>
          </div>
        </div>

        <section className="summary-section">
          <h3 className="section-title">Resumen del Paquete</h3>
          
          <div className="package-card">
            <div className="card-left">
              <div className="destacado-badge">DESTACADO</div>
              <h2 className="circuit-name">{circuito.nombre}</h2>
              <p className="package-type">Paquete Todo Incluido</p>
              <div className="duration-info">
                <span>🕒 {circuito.duracionDias} días, {circuito.duracionDias - 1} noches</span>
              </div>
            </div>
            
            <div className="card-right">
              <div className="info-grid">
                <div className="info-block">
                  <h4 className="info-label">FECHAS DEL VIAJE</h4>
                  <div className="info-content">
                    <span className="calendar-icon">📅</span>
                    <div>
                      <p className="dates">{startDate} - {endDate}</p>
                      <p className="season">Temporada Media-Alta</p>
                    </div>
                  </div>
                </div>
                
                <div className="info-block">
                  <h4 className="info-label">SERVICIOS INCLUIDOS</h4>
                  <div className="services-icons">
                    <div className="service-tag">✈️ Vuelos</div>
                    <div className="service-tag">🏨 Hoteles</div>
                    <div className="service-tag">🚩 Tours</div>
                    <div className="service-tag">🛡️ Seguro</div>
                  </div>
                </div>
              </div>

              <div className="itinerary-route">
                <h4 className="info-label">RESUMEN DE ITINERARIO</h4>
                <div className="route-map">
                  <div className="route-point">
                    <span className="point-icon">📍</span>
                    <p>{originPoint.name}</p>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point">
                    <span className="point-icon">🧭</span>
                    <p>{routePoint.name}</p>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point">
                    <span className="point-icon">🏠</span>
                    <p>{returnPoint.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="recommendations">
          <h3 className="section-title">Recomendaciones para tu viaje</h3>
          <div className="reco-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="reco-card">
                <div className="reco-img"></div>
                <div className="reco-content">
                  <h4>Cómo prepararse para {circuito.nombre}</h4>
                  <p>Guía completa de viaje, clima y consejos útiles.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .confirmation-page { background: #f8fafc; min-height: 100vh; padding-bottom: 5rem; color: #1e293b; font-family: var(--font-inter), sans-serif; }
        .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }

        .header-section { text-align: center; padding: 4rem 0; }
        .badge { display: inline-block; background: #f0fdf4; color: #166534; padding: 0.5rem 1.5rem; border-radius: 2rem; font-size: 12px; font-weight: 700; border: 1px solid #dcfce7; margin-bottom: 1.5rem; letter-spacing: 0.05em; }
        .main-thanks { font-size: 3rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .main-adventure { font-size: 2.5rem; font-weight: 800; color: #f97316; margin-bottom: 2rem; }
        .conf-id { color: #64748b; font-size: 1.1rem; }
        .conf-id strong { color: #0f172a; }

        .email-notification {
          background: #38bdf8;
          color: white;
          padding: 1rem 2rem;
          border-radius: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 10px rgba(56, 189, 248, 0.3);
          animation: slideUp 0.5s ease-out;
        }
        .email-notification p { margin: 0; font-size: 14px; font-weight: 500; }
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .header-actions { display: flex; justify-content: center; gap: 1.5rem; margin-top: 3rem; }
        .btn-teal { background: #2dd4bf; color: #0f172a; border: none; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .btn-teal:hover { background: #14b8a6; transform: translateY(-2px); }
        .btn-orange { background: #f97316; color: white; border: none; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
        .btn-orange:hover { background: #ea580c; transform: translateY(-2px); }

        .section-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 4rem 0 2rem; display: flex; justify-content: space-between; align-items: center; }

        .package-card { background: white; border-radius: 1.5rem; display: grid; grid-template-columns: 360px 1fr; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        
        .card-left { background: #0f172a; color: white; padding: 3rem; display: flex; flex-direction: column; justify-content: flex-end; position: relative; }
        .card-left::after { content: ''; position: absolute; bottom: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%; transform: translate(30%, 30%); }
        .destacado-badge { background: #f97316; color: white; padding: 0.4rem 1rem; border-radius: 0.5rem; font-size: 11px; font-weight: 800; align-self: flex-start; margin-bottom: 1.5rem; }
        .circuit-name { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.1; }
        .package-type { color: #2dd4bf; font-weight: 600; margin-bottom: 3rem; }
        .duration-info { font-size: 14px; font-weight: 500; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; }

        .card-right { padding: 3rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
        .info-label { font-size: 11px; font-weight: 800; color: #94a3b8; letter-spacing: 0.1em; margin-bottom: 1rem; }
        .info-content { display: flex; gap: 1rem; align-items: flex-start; }
        .calendar-icon { font-size: 1.5rem; background: #f8fafc; padding: 0.75rem; border-radius: 0.75rem; color: #0f172a; }
        .dates { font-weight: 700; font-size: 1.1rem; margin: 0; }
        .season { font-size: 12px; color: #64748b; margin-top: 0.25rem; }

        .services-icons { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .service-tag { background: #f8fafc; padding: 0.6rem 1rem; border-radius: 0.5rem; font-size: 13px; font-weight: 600; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; }

        .itinerary-route { border-top: 1px solid #f1f5f9; padding-top: 2rem; }
        .route-map { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; }
        .route-point { text-align: center; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .point-icon { background: #f8fafc; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 1.2rem; }
        .route-point p { font-size: 13px; font-weight: 700; margin: 0; color: #1e293b; }
        .route-line { height: 1px; flex: 1; background: #e2e8f0; margin-bottom: 1.5rem; }

        .reco-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .reco-card { background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
        .reco-img { height: 160px; background: #e2e8f0; }
        .reco-content { padding: 1.5rem; }
        .reco-content h4 { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .reco-content p { font-size: 13px; color: #64748b; line-height: 1.5; }

        @media (max-width: 1024px) {
          .package-card { grid-template-columns: 1fr; }
          .info-grid { grid-template-columns: 1fr; }
          .reco-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
