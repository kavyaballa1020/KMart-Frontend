// src/components/AddressCard.jsx
import React, { useState } from "react";
import './AddressCard.css'; // Import the CSS file

const AddressCard = ({ address, onEdit, onDelete, onSetDefault, isDefault }) => {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleEdit = () => {
    onEdit();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setLoadingAction('delete');
      try {
        await onDelete();
      } catch (error) {
        console.error('Error deleting address:', error);
      } finally {
        setLoadingAction(null);
      }
    }
  };

  const handleSetDefault = async () => {
    setLoadingAction('setDefault');
    try {
      await onSetDefault();
    } catch (error) {
      console.error('Error setting default address:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className={`address-card ${isDefault ? 'default' : ''}`}>
      <div className="card-content">
        <div className="address-info">
          <h3 className="address-name">{address.fullName}</h3>
          <div className="address-details">
            <p>{address.street}</p>
            <p>{address.city}, {address.state}</p>
            <p>{address.postalCode}, {address.country}</p>
          </div>
          <div className="address-phone">{address.phone}</div>
        </div>
        
        <div className="card-actions">
          <button 
            onClick={handleEdit} 
            className="card-btn btn-edit"
            disabled={loadingAction !== null}
          >
            Edit
          </button>
          
          <button 
            onClick={handleDelete} 
            className={`card-btn btn-delete ${loadingAction === 'delete' ? 'loading' : ''}`}
            disabled={loadingAction !== null}
          >
            {loadingAction === 'delete' ? 'Deleting...' : 'Delete'}
          </button>
          
          {!isDefault ? (
            <button 
              onClick={handleSetDefault} 
              className={`card-btn btn-set-default ${loadingAction === 'setDefault' ? 'loading' : ''}`}
              disabled={loadingAction !== null}
            >
              {loadingAction === 'setDefault' ? 'Setting...' : 'Set as Default'}
            </button>
          ) : (
            <span className="default-badge">Default</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;