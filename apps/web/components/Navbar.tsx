"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const lightRoutes = ["/nosotros", "/destinos", "/promociones", "/contacto"];
  const isLightPage = lightRoutes.includes(pathname);

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
      </div>

      <div className="nav-actions">
        <button className="theme-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </button>
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
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 5rem;
          background: transparent;
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--glass-border);
          transition: all 0.3s ease;
        }

        .navbar.light {
          background: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
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
          color: #1a1a1a;
          font-family: var(--font-inter), sans-serif;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: white;
          text-decoration: none;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.2s ease;
        }

        .navbar.light .nav-link {
          color: #333;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--primary-orange);
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

        .theme-toggle {
          background: none;
          border: none;
          color: white;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .navbar.light .theme-toggle {
          color: #333;
        }

        .theme-toggle:hover {
          background: var(--glass-bg);
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

        @media (max-width: 1024px) {
          .navbar { padding: 1rem 2rem; }
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
}
