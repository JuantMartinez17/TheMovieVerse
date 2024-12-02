import React, { useState, useEffect } from "react";
import axios from "axios";
import './MovieReviews.css'

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/reviews/movie/${movieId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Error loading reviews."
        );
      }
    };
    fetchReviews();
  }, [movieId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (hasHalfStar) {
      stars.push("½");
    }
    while (stars.length < 5) {
      stars.push("☆");
    }

    return stars.map((star, index) => (
      <span key={index} className="star">{star}</span>
    ));
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-4 movie-reviews">
      <h4 className="reviews-title">Reviews for this movie</h4>
      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.reviewId} className="review-box">
              <div className="review-header">
                <strong>{review.User.username}</strong>
                <span className="review-rating">{renderStars(review.rating)}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
