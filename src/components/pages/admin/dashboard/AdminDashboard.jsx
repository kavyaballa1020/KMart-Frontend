import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [subcategoryName, setSubcategoryName] = useState('');

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');

  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editedSubcategoryName, setEditedSubcategoryName] = useState('');

  const [pendingVendors, setPendingVendors] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
    fetchPendingVendors();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8082/api/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

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

  const addCategory = async () => {
    try {
      await axios.post(
        'http://localhost:8082/api/categories',
        { name: categoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategoryName('');
      fetchCategories();
    } catch (err) {
      alert('Error adding category');
    }
  };

  const addSubcategory = async () => {
    try {
      await axios.post(
        `http://localhost:8082/api/subcategories/category/${selectedCategoryId}`,
        { name: subcategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubcategoryName('');
      fetchCategories();
    } catch (err) {
      alert('Error adding subcategory');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      alert('Error deleting category');
    }
  };

  const deleteSubcategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/subcategories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (err) {
      alert('Error deleting subcategory');
    }
  };

  const updateCategory = async (id) => {
    try {
      await axios.put(
        `http://localhost:8082/api/categories/${id}`,
        { name: editedCategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditCategoryId(null);
      setEditedCategoryName('');
      fetchCategories();
    } catch (err) {
      alert('Error updating category');
    }
  };

  const updateSubcategory = async (id) => {
    try {
      await axios.put(
        `http://localhost:8082/api/subcategories/${id}`,
        { name: editedSubcategoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditSubcategoryId(null);
      setEditedSubcategoryName('');
      fetchCategories();
    } catch (err) {
      alert('Error updating subcategory');
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
    <div className="admin-dashboard">
      <h2>Welcome, Admin 👑</h2>

      {/* Category Cards */}
      <div className="category-cards">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <div className="category-header">
              {editCategoryId === cat.id ? (
                <>
                  <input
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                  <button onClick={() => updateCategory(cat.id)}>Save</button>
                  <button onClick={() => setEditCategoryId(null)}>Cancel</button>
                </>
              ) : (
                <h4>{cat.name}</h4>
              )}
            </div>

            <ul className="subcategory-list">
              {cat.subcategories.map((sub) => (
                <li key={sub.id}>
                  {editSubcategoryId === sub.id ? (
                    <>
                      <input
                        value={editedSubcategoryName}
                        onChange={(e) => setEditedSubcategoryName(e.target.value)}
                      />
                      <div className="sub-buttons">
                        <button onClick={() => updateSubcategory(sub.id)}>Save</button>
                        <button onClick={() => setEditSubcategoryId(null)}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>{sub.name}</span>
                      <div className="sub-buttons">
                        <button
                          onClick={() => {
                            setEditSubcategoryId(sub.id);
                            setEditedSubcategoryName(sub.name);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={() => deleteSubcategory(sub.id)}>Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            <div className="category-buttons">
              <button
                onClick={() => {
                  setEditCategoryId(cat.id);
                  setEditedCategoryName(cat.name);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteCategory(cat.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Category and Subcategory */}
      <div className="add-section">
        <h3>Add New Category</h3>
        <div className="input-group">
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
          />
          <button className="add-btn" onClick={addCategory}>
            Add Category
          </button>
        </div>

        <h3>Add Subcategory to a Category</h3>
        <div className="input-group">
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            placeholder="Subcategory Name"
          />
          <button className="add-btn" onClick={addSubcategory}>
            Add Subcategory
          </button>
        </div>
      </div>

      {/* ✅ Vendor Approval Section */}
      <div className="vendor-approval-section">
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
    </div>
  );
}

export default AdminDashboard;
