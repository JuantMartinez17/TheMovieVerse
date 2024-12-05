import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

const moviesSchema = yup.object().shape({
    title: yup.string().required('El título es requerido'),
    year: yup.number().required('El año es requerido'),
    director: yup.string().required('El director es requerido'),
    poster: yup.string().required('El poster es requerido'),
    duration: yup.number().required('La duración es requerida'),
    genre: yup.string().required('El género es requerido'),
    rate: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0, 'El rate debe ser al menos 0')
        .max(10, 'El rate no puede ser mayor que 10')
        .required('El rate es requerido')
        .typeError('Introduce un valor válido')
})

const MoviesForm = ({ id, handleCloseModal, movie, handleUpdateMovie }) => {
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: yupResolver(moviesSchema)
    })

    useEffect(() => {
        if (movie) {
            setValue('title', movie.title)
            setValue('year', movie.year)
            setValue('director', movie.director)
            setValue('poster', movie.poster)
            setValue('duration', movie.duration)
            setValue('genre', movie.genre)
            setValue('rate', movie.rate)
        }else {
            reset()
        }
    }, [movie, setValue, reset])

    const onSubmit = (data) => {
        if (id) {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`, data)
                .then((response) => {
                    handleUpdateMovie(response.data)
                    handleCloseModal()
                    alert(`Película actualizada correctamente, id: ${id}`)
                })
                .catch((error) => {
                    console.error('Error al actualizar la película', error)
                })
        }else {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies`, data)
                .then((response) => {
                    handleUpdateMovie(response.data)
                    handleCloseModal()
                    alert('Película creada correctamente')
                })
                .catch((error) => {
                    console.error('Error al crear la película', error)
                })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
    <div className="row g-3">
        <div className="col-md-6">
            <label className="form-label">Título</label>
            <Controller
                control={control}
                name="title"
                render={({ field }) => (
                    <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el título"
                        {...field}
                    />
                )}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Año</label>
            <Controller
                control={control}
                name="year"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el año"
                        {...field}
                    />
                )}
            />
            {errors.year && <div className="invalid-feedback">{errors.year.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Director</label>
            <Controller
                control={control}
                name="director"
                render={({ field }) => (
                    <input
                        type="text"
                        className={`form-control ${errors.director ? 'is-invalid' : ''}`}
                        placeholder="Ingrese el nombre del director"
                        {...field}
                    />
                )}
            />
            {errors.director && <div className="invalid-feedback">{errors.director.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Duración (min)</label>
            <Controller
                control={control}
                name="duration"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                        placeholder="Ingrese la duración"
                        {...field}
                    />
                )}
            />
            {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Póster (URL)</label>
            <Controller
                control={control}
                name="poster"
                render={({ field }) => (
                    <input
                        type="text"
                        className={`form-control ${errors.poster ? 'is-invalid' : ''}`}
                        placeholder="Ingrese la URL del póster"
                        {...field}
                    />
                )}
            />
            {errors.poster && <div className="invalid-feedback">{errors.poster.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Calificación</label>
            <Controller
                control={control}
                name="rate"
                render={({ field }) => (
                    <input
                        type="number"
                        className={`form-control ${errors.rate ? 'is-invalid' : ''}`}
                        placeholder="Ingrese la calificación (1-10)"
                        {...field}
                    />
                )}
            />
            {errors.rate && <div className="invalid-feedback">{errors.rate.message}</div>}
        </div>

        <div className="col-md-6">
            <label className="form-label">Género</label>
            <Controller
                control={control}
                name="genre"
                render={({ field }) => (
                    <select
                        className={`form-select ${errors.genre ? 'is-invalid' : ''}`}
                        {...field}
                    >
                        <option value="">Seleccione un género</option>
                        <option value="Action">Action</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                    </select>
                )}
            />
            {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
        </div>
    </div>

    <div className="d-flex justify-content-between mt-3">
        <button
            type="button"
            className="btn btn-secondary me-2"
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

export default MoviesForm;