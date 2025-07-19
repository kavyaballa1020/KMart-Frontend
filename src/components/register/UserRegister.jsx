import { useState } from 'react';
import axios from 'axios';
import './UserRegister.css'; // Import external CSS

function UserRegister() {
  const [form, setForm] = useState({});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      await axios.post('http://localhost:8081/api/users/register', form);
      alert('User registered successfully!');
    } catch (err) {
      alert('Error during registration');
    }
  };

  return (
    <div className="user-register-container">
      <h2>User Register</h2>
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

export default UserRegister;
