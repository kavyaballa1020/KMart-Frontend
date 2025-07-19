import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token || userRole !== role) {
    return <Navigate to={`/login/${role.split('_')[1].toLowerCase()}`} replace />;
  }

  return children;
}

export default ProtectedRoute;
