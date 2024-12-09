import React, { useEffect, useState } from "react";
import ReviewsForm from './reviewsForm';

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentReviewId, setCurrentReviewId] = useState(null);
    const [reviewToEdit, setReviewToEdit] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews`, {
                    method: "GET",
                });
                if (!response.ok) {
                    throw new Error('Error al cargar las reviews');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleEdit = (reviewId) => {
        const review = reviews.find((review) => review.reviewId === reviewId);
        setReviewToEdit(review);
        setCurrentReviewId(reviewId);
        setIsFormOpen(true);
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta review?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la review');
                }
                setReviews(reviews.filter((review) => review.reviewId !== reviewId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentReviewId(null);
        setReviewToEdit(null);
    };

    const handleUpdateReview = (updatedReview) => {
        setReviews((prevReviews) =>
            prevReviews.map((review) => {
                if (review.reviewId === updatedReview.reviewId) {
                    return updatedReview;
                }
                return review;
            })
        );
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar las reviews</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center">Reviews</h2>
            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success" onClick={() => setIsFormOpen(true)}>
                    Agregar Review
                </button>
            </div>

            {isFormOpen && (
                <ReviewsForm
                    id={currentReviewId}
                    handleCloseModal={handleCloseForm}
                    review={reviewToEdit}
                    handleUpdateReview={handleUpdateReview}
                    addNewReview={(newReview) => setReviews([...reviews, newReview])}
                />
            )}

            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th className="text-center">Rating</th>
                        <th className="text-center">Comentario</th>
                        <th className="text-center">Usuario</th>
                        <th className="text-center">Película</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.reviewId}>
                            <td className="text-center">{review.rating}</td>
                            <td>{review.comment}</td>
                            <td>{review.userId}</td>
                            <td>{review.movieId}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleEdit(review.reviewId)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(review.reviewId)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reviews;
