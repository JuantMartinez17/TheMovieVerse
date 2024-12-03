import React from "react"
import { useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from '../../assets/images/logo.png'

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
      <nav className="navbar navbar-expand shadow">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/home">
                    <img
                        src={Logo}
                        alt=""
                        style={{ width: "40px", height: "40px", marginRight: "10px" }}
                    />
                    <span>MovieVerse</span>
                </a>
                <div className="d-flex">
                    <button
                        className="button me-2"
                        onClick={handleOnProfile}
                    >
                        My Profile
                    </button>
                    <button
                        className="button"
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