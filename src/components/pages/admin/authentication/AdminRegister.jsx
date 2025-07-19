import { useState } from 'react';
import axios from 'axios';
import './AdminRegister.css'; // Import the CSS file

function AdminRegister() {
  const [form, setForm] = useState({});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      await axios.post('http://localhost:8081/api/admin/register', form);
      alert('Admin registered successfully!');
    } catch (err) {
      alert('Error during admin registration');
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Admin Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input name="firstName" placeholder="First Name" onChange={handleChange} /><br />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} /><br />
      <input name="phoneNumber" placeholder="Phone" onChange={handleChange} /><br />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default AdminRegister;
