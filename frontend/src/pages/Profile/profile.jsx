import React, { useState, useEffect } from "react"
import NavBar from "../../components/NavBar/NavBar"
import UserReviews from "../../components/UserReviews/UserReviews"

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
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2>Profile</h2>
        <div className="card mx-auto" style={{ width: "18rem" }}>
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">Welcome, {user.username}!</h5>
            <p className="card-text">This is your profile page.</p>
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