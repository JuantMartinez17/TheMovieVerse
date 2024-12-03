import React, { useState, useEffect } from "react"
import axios from 'axios'

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/user/${userId}`);
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

  if (error) {
    return <p>{error}</p>;
  }

        return (
            <div className="mt-4">
              <h4>User's Reviews</h4>
              {reviews.length > 0 ? (
                <ul className="list-group">
                  {reviews.map((review) => (
                    <li key={review.reviewId} className="list-group-item">
                      <strong>Movie:</strong> {review.Movie.title} <br />
                      <strong>Comment:</strong> {review.comment}{" "}
                      <span className="badge bg-success">{review.rating}/5</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>This user hasn't posted any reviews yet.</p>
              )}
            </div>
          );
}

export default UserReviews
