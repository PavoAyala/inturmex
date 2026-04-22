"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { getDestinos, getCircuitos } from "../../../src/dataconnect-generated";
import { dataconnect } from "../../../lib/firebase";

export default function DestinoDetail() {
  const { id } = useParams();
  const [destino, setDestino] = useState<any>(null);
  const [circuitos, setCircuitos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minDays, setMinDays] = useState(1);
  const [maxDays, setMaxDays] = useState(30);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [destRes, circRes] = await Promise.all([
          getDestinos(dataconnect),
          getCircuitos(dataconnect, { destinoId: id as string })
        ]);

        if (destRes.data.destinos) {
          const foundDest = destRes.data.destinos.find(d => d.id === id);
          if (foundDest) {
            setDestino(foundDest);
          }
        }

        if (circRes.data.circuitos) {
          setCircuitos(circRes.data.circuitos);
          
          // Initialize price range based on data
          if (circRes.data.circuitos.length > 0) {
            const prices = circRes.data.circuitos.map(c => c.precioUsd);
            const days = circRes.data.circuitos.map(c => c.duracionDias);
            setMinPrice(Math.min(...prices));
            setMaxPrice(Math.max(...prices));
            setMinDays(Math.min(...days));
            setMaxDays(Math.max(...days));
          }
        }
      } catch (err) {
        console.error("Error fetching destination data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Derived filter options
  const allCountries = useMemo(() => {
    const countries = new Set<string>();
    circuitos.forEach(c => {
      if (c.paises) {
        c.paises.split(',').forEach((p: string) => countries.add(p.trim()));
      }
    });
    return Array.from(countries).sort();
  }, [circuitos]);

  // Filtered Circuitos
  const filteredCircuitos = useMemo(() => {
    return circuitos.filter(c => {
      const priceMatch = c.precioUsd >= minPrice && c.precioUsd <= maxPrice;
      const daysMatch = c.duracionDias >= minDays && c.duracionDias <= maxDays;
      const countryMatch = selectedCountries.length === 0 || 
        (c.paises && c.paises.split(',').some((p: string) => selectedCountries.includes(p.trim())));
      
      return priceMatch && daysMatch && countryMatch;
    });
  }, [circuitos, minPrice, maxPrice, minDays, maxDays, selectedCountries]);

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const clearFilters = () => {
    const prices = circuitos.map(c => c.precioUsd);
    const days = circuitos.map(c => c.duracionDias);
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
    setMinDays(Math.min(...days));
    setMaxDays(Math.max(...days));
    setSelectedCountries([]);
  };

  if (loading) return <div className="loading-state">Cargando experiencias...</div>;
  if (!destino) return <div className="error-state">Destino no encontrado.</div>;

  return (
    <main className="destino-detail-page">
      <Navbar />
      
      <header className="detail-header" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${destino.imagenUrl || '/images/hero-bg.png'})` }}>
        <div className="container">
          <h1 className="dest-name">{destino.nombre}</h1>
          <div className="header-divider"></div>
        </div>
      </header>

      <section className="content-section">
        <div className="container grid-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-group">
              <h3 className="filter-title">Rango de precio:</h3>
              <div className="range-controls">
                <div className="range-labels">
                  <span>Min: ${minPrice}</span>
                  <span>Max: ${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min={Math.min(...circuitos.map(c => c.precioUsd), 0)} 
                  max={Math.max(...circuitos.map(c => c.precioUsd), 10000)} 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="accent-range"
                />
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Rango de días:</h3>
              <div className="range-controls">
                <div className="range-labels">
                  <span>Min: {minDays} días</span>
                  <span>Max: {maxDays} días</span>
                </div>
                <input 
                  type="range" 
                  min={Math.min(...circuitos.map(c => c.duracionDias), 1)} 
                  max={Math.max(...circuitos.map(c => c.duracionDias), 30)} 
                  value={maxDays}
                  onChange={(e) => setMaxDays(Number(e.target.value))}
                  className="accent-range"
                />
              </div>
            </div>

            <div className="filter-group">
              <h3 className="filter-title">Filtrar por país:</h3>
              <div className="checkbox-grid">
                {allCountries.map(country => (
                  <label key={country} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedCountries.includes(country)}
                      onChange={() => toggleCountry(country)}
                    />
                    <span className="checkmark"></span>
                    <span className="label-text">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-clear" onClick={clearFilters}>Limpiar filtros</button>
          </aside>

          {/* Circuits List */}
          <div className="circuits-list-container">
            <div className="results-count">
              {filteredCircuitos.length} paquetes encontrados
            </div>

            <div className="circuits-table">
              <div className="table-header">
                <div className="col-pkg">Paquete</div>
                <div className="col-dur">Duración</div>
                <div className="col-cities">Ciudades Visitadas</div>
                <div className="col-price">Precio</div>
                <div className="col-action"></div>
              </div>

              {filteredCircuitos.map((circ) => (
                <div key={circ.id} className="table-row">
                  <div className="col-pkg">
                    <Link href={`/circuitos/${circ.id}`} className="pkg-link">
                      <span className="pkg-id">MT-{circ.id.split('-')[0].toUpperCase()}</span>
                      <span className="pkg-name">{circ.nombre}</span>
                    </Link>
                  </div>
                  <div className="col-dur">
                    <span className="dur-badge">{circ.duracionDias} Días</span>
                  </div>
                  <div className="col-cities">
                    <p className="cities-text">
                      {circ.ciudades || circ.paises}
                    </p>
                  </div>
                  <div className="col-price">
                    <div className="price-box">
                      <span className="amount">${circ.precioUsd.toLocaleString()} USD</span>
                      <span className="taxes">+ {circ.impuestosUsd} IMP</span>
                    </div>
                  </div>
                  <div className="col-action">
                    <Link href={`/circuitos/${circ.id}/reservar/pasajeros`} className="btn-book">
                      Reservar
                    </Link>
                  </div>
                </div>
              ))}

              {filteredCircuitos.length === 0 && (
                <div className="no-results">
                  No se encontraron circuitos con estos filtros.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .destino-detail-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-bottom: 10rem;
          color: #0f172a;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Header */
        .detail-header {
          height: 400px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin-bottom: 4rem;
          border-bottom: 8px solid #f97316;
        }

        .dest-name {
          font-size: 5rem;
          font-weight: 950;
          color: white;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: 0.1em;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .header-divider {
          width: 80px;
          height: 4px;
          background: white;
          margin: 1.5rem auto 0;
        }

        /* Layout */
        .grid-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Sidebar Filters */
        .filters-sidebar {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          position: sticky;
          top: 6rem;
        }

        .filter-group {
          margin-bottom: 2.5rem;
        }

        .filter-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #64748b;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .accent-range {
          width: 100%;
          accent-color: #f97316;
          cursor: pointer;
        }

        .checkbox-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          max-height: 250px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          transition: color 0.2s;
        }

        .checkbox-item:hover { color: #f97316; }

        .btn-clear {
          width: 100%;
          background: #f1f5f9;
          color: #64748b;
          border: none;
          padding: 1rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-clear:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        /* Results List */
        .results-count {
          font-size: 0.9rem;
          font-weight: 800;
          color: #64748b;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .circuits-table {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .table-header {
          background: #0f172a;
          color: white;
          padding: 1.25rem 2rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 2fr 1fr 1fr;
          gap: 1.5rem;
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .table-row {
          padding: 2rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 2fr 1fr 1fr;
          gap: 1.5rem;
          align-items: center;
          border-bottom: 1px solid #f1f5f9;
          transition: background 0.2s;
        }

        .table-row:hover { background: #f8fafc; }

        .pkg-link {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-decoration: none;
        }

        .pkg-id {
          font-size: 0.75rem;
          color: #f97316;
          font-weight: 800;
        }

        .pkg-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.3;
        }

        .dur-badge {
          background: #eff6ff;
          color: #2563eb;
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          font-weight: 800;
        }

        .cities-text {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .price-box {
          display: flex;
          flex-direction: column;
        }

        .amount {
          font-size: 1.25rem;
          font-weight: 900;
          color: #0f172a;
        }

        .taxes {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 700;
        }

        .btn-book {
          background: #facc15;
          color: #0f172a;
          text-decoration: none;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 800;
          font-size: 0.9rem;
          text-align: center;
          transition: all 0.2s;
          display: block;
        }

        .btn-book:hover {
          background: #eab308;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(234, 179, 8, 0.3);
        }

        .no-results {
          padding: 4rem;
          text-align: center;
          color: #64748b;
          font-weight: 600;
        }

        .loading-state, .error-state {
          padding: 10rem 2rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: #64748b;
        }

        @media (max-width: 1024px) {
          .grid-layout { grid-template-columns: 1fr; }
          .filters-sidebar { position: static; }
          .table-header { display: none; }
          .table-row { 
            grid-template-columns: 1fr 1fr; 
            gap: 1.5rem;
            padding: 1.5rem;
          }
          .col-cities { grid-column: span 2; }
          .dest-name { font-size: 3rem; }
        }

        @media (max-width: 640px) {
          .table-row { grid-template-columns: 1fr; }
          .col-cities { grid-column: span 1; }
        }
      `}</style>
    </main>
  );
}
