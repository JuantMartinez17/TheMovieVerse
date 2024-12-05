import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import imdbLogo from '../../assets/images/imdb.png';
import { FaPen } from 'react-icons/fa';
import './movie.css';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        const { error, movieDetail } = response.data;
        if (error) {
          setError(error);
        } else {
          setMovie(movieDetail);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("An error occurred while fetching the movie details.");
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleReviewModalOpen = () => setIsReviewModalOpen(true);
  const handleReviewModalClose = () => setIsReviewModalOpen(false);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;

    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const movieId = Number(id);
    const ratingValue = Number(reviewData.rating);

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      alert("Rating must be a number between 1 and 5.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
        movieId: movieId,
        userId: userId,
        rating: ratingValue,
        comment: reviewData.comment
      });

      if (response.data) {
        alert("Review submitted successfully!");
        setReviewData({ rating: 0, comment: "" });
        handleReviewModalClose();
        
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("There was an error submitting your review.");
    }
  };

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div>
        <NavBar />
        <div className="container mt-4">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
  <NavBar />
  <div className="container mt-4">
    <h2 className="movie-title">{movie.title}</h2>
    <div className="row">
      <div className="col-md-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="img-fluid movie-poster"
        />
      </div>
      <div className="col-md-6 movie-details">
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Duration:</strong> {movie.duration} minutes</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p className="rating">
          <strong>Rating:</strong>
          <img
            src={imdbLogo}
            alt="IMDb logo"
            className="imdb-logo"
          />
          <span>{movie.rate}</span>
        </p>
      </div>
    </div>
    <div class="add-review-btn-container">
      <button 
        class="btn btn-primary mt-4 add-review-btn"
        onClick={handleReviewModalOpen}
      >
        <FaPen /> Add a Review
      </button>
    </div>
  </div>

  <div>
    <MovieReviews movieId={id} />
  </div>

  {isReviewModalOpen && (
    <div className="modal">
      <div className="modal-content">
        <h3>Write a Review</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={reviewData.rating}
              min="1"
              max="5"
              step="0.5"
              onChange={handleReviewChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={reviewData.comment}
              onChange={handleReviewChange}
              required
            ></textarea>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Submit Review</button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleReviewModalClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

  );
};

export default Movie;
