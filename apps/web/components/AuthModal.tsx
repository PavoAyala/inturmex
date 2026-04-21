"use client";

import React, { useState } from "react";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "../lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, initialType = "login" }: AuthModalProps) {
  const [type, setType] = useState<"login" | "register">(initialType);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync internal type with prop
  React.useEffect(() => {
    setType(initialType);
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error en la autenticación");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(err.message || "Ocurrió un error con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>{type === "login" ? "Bienvenido de nuevo" : "Crear una cuenta"}</h2>
          <p>{type === "login" ? "Ingresa tus credenciales para continuar" : "Únete a Inturmex y planifica tu próximo viaje"}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {type === "register" && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Juan Pérez"
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="tu@email.com"
              required 
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Procesando..." : (type === "login" ? "Iniciar Sesión" : "Registrarse")}
          </button>
        </form>

        <div className="divider">
          <span>o continúa con</span>
        </div>

        <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Google
        </button>

        <div className="modal-footer">
          {type === "login" ? (
            <p>¿No tienes una cuenta? <button onClick={() => setType("register")}>Regístrate</button></p>
          ) : (
            <p>¿Ya tienes una cuenta? <button onClick={() => setType("login")}>Inicia Sesión</button></p>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          padding: 2.5rem;
          border-radius: 1.5rem;
          width: 100%;
          max-width: 450px;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: #999;
          cursor: pointer;
          line-height: 1;
        }

        .modal-header h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          font-weight: 800;
        }

        .modal-header p {
          color: #666;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }

        .error-message {
          background: #fee2e2;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          border: 1px solid #fecaca;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary-orange);
          box-shadow: 0 0 0 3px rgba(230, 138, 46, 0.1);
        }

        .submit-btn {
          width: 100%;
          background: var(--primary-orange);
          color: white;
          padding: 0.85rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: all 0.2s;
        }

        .submit-btn:hover {
          background: var(--primary-orange-hover);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1.5rem 0;
          color: #9ca3af;
          font-size: 0.85rem;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #e5e7eb;
        }

        .divider span {
          padding: 0 1rem;
        }

        .google-btn {
          width: 100%;
          background: white;
          border: 1px solid #d1d5db;
          color: #374151;
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .google-btn:hover {
          background: #f9fafb;
        }

        .google-btn img {
          width: 18px;
          height: 18px;
        }

        .modal-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: #666;
        }

        .modal-footer button {
          background: none;
          border: none;
          color: var(--primary-orange);
          font-weight: 700;
          cursor: pointer;
          padding: 0;
          font-size: 0.9rem;
        }

        .modal-footer button:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
