import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imdbLogo from "../../assets/images/imdb.png";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <NavBar />
      <div className="homepage-container">
        <h2 className="title">Top movies</h2>
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.movieId}
              className="movie-card"
              onClick={() => handleMovieClick(movie.movieId)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-content">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="card-img"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <div className="rating-container">
                  <p className="card-text">Rating:
                    <span className="movie-rate">{movie.rate}</span></p>
                  <img
                      src={imdbLogo}
                      alt="IMDb logo"
                      className="imdb-logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;