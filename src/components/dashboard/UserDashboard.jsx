import { Link } from 'react-router-dom';
import './UserDashboard.css'; // ✅ Import the CSS

function UserDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to User Dashboard</h1>
      <Link to="/dashboard/user/profile">
        <button>View Profile</button>
      </Link>
      <br />
    </div>
  );
}

export default UserDashboard;
