import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './login.css'
import Logo from '../../assets/images/logo.png'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Logging in with: ", { email, password })
        setError("")
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            })
            const data = await response.json()
            if (!response.ok){
                setError(data.error || "Login failed")
                return
            }
            console.log("Login succesfull", data)
            localStorage.setItem("TOKEN", data.token)
            localStorage.setItem('user', JSON.stringify(data.user));
            const userRole = data.user.role
            if (userRole === 'admin') {
                navigate('/admin')
            }else {
                navigate('/home')
            }
        }catch(e) {
            console.error("Error during login", e)
            setError("Internal server error")
        }
    }

    const handleNavigateToSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="login-page">
            <div className="header-login">
                <img src={Logo} alt="" className="logo-img"/>                
                <h1 className="welcome-login" >Welcome to the MovieVerse!</h1>
            </div>
            <div className="form-container">
            <p className="title">Login</p>
            <form className="form" onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="sign" type="submit">Sign in</button>
            </form>
            <p className="signup">Don't have an account?
            <button onClick={handleNavigateToSignup} className="navigate-signup-btn">
                        Sign up
                    </button>
            </p>
        </div>
        </div> 
    )
}

export default Login