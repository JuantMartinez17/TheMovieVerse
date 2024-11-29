import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './login.css'

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
            const response = await fetch("http://localhost:3000/users/login", {
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

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
        </div>
    )
}

export default Login