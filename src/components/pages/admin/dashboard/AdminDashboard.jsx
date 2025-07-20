import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Sidebar.css'; // Make sure to import the CSS

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;