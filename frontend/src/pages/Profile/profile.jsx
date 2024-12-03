import React, { useState, useEffect } from "react"
import NavBar from "../../components/NavBar/NavBar"
import UserReviews from "../../components/UserReviews/UserReviews.jsx"
import './profile.css'
const Profile = () => {
    const [user, setUser] = useState("") 
    
    useEffect (() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser)) 
        }
    }, [])

    if (!user) {
        return (
            <div>
                <NavBar/>
                <div className="container mt-4">
                    <p>Loading profile...</p>
                </div>
            </div>
        )
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
          </div>
        </div>
      </div>
      <div>
        <UserReviews userId={user.id} />
      </div>
    </div>
  )
}

export default Profile