import React, { useContext, useState } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../auth/AuthContext";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ title: "", price: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/deals", form);
      alert("Deal posted successfully!");
      setForm({ title: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to post deal");
    }
  };

  if (!user) return <p>Please log in first.</p>;
  if (user.role !== "vendor")
    return <p>Only vendors can access this page.</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>🧑‍🍳 Post a New Deal</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Deal title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">Post Deal</button>
      </form>
    </div>
  );
}
