import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Login Components
import UserLogin from './components/pages/user/authentication/UserLogin.jsx';
import AdminLogin from './components/pages/admin/authentication/AdminLogin.jsx';
import VendorLogin from './components/pages/vendor/authentication/VendorLogin.jsx';

// Register Components
import UserRegister from './components/pages/user/authentication/UserRegister.jsx';
import AdminRegister from './components/pages/admin/authentication/AdminRegister.jsx';
import VendorRegister from './components/pages/vendor/authentication/VendorRegister.jsx';

// Dashboard Components
import UserDashboard from './components/pages/user/dashboard/UserDashboard.jsx';
import AdminDashboard from './components/pages/admin/dashboard/AdminDashboard.jsx';
import VendorDashboard from './components/pages/vendor/dashboard/VendorDashboard.jsx';

import Home from './components/Home.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import UserProfile from './components/pages/user/dashboard/UserProfile.jsx';
import VendorApproval from './components/pages/admin/dashboard/VendorApproval.jsx';
import CategoryManagement from './components/pages/admin/dashboard/CategoryManagement.jsx'; // Uncomment when ready

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Home */}
        <Route path="/" element={<Home />} />

        {/* User Routes */}
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="ROLE_USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/user/profile" element={<UserProfile />} />

        {/* Admin Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes inside Admin Dashboard */}
          <Route path="vendors" element={<VendorApproval />} />
          <Route path="categories" element={<CategoryManagement />} />
        </Route>

        {/* Vendor Routes */}
        <Route path="/login/vendor" element={<VendorLogin />} />
        <Route path="/register/vendor" element={<VendorRegister />} />
        <Route
          path="/dashboard/vendor"
          element={
            <ProtectedRoute role="ROLE_VENDOR">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
