import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMenu.css'; // Create this file for the styles

const UserMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  
  // Handle click outside to close the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };
  
  const handleAccountSettings = () => {
    navigate('/account-settings');
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <div 
        className="user-avatar"
        onClick={() => setOpen(!open)}
        title="Account settings"
      >
        {user?.username?.[0]?.toUpperCase() || 'U'}
      </div>
      
      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <span className="username">{user?.username}</span>
          </div>
          <hr className="menu-divider" />
          <button className="menu-button" onClick={handleAccountSettings}>
            Account Settings
          </button>
          <button className="menu-button sign-out" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
