import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const reviewsSchema = yup.object().shape({
    rating: yup.number().min(0, 'El rating debe ser al menos 0').max(10, 'El rating no puede ser mayor que 10').required('El rating es requerido'),
    comment: yup.string().required('El comentario es requerido'),
    userId: yup.number().required('El usuario es requerido'),
    movieId: yup.number().required('La película es requerida'),
});

const ReviewsForm = ({ id, handleCloseModal, review, handleUpdateReview, addNewReview }) => {
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(reviewsSchema),
    });

    useEffect(() => {
        if (review) {
            setValue('rating', review.rating);
            setValue('comment', review.comment);
            setValue('userId', review.userId);
            setValue('movieId', review.movieId);
        } else {
            reset();
        }
    }, [review, setValue, reset]);

    const onSubmit = (data) => {
        if (id) {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/reviews/${id}`, data)
                .then((response) => {
                    handleUpdateReview(response.data);
                    handleCloseModal();
                    alert(`Review actualizada correctamente, id: ${id}`);
                })
                .catch((error) => {
                    console.error('Error al actualizar la review', error);
                });
        } else {
            // Crear nueva review
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/reviews`, data)
                .then((response) => {
                    addNewReview(response.data);
                    handleCloseModal();
                    alert('Review creada correctamente');
                })
                .catch((error) => {
                    console.error('Error al crear la review', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Rating</label>
                    <Controller
                        control={control}
                        name="rating"
                        render={({ field }) => (
                            <input
                                type="number"
                                className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el rating"
                                {...field}
                            />
                        )}
                    />
                    {errors.rating && <div className="invalid-feedback">{errors.rating.message}</div>}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Comentario</label>
                    <Controller
                        control={control}
                        name="comment"
                        render={({ field }) => (
                            <input
                                type="text"
                                className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el comentario"
                                {...field}
                            />
                        )}
                    />
                    {errors.comment && <div className="invalid-feedback">{errors.comment.message}</div>}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Usuario</label>
                    <Controller
                        control={control}
                        name="userId"
                        render={({ field }) => (
                            <input
                                type="text"
                                className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                                placeholder="Ingrese el usuario"
                                {...field}
                            />
                        )}
                    />
                    {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Película</label>
                    <Controller
                        control={control}
                        name="movieId"
                        render={({ field }) => (
                            <input
                                type="text"
                                className={`form-control ${errors.movieId ? 'is-invalid' : ''}`}
                                placeholder="Ingrese la película"
                                {...field}
                            />
                        )}
                    />
                    {errors.movieId && <div className="invalid-feedback">{errors.movieId.message}</div>}
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Actualizar review' : 'Agregar review'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ReviewsForm;
