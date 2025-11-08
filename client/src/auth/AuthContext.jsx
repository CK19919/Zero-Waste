import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      alert("Login failed. Please check credentials.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, role) => {
    setLoading(true);
    try {
      const res = await axiosClient.post("/auth/register", {
        email,
        password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      alert("Registration failed. Try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally verify token or skip (simpler for hackathon)
      setUser({ email: "user@demo", role: "vendor" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
