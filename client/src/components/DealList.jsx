import React from "react";
import DealCard from "./DealCard";

export default function DealList({ deals }) {
  if (!deals || deals.length === 0)
    return <p style={{ color: "#666" }}>No deals posted yet.</p>;

  return (
    <div className="deal-list">
      {deals.map((deal) => (
        <DealCard key={deal._id} deal={deal} />
      ))}
    </div>
  );
}
