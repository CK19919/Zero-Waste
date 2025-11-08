import React from "react";

export default function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <h3>{deal.title}</h3>
      <p> Price: ₹{deal.price}</p>
      <small>Vendor ID: {deal.vendorId}</small>
    </div>
  );
}
