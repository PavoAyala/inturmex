"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signOutUser } from "../lib/auth";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const pathname = usePathname();
  const { user, role, loading, openLogin, openRegister } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const lightRoutes = ["/nosotros", "/destinos", "/promociones", "/contacto", "/circuitos", "/admin"];
  const isLightPage = lightRoutes.some(route => pathname.startsWith(route));

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Destinos", href: "/destinos" },
    { name: "Circuitos", href: "/circuitos" },
    { name: "Promociones", href: "/promociones" },
    { name: "Paquetes", href: "/paquetes" },
    { name: "Contacto", href: "/contacto" },
  ];


  return (
    <nav className={`navbar ${isLightPage ? "light" : ""}`}>
      <div className="logo-container">
        <Link href="/" className="logo-link">
          <Image 
            src="/images/logo.png" 
            alt="Inturmex Logo" 
            width={40} 
            height={40} 
            className="logo-img"
          />
          {isLightPage && <span className="logo-text">Inturmex</span>}
        </Link>
      </div>

      <div className="nav-links">
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`nav-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.name}
          </Link>
        ))}
        {role === "admin" && (
          <Link 
            href="/admin" 
            className={`nav-link admin-link ${pathname === "/admin" ? "active" : ""}`}
          >
            Admin
          </Link>
        )}
      </div>

      <div className="nav-actions">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : user ? (
          <div className="user-profile-container">
            <button className="user-btn" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} />
                ) : (
                  <span>{user.displayName?.charAt(0) || user.email?.charAt(0)}</span>
                )}
              </div>
              <span className="user-name">{user.displayName?.split(' ')[0]}</span>
            </button>
            
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <strong>{user.displayName}</strong>
                  <span>{user.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <Link href="/perfil" className="dropdown-item">Mi Perfil</Link>
                <Link href="/reservas" className="dropdown-item">Mis Reservas</Link>
                <div className="dropdown-divider"></div>
                <button onClick={() => signOutUser()} className="dropdown-item logout">Cerrar Sesión</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => openLogin()}>Login</button>
            <button className="register-btn" onClick={() => openRegister()}>Registro</button>
          </div>
        )}

        <button className="checkout-btn">
          Check Out
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>


      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001; /* Higher z-index for admin */
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 5rem;
          background: transparent;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--glass-border);
          transition: all 0.3s ease;
          --nav-text-color: #ffffff;
        }

        .navbar.light {
          background: #ffffff !important;
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          --nav-text-color: #0f172a;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .logo-img {
          border-radius: 0.5rem;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--nav-text-color);
          font-family: var(--font-inter), sans-serif;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--nav-text-color) !important;
          text-decoration: none;
          position: relative;
          padding: 0.5rem 0;
          transition: all 0.2s ease;
        }

        .navbar.light .nav-link {
          color: #0f172a !important;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary-orange) !important;
        }

        .admin-link {
          background: rgba(230, 138, 46, 0.1);
          padding: 0.25rem 0.75rem !important;
          border-radius: 0.5rem;
          border: 1px solid rgba(230, 138, 46, 0.2);
          animation: adminPulse 2s infinite;
        }

        @keyframes adminPulse {
          0% { box-shadow: 0 0 0 0 rgba(230, 138, 46, 0.2); }
          70% { box-shadow: 0 0 0 10px rgba(230, 138, 46, 0); }
          100% { box-shadow: 0 0 0 0 rgba(230, 138, 46, 0); }
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--primary-orange);
          border-radius: 2px;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .login-btn {
          background: none;
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s;
        }

        .navbar.light .login-btn {
          color: #0f172a;
        }

        .login-btn:hover {
          color: var(--primary-orange);
        }

        .register-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 2rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .navbar.light .register-btn {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #1a1a1a;
        }

        .register-btn:hover {
          background: var(--primary-orange);
          border-color: var(--primary-orange);
          color: white;
        }

        .user-profile-container {
          position: relative;
        }

        .user-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          color: white;
        }

        .navbar.light .user-btn {
          color: #0f172a;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: var(--primary-orange);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          overflow: hidden;
          color: white;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 1rem);
          right: 0;
          background: white;
          width: 220px;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 0;
          animation: slideDown 0.2s ease;
          border: 1px solid #eee;
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .dropdown-header {
          padding: 0.75rem 1.25rem;
          display: flex;
          flex-direction: column;
        }

        .dropdown-header strong {
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        .dropdown-header span {
          color: #666;
          font-size: 0.75rem;
        }

        .dropdown-divider {
          height: 1px;
          background: #f0f0f0;
          margin: 0.5rem 0;
        }

        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0.65rem 1.25rem;
          text-align: left;
          background: none;
          border: none;
          font-size: 0.85rem;
          color: #444;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .dropdown-item:hover {
          background: #f9f9f9;
          color: var(--primary-orange);
        }

        .dropdown-item.logout {
          color: #dc2626;
        }

        .dropdown-item.logout:hover {
          background: #fef2f2;
          color: #dc2626;
        }

        .checkout-btn {
          background: var(--primary-orange);
          color: white;
          padding: 0.75rem 1.75rem;
          border-radius: 2rem;
          border: none;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(230, 138, 46, 0.2);
          transition: all 0.3s ease;
        }

        .checkout-btn:hover {
          background: var(--primary-orange-hover);
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(230, 138, 46, 0.3);
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .navbar.light .loading-spinner {
          border-color: rgba(0, 0, 0, 0.1);
          border-top-color: var(--primary-orange);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .navbar { padding: 1rem 2rem; }
          .nav-links { display: flex; gap: 1rem; }
          .nav-link { font-size: 0.85rem; }
          .auth-buttons { display: none; }
        }
      `}</style>
    </nav>
  );
}
