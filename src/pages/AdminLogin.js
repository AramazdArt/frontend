import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../auth';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <h1 className="admin-login__title">Admin</h1>
        <p className="admin-login__sub">Aramazd</p>
        <form onSubmit={handleSubmit}>
          <div className="admin-login__field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="admin-login__field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="admin-login__error">{error}</p>}
          <button type="submit" className="admin-login__btn">Sign In</button>
        </form>
        <Link to="/" className="admin-login__back">← Back to site</Link>
      </div>
    </div>
  );
}

export default AdminLogin;
