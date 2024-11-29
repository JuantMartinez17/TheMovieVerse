import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Admin = () => {

    const [activeTab, setActiveTab] = useState('users')
    const [users, setUsers] = useState([])
    const [movies, setMovies] = useState([])
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await fetch ('http://localhost:3000/users',{
                method: "GET"
            })
            const moviesResponse = await fetch ('http://localhost:3000/movies',{
                method: "GET"
            })
            const reviewsResponse = await fetch ('http://localhost:3000/reviews',{
                method: "GET"
            })

            const usersData = await userResponse.json()
            const moviesData = await moviesResponse.json()
            const reviewsData = await reviewsResponse.json()
            setUsers(usersData)
            setMovies(moviesData)
            setReviews(reviewsData);
        }
        fetchData()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('user')
        navigate('/landing')
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div className="admin-container">
          <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
          <h1 className="mb-4">Bienvenido al administrador</h1>
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => handleTabChange('users')}>Usuarios</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'movies' ? 'active' : ''}`} onClick={() => handleTabChange('movies')}>Películas</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabChange('reviews')}>Reseñas</button>
            </li>
          </ul>
          <div className="tab-content">
            <div className={`tab-pane ${activeTab === 'users' ? 'active' : ''}`}>
              <Users users={users} />
            </div>
            <div className={`tab-pane ${activeTab === 'movies' ? 'active' : ''}`}>
              <Movies movies={movies} />
            </div>
            <div className={`tab-pane ${activeTab === 'reviews' ? 'active' : ''}`}>
              <Reviews reviews={reviews} />
            </div>
          </div>
        </div>
      );
    };
    
    const Users = ({ users }) => (
      <div>
        <h3>Lista de usuarios</h3>
        <ul>
          {users.map(user => (
            <li key={user.userId}>{user.username} - {user.email} - {user.role}</li>
          ))}
        </ul>
      </div>
    );
    
    const Movies = ({ movies }) => (
      <div>
        <h3>Lista de películas</h3>
        <ul>
          {movies.map(movie => (
            <li key={movie.movieId}>{movie.title} - {movie.year} - {movie.genre}</li>
          ))}
        </ul>
      </div>
    );
    
    const Reviews = ({ reviews }) => (
      <div>
        <h3>Lista de reseñas</h3>
        <ul>
          {reviews.map(review => (
            <li key={review.reviewId}>
              {review.comment} - {review.rating} estrellas
            </li>
          ))}
        </ul>
      </div>
    );
    
    export default Admin;