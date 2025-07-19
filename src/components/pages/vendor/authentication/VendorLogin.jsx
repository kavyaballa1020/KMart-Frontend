import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VendorLogin.css';

function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'ROLE_VENDOR') {
      navigate('/dashboard/vendor', { replace: true });
    }
  }, [navigate]);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:8081/api/vendor/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'ROLE_VENDOR');
      navigate('/dashboard/vendor', { replace: true });
    } catch (err) {
      alert('Invalid vendor credentials');
    }
  };

  return (
    <div className="vendor-login-container">
      <h2>Vendor Login</h2>
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

export default VendorLogin;
