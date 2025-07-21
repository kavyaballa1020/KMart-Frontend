import { useNavigate } from 'react-router-dom';

function LogoutButton({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to Home page after logout
  };

  return (
    <button className="logout-btn" title="Logout" onClick={handleLogout}>
      {children || 'Logout'}
    </button>
  );
}

export default LogoutButton;
