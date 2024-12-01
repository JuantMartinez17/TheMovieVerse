import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const reviewsSchema = yup.object().shape({
    rating: yup.number().min(0).max(5).required('La valoración es requerida'),
    comment: yup.string().required('El comentario es requerido'),
    userId: yup.number().required('El userId es requerido'),
    movieId: yup.number().required('El movieId es requerido')
})

const ReviewsForm = ({ id, handleCloseModal, review, handleUpdateReview }) => {
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(reviewsSchema)
    })

    useEffect(() => {
        if(review) {
            setValue('rating', review.rating)
            setValue('comment', review.comment)
            setValue('userId', review.userId)
            setValue('movieId', review.movieId)
        }else {
            reset()
        }
    }, [review, setValue, reset])

    const onSubmit = (data) => {
        if (id) {
            axios.patch(`http://localhost:3000/reviews/${id}`, data)
                .then((response) => {
                    handleUpdateReview(response.data)
                    handleCloseModal()
                    alert(`Review actualizada correctamente, id: ${id}`)
                })
                .catch((error) => {
                    console.error('Error al actualizar la review', error)
                })
        }else {
            axios.post('http://localhost:3000/reviews', data)
                .then((response) => {
                    handleUpdateReview(response.data)
                    handleCloseModal()
                    alert('Review creada correctamente')
                })
                .catch((error) => {
                    console.error('Error al crear la review', error)
                })
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-light w-75 mx-auto">
    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Rating</label>
            <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.rating ? 'is-invalid' : ''}`}
                        {...field}
                    />
                )}
            />
            <div className="invalid-feedback">{errors.rating?.message}</div>
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Comentario</label>
            <Controller
                control={control}
                name="comment"
                render={({ field }) => (
                    <input
                        type="text"
                        className={`form-control ${errors.comment ? 'is-invalid' : ''}`}
                        {...field}
                    />
                )}
            />
            <div className="invalid-feedback">{errors.comment?.message}</div>
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Usuario</label>
            <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                        {...field}
                    />
                )}
            />
            <div className="invalid-feedback">{errors.userId?.message}</div>
        </div>
    </div>

    <div className="row mb-3">
        <div className="col-md-6">
            <label className="form-label">Película</label>
            <Controller
                control={control}
                name="movieId"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.movieId ? 'is-invalid' : ''}`}
                        {...field}
                    />
                )}
            />
            <div className="invalid-feedback">{errors.movieId?.message}</div>
        </div>
    </div>

    <div className="d-flex justify-content-between">
        <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCloseModal}
        >
            Cancelar
        </button>
        <button type="submit" className="btn btn-success">
            {id ? 'Actualizar' : 'Crear'}
        </button>
    </div>
</form>

    
    )
}

export default ReviewsForm