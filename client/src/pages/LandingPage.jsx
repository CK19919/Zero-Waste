import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <section className="page">
      <div className="page-header">
        <h1>Welcome to DealSphere</h1>
        <p className="muted">
          The ultimate platform for student deals and campus offers
        </p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/deals" className="btn" style={{ width: 'auto', display: 'inline-block' }}>
            Explore Deals
          </Link>
        </div>
      </div>
    </section>
  );
}