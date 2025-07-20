import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserLogin.css';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="user-login-wrapper">
      <div className="user-login-card">
        {/* Left Side - Image Illustration */}
        <div className="user-login-left">
          <div className="user-login-illustration">
            <img
              src="/assets/x.jpeg"
              alt="Secure Login"
              className="user-login-illustration-img"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="user-login-right">
          <div className="user-login-form">
            <div className="user-login-logo">
              {/* <h1>YourApp</h1> */}
            </div>

            <h2 className="user-login-title">Welcome back</h2>
            <p className="user-login-subtitle">
              Don't have an account? <a href="/register/user">Sign up for free</a>
            </p>

            <div className="user-login-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="user-login-input-group">
              <label htmlFor="password">Password</label>
              <div className="user-login-password-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="user-login-password-input"
                />
                <button
                  type="button"
                  className="user-login-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="eye-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.639 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.639 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="user-login-remember">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={e => setRememberDevice(e.target.checked)}
              />
              <label htmlFor="remember">Keep me signed in</label>
            </div>

            <button className="user-login-btn" onClick={login}>
              Sign In
            </button>

            <div className="user-login-forgot">
              <a href="/forgot-password">Forgot your password?</a>
            </div>

            <div className="user-login-footer">
              By signing in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
