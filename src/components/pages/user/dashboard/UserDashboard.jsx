import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './UserDashboard.css';

function UserDashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
