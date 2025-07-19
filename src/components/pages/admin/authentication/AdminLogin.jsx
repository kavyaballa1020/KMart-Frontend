import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'ROLE_ADMIN') {
      navigate('/dashboard/admin', { replace: true });
    }
  }, [navigate]);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8081/api/admin/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'ROLE_ADMIN');
      navigate('/dashboard/admin', { replace: true });
    } catch (err) {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default AdminLogin;
