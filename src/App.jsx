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

// Admin Subpages
import VendorApproval from './components/pages/admin/dashboard/VendorApproval.jsx';
import CategoryManagement from './components/pages/admin/dashboard/CategoryManagement.jsx';
import ProductManagement from './components/pages/admin/dashboard/ProductManagement.jsx';

// User Subpages
import UserProfile from './components/pages/user/dashboard/UserProfile.jsx';
// Other Components
import Home from './components/Home.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import LoginRoute from './components/common/LoginRoute.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import AddressPage from './components/Address/AddressPage.jsx';
import TestMap from './components/TestMap';


function App() {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login Routes */}
        <Route path="/login/user" element={<LoginRoute><UserLogin /></LoginRoute>} />
        <Route path="/login/admin" element={<LoginRoute><AdminLogin /></LoginRoute>} />
        <Route path="/login/vendor" element={<LoginRoute><VendorLogin /></LoginRoute>} />

        {/* Register Routes */}
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/vendor" element={<VendorRegister />} />

        {/* User Dashboard with Nested Routes */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute role="ROLE_USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Admin Dashboard with Nested Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="vendors" element={<VendorApproval />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="products" element={<ProductManagement />} />

        </Route>

        {/* Vendor Dashboard */}
        <Route
          path="/dashboard/vendor"
          element={
            <ProtectedRoute role="ROLE_VENDOR">
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/test-map" element={<TestMap />} />

      </Routes>
    </Router>
  );
}

export default App;
