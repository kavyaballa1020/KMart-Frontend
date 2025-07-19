import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Login Components
import UserLogin from './components/login/UserLogin.jsx';
import AdminLogin from './components/login/AdminLogin.jsx';
import VendorLogin from './components/login/VendorLogin.jsx';

// Register Components
import UserRegister from './components/register/UserRegister.jsx';
import AdminRegister from './components/register/AdminRegister.jsx';
import VendorRegister from './components/register/VendorRegister.jsx';

// Dashboard Components
import UserDashboard from './components/dashboard/UserDashboard.jsx';
import AdminDashboard from './components/dashboard/AdminDashboard.jsx';
import VendorDashboard from './components/dashboard/VendorDashboard.jsx';

import Home from './components/Home.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import UserProfile from './components/profile/UserProfile.jsx';


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
        />

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
        <Route path="/dashboard/user/profile" element={<UserProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
