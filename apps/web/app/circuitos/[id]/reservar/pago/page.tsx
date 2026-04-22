"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../../../components/Navbar";
import Image from "next/image";
import { getCircuitoDetail } from "../../../../../src/dataconnect-generated";
import { dataconnect } from "../../../../../lib/firebase";
import { useAuth } from "../../../../../context/AuthContext";
import { db } from "../../../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

export default function PagoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [circuito, setCircuito] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [cardData, setCardData] = useState({
    titular: "",
    numero: "",
    vencimiento: "",
    cvv: ""
  });

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

  const handleInputChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    if (!circuito || !user) return;

    // Simulate payment processing
    setLoading(true);

    try {
      const bookingId = `ITX-CIR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Trigger Email via Firebase Extension
      // The extension watches the 'mail' collection
      await addDoc(collection(db, "mail"), {
        to: user.email,
        message: {
          subject: `Confirmación de Reserva - ${circuito.nombre}`,
          html: `
            <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
              <h2 style="color: #f97316;">¡Hola ${user.displayName || 'Viajero'}!</h2>
              <p>Tu reserva para <strong>${circuito.nombre}</strong> ha sido confirmada con éxito.</p>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #64748b;">Código de Reserva:</p>
                <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: bold; color: #0f172a;">#${bookingId}</p>
              </div>
              <p>Estamos preparando todo para tu viaje. Muy pronto uno de nuestros asesores se pondrá en contacto contigo.</p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
              <p style="font-size: 12px; color: #94a3b8; text-align: center;">Inturmex - Tu puerta al mundo</p>
            </div>
          `,
          text: `Tu reserva #${bookingId} para ${circuito.nombre} ha sido confirmada.`
        }
      });

      // Redirect to confirmation page
      router.push(`/circuitos/${id}/reservar/confirmacion?bookingId=${bookingId}`);
    } catch (err) {
      console.error("Error processing payment/email:", err);
      // Still redirect for demo purposes if it's just an extension issue, but ideally handle error
      router.push(`/circuitos/${id}/reservar/confirmacion`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Procesando Pago Seguro...</div>;

  const subtotal = circuito?.precioUsd || 0;
  const taxes = subtotal * 0.16; // Example 16% tax
  const total = subtotal + taxes;

  return (
    <main className="payment-page">
      <Navbar />
      
      <div className="container">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-step completed">
            <span className="step-icon">✓</span>
            <span className="step-label">Pasajeros</span>
          </div>
          <div className="progress-line completed"></div>
          <div className="progress-step active">
            <span className="step-number">3</span>
            <span className="step-label">Pago Seguro</span>
          </div>
        </div>

        <div className="layout-grid">
          <div className="main-content">
            <h1 className="page-title">Paso 3: Pago Seguro</h1>
            <p className="page-subtitle">Selecciona tu método de pago y finaliza tu reserva.</p>

            {/* Payment Methods */}
            <div className="payment-methods">
              <h3>Método de Pago</h3>
              <div className="method-tabs">
                <div 
                  className={`method-tab ${paymentMethod === "tarjeta" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("tarjeta")}
                >
                  <div className="icon">💳</div>
                  <span>Tarjeta</span>
                </div>
                <div 
                  className={`method-tab ${paymentMethod === "transferencia" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("transferencia")}
                >
                  <div className="icon">🏛️</div>
                  <span>Transferencia</span>
                </div>
                <div 
                  className={`method-tab ${paymentMethod === "sucursal" ? "active" : ""}`}
                  onClick={() => setPaymentMethod("sucursal")}
                >
                  <div className="icon">🏪</div>
                  <span>Sucursal</span>
                </div>
              </div>
            </div>

            {/* Card Form */}
            {paymentMethod === "tarjeta" && (
              <div className="card-form-container">
                <div className="form-header">
                  <h3>Detalles de la Tarjeta</h3>
                  <div className="card-icons">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group full">
                    <label>Nombre del Titular</label>
                    <input 
                      type="text" 
                      placeholder="Como aparece en la tarjeta"
                      value={cardData.titular}
                      onChange={(e) => handleInputChange("titular", e.target.value)}
                    />
                  </div>
                  <div className="form-group full">
                    <label>Número de Tarjeta</label>
                    <div className="input-with-icon">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000"
                        value={cardData.numero}
                        onChange={(e) => handleInputChange("numero", e.target.value)}
                      />
                      <span className="lock-icon">🔒</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Vencimiento (MM/AA)</label>
                    <input 
                      type="text" 
                      placeholder="MM/AA"
                      value={cardData.vencimiento}
                      onChange={(e) => handleInputChange("vencimiento", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input 
                      type="text" 
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                    />
                  </div>
                </div>

                <div className="trust-badge">
                  <div className="shield-icon">🛡️</div>
                  <p>Sus datos están cifrados con seguridad SSL de 256 bits y nunca se almacenan en nuestros servidores.</p>
                </div>
              </div>
            )}

            <div className="actions">
              <Link href={`/circuitos/${id}/reservar/pasajeros`} className="back-link">
                ← Regresar a Pasajeros
              </Link>
              <button 
                className="btn-yellow pay-btn"
                onClick={handlePayment}
              >
                Confirmar y Pagar ${total.toLocaleString()} MXN
              </button>
            </div>
          </div>

          <aside className="sidebar">
            <div className="summary-card">
              <h3>Resumen del Viaje</h3>
              <div className="trip-item">
                <div className="item-img">
                  {circuito.imagenUrl && (
                    <Image 
                      src={circuito.imagenUrl} 
                      alt={circuito.nombre} 
                      width={80} 
                      height={60} 
                      className="rounded"
                      unoptimized={circuito.imagenUrl?.startsWith('http')}
                    />
                  )}
                </div>
                <div className="item-info">
                  <span className="item-tag">CIRCUITO</span>
                  <p className="item-name">{circuito.nombre}</p>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()} MXN</span>
                </div>
                <div className="price-row">
                  <span>Impuestos y Tasas</span>
                  <span>${taxes.toLocaleString()} MXN</span>
                </div>
                <div className="price-row total">
                  <span>Total</span>
                  <span className="total-amount">${total.toLocaleString()} MXN</span>
                </div>
              </div>

              <div className="price-info">
                <div className="info-icon">ℹ️</div>
                <p>Precios sujetos a disponibilidad. Al pagar, aceptas nuestros Términos y Condiciones.</p>
              </div>
            </div>

            <div className="help-card">
              <h4>¿Necesitas ayuda?</h4>
              <p>Llama a nuestros asesores en Monterrey para completar tu pago.</p>
              <div className="phone">
                <span>📞</span>
                <a href="tel:8112345678">81 1234 5678</a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .payment-page { background: #f8fafc; min-height: 100vh; padding-bottom: 5rem; color: #1e293b; font-family: var(--font-inter), sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }

        /* Progress Bar */
        .progress-container { display: flex; align-items: center; justify-content: center; margin-bottom: 3rem; gap: 1rem; }
        .progress-step { display: flex; align-items: center; gap: 0.5rem; }
        .step-icon { background: #22c55e; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; }
        .step-number { background: #e2e8f0; color: #64748b; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
        .progress-step.active .step-number { background: #f97316; color: white; }
        .step-label { font-size: 14px; font-weight: 600; color: #64748b; }
        .progress-step.active .step-label { color: #f97316; }
        .progress-step.completed .step-label { color: #22c55e; }
        .progress-line { height: 2px; width: 50px; background: #e2e8f0; }
        .progress-line.completed { background: #22c55e; }

        .layout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; margin-top: 2rem; }
        
        .page-title { font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
        .page-subtitle { color: #64748b; margin-bottom: 2rem; }

        .payment-methods { background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .payment-methods h3 { font-size: 1.1rem; margin-bottom: 1.5rem; color: #0f172a; }
        .method-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        .method-tab { border: 1px solid #e2e8f0; padding: 1.5rem; border-radius: 0.75rem; text-align: center; cursor: pointer; transition: all 0.2s; }
        .method-tab:hover { border-color: #cbd5e1; background: #f8fafc; }
        .method-tab.active { border-color: #f97316; border-width: 2px; background: #fffcf9; }
        .method-tab .icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .method-tab span { font-weight: 600; color: #1e293b; }

        .card-form-container { background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .form-header h3 { font-size: 1.1rem; color: #0f172a; }
        .card-icons { display: flex; gap: 0.5rem; }
        .card-icons img { height: 24px; opacity: 0.8; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group.full { grid-column: span 2; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: #0f172a; }
        .form-group input { 
          width: 100%; 
          padding: 0.75rem 1rem; 
          border: 1px solid #e2e8f0; 
          border-radius: 0.5rem; 
          font-size: 1rem;
          color: #1e293b;
          background-color: #ffffff;
        }
        .form-group input::placeholder {
          color: #94a3b8;
        }
        .input-with-icon { position: relative; }
        .input-with-icon .lock-icon { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }

        .trust-badge { display: flex; gap: 1rem; background: #f0fdfa; padding: 1rem; border-radius: 0.5rem; border: 1px solid #ccfbf1; margin-top: 2rem; }
        .trust-badge .shield-icon { font-size: 1.5rem; }
        .trust-badge p { font-size: 13px; color: #0d9488; font-weight: 500; margin: 0; }

        .actions { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; }
        .back-link { color: #64748b; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
        .pay-btn { padding: 1.25rem 3rem !important; font-size: 1.1rem !important; }

        /* Sidebar */
        .summary-card { background: white; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1.5rem; }
        .summary-card h3 { font-size: 1.1rem; margin-bottom: 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.75rem; }
        .trip-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
        .item-img { flex-shrink: 0; }
        .rounded { border-radius: 0.5rem; }
        .item-tag { font-size: 10px; font-weight: 800; color: #f97316; letter-spacing: 0.05em; }
        .item-name { font-weight: 700; margin: 0; font-size: 0.95rem; line-height: 1.3; }

        .price-breakdown { padding-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .price-row { display: flex; justify-content: space-between; color: #64748b; font-size: 14px; }
        .price-row.total { border-top: 1px solid #f1f5f9; padding-top: 1rem; margin-top: 0.5rem; color: #0f172a; font-weight: 800; font-size: 1.1rem; }
        .total-amount { color: #f97316; }

        .price-info { display: flex; gap: 0.5rem; background: #f8fafc; padding: 0.75rem; border-radius: 0.5rem; margin-top: 1.5rem; }
        .price-info .info-icon { color: #94a3b8; font-size: 14px; }
        .price-info p { font-size: 11px; color: #64748b; margin: 0; }

        .help-card { background: #0f172a; color: white; padding: 1.5rem; border-radius: 1rem; }
        .help-card h4 { margin: 0 0 0.5rem 0; font-size: 1.1rem; }
        .help-card p { font-size: 13px; color: #94a3b8; margin-bottom: 1.5rem; }
        .phone { display: flex; align-items: center; gap: 0.75rem; font-size: 1.25rem; font-weight: 700; color: #f97316; }
        .phone a { color: inherit; text-decoration: none; }

        @media (max-width: 1024px) {
          .layout-grid { grid-template-columns: 1fr; }
          .sidebar { order: -1; }
        }
      `}</style>
    </main>
  );
}
