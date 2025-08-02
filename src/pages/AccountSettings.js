import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AccountSettings.css';

const AccountSettings = () => {
  const [user, setUser] = useState({ username: '', name: '' });
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', name: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:5001/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        setForm({
          username: res.data.username || '',
          name: res.data.name || '',
          password: ''
        });
      } catch (err) {
        setError('Failed to load account data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const update = {
        name: form.name,
        // allow user to change password only if they typed something
        ...(form.password ? { password: form.password } : {})
      };
      const res = await axios.put('http://localhost:5001/auth/me', update, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      setMessage('Profile updated successfully!');
      setEditMode(false);
      setForm(f => ({ ...f, password: '' })); // clear password field
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="account-loading">Loading account...</div>;
  if (error) return <div className="account-error">{error}</div>;

  return (
    <div className="account-settings-container">
      <h1>Account Settings</h1>
      <form onSubmit={handleSave} className="account-settings-form">
        <label>
          Username (Email)
          <input type="text" name="username" value={form.username} disabled readOnly />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Leave blank to keep current password"
            minLength={8}
          />
        </label>
        <div className="account-actions">
          {!editMode ? (
            <button type="button" onClick={() => setEditMode(true)}>Edit</button>
          ) : (
            <>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          )}
        </div>
        {message && <div className="account-success">{message}</div>}
        {error && <div className="account-error">{error}</div>}
      </form>
      <div className="account-meta">
        <p><b>User ID:</b> {user._id}</p>
      </div>
    </div>
  );
};

export default AccountSettings;
