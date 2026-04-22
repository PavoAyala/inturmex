"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../../components/Navbar";
import Image from "next/image";
import { getCircuitoDetail } from "../../../../../src/dataconnect-generated";
import { dataconnect } from "../../../../../lib/firebase";
import { useAuth } from "../../../../../context/AuthContext";
import Link from "next/link";

interface Passenger {
  id: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  nacionalidad: string;
  numeroPasaporte: string;
  vencimientoPasaporte: string;
}

export default function PasajerosPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [circuito, setCircuito] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: crypto.randomUUID(),
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      nacionalidad: "México",
      numeroPasaporte: "",
      vencimientoPasaporte: "",
    },
  ]);

  useEffect(() => {
    if (!id) return;
    getCircuitoDetail(dataconnect, { id: id as string })
      .then((result) => {
        setCircuito(result.data.circuito);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuit info:", err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const firstPassenger = passengers[0];
    if (user && firstPassenger && firstPassenger.nombres === "" && firstPassenger.apellidos === "") {
      const nameParts = user.displayName?.split(" ") || ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      setPassengers((prev) => {
        const updated = [...prev];
        if (updated.length > 0) {
          const first = updated[0] as Passenger;
          updated[0] = {
            ...first,
            nombres: firstName,
            apellidos: lastName,
          } as Passenger;
        }
        return updated;
      });
    }
  }, [user]);

  const handleInputChange = (index: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) => {
      const updated = [...prev];
      const p = updated[index];
      if (p) {
        updated[index] = { ...p, [field]: value } as Passenger;
      }
      return updated;
    });
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      {
        id: crypto.randomUUID(),
        nombres: "",
        apellidos: "",
        fechaNacimiento: "",
        nacionalidad: "México",
        numeroPasaporte: "",
        vencimientoPasaporte: "",
      },
    ]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (!circuito) return <div className="error">Circuito no encontrado</div>;

  return (
    <main className="booking-page">
      <Navbar />
      
      <div className="container">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="step active">
            <div className="step-number">1</div>
            <div className="step-label">Datos del Viajero</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-label">Resumen y Seguro</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-label">Pago Seguro</div>
          </div>
        </div>

        <div className="layout-grid">
          <div className="content">
            <h1 className="title">Datos del Pasajero</h1>
            <p className="subtitle">
              Por favor, ingresa los datos tal como aparecen en el pasaporte para evitar inconvenientes en el abordaje.
            </p>

            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="passenger-form-card">
                <div className="form-header">
                  <div className="passenger-title">
                    <span className="icon">👤</span>
                    PASAJERO {index + 1} {index === 0 ? "(TITULAR)" : ""}
                  </div>
                  <span className="required-badge">Obligatorio</span>
                  {index > 0 && (
                    <button className="remove-btn" onClick={() => removePassenger(index)}>Eliminar</button>
                  )}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre(s)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Juan Ignacio" 
                      value={passenger.nombres}
                      onChange={(e) => handleInputChange(index, "nombres", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellidos</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Garza González" 
                      value={passenger.apellidos}
                      onChange={(e) => handleInputChange(index, "apellidos", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input 
                      type="date" 
                      value={passenger.fechaNacimiento}
                      onChange={(e) => handleInputChange(index, "fechaNacimiento", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Nacionalidad</label>
                    <select 
                      value={passenger.nacionalidad}
                      onChange={(e) => handleInputChange(index, "nacionalidad", e.target.value)}
                    >
                      <option value="México">México</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="España">España</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Argentina">Argentina</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Número de Pasaporte</label>
                    <input 
                      type="text" 
                      placeholder="Ej. G12345678" 
                      value={passenger.numeroPasaporte}
                      onChange={(e) => handleInputChange(index, "numeroPasaporte", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vencimiento del Pasaporte</label>
                    <input 
                      type="date" 
                      value={passenger.vencimientoPasaporte}
                      onChange={(e) => handleInputChange(index, "vencimientoPasaporte", e.target.value)}
                    />
                    <p className="hint">* DEBE SER MAYOR A 6 MESES DE LA FECHA DE REGRESO</p>
                  </div>
                </div>
              </div>
            ))}

            <button className="add-passenger-btn" onClick={addPassenger}>
              <span className="plus-icon">+</span> Añadir otro pasajero
            </button>

            <div className="actions">
              <Link href={`/circuitos/${id}`} className="back-link">
                 ← Regresar
              </Link>
              <button className="btn-yellow" onClick={() => router.push(`/circuitos/${id}/reservar/pago`)}>
                Continuar al Pago
              </button>
            </div>
          </div>

          <aside className="sidebar">
            <div className="summary-card">
              <div className="summary-image">
                <Image 
                  src={circuito.imagenUrl || "/images/placeholder.jpg"} 
                  alt={circuito.nombre}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized={circuito.imagenUrl?.startsWith('http')}
                />
              </div>
              <div className="summary-content">
                <div className="category-rating">
                  <span className="category-tag">CIRCUITO</span>
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                </div>
                <h3 className="summary-title">{circuito.nombre}</h3>
                <div className="summary-details">
                  <div className="detail-item">
                    <span className="icon">📅</span> 
                    <span>Prox. Salidas - {circuito.duracionDias} Días</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">📍</span> 
                    <span>{circuito.ciudades || circuito.paises}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👤</span> 
                    <span>{passengers.length} Pasajero{passengers.length > 1 ? "s" : ""}</span>
                  </div>
                </div>
                
                <div className="price-section">
                  <div className="price-row">
                    <span>Precio total</span>
                    <span className="old-price">${(circuito.precioUsd * 1.1).toLocaleString()} USD</span>
                  </div>
                  <div className="final-price">
                    <span className="amount">${circuito.precioUsd.toLocaleString()} USD</span>
                    <span className="save-tag">Ahorraste 10%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="trust-badge">
              <div className="badge-icon">🛡️</div>
              <div className="badge-text">
                <h4>60 años de confianza</h4>
                <p>Reserva protegida por Inturmex, la agencia líder en Monterrey.</p>
              </div>
            </div>

            <p className="secure-payment-info">
              🔒 PAGO 100% SEGURO & ENCRIPTADO
            </p>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .booking-page { background: #f8fafc; min-height: 100vh; padding-bottom: 5rem; color: #1e293b; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        
        /* Progress Bar */
        .progress-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
        }
        .step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #64748b;
        }
        .step.active .step-number { background: #ea580c; color: white; }
        .step-label { font-size: 0.875rem; font-weight: 600; color: #64748b; }
        .step.active .step-label { color: #ea580c; }
        .step-line { height: 2px; width: 100px; background: #e2e8f0; margin-bottom: 1.5rem; }

        /* Layout */
        .layout-grid { display: grid; grid-template-columns: 1fr 350px; gap: 3rem; }
        
        .title { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; color: #0f172a; }
        .subtitle { color: #64748b; margin-bottom: 3rem; }

        /* Form Card */
        .passenger-form-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .form-header {
          background: #0f172a;
          color: white;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .passenger-title { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; flex: 1; }
        .required-badge { background: #334155; padding: 0.25rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; }
        .remove-btn { background: #ef4444; border: none; color: white; border-radius: 0.5rem; padding: 0.25rem 0.75rem; font-size: 0.75rem; cursor: pointer; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 2rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.875rem; font-weight: 600; color: #0f172a; }
        .form-group input, .form-group select {
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          font-size: 1rem;
          background: #f8fafc;
          color: #1e293b;
        }
        .hint { font-size: 0.75rem; color: #f97316; font-weight: 600; margin-top: 0.25rem; }

        .add-passenger-btn {
          width: 100%;
          padding: 1.5rem;
          border: 2px dashed #e2e8f0;
          border-radius: 1rem;
          background: transparent;
          color: #64748b;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-passenger-btn:hover { background: #f1f5f9; border-color: #cbd5e1; color: #475569; }

        /* Sidebar */
        .summary-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        .summary-image { height: 200px; position: relative; }
        .summary-content { padding: 1.5rem; }
        .category-rating { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .category-tag { background: #f0fdfa; color: #0d9488; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }
        .summary-title { font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem; color: #0f172a; line-height: 1.4; }
        .summary-details { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
        .detail-item { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-size: 0.875rem; font-weight: 500; }
        
        .price-row { display: flex; justify-content: space-between; align-items: center; color: #64748b; font-size: 0.875rem; }
        .old-price { text-decoration: line-through; }
        .final-price { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
        .final-price .amount { font-size: 1.5rem; font-weight: 800; color: #0f172a; }
        .save-tag { background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 0.25rem; }

        .trust-badge {
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          padding: 1.5rem;
          border-radius: 1rem;
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .badge-icon { font-size: 1.5rem; }
        .badge-text h4 { font-size: 0.875rem; font-weight: 700; margin-bottom: 0.25rem; }
        .badge-text p { font-size: 0.75rem; color: #0d9488; line-height: 1.4; }

        .secure-payment-info { text-align: center; font-size: 0.75rem; color: #94a3b8; font-weight: 700; }

        /* Actions */
        .actions { margin-top: 4rem; display: flex; justify-content: space-between; align-items: center; }
        .back-link { color: #64748b; text-decoration: none; font-weight: 600; }
        @media (max-width: 1024px) {
          .layout-grid { grid-template-columns: 1fr; }
          .sidebar { order: -1; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
