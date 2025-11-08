import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/config";

export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await api.get("/deals");
        setDeals(res.data || []);
      } catch (err) {
        console.error("Error fetching deals:", err?.response || err.message);
        setError('Unable to load deals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeals();
  }, []);

  const getVendorDisplayName = (vendorId) => {
    if (!vendorId) return "Anonymous Vendor";
    if (vendorId === "demo-vendor") return "Demo Vendor";
    return vendorId.split('@')[0] || "Vendor";
  };

  const handlePostDeal = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user && user.role === 'vendor') {
      navigate('/dashboard');
    } else {
      navigate('/register');
    }
  };

  return (
    <section className="page">
      <div className="page-header">
        <h1>Student Deal Feed</h1>
        <p className="muted">
          Discover amazing campus deals and exclusive student offers
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="card loading">
          <div className="loading-spinner"></div>
          <p className="text-center">Loading amazing deals...</p>
        </div>
      ) : deals.length === 0 ? (
        <div className="empty-state">
          <h3>No deals available yet</h3>
          <p className="muted">Be the first to post an amazing deal!</p>
          <button 
            className="btn-ghost mt-3" 
            onClick={handlePostDeal}
          >
            Post First Deal
          </button>
        </div>
      ) : (
        <>
          <div className="deals-stats">
            <p className="muted">
              Showing <strong>{deals.length}</strong> amazing deal{deals.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="deal-grid">
            {deals.map((deal) => (
              <article className="deal-card" key={deal.id || deal._id}>
                <div className="deal-badge">🔥 Hot Deal</div>
                <h3>{deal.title}</h3>
                {deal.description && (
                  <p className="deal-description">{deal.description}</p>
                )}
                <div className="price">₹{deal.price}</div>
                <div className="meta">
                  <span>👤 {getVendorDisplayName(deal.vendorId)}</span>
                  <span>🕒 Just now</span>
                </div>
                <button className="btn-deal">View Deal</button>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}