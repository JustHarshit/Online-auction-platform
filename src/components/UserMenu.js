import React, { useState } from 'react';

const UserMenu = ({ user, onSignOut }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Avatar or icon */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#1976d2', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          fontWeight: 'bold', fontSize: 18,
        }}
        title="Account settings"
      >
        {user.username[0]?.toUpperCase()}
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: 45, right: 0, padding: 10,
          background: '#fff', border: '1px solid #ccc', borderRadius: 4, minWidth: 120,
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
        }}>
          <div style={{ marginBottom: 8, color: '#1976d2', fontWeight: 'bold' }}>
            {user.username}
          </div>
          <button onClick={onSignOut} style={{ width: '100%' }}>Sign Out</button>
          <button style={{ width: '100%', marginTop: 4 }}>Account Settings</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
