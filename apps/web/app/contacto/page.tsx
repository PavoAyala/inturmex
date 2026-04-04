"use client";

import Navbar from "../../components/Navbar";

export default function Contacto() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Mensaje enviado con éxito! (Simulación)");
  };

  return (
    <main className="contacto-page">
      <Navbar />
      
      <section className="contacto-header">
        <div className="container">
          <div className="badge-header">PRESENCIA LOCAL</div>
          <h1 className="title">Contácto Monterrey</h1>
          <p className="description">
            60 años de excelencia y servicio presencial. Nuestra sede en Monterrey combina tradición con innovación tecnológica para su tranquilidad.
          </p>
        </div>
      </section>

      <section className="contacto-main">
        <div className="container main-grid">
          
          {/* Form Column */}
          <div className="form-column">
            <div className="contact-card">
              <h2>Envíenos un mensaje</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input type="text" placeholder="Ej. Roberto Garza" required />
                </div>
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input type="email" placeholder="ejemplo@empresa.com" required />
                </div>
                <div className="form-group">
                  <label>Asunto</label>
                  <input type="text" placeholder="¿Cómo podemos apoyarle?" required />
                </div>
                <div className="form-group">
                  <label>Mensaje</label>
                  <textarea rows={6} placeholder="Escriba los detalles de su consulta..." required></textarea>
                </div>
                <button type="submit" className="submit-btn" onClick={handleSubmit}>
                  Enviar Mensaje 
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Info Column */}
          <div className="info-column">
            <h2>Nuestra Oficina</h2>
            
            <div className="info-list">
              <div className="info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Ubicación Estratégica</h4>
                  <p>Av. Constitución 2020, Piso 12<br />Col. Obispado, Monterrey, NL<br />México, CP 64060</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Atención Directa</h4>
                  <p>+52 (81) 8300 0000<br />Lunes a Viernes: 9:00 - 18:00</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h4>Consultas Digitales</h4>
                  <p>mty.contacto@inturmex.com.mx</p>
                </div>
              </div>
            </div>

            {/* Google Maps Widget */}
            <div className="map-widget">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.666!2d-100.3465!3d25.6744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bdd3ec3a88a9%3A0xc3b8a8b8b8b8b8b8!2sAv.%20Constituci%C3%B3n%202020%2C%20El%20Obispado%2C%2064060%20Monterrey%2C%20N.L.!5e0!3m2!1sen!2smx!4v1712211234567!5m2!1sen!2smx" 
                width="100%" 
                height="300" 
                style={{ border: 0, borderRadius: '1rem' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        .contacto-page {
          background: #f8fafc;
          min-height: 100vh;
          padding-top: 8rem;
          color: #1e293b;
          font-family: var(--font-inter), sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .contacto-header {
          padding: 4rem 0;
        }

        .badge-header {
          display: inline-block;
          background: #e2e8f0;
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.4rem 1.25rem;
          border-radius: 2rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
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
          font-size: 1.2rem;
          color: #475569;
          line-height: 1.6;
        }

        .contacto-main {
          padding-bottom: 8rem;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: flex-start;
        }

        /* Form */
        .contact-card {
          background: white;
          padding: 3rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .contact-card h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #1e293b;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 1rem;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          font-family: inherit;
          font-size: 1rem;
          background: #fdfdfd;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-orange);
          background: #fff;
        }

        .submit-btn {
          width: 100%;
          background: var(--primary-orange);
          color: white;
          padding: 1.25rem;
          border-radius: 0.75rem;
          border: none;
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }

        .submit-btn:hover {
          background: var(--primary-orange-hover);
          transform: translateY(-2px);
        }

        /* Info */
        .info-column h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2.5rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        .info-item {
          display: flex;
          gap: 1.5rem;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          flex-shrink: 0;
        }

        .info-item h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .info-item p {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
        }

        .map-widget {
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0,0, 0.05);
          border: 1px solid #e2e8f0;
        }

        @media (max-width: 1024px) {
          .main-grid { grid-template-columns: 1fr; gap: 4rem; }
          .title { font-size: 3rem; }
          .contacto-page { padding-top: 6rem; }
        }
      `}</style>
    </main>
  );
}
