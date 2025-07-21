import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profilePicture: null
  });

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:8081/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
        if (res.data.profilePicture) {
          setPreview(`data:image/jpeg;base64,${res.data.profilePicture}`);
        }
      } catch {
        alert('Failed to load user profile');
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpdate = async () => {
    try {
      await axios.put('http://localhost:8081/api/users/update', user, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        await axios.put('http://localhost:8081/api/users/upload-picture', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      alert('Profile updated successfully!');
      setEditMode(false);
    } catch {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-flex">
        <div className="profile-picture">
  {preview && <img src={preview} alt="Profile" />}
  {editMode && (
    <>
      <label className="custom-file-upload">
        <input type="file" onChange={handleFileChange} />
        Choose Profile Picture
      </label>
    </>
  )}
</div>


        <div className="profile-info">
          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={user.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={user.phoneNumber}
                onChange={handleChange}
              />
              <button onClick={handleUpdate} className="update-btn">Save Changes</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
              <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
