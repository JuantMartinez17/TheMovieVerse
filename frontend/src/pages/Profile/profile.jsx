import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import UserReviews from "../../components/UserReviews/UserReviews.jsx";
import { FaPen } from 'react-icons/fa';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData({ username: userData.username, email: userData.email });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.userId}`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      alert("Usuario actualizado correctamente");
      handleCloseModal();
    } else {
      console.error("Error al actualizar el usuario", result.error);
    }
  };

  if (!user) {
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <NavBar />
      <div className="container mt-4">
        <h2 className="profile-title">Profile</h2>
        <div className="profile-card mx-auto">
          <div className="profile-img-container">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-img"
            />
          </div>
          <div className="profile-details">
            <h5 className="profile-username">Welcome, {user.username}!</h5>
            <p className="profile-description">This is your profile page.</p>
            <button
              className="edit-button"
              onClick={handleOpenModal}
            >
              <FaPen /> Edit
            </button>
          </div>
        </div>
      </div>
      <div>
        <h4 className="reviews-title">User's Reviews</h4>
        <UserReviews userId={user.userId} />
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">Save Changes</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
