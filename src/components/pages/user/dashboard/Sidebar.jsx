import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ListOrdered,
  Settings,
  Bell,
  LogOut,
  User,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import LogoutButton from '../../../common/logout';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard/user', label: 'Dashboard', icon: <LayoutDashboard size={20} />, exact: true },
    { path: '/dashboard/user/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/dashboard/user/orders', label: 'Orders', icon: <ListOrdered size={20} /> },
    { path: '/dashboard/user/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/dashboard/user/users', label: 'Users', icon: <Users size={20} /> },
    { path: '/dashboard/user/notifications', label: 'Notifications', icon: <Bell size={20} /> }
  ];

  const isActive = (path, exact = false) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="sidebar-title">User Panel</h1>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <ul className="nav-list">
            {menuItems.map(item => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                >
                  <div className="link-content">
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                  </div>
                  {isActive(item.path, item.exact) && (
                    <ChevronRight size={16} className="active-indicator" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <div className="sidebar-footer">
              
        <span className="logout-text">LogOut</span>
        <LogoutButton className="logout-btn">
          <LogOut size={18} />
        </LogoutButton>
      </div>
    </aside>
  );
}

export default Sidebar;