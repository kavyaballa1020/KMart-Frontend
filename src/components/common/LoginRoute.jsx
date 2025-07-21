// src/components/common/LoginRoute.jsx
import { Navigate } from 'react-router-dom';

function LoginRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token && role === 'ROLE_ADMIN') {
    return <Navigate to="/dashboard/admin" />;
  }
  if (token && role === 'ROLE_USER') {
    return <Navigate to="/dashboard/user" />;
  }
  if (token && role === 'ROLE_VENDOR') {
    return <Navigate to="/dashboard/vendor" />;
  }

  return children;
}

export default LoginRoute;
