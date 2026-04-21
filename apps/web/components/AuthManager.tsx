"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function AuthManager() {
  const { isModalOpen, modalType, closeModal } = useAuth();

  return (
    <AuthModal 
      isOpen={isModalOpen} 
      onClose={closeModal} 
      initialType={modalType} 
    />
  );
}
