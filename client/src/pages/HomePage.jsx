import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import DealList from "../components/DealList";

export default function HomePage() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axiosClient.get("/deals");
        setDeals(res.data);
      } catch (err) {
        console.error("Failed to fetch deals:", err);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>🎉 Student Deal Feed</h1>
      <DealList deals={deals} />
    </div>
  );
}
