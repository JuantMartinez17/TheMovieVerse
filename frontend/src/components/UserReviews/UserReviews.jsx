import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserReviews.css";
import { FaTrashAlt, FaStarHalfAlt, FaStar, FaRegStar } from 'react-icons/fa'

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        if (error.response?.status === 404){
          setReviews([])
          return 
        }
        setError(
          error.response?.data?.message ||
          error.message ||
          "Error loading reviews."
        );
      }
    };
    fetchUserReviews();
  }, [userId]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star full-star" />)
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half-star" />)
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star empty-star" />)
    }
    return stars
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new error("Error deleting review.");
        }
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
      }catch (error) {
        setError(error.message || "Error deleting review.");
      }
    }
  }

  if (error) {
    return <p classname="error-message">{error}</p>;
  }

  return (
    <div className="mt-4 user-reviews">
      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.reviewId} className="review-box">
              <button
                className="delete-button"
                onClick={() => handleDelete(review.reviewId)}
              >
                <FaTrashAlt />
              </button>
              <div className="review-header">
                <strong>Movie:</strong> {review.Movie.title}
                <span className="review-rating">{renderStars(review.rating)}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reviews-message">You havent posted any reviews yet. Start reviewing now!</p>
      )}
    </div>
  );
};

export default UserReviews;
