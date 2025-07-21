import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    if (savedRole && token) {
      setRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/');
  };
  const getDashboardPath = () => {
    if (role === "ROLE_USER") return "/dashboard/user";
    if (role === "ROLE_ADMIN") return "/dashboard/admin";
    if (role === "ROLE_VENDOR") return "/dashboard/vendor";
    return "/"; // default fallback
  };
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/">
              <span className="logo-text">KMart</span>
            </Link>
          </div>

          <div className="nav-menu">
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="nav-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login/user" className="auth-btn login-btn">Login</Link>
                <Link to="/login/vendor" className="auth-btn seller-btn">Become a Seller</Link>
              </>
            ) : (
              <>
                <Link to={getDashboardPath()} className="auth-btn dashboard-btn">Account</Link>
                <button onClick={handleLogout} className="auth-btn logout-btn">Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to KMart</h1>
          <p className="hero-subtitle">Your One-Stop Shopping Destination</p>
          <p className="hero-description">
            Discover thousands of products from trusted vendors, enjoy secure shopping, 
            and experience fast delivery right to your doorstep.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="cta-btn primary">Shop Now</Link>
            <Link to="/login/vendor" className="cta-btn secondary">Start Selling</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose KMart?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h3>Wide Selection</h3>
              <p>Browse thousands of products across multiple categories from electronics to fashion</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Get your orders delivered quickly with our reliable shipping partners</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Shopping</h3>
              <p>Shop with confidence using our secure payment gateway and buyer protection</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Sell with Us</h3>
              <p>Join our marketplace as a vendor and reach millions of customers nationwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers and vendors on KMart today</p>
            <div className="cta-buttons">
              <Link to="/login/user" className="cta-btn primary">Shop as Customer</Link>
              <Link to="/login/vendor" className="cta-btn outline">Become a Vendor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>KMart</h4>
              <p>Your trusted ecommerce platform for all your shopping needs.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/categories">Categories</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>For Sellers</h4>
              <ul>
                <li><Link to="/login/vendor">Become a Seller</Link></li>
                <li><Link to="/seller-guide">Seller Guide</Link></li>
                <li><Link to="/seller-support">Support</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/returns">Returns</Link></li>
                <li><Link to="/shipping">Shipping Info</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 KMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
