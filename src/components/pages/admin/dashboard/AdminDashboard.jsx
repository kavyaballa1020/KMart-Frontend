import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminDashboard.css'; // Ensure you have a CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main className="main-content">
          <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
