"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type TripType = "Playa" | "Ciudad" | "Aventura" | "Crucero";

interface Package {
  id: number;
  title: string;
  description: string;
  price: number;
  category: TripType;
  destination: string;
  rating: number;
  badge?: string;
  image: string; // Placeholder
}

const allPackages: Package[] = [
  { id: 1, title: "Cancún All-Inclusive", description: "Disfruta de la arena blanca y el lujo sin preocupaciones con todo incluido.", price: 12499, category: "Playa", destination: "México", rating: 4.9, badge: "MÁS VENDIDO", image: "" },
  { id: 2, title: "Gran Tour Europa", description: "Madrid, París y Roma en un viaje inolvidable de 15 días con guías expertos.", price: 45900, category: "Ciudad", destination: "Europa", rating: 5.0, image: "" },
  { id: 3, title: "Aventura en Chiapas", description: "Explora Palenque y las Cascadas de Agua Azul en esta expedición única.", price: 8750, category: "Aventura", destination: "México", rating: 4.8, badge: "NUEVO", image: "" },
  { id: 4, title: "Crucero por el Caribe", description: "Islas Caimán, Jamaica y Cozumel en un crucero de lujo de 7 noches.", price: 15300, category: "Crucero", destination: "Caribe", rating: 4.7, image: "" },
  { id: 5, title: "Safari en África", description: "Kenia y Tanzania: vive la gran migración en el corazón de la sabana.", price: 78000, category: "Aventura", destination: "África", rating: 5.0, badge: "EXPERIENCIA EXCLUSIVA", image: "" },
  { id: 6, title: "Tokio & Kioto", description: "La mezcla perfecta entre modernidad y tradición en el país del sol naciente.", price: 39500, category: "Ciudad", destination: "Asia", rating: 4.9, image: "" },
  { id: 7, title: "Machu Picchu & Cusco", description: "Descubre el ombligo del mundo y la ciudad perdida de los Incas.", price: 21000, category: "Aventura", destination: "Sudamérica", rating: 4.9, image: "" },
  { id: 8, title: "Punta Cana Relax", description: "Descanso total en las mejores playas de República Dominicana.", price: 11900, category: "Playa", destination: "Caribe", rating: 4.6, image: "" },
  { id: 9, title: "Nueva York Premium", description: "Broadway, Quinta Avenida y Central Park en un viaje de ensueño.", price: 28400, category: "Ciudad", destination: "Norteamérica", rating: 4.8, image: "" },
  { id: 10, title: "Patagonia Argentina", description: "Glaciares, montañas y lagos en el fin del mundo.", price: 25600, category: "Aventura", destination: "Sudamérica", rating: 4.7, image: "" },
  { id: 11, title: "Crucero Fiordos Noruegos", description: "Paisajes espectaculares en una travesía por los fiordos más bellos.", price: 42000, category: "Crucero", destination: "Europa", rating: 4.9, image: "" },
  { id: 12, title: "Madrid & Barcelona", description: "Lo mejor de España en un tour cultural y gastronómico de 10 días.", price: 32000, category: "Ciudad", destination: "Europa", rating: 4.7, image: "" },
];

export default function Paquetes() {
  // Filter States (Temp storage before applying)
  const [tempDest, setTempDest] = useState("Todos los destinos");
  const [tempPrice, setTempPrice] = useState(100000);
  const [tempTypes, setTempTypes] = useState<TripType[]>(["Playa", "Ciudad", "Aventura", "Crucero"]);

  // Applied Filter States
  const [appliedDest, setAppliedDest] = useState("Todos los destinos");
  const [appliedPrice, setAppliedPrice] = useState(100000);
  const [appliedTypes, setAppliedTypes] = useState<TripType[]>(["Playa", "Ciudad", "Aventura", "Crucero"]);

  const destinations = ["Todos los destinos", ...new Set(allPackages.map(p => p.destination))];
  const tripTypes: TripType[] = ["Playa", "Ciudad", "Aventura", "Crucero"];

  const handleApplyFilters = () => {
    setAppliedDest(tempDest);
    setAppliedPrice(tempPrice);
    setAppliedTypes(tempTypes);
  };

  const filteredPackages = allPackages.filter(p => {
    const matchDest = appliedDest === "Todos los destinos" || p.destination === appliedDest;
    const matchPrice = p.price <= appliedPrice;
    const matchType = appliedTypes.includes(p.category);
    return matchDest && matchPrice && matchType;
  });

  const handleTypeChange = (type: TripType) => {
    if (tempTypes.includes(type)) {
      setTempTypes(tempTypes.filter(t => t !== type));
    } else {
      setTempTypes([...tempTypes, type]);
    }
  };

  return (
    <main className="paquetes-page">
      <Navbar />
      
      <div className="container main-layout">
        
        {/* Sidebar Filters */}
        <aside className="sidebar">
          <h2 className="sidebar-title">Filtra tu Búsqueda</h2>
          <p className="sidebar-desc">Encuentra tu próxima aventura desde Monterrey</p>

          <div className="filter-group">
            <label className="filter-label">🌍 Destino</label>
            <select 
              className="filter-select"
              value={tempDest}
              onChange={(e) => setTempDest(e.target.value)}
            >
              {destinations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">📅 Fechas</label>
            <input type="text" className="filter-input" placeholder="Seleccionar fechas" readOnly />
          </div>

          <div className="filter-group">
            <div className="flex-between">
              <label className="filter-label">💵 Presupuesto (MXN)</label>
              <span className="price-val">${tempPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="100000" 
              step="1000"
              className="price-slider"
              value={tempPrice}
              onChange={(e) => setTempPrice(Number(e.target.value))}
            />
            <div className="slider-labels">
              <span>$5,000</span>
              <span>$100,000+</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">🚀 Tipo de Viaje</label>
            <div className="checkbox-list">
              {tripTypes.map(type => (
                <label key={type} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={tempTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="apply-btn" onClick={handleApplyFilters}>
            Aplicar Filtros
          </button>
        </aside>

        {/* Content Area */}
        <div className="content">
          <nav className="breadcrumbs">Inicio &nbsp; &gt; &nbsp; Paquetes</nav>
          
          <div className="content-header">
            <div className="badge-header">🛡️ 60 YEARS OF TRUSTED EXPERIENCE</div>
            <h1 className="main-title">Paquetes Disponibles desde Monterrey</h1>
            <p className="main-desc">Descubre ofertas exclusivas y experiencias curadas diseñadas para el viajero regio.</p>
          </div>

          <div className="packages-grid">
            {filteredPackages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="card-media">
                  {pkg.badge && <div className="media-badge">{pkg.badge}</div>}
                  {/* PONER AQUÍ EL LINK DE LA IMAGEN EN EL ARRAY allPackages */}
                  <div 
                    className="placeholder-card-img"
                    style={{ backgroundImage: pkg.image ? `url(${pkg.image})` : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
                  >
                    {!pkg.image && <span>Link de imagen pendiente</span>}
                  </div>
                </div>
                <div className="card-info">
                  <div className="flex-between mb-1">
                    <h3>{pkg.title}</h3>
                    <span className="rating">⭐ {pkg.rating}</span>
                  </div>
                  <p className="card-desc">{pkg.description}</p>
                  <div className="card-footer">
                    <div className="card-price">
                      <span className="price-label">DESDE</span>
                      <span className="price-amount">${pkg.price.toLocaleString()} <small>MXN</small></span>
                    </div>
                    <button className="ver-mas-btn">Ver más</button>
                  </div>
                </div>
              </div>
            ))}

            {filteredPackages.length === 0 && (
              <div className="no-results">No se encontraron paquetes con estos filtros.</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .paquetes-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-top: 8rem;
          color: #1e293b;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 3rem;
          align-items: flex-start;
        }

        /* Sidebar */
        .sidebar {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 10rem;
        }

        .sidebar-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .sidebar-desc {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
        }

        .filter-group {
          margin-bottom: 2rem;
        }

        .filter-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #0f172a;
          margin-bottom: 0.75rem;
        }

        .filter-select, .filter-input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          font-family: inherit;
          color: #1e293b;
          background: #fff;
        }

        .price-val { font-weight: 800; font-size: 0.9rem; color: var(--primary-orange); }

        .price-slider {
          width: 100%;
          accent-color: #0f172a;
          cursor: pointer;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 0.5rem;
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          cursor: pointer;
          color: #475569;
        }

        .checkbox-item input {
          width: 1.25rem;
          height: 1.25rem;
          accent-color: var(--primary-orange);
        }

        .apply-btn {
          width: 100%;
          padding: 1.25rem;
          background: #0f172a;
          color: white;
          border-radius: 0.75rem;
          border: none;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .apply-btn:hover { background: #1e293b; transform: scale(1.02); }

        /* Content Area */
        .breadcrumbs { font-size: 0.8rem; color: #94a3b8; margin-bottom: 1.5rem; }

        .badge-header {
          display: inline-block;
          background: #e2e8f0;
          color: #475569;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          margin-bottom: 1.25rem;
        }

        .main-title {
          font-family: var(--font-playfair), serif;
          font-size: 3rem;
          color: #0f172a;
          margin: 0 0 1rem 0;
          line-height: 1.1;
        }

        .main-desc {
          font-size: 1.1rem;
          color: #64748b;
          margin-bottom: 3.5rem;
          max-width: 700px;
        }

        /* Grid */
        .packages-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .package-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: transform 0.3s ease;
        }

        .package-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

        .card-media { position: relative; height: 260px; }

        .media-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary-orange);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          z-index: 10;
        }

        .placeholder-card-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-card-img span { font-size: 0.75rem; color: #94a3b8; }

        .card-info { padding: 2rem; }

        .card-info h3 { font-size: 1.35rem; color: #0f172a; font-weight: 800; margin: 0; }

        .rating { font-size: 0.85rem; font-weight: 700; color: #f59e0b; }

        .card-desc { color: #64748b; font-size: 0.9rem; line-height: 1.5; margin: 1rem 0 2rem 0; }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid #f1f5f9;
        }

        .price-label { display: block; font-size: 0.7rem; font-weight: 800; color: #94a3b8; margin-bottom: 0.25rem; }

        .price-amount { font-size: 1.35rem; font-weight: 800; color: #0f172a; }

        .price-amount small { font-size: 0.7rem; color: #64748b; }

        .ver-mas-btn {
          background: #0f172a;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .ver-mas-btn:hover { background: #1e293b; }

        .no-results { grid-column: span 2; text-align: center; padding: 4rem; color: #94a3b8; font-style: italic; }

        .flex-between { display: flex; justify-content: space-between; align-items: center; }
        .mb-1 { margin-bottom: 0.25rem; }

        @media (max-width: 1200px) {
          .main-layout { grid-template-columns: 1fr; }
          .sidebar { position: static; margin-bottom: 2rem; }
        }

        @media (max-width: 768px) {
          .packages-grid { grid-template-columns: 1fr; }
          .main-title { font-size: 2.25rem; }
        }
      `}</style>
    </main>
  );
}
