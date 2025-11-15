// AddressPage.jsx - Formal Business Design
import React, { useEffect, useState } from "react";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../services/AddressService";
import './AddressPage.css';

// AddressForm Component
const AddressForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    type: 'home',
    isDefault: false,
    ...initialData
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      if (!initialData) {
        setFormData({
          name: '',
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          phone: '',
          type: 'home',
          isDefault: false
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-form-container">
      <div className="form-section">
        <div className="section-header">
          <h2 className="section-title">
            {initialData ? 'Edit Address Information' : 'Add New Address'}
          </h2>
          <div className="section-divider"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name <span className="required-asterisk">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                Phone Number <span className="required-asterisk">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label" htmlFor="street">
                Street Address <span className="required-asterisk">*</span>
              </label>
              <textarea
                id="street"
                name="street"
                className="form-control form-textarea"
                value={formData.street}
                onChange={handleChange}
                required
                placeholder="Enter your complete street address"
                rows="3"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="city">
                City <span className="required-asterisk">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Enter city name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="state">
                State/Province <span className="required-asterisk">*</span>
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Enter state or province"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="zipCode">
                ZIP/Postal Code <span className="required-asterisk">*</span>
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                className="form-control"
                value={formData.zipCode}
                onChange={handleChange}
                required
                placeholder="Enter ZIP or postal code"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="country">
                Country <span className="required-asterisk">*</span>
              </label>
              <select
                id="country"
                name="country"
                className="form-control form-select"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Please select your country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="MX">Mexico</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="type">
                Address Type
              </label>
              <select
                id="type"
                name="type"
                className="form-control form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="home">Home Address</option>
                <option value="work">Work Address</option>
                <option value="other">Other Address</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="checkbox-container">
              <input
                id="isDefault"
                name="isDefault"
                type="checkbox"
                className="form-checkbox"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              <label className="checkbox-label" htmlFor="isDefault">
                Set this as my default shipping address
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {initialData ? 'Updating Address...' : 'Adding Address...'}
                </>
              ) : (
                <>
                  {initialData ? 'Update Address' : 'Add Address'}
                </>
              )}
            </button>
            
            {initialData && (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// AddressCard Component
const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isDefault }) => {
  const [loading, setLoading] = useState(false);

  const handleSetDefault = async () => {
    setLoading(true);
    try {
      await onSetDefault();
    } catch (error) {
      console.error('Error setting default:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this address? This action cannot be undone.')) {
      try {
        await onDelete();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  return (
    <div className={`address-card ${isDefault ? 'default-address' : ''}`}>
      <div className="card-header">
        <div className="address-type-label">
          {(address.type || 'home').charAt(0).toUpperCase() + (address.type || 'home').slice(1)} Address
        </div>
        {isDefault && (
          <div className="default-badge">
            <span className="badge-icon">✓</span>
            Default Address
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="recipient-name">{address.name}</div>
        <div className="address-lines">
          <div className="address-line">{address.street}</div>
          <div className="address-line">
            {address.city}, {address.state} {address.zipCode}
          </div>
          <div className="address-line country">{address.country}</div>
        </div>
        <div className="contact-info">
          <span className="phone-label">Phone:</span> {address.phone}
        </div>
      </div>

      <div className="card-footer">
        <div className="action-buttons">
          <button 
            className="btn btn-outline btn-sm"
            onClick={onEdit}
            title="Edit this address"
          >
            Edit Address
          </button>
          
          {!isDefault && (
            <button 
              className="btn btn-outline btn-sm"
              onClick={handleSetDefault}
              disabled={loading}
              title="Set as default shipping address"
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Make Default'
              )}
            </button>
          )}
          
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            title="Delete this address permanently"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyAddressState = () => (
  <div className="empty-state">
    <div className="empty-icon">📍</div>
    <h3 className="empty-title">No Addresses Found</h3>
    <p className="empty-description">
      You haven't added any shipping addresses yet. Please add an address above to manage your delivery locations.
    </p>
  </div>
);

// Loading State Component
const LoadingAddresses = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p className="loading-text">Loading your saved addresses...</p>
  </div>
);

// Main AddressPage Component
const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAddresses();
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setError("Unable to load your addresses. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = async (address) => {
    try {
      await addAddress(address);
      await fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };

  const handleUpdate = async (id, address) => {
    try {
      await updateAddress(id, address);
      await fetchAddresses();
      setEditing(null);
    } catch (error) {
      console.error("Error updating address:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);
      await fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      await fetchAddresses();
    } catch (error) {
      console.error("Error setting default address:", error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="address-page">
        <div className="page-header">
          <h1 className="page-title">Address Management</h1>
          <p className="page-subtitle">Manage your shipping and billing addresses</p>
        </div>
        <LoadingAddresses />
      </div>
    );
  }

  if (error) {
    return (
      <div className="address-page">
        <div className="page-header">
          <h1 className="page-title">Address Management</h1>
          <p className="page-subtitle">Manage your shipping and billing addresses</p>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Error Loading Addresses</h3>
          <p className="error-message">{error}</p>
          <button 
            className="btn btn-primary"
            onClick={fetchAddresses}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="address-page">
      <div className="page-header">
        <h1 className="page-title">Address Management</h1>
        <p className="page-subtitle">Manage your shipping and billing addresses securely</p>
      </div>

      <AddressForm
        onSubmit={editing ? (data) => handleUpdate(editing.id, data) : handleAdd}
        initialData={editing}
        onCancel={() => setEditing(null)}
      />

      <div className="addresses-section">
        <div className="section-header">
          <h2 className="section-title">
            Your Saved Addresses {addresses.length > 0 && `(${addresses.length})`}
          </h2>
          <div className="section-divider"></div>
        </div>

        {addresses.length === 0 ? (
          <EmptyAddressState />
        ) : (
          <div className="addresses-list">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={() => setEditing(address)}
                onDelete={() => handleDelete(address.id)}
                onSetDefault={() => handleSetDefault(address.id)}
                isDefault={address.defaultAddress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressPage;