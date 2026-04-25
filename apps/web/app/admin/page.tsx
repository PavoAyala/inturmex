"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  getAllReservaciones, 
  deleteReservacion, 
  updateReservacion,
  listAllUsers,
  updateUserRole,
  deleteUser
} from "../../src/dataconnect-generated";
import { dataconnect } from "../../lib/firebase";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, role, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"reservations" | "users">("reservations");
  const [reservations, setReservations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  
  // Modals state
  const [editingRes, setEditingRes] = useState<any | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || role !== "admin") {
        router.push("/");
      } else {
        loadData();
      }
    }
  }, [user, role, loading, router, activeTab]);

  const loadData = async () => {
    console.log("Forcing data refresh...");
    setFetching(true);
    
    // Small artificial delay to ensure UI transition is noticeable and state clears
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      if (activeTab === "reservations") {
        setReservations([]); // Clear to force visual update
        const { data } = await getAllReservaciones(dataconnect);
        setReservations(data.reservacions);
      } else {
        setUsers([]); // Clear to force visual update
        const { data } = await listAllUsers(dataconnect);
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
      alert("Error al refrescar los datos. Por favor, intenta de nuevo.");
    } finally {
      setFetching(false);
    }
  };

  const fetchReservations = async () => {
    // This is now redundant as loadData handles it, but keeping it for the initial load
    try {
      const { data } = await getAllReservaciones(dataconnect);
      setReservations(data.reservacions);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchUsers = async () => {
    // This is now redundant as loadData handles it
    try {
      const { data } = await listAllUsers(dataconnect);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // --- ACTIONS: RESERVATIONS ---
  const handleDeleteRes = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta reservación?")) return;
    try {
      await deleteReservacion(dataconnect, { id });
      loadData();
    } catch (error) {
      alert("Error al eliminar reservación");
    }
  };

  const handleUpdateRes = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateReservacion(dataconnect, {
        id: editingRes.id,
        estatus: editingRes.estatus,
        numPersonas: parseInt(editingRes.numPersonas),
        tipoHabitacion: editingRes.tipoHabitacion,
        notas: editingRes.notas
      });
      setEditingRes(null);
      loadData();
    } catch (error) {
      alert("Error al actualizar reservación");
    } finally {
      setIsUpdating(false);
    }
  };

  // --- ACTIONS: USERS ---
  const handleDeleteUser = async (id: string) => {
    if (id === user?.uid) return alert("No puedes eliminarte a ti mismo.");
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    try {
      await deleteUser(dataconnect, { id });
      loadData();
    } catch (error) {
      alert("Error al eliminar usuario");
    }
  };

  const handleUpdateUserRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateUserRole(dataconnect, {
        id: editingUser.id,
        role: editingUser.role
      });
      setEditingUser(null);
      loadData();
    } catch (error) {
      alert("Error al actualizar rol");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || (user && role !== "admin")) {
    return <div className="loading-screen">Cargando panel...</div>;
  }

  return (
    <main className="admin-container">
      <Navbar />
      
      <div className="admin-content">
        <header className="admin-header">
          <div className="header-main">
            <h1>Panel de Administración</h1>
            <p>Gestiona reservaciones y usuarios de Inturmex</p>
          </div>
          <button className="refresh-btn" onClick={loadData} disabled={fetching}>
            <span className={fetching ? "spin" : ""}>🔄</span>
            {fetching ? "Cargando..." : "Refrescar"}
          </button>
        </header>

        {/* Tabs Interface */}
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === "reservations" ? "active" : ""}`}
            onClick={() => setActiveTab("reservations")}
          >
            📋 Reservaciones
          </button>
          <button 
            className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            👥 Usuarios
          </button>
        </div>

        {activeTab === "reservations" ? (
          <>
            <section className="stats-grid">
              <div className="stat-card">
                <h3>Total Reservaciones</h3>
                <span className="stat-value">{reservations.length}</span>
              </div>
              <div className="stat-card">
                <h3>Ingresos Totales</h3>
                <span className="stat-value">
                  ${reservations.reduce((acc, res) => acc + res.precioTotalUsd, 0).toLocaleString()} USD
                </span>
              </div>
            </section>

            <div className="table-container">
              {fetching ? (
                <div className="table-loading">Cargando...</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Usuario</th>
                      <th>Circuito</th>
                      <th>Total</th>
                      <th>Estatus</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id}>
                        <td>{new Date(res.fechaViaje).toLocaleDateString()}</td>
                        <td>
                          <div className="user-info">
                            <strong>{res.usuario?.displayName}</strong>
                            <span>{res.usuario?.email}</span>
                          </div>
                        </td>
                        <td>
                          <div className="circuit-info">
                            <strong>{res.circuito?.nombre}</strong>
                            <span>{res.paquete?.nombre || "Individual"}</span>
                          </div>
                        </td>
                        <td>${res.precioTotalUsd.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${res.estatus.toLowerCase()}`}>
                            {res.estatus}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="action-btn edit" onClick={() => setEditingRes(res)}>✏️</button>
                            <button className="action-btn delete" onClick={() => handleDeleteRes(res.id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <div className="table-container">
            {fetching ? (
              <div className="table-loading">Cargando...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>ID</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><strong>{u.displayName}</strong></td>
                      <td>{u.email}</td>
                      <td><code>{u.id.substring(0, 8)}...</code></td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role === "admin" ? "Administrador" : "Usuario"}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button className="action-btn edit" onClick={() => setEditingUser(u)}>✏️</button>
                          <button className="action-btn delete" onClick={() => handleDeleteUser(u.id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Reservation Modal */}
      {editingRes && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h2>Editar Reservación</h2>
              <button className="close-btn" onClick={() => setEditingRes(null)}>×</button>
            </div>
            <form onSubmit={handleUpdateRes}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Estatus</label>
                  <select 
                    value={editingRes.estatus} 
                    onChange={(e) => setEditingRes({...editingRes, estatus: e.target.value})}
                  >
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Personas</label>
                  <input 
                    type="number" 
                    value={editingRes.numPersonas} 
                    onChange={(e) => setEditingRes({...editingRes, numPersonas: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setEditingRes(null)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save" disabled={isUpdating}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Modal */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h2>Cambiar Rol de Usuario</h2>
              <button className="close-btn" onClick={() => setEditingUser(null)}>×</button>
            </div>
            <form onSubmit={handleUpdateUserRole}>
              <div className="form-group">
                <label>Nombre: {editingUser.displayName}</label>
                <p style={{fontSize: "0.85rem", color: "#666"}}>{editingUser.email}</p>
              </div>
              <div className="form-group" style={{marginTop: "1rem"}}>
                <label>Nuevo Rol</label>
                <select 
                  value={editingUser.role} 
                  onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setEditingUser(null)} className="btn-cancel">Cancelar</button>
                <button type="submit" className="btn-save" disabled={isUpdating}>Cambiar Rol</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .admin-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          padding-top: 6rem;
        }

        .admin-header {
          margin-bottom: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .admin-header p {
          color: #475569;
          font-size: 1.1rem;
        }

        .refresh-btn {
          background: #334155;
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .admin-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 1rem;
        }

        .tab-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          background: transparent;
          font-weight: 700;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn:hover { background: #f1f5f9; }
        .tab-btn.active {
          background: #334155;
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
          font-size: 0.9rem;
          color: #1e293b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #e68a2e;
        }

        .table-container {
          background: white;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          background: #f1f5f9;
          padding: 1.25rem 1.5rem;
          font-size: 0.85rem;
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
        }

        .admin-table td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }

        .status-badge, .role-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.confirmado { background: #d1fae5; color: #065f46; }
        .status-badge.pendiente { background: #fef3c7; color: #92400e; }
        .role-badge.admin { background: #d1fae5; color: #065f46; }
        .role-badge.usuario { background: #f1f5f9; color: #475569; }

        .actions { display: flex; gap: 0.5rem; }
        .action-btn {
          background: none;
          border: 1px solid #e2e8f0;
          padding: 0.4rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .admin-modal {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          width: 100%;
          max-width: 500px;
        }

        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }

        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group input, .form-group select { padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; }

        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .btn-cancel { padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; background: white; cursor: pointer; }
        .btn-save { padding: 0.75rem 1.5rem; border-radius: 0.5rem; background: #e68a2e; color: white; border: none; font-weight: 600; cursor: pointer; }

        .loading-screen { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-size: 1.2rem; color: #666; }
      `}</style>
    </main>
  );
}
