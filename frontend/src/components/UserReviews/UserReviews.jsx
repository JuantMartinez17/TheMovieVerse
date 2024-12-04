import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserReviews.css";
import { FaTrashAlt } from 'react-icons/fa'

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`https://programacionwebii-production.up.railway.app/reviews/user/${userId}`);
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
    fetchUserReviews();
  }, [userId]);

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

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
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
    return <p>{error}</p>;
  }

  return (
    <div className="mt-4 user-reviews">
      <h4 className="reviews-title">User's Reviews</h4>
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
        <p>This user hasn't posted any reviews yet.</p>
      )}
    </div>
  );
};

export default UserReviews;
