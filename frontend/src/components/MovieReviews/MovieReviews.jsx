import React, { useState, useEffect } from "react"
import axios from 'axios'

const MovieReviews = ({ movieId }) => {
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchReviews = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/reviews/movie/${movieId}`)
                setReviews(response.data)
            }catch(error){
                console.error("Error fetching reviews:", error);
                setError(error.response?.data?.message || error.message || "Error loading reviews.")
            }
        }
        fetchReviews()
    }, [movieId])

    if(error) {
        return <p>{error}</p>
    }

    return (
        <div className="mt-4">
          <h4>Reviews for this movie</h4>
          {reviews.length > 0 ? (
            <ul className="list-group">
              {reviews.map((review) => (
                <li key={review.reviewId} className="list-group-item">
                  <strong>{review.User.username}:</strong> {review.comment}{" "}
                  <span className="badge bg-success">{review.rating}/5</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available for this movie.</p>
          )}
        </div>
      )
}

export default MovieReviews