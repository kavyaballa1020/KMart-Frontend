import { Link, useLocation } from 'react-router-dom';
import { Users, ListOrdered, LayoutDashboard, Settings, Bell, LogOut } from 'lucide-react';
import './Sidebar.css';
import LogoutButton from '../../../common/logout';


const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/admin/vendors', icon: Users, label: 'Vendor Management' },
    { path: '/dashboard/admin/categories', icon: ListOrdered, label: 'Category Management' },
    { path: '/dashboard/admin/settings', icon: Settings, label: 'System Settings' },
    { path: '/dashboard/admin/notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">A</div>
          <h2 className="logo-text">Admin Portal</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Dashboard</span>
          {(() => {
            const { path, icon: Icon, label } = menuItems[0];
            return (
              <Link
                to={path}
                className={`nav-item ${isActive(path) ? 'active' : ''}`}
              >
                <Icon className="nav-icon" size={20} />
                <span className="nav-label">{label}</span>
              </Link>
            );
          })()}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">Management</span>
          {menuItems.slice(1, 3).map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item ${isActive(path) ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">System</span>
          {menuItems.slice(3).map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-item ${isActive(path) ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              <span className="nav-label">{label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Administrator</span>
            <span className="user-role">System Admin</span>
          </div>
        </div>
        <LogoutButton >
  <LogOut size={18} />
</LogoutButton>
      </div>
    </aside>
  );
};

export default Sidebar;