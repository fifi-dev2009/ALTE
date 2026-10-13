import { createContext, useContext, useEffect, useState } from "react";
import {loginCustomer,getMyProfile,updateCustomer, logoutCustomer,} from "../services/customerApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const currentCustomer = await getMyProfile();
      setCustomer(currentCustomer);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(customerLogin) {
    await loginCustomer(customerLogin);

    const currentCustomer = await getMyProfile();
    setCustomer(currentCustomer);
  }

  async function updateProfile(customerData) {
    const updatedCustomer = await updateCustomer(customerData);
    setCustomer(updatedCustomer);
    return updatedCustomer;
  }

  async function logout() {
    try {
      await logoutCustomer();
    } finally {
      setCustomer(null);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    customer,
    loading,
    isAuthenticated: Boolean(customer),
    login,
    updateProfile,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}