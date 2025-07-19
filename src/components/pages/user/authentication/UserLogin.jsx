import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'ROLE_USER') {
      navigate('/dashboard/user', { replace: true });
    }
  }, [navigate]);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8081/api/users/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'ROLE_USER');
      navigate('/dashboard/user', { replace: true });
    } catch (err) {
      alert('Invalid user credentials');
    }
  };

  return (
    <div className="user-login-wrapper">
      <div className="user-login-card">
        <h2>User Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        <div className="user-login-footer">
          Don’t have an account? <a href="/register/user">Register</a>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
