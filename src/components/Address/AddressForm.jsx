// src/components/AddressForm.jsx
import React, { useState, useEffect } from "react";
import './AddressForm.css'; // Import the CSS file

const AddressForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!initialData) { // Only reset form for new addresses
      setForm({
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="address-form space-y-2">
      <div className="form-header">
        <h3 className="form-title">
          {initialData ? 'Edit Address' : 'Add New Address'}
        </h3>
        <p className="form-subtitle">
          {initialData ? 'Update your address information' : 'Fill in your address details below'}
        </p>
      </div>
      
      <div className="grid-cols-2 gap-4">
        <input 
          name="fullName" 
          value={form.fullName} 
          onChange={handleChange} 
          placeholder="Full Name" 
          className="input" 
          required 
        />
        <input 
          name="phone" 
          value={form.phone} 
          onChange={handleChange} 
          placeholder="Phone Number" 
          className="input" 
          type="tel" 
          required 
        />
        <input 
          name="street" 
          value={form.street} 
          onChange={handleChange} 
          placeholder="Street Address" 
          className="input" 
          required 
        />
        <input 
          name="city" 
          value={form.city} 
          onChange={handleChange} 
          placeholder="City" 
          className="input" 
          required 
        />
        <input 
          name="state" 
          value={form.state} 
          onChange={handleChange} 
          placeholder="State/Province" 
          className="input" 
          required 
        />
        <input 
          name="postalCode" 
          value={form.postalCode} 
          onChange={handleChange} 
          placeholder="Postal Code" 
          className="input" 
          required 
        />
        <input 
          name="country" 
          value={form.country} 
          onChange={handleChange} 
          placeholder="Country" 
          className="input" 
          required 
        />
      </div>
      
      <div className="flex gap-2 mt-2">
        <button type="submit" className="btn-primary">
          {initialData ? "Update" : "Add"} Address
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;