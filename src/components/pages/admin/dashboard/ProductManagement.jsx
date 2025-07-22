import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductManagement.css';

const ProductManagement = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    subCategoryId: '',
    image: null
  });

  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8082/api/subcategories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSubCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
      }
    };

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8083/api/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleAddProduct = async () => {
    if (!product.name || !product.price || !product.quantity || !product.subCategoryId) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    const token = localStorage.getItem('token');

    const productData = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity),
      subCategoryId: parseInt(product.subCategoryId)
    };

    formData.append("product", new Blob([JSON.stringify(productData)], {
      type: "application/json"
    }));

    if (product.image) {
      formData.append("image", product.image);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8083/api/products',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert('Product added successfully!');
      setProducts((prev) => [...prev, response.data]);

      setProduct({
        name: '',
        description: '',
        price: '',
        quantity: '',
        subCategoryId: '',
        image: null
      });
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Error adding product.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || prod.subCategoryId.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-management">
      <div className="container">
        <div className="header">
          <h1 className="title">Product Management</h1>
          <p className="subtitle">Add and manage your products efficiently</p>
        </div>

        {/* Add Product Form */}
        <div className="form-section">
          <div className="form-header">
            <h2>Add New Product</h2>
            <div className="form-icon">+</div>
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label>Price *</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={product.price}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                value={product.quantity}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label>Subcategory *</label>
              <select
                name="subCategoryId"
                value={product.subCategoryId}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
              />
            </div>

            <div className="input-group">
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
              />
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            className="add-btn"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>

        {/* Products List */}
        <div className="products-section">
          <div className="products-header">
            <h2>Products ({products.length})</h2>

            <div className="filters">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No products found</h3>
              <p>Add your first product to get started</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={`http://localhost:8083/api/products/${prod.id}/image`}
                      alt={prod.name}
                    />
                  </div>

                  <div className="product-content">
                    <h3 className="product-name">{prod.name}</h3>
                    <p className="product-description">{prod.description}</p>

                    <div className="product-details">
                      <div className="price-tag">
                        <span className="currency">₹</span>
                        <span className="price">{prod.price}</span>
                      </div>

                      <div className="quantity-badge">
                        Stock: {prod.quantity}
                      </div>
                    </div>

                    <div className="product-actions">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
