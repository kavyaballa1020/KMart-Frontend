import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VendorLogin.css';

function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role === 'ROLE_VENDOR') {
      navigate('/dashboard/vendor', { replace: true });
    }
  }, [navigate]);

  const login = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="vendor-login-wrapper">
      <div className="vendor-login-container">
        <div className="vendor-login-card">
          <div className="vendor-login-header">
            <div className="vendor-login-icon">
              <svg viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="vendor-login-title">Vendor Portal</h2>
            <p className="vendor-login-subtitle">Welcome back, please sign in</p>
          </div>

          <div className="vendor-login-content">
            <div className="vendor-login-fields">
              <div className="vendor-field-group">
                <label className="vendor-field-label">Email Address</label>
                <div className="vendor-input-container">
                  <svg className="vendor-input-icon" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="email"
                    className="vendor-login-input"
                    placeholder="vendor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>

              <div className="vendor-field-group">
                <label className="vendor-field-label">Password</label>
                <div className="vendor-input-container">
                  <svg className="vendor-input-icon" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    className="vendor-login-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>

            <button
  className="vendor-login-button"
  onClick={login}
  disabled={isLoading || !email || !password}
>
  {isLoading ? 'Signing In...' : 'Sign In to Dashboard'}
</button>


            <div className="vendor-login-footer">
              <p className="vendor-footer-text">For issues, contact your system administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorLogin;
