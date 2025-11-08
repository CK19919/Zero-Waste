import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./index.css"; // keep import so CSS definitely loads

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand nav-link">ZeroGhost</Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/deals" className="nav-link">Deals</Link>
          <Link to="/dashboard" className="nav-link">Vendor Dashboard</Link>
          {!user && <Link to="/login" className="nav-link">Login</Link>}
          {!user && <Link to="/register" className="nav-link">Register</Link>}
          {user && <Link to="/profile" className="nav-link">Profile</Link>}
        </nav>

        <div className="nav-right">
          {user ? (
            <>
              <div className="user-chip" title={user.email}>{user.email}</div>
              <button className="btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  // App is layout only — actual routes are provided by your router (RouterProvider)
  return (
    <>
      <Navbar />
      <main className="page">
        <Outlet />
      </main>
    </>
  );
}