import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to KMart Authentication Portal 🛒</h1>
      <p>Choose your role:</p>
      <ul>
        <li><Link to="/login/user">Login as User</Link></li>
        <li><Link to="/login/admin">Login as Admin</Link></li>
        <li><Link to="/login/vendor">Login as Vendor</Link></li>
      </ul>
    </div>
  );
}

export default Home;
