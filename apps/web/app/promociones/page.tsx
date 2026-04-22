"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Image from "next/image";

const promotionsImages = [
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(37).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(38).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(39).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(40).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(48).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(53).jpg",
  "http://inturmex.com/proveedor/www.Inturmex%20templates%20para%20seccion%20promociones%20(58).jpg"
];

export default function Promociones() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="promociones-page">
      <Navbar />
      
      <header className="promociones-hero">
        <div className="container">
          <div className="badge-header">OFERTAS EXCLUSIVAS 2026</div>
          <h1 className="title">Promociones</h1>
          <div className="title-underline"></div>
          <p className="description">
            Descubre las mejores ofertas de temporada. Haz clic en "Maximizar" para ver los detalles de cada promoción y reserva tu próxima aventura con tarifas preferenciales.
          </p>
        </div>
      </header>

      <section className="promociones-content">
        <div className="container">
          <div className="promo-grid">
            {promotionsImages.map((src, index) => (
              <div key={index} className="promo-card">
                <div className="promo-img-container">
                  <img src={src} alt={`Promoción ${index + 1}`} className="promo-img" />
                  <div className="promo-overlay">
                    <button 
                      className="maximize-btn"
                      onClick={() => setSelectedImage(src)}
                    >
                      <span className="icon">🔍</span> Maximizar
                    </button>
                  </div>
                </div>
                <div className="promo-footer">
                   <div className="status-dot"></div>
                   <span>Disponible por tiempo limitado</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="Promoción Maximizada" className="full-img" />
          </div>
        </div>
      )}

      <style jsx>{`
        .promociones-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-top: 5rem;
          color: #1e293b;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .promociones-hero {
          background: #ffffff;
          padding: 6rem 0 4rem;
          text-align: center;
          margin-bottom: 3rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .badge-header {
          color: #f97316;
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 4rem;
          font-weight: 900;
          color: #0f172a;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .title-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #3b82f6, #f97316);
          margin: 1.5rem auto;
          border-radius: 2px;
        }

        .description {
          max-width: 700px;
          font-size: 1.1rem;
          color: #64748b;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Grid Section */
        .promo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          padding-bottom: 8rem;
        }

        .promo-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
        }

        .promo-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .promo-img-container {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }

        .promo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .promo-card:hover .promo-img {
          transform: scale(1.05);
        }

        .promo-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          backdrop-filter: blur(2px);
        }

        .promo-card:hover .promo-overlay {
          opacity: 1;
        }

        .maximize-btn {
          background: white;
          color: #0f172a;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .promo-card:hover .maximize-btn {
          transform: translateY(0);
        }

        .maximize-btn:hover {
          background: #f1f5f9;
          transform: scale(1.05);
        }

        .promo-footer {
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #64748b;
          background: #fcfcfc;
          border-top: 1px solid #f1f5f9;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: zoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .full-img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 0.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .close-btn {
          position: absolute;
          top: -1.5rem;
          right: -1.5rem;
          background: white;
          color: black;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .close-btn:hover {
          transform: scale(1.1) rotate(90deg);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 1024px) {
          .promo-grid { grid-template-columns: repeat(2, 1fr); }
          .title { font-size: 3rem; }
        }

        @media (max-width: 640px) {
          .promo-grid { grid-template-columns: 1fr; }
          .title { font-size: 2.5rem; }
          .promociones-hero { padding: 4rem 0 2rem; }
        }
      `}</style>
    </main>
  );
}
