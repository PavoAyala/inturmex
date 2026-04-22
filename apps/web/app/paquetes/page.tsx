"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

const pdfData = [
  {
    id: 1,
    title: "España",
    subtitle: "Circuitos España 2024",
    filename: "PAQUETES-VPT-2024-1-comprimido.pdf",
    image: "/images/destinos/eiffel_tower.png", // Using as placeholder
    color: "#4f46e5"
  },
  {
    id: 2,
    title: "Europa & Más",
    subtitle: "África, Oriente y Oceanía 2024-2025",
    filename: "PAQUETES-VPT-2024-2-comprimido.pdf",
    image: "/images/destinos/machu_picchu.png",
    color: "#f59e0b"
  },
  {
    id: 3,
    title: "India",
    subtitle: "Circuitos India Mágica",
    filename: "PAQUETES-VPT-2024-3-comprimido.pdf",
    image: "/images/destinos/mount_fuji.png",
    color: "#10b981"
  },
  {
    id: 4,
    title: "Contrastes",
    subtitle: "Circuitos Contrastes Mundiales",
    filename: "PAQUETES-VPT-2024-4-comprimido.pdf",
    image: "/images/destinos/ny_skyline.png",
    color: "#ec4899"
  },
  {
    id: 5,
    title: "Medio Oriente",
    subtitle: "Tesoros de Oriente Medio",
    filename: "PAQUETES-VPT-2024-5-comprimido.pdf",
    image: "/images/destinos/eiffel_tower.png",
    color: "#8b5cf6"
  },
  {
    id: 6,
    title: "España & Marruecos",
    subtitle: "Joyas del Mediterráneo",
    filename: "españa-&-marruecos-VPT.pdf",
    image: "/images/destinos/machu_picchu.png",
    color: "#ef4444"
  }
];

export default function Paquetes() {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  return (
    <main className="paquetes-page">
      <Navbar />
      
      <header className="hero-section">
        <div className="container">
          <div className="hero-badge">CATÁLOGOS DIGITALES 2024-2025</div>
          <h1 className="hero-title">Explora Nuestros Paquetes</h1>
          <p className="hero-desc">
            Hemos diseñado experiencias únicas para ti. Descarga o visualiza nuestros catálogos detallados con itinerarios exclusivos, hoteles premium y todo lo que necesitas para tu próximo gran viaje.
          </p>
        </div>
      </header>

      <section className="catalog-grid-section">
        <div className="container">
          <div className="catalog-grid">
            {pdfData.map((pdf) => (
              <div key={pdf.id} className="catalog-card" style={{"--accent": pdf.color} as any}>
                <div className="card-top">
                  <div className="pdf-icon">📄</div>
                  <div className="card-image" style={{ backgroundImage: `url(${pdf.image})` }}></div>
                  <div className="image-overlay"></div>
                  <div className="card-badge">PDF INTERACTIVO</div>
                </div>
                
                <div className="card-content">
                  <h3 className="catalog-title">{pdf.title}</h3>
                  <p className="catalog-subtitle">{pdf.subtitle}</p>
                  
                  <div className="card-actions">
                    <button 
                      className="btn-view"
                      onClick={() => setSelectedPDF(`/pdfs/paquetes/${pdf.filename}`)}
                    >
                      <span className="icon">👁️</span> Ver Catálogo
                    </button>
                    <a 
                      href={`/pdfs/paquetes/${pdf.filename}`} 
                      download 
                      className="btn-download"
                    >
                      <span className="icon">⬇️</span> Descargar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <div className="modal-overlay" onClick={() => setSelectedPDF(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Visualizador de Catálogo</h3>
              <button className="modal-close" onClick={() => setSelectedPDF(null)}>×</button>
            </div>
            <div className="modal-body">
              <iframe 
                src={`${selectedPDF}#toolbar=0`} 
                width="100%" 
                height="100%" 
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .paquetes-page {
          background: #f1f5f9;
          min-height: 100vh;
          padding-top: 5rem;
          color: #1e293b;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero */
        .hero-section {
          padding: 6rem 0 4rem;
          text-align: center;
          background: white;
          margin-bottom: 4rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .hero-badge {
          display: inline-block;
          background: #fef3c7;
          color: #d97706;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 1.5rem;
          letter-spacing: -0.02em;
        }

        .hero-desc {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.15rem;
          color: #64748b;
          line-height: 1.7;
        }

        /* Grid */
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
          padding-bottom: 8rem;
        }

        .catalog-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          border: 1px solid #e2e8f0;
        }

        .catalog-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          border-color: var(--accent);
        }

        .card-top {
          height: 200px;
          position: relative;
          background: #f8fafc;
        }

        .card-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
        }

        .catalog-card:hover .card-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
        }

        .pdf-icon {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          z-index: 10;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .card-badge {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          z-index: 10;
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          backdrop-filter: blur(4px);
        }

        .card-content {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .catalog-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .catalog-subtitle {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .card-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .btn-view {
          flex: 1;
          background: #0f172a;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-view:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }

        .btn-download {
          flex: 1;
          background: white;
          color: #0f172a;
          border: 2px solid #e2e8f0;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .btn-download:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
        }

        .modal-container {
          background: white;
          width: 100%;
          max-width: 1000px;
          height: 90vh;
          border-radius: 1.5rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-header h3 { font-weight: 800; color: #0f172a; }

        .modal-close {
          background: #f1f5f9;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover { background: #e2e8f0; transform: rotate(90deg); }

        .modal-body {
          flex-grow: 1;
          background: #334155;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 1100px) {
          .catalog-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.5rem; }
          .modal-container { height: 100vh; max-height: none; border-radius: 0; }
          .modal-overlay { padding: 0; }
        }
      `}</style>
    </main>
  );
}
