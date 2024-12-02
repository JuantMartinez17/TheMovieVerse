import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies/:${id}");
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
      <div className="container mt-4">
        <h2>My Movies</h2>
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.movieId}
              className="col-md-4 mb-4"
              onClick={() => handleMovieClick(movie.movieId)}
              style={{ cursor: "pointer" }}
            >
              <div className="card">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Rating: {movie.rate}</p>
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