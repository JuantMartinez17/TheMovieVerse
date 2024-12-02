import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("TOKEN")
        localStorage.removeItem("user")
        navigate("/")
    }

    const handleOnProfile = () => {
        navigate("/profile")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/logo.png"
            alt="Site Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          <span>My Site</span>
        </a>
        <div className="d-flex">
          <button
            className="btn btn-outline-primary me-2"
            onClick={handleOnProfile}
          >
            My Profile
          </button>
          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    )
}

export default NavBar