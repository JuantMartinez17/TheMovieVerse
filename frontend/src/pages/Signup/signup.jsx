import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import './signup.css'
import { useNavigate } from 'react-router'
import Logo from '../../assets/images/logo.png'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, formData, {
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            setMessage("User registered succesfully")
            console.log(response.data)
            navigate('/login')
        }catch (error) {
            setMessage("Error registering user: " + error.message)
        }
    }

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
      <div className="signup-page">
        <div className="signup-header">
            <img src={Logo} alt="" className="logo-img"/>
            <div className="signup-header-titles">
            <h1 className="welcome-signup">Join the MovieVerse!</h1>
            <p className="signup-subtitle">Review, discover and share your favorite movies</p>
            </div>
        </div>
      <div className="form-container">
          <p className="title">Sign Up</p>
          <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                  />
              </div>
              <button className="sign" type="submit">Sign Up</button>
              {message && <p className="message">{message}</p>}
          </form>
          <p className="login-redirect">
              Already have an account? 
              <button onClick={handleNavigateToLogin} className="navigate-login-btn">
                        Login
                    </button>
          </p>
      </div>
  </div>
  )
}

export default Signup