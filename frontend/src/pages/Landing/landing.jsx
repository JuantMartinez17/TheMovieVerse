import React from "react";
import "./landing.css";
import {  useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate()
  const handleLoginClick = () =>{
    console.log('navigating to login...')
    navigate("/login")
  }
  const handleSignupClick = () => {
    navigate("/signup")
  }
  return (
    <div className="landing">
      <h1>Welcome to MovieVerse</h1>
      <p>Discover movies and reviews from fellow fans!</p>
      <div className="landing-buttons">
        <button onClick={handleSignupClick}>Sign Up</button>
        <button onClick={handleLoginClick}>Login</button>
      </div>
    </div>
  );
};

export default Landing;
