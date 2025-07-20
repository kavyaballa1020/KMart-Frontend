import { useEffect, useState } from 'react';
import axios from 'axios';
import './VendorApproval.css';


function VendorApproval() {
  const [pendingVendors, setPendingVendors] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const fetchPendingVendors = async () => {
    try {
      const res = await axios.get('http://localhost:8081/api/admin/vendors/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingVendors(res.data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const approveVendor = async (id) => {
    try {
      await axios.post(`http://localhost:8081/api/admin/vendors/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingVendors();
    } catch (err) {
      alert('Error approving vendor');
    }
  };

  const rejectVendor = async (id) => {
    try {
      await axios.post(`http://localhost:8081/api/admin/vendors/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingVendors();
    } catch (err) {
      alert('Error rejecting vendor');
    }
  };

  return (
    <div className="vendor-approval-container">
      <h3>Pending Vendor Approvals</h3>
      <div className="vendor-cards">
        {pendingVendors.length === 0 ? (
          <p>No pending vendors</p>
        ) : (
          pendingVendors.map((vendor) => (
            <div className="vendor-card" key={vendor.id}>
              <p><strong>Username:</strong> {vendor.username}</p>
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Company:</strong> {vendor.companyName}</p>
              <p><strong>Phone:</strong> {vendor.phoneNumber}</p>
              <div className="vendor-buttons">
                <button onClick={() => approveVendor(vendor.id)}>Approve ✅</button>
                <button onClick={() => rejectVendor(vendor.id)}>Reject ❌</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VendorApproval;
