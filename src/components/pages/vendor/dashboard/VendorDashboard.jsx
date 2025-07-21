import { Link } from 'react-router-dom';
import LogoutButton from '../../../common/logout';
import { Users, ListOrdered, LayoutDashboard, Settings, Bell, LogOut } from 'lucide-react';


function VendorDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Vendor Dashboard</h1>

      <div className="dashboard-links">
        <Link to="/dashboard/vendor/products">
          <button>Manage Products</button>
        </Link>

        <Link to="/dashboard/vendor/orders">
          <button>View Orders</button>
        </Link>
      </div>

<LogoutButton >
  <LogOut size={18} />LogOut
</LogoutButton>    </div>
  );
}

export default VendorDashboard;
