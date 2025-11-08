import React, { useState } from "react";
import api from "../api/config";

export default function DashboardPage() {
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login as vendor.");
    setLoading(true);
    try {
      const payload = { ...form, vendorId: user.email, vendorName: user.email.split("@")[0] };
      await api.post("/deals", payload);
      alert("Deal posted (dev). Refresh to see it.");
      setForm({ title: "", price: "", description: "" });
    } catch (err) {
      console.error("Post deal error", err?.response || err?.message);
      alert("Failed to post deal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="section dashboard-header">
        <div>
          <h2 className="section-title">Vendor Dashboard</h2>
          <p className="muted">Post deals quickly for students to see.</p>
        </div>
      </div>

      <div className="section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input name="price" value={form.price} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} />
          </div>

          <div className="deal-actions">
            <button className="btn" disabled={loading}>{loading ? "Posting..." : "Post Deal"}</button>
            <button type="button" className="btn-ghost" onClick={() => setForm({ title: "", price: "", description: "" })}>Clear</button>
          </div>
        </form>
      </div>
    </section>
  );
}
