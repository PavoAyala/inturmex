"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type Category = "Todo" | "Playa" | "Ciudad" | "Aventura";

interface Promotion {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  currentPrice: string;
  discount: string;
  category: Category;
  badge: string;
  image: string; // Placeholder for image link
}

const promotionsData: Promotion[] = [
  {
    id: 1,
    title: "Cancún Todo Incluido",
    description: "Resort de lujo, 5 Días y 4 Noches con vuelos incluidos.",
    originalPrice: "$15,000 MXN",
    currentPrice: "$10,500",
    discount: "-30% OFF",
    category: "Playa",
    badge: "TIEMPO LIMITADO",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN (Ej: "/images/cancun.jpg") */
  },
  {
    id: 2,
    title: "Escapada Romántica a París",
    description: "Vuelo redondo + Hotel Boutique en el corazón de la ciudad.",
    originalPrice: "$45,000 MXN",
    currentPrice: "$38,250",
    discount: "-15% OFF",
    category: "Ciudad",
    badge: "EXPIRA EN 02:14:05",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 3,
    title: "Riviera Maya Luxury",
    description: "Resort 5 Diamantes con acceso exclusivo a parques temáticos.",
    originalPrice: "$22,000 MXN",
    currentPrice: "$17,600",
    discount: "-20% OFF",
    category: "Playa",
    badge: "¡MÁS VENDIDO!",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 4,
    title: "Aventura en Machu Picchu",
    description: "Explora la ciudad perdida de los Incas con guía privado.",
    originalPrice: "$30,000 MXN",
    currentPrice: "$22,500",
    discount: "-25% OFF",
    category: "Aventura",
    badge: "TENDENCIA",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 5,
    title: "Madrid Clásico & Tapeo",
    description: "Tour gastronómico y estancia en el centro histórico.",
    originalPrice: "$28,000 MXN",
    currentPrice: "$22,400",
    discount: "-20% OFF",
    category: "Ciudad",
    badge: "OFERTA RELÁMPAGO",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 6,
    title: "Punta Cana All Inclusive",
    description: "Playas de arena blanca y relax absoluto en el Caribe.",
    originalPrice: "$18,000 MXN",
    currentPrice: "$11,700",
    discount: "-35% OFF",
    category: "Playa",
    badge: "ÚLTIMOS LUGARES",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 7,
    title: "Safari en Kenia",
    description: "Vive la gran migración en el corazón de África.",
    originalPrice: "$85,000 MXN",
    currentPrice: "$76,500",
    discount: "-10% OFF",
    category: "Aventura",
    badge: "EXPERIENCIA EXCLUSIVA",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 8,
    title: "Nueva York Premium",
    description: "Vuelo + Hotel en Manhattan y boletos para Broadway.",
    originalPrice: "$35,000 MXN",
    currentPrice: "$31,500",
    discount: "-10% OFF",
    category: "Ciudad",
    badge: "IDEAL PARA PAREJAS",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 9,
    title: "Patagonia Extrema",
    description: "Trekking en el Glaciar Perito Moreno y Torres del Paine.",
    originalPrice: "$32,000 MXN",
    currentPrice: "$27,200",
    discount: "-15% OFF",
    category: "Aventura",
    badge: "SOLO ADULTOS",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 10,
    title: "Tokio Moderno",
    description: "Sumérgete en la cultura japonesa y el neón de Shinjuku.",
    originalPrice: "$42,000 MXN",
    currentPrice: "$35,700",
    discount: "-15% OFF",
    category: "Ciudad",
    badge: "¡MÁS BUSCADO!",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 11,
    title: "Bora Bora Paradise",
    description: "Overwater bungalow en el paraíso más exclusivo del mundo.",
    originalPrice: "$110,000 MXN",
    currentPrice: "$93,500",
    discount: "-15% OFF",
    category: "Playa",
    badge: "SÚPER LUJO",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  },
  {
    id: 12,
    title: "Gran Cañón en Helicóptero",
    description: "Vuelo escénico y tour VIP por las maravillas de Arizona.",
    originalPrice: "$15,000 MXN",
    currentPrice: "$12,000",
    discount: "-20% OFF",
    category: "Aventura",
    badge: "AVENTURA TOTAL",
    image: "" /* PONER AQUÍ EL LINK DE LA IMAGEN */
  }
];

export default function Promociones() {
  const [activeFilter, setActiveFilter] = useState<Category>("Todo");

  const filteredPromotions = activeFilter === "Todo" 
    ? promotionsData 
    : promotionsData.filter(p => p.category === activeFilter);

  const filterOptions: Category[] = ["Todo", "Playa", "Ciudad", "Aventura"];

  return (
    <main className="promociones-page">
      <Navbar />
      
      <section className="promociones-header">
        <div className="container header-content">
          <div className="badge-header">OFERTAS DE TEMPORADA</div>
          <h1 className="title">Ofertas Exclusivas</h1>
          <p className="description">
            Aprovecha nuestros descuentos limitados y planea tu próximo viaje con tarifas preferenciales solo para miembros.
          </p>

          {/* Filter Toggles */}
          <div className="filter-container">
            {filterOptions.map((option) => (
              <button 
                key={option}
                className={`filter-btn ${activeFilter === option ? "active" : ""}`}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="promociones-grid">
        <div className="container grid">
          {filteredPromotions.map((promo) => (
            <div key={promo.id} className="promo-card">
              {/* Card Header (Image Area) */}
              <div className="card-image-area">
                <div className="discount-badge">{promo.discount}</div>
                {/* 
                  INDICACIÓN: Poner el link de la imagen en el Array promotionsData arriba.
                  Ejemplo: background-image: url(${promo.image}); 
                */}
                <div 
                  className="placeholder-img"
                  style={{ 
                    backgroundImage: promo.image ? `url(${promo.image})` : 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)' 
                  }}
                >
                  {!promo.image && <span>Link de imagen pendiente</span>}
                </div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <div className="promo-label">
                  <span className="icon-label">★</span>
                  {promo.badge}
                </div>
                <h3>{promo.title}</h3>
                <p className="promo-desc">{promo.description}</p>
                
                <div className="price-container">
                  <div className="price-info">
                    <span className="original-price">{promo.originalPrice}</span>
                    <span className="current-price">
                      {promo.currentPrice} <span className="currency">MXN</span>
                    </span>
                  </div>
                  <button className="reserva-btn">Reserva Ya</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .promociones-page {
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

        .header-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 4rem;
        }

        .badge-header {
          color: var(--primary-orange);
          font-weight: 800;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          margin-bottom: 1rem;
        }

        .title {
          font-family: var(--font-playfair), serif;
          font-size: 4rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1.5rem 0;
        }

        .description {
          max-width: 600px;
          font-size: 1.15rem;
          color: #64748b;
          margin: 0 0 3rem 0;
        }

        /* Filters */
        .filter-container {
          display: flex;
          background: #f1f5f9;
          padding: 0.4rem;
          border-radius: 2rem;
        }

        .filter-btn {
          background: none;
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn.active {
          background: white;
          color: #0f172a;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        /* Grid */
        .promociones-grid {
          padding-bottom: 8rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        /* Card */
        .promo-card {
          background: white;
          border-radius: 1.5rem;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .promo-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .card-image-area {
          position: relative;
          height: 240px;
        }

        .discount-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: var(--primary-orange);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 0.8rem;
          z-index: 10;
        }

        .placeholder-img {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-size: cover;
          background-position: center;
        }

        .placeholder-img span {
          color: #94a3b8;
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.5);
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
        }

        .card-body {
          padding: 2rem;
        }

        .promo-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e68a2e;
          font-weight: 800;
          font-size: 0.7rem;
          margin-bottom: 0.75rem;
          background: #fff8f1;
          align-self: flex-start;
          display: inline-flex;
          padding: 0.2rem 0.6rem;
          border-radius: 0.4rem;
        }

        .icon-label { font-size: 1rem; }

        .card-body h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .promo-desc {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 2rem;
          min-height: 2.8rem;
        }

        .price-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .price-info {
          display: flex;
          flex-direction: column;
        }

        .original-price {
          font-size: 0.8rem;
          color: #94a3b8;
          text-decoration: line-through;
          margin-bottom: 0.2rem;
        }

        .current-price {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
        }

        .currency {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
        }

        .reserva-btn {
          background: var(--primary-orange);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 1rem;
          font-weight: 800;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .reserva-btn:hover {
          background: var(--primary-orange-hover);
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
          .title { font-size: 2.5rem; }
        }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
          .promociones-page { padding-top: 6rem; }
        }
      `}</style>
    </main>
  );
}
