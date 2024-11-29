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
    navigate('/')
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
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Email</th>
          <th>Username</th>
          <th>Rol</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.userId}>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>{user.password}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Movies = ({ movies }) => (
  <div>
    <h3>Lista de películas</h3>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Título</th>
          <th>Año</th>
          <th>Director</th>
          <th>Duración</th>
          <th>Póster</th>
          <th>Género</th>
          <th>Calificación</th>
        </tr>
      </thead>
      <tbody>
        {movies.map(movie => (
          <tr key={movie.movieId}>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.director}</td>
            <td>{movie.duration} min</td>
            <td><img src={movie.poster} alt={movie.title} style={{ width: '100px' }} /></td>
            <td>{movie.genre}</td>
            <td>{movie.rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Reviews = ({ reviews }) => (
  <div>
    <h3>Lista de reseñas</h3>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Comentario</th>
          <th>Calificación</th>
          <th>User ID</th>
          <th>Movie ID</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map(review => (
          <tr key={review.reviewId}>
            <td>{review.comment}</td>
            <td>{review.rating} estrellas</td>
            <td>{review.userId}</td>
            <td>{review.movieId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Admin;
