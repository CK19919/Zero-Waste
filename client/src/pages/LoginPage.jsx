 import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/config";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const user = res.data?.user || res.data;
      if (!user) throw new Error("Invalid response");
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "vendor") navigate("/dashboard");
      else navigate("/deals");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" placeholder="you@school.edu" value={form.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <div style={{ marginTop: 12, textAlign: "center" }}>
            <span className="muted">Don't have an account? </span>
            <Link to="/register" className="accent-link">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}