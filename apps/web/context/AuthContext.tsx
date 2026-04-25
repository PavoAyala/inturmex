"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth, dataconnect } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserById } from "../src/dataconnect-generated";

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  isModalOpen: boolean;
  modalType: "login" | "register";
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  isModalOpen: false,
  modalType: "login",
  openLogin: () => {},
  openRegister: () => {},
  closeModal: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "register">("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const { data } = await getUserById(dataconnect, { id: firebaseUser.uid });
          setRole(data.user?.role || "usuario");
        } catch (err) {
          console.error("Error fetching user role:", err);
          setRole("usuario");
        }
      } else {
        setRole(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openLogin = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  const openRegister = () => {
    setModalType("register");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      role,
      loading, 
      isModalOpen, 
      modalType, 
      openLogin, 
      openRegister, 
      closeModal 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
