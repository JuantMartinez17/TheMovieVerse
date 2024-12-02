import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useNavigate } from 'react-router'

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
            const response = await axios.post("http://localhost:3000/users", formData, {
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            setMessage("User registered succesfully")
            console.log(response.data)
            navigate('/home')
        }catch (error) {
            setMessage("Error registering user: " + error.message)
        }
    }

    return (
        <div className="container mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Sign Up
        </button>
        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
    )
}

export default Signup