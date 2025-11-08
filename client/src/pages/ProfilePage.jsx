import React, { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (u) {
      setUser(u);
      setDisplayName(u.displayName || u.email.split('@')[0]);
    }
  }, []);

  const save = () => {
    const updated = { ...user, displayName };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    alert('Profile saved locally (dev).');
  };

  if (!user) return <div className="card">No user found.</div>;

  return (
    <section className="page">
      <div className="page-header">
        <h1>Profile</h1>
        <p className="muted">Manage your public profile and preferences.</p>
      </div>

      <div className="card" style={{ maxWidth: 540 }}>
        <label>Email</label>
        <input value={user.email} disabled />
        <label>Display name</label>
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={save}>Save profile</button>
        </div>
      </div>
    </section>
  );
}