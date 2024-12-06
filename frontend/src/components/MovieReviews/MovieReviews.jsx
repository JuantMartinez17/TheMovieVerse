import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import "./MovieReviews.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });
  const [userHasReview, setUserHasReview] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/movie/${movieId}`
        );
        setReviews(response.data);
        const hasReview = response.data.some((review) => review.userId === userId);
        setUserHasReview(hasReview);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(
          error.response?.data?.message || error.message || "Error loading reviews."
        );
      }
    };
    fetchReviews();
  }, [movieId, userId]);

  const handleReviewModalOpen = () => setIsReviewModalOpen(true);
  const handleReviewModalClose = () => setIsReviewModalOpen(false);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be logged in to submit a review.");
      return;
    }

    const ratingValue = Number(reviewData.rating);

    if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      alert("Rating must be a number between 1 and 5.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
        movieId: Number(movieId),
        userId: userId,
        rating: ratingValue,
        comment: reviewData.comment,
      });

      if (response.data) {
        const newReview = {
          ...response.data,
          User: { username: user.username },
        };
        setReviews([...reviews, newReview]);
        setUserHasReview(true);
        alert("Review submitted successfully!");
        setReviewData({ rating: 0, comment: "" });
        handleReviewModalClose();
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("There was an error submitting your review.");
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`);
        setReviews(reviews.filter((review) => review.reviewId !== reviewId));
        setUserHasReview(false);
        alert("Review deleted successfully.");
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("There was an error deleting your review.");
      }
    }
  };

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
      <div className="add-review-btn-container">
        <button
          className="btn btn-primary add-review-btn"
          onClick={handleReviewModalOpen}
          disabled={userHasReview}
        >
          <FaPen /> {userHasReview ? "You already reviewed this movie" : "Add a Review"}
        </button>
      </div>

      {reviews.length > 0 ? (
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.reviewId} className="review-box">
              <div className="review-header">
                <strong>{review.User.username || "Unknown User"}</strong>
                <span className="review-rating">{renderStars(review.rating)}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              {review.userId === userId && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(review.reviewId)}
                >
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews available for this movie.</p>
      )}

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

export default MovieReviews;
