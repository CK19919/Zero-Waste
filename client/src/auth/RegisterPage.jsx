import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function RegisterPage() {
  const { register, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await register(form.email, form.password, form.role);
    if (ok) navigate("/");
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
        </select>
        <button disabled={loading}>Register</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
