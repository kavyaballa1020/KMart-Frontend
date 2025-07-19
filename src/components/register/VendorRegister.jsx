import { useState } from 'react';
import axios from 'axios';
import './VendorRegister.css'; // Import CSS here

function VendorRegister() {
  const [form, setForm] = useState({});

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      await axios.post('http://localhost:8081/api/vendor/register', form);
      alert('Vendor registered successfully!');
    } catch (err) {
      alert('Error during vendor registration');
    }
  };

  return (
    <div className="vendor-register-container">
      <h2>Vendor Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <input name="companyName" placeholder="Company Name" onChange={handleChange} /><br />
      <input name="phoneNumber" placeholder="Phone" onChange={handleChange} /><br />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default VendorRegister;
