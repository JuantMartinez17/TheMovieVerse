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
            axios.patch(`http://localhost:3000/movies/${id}`, data)
                .then((response) => {
                    handleUpdateMovie(response.data)
                    handleCloseModal()
                    alert(`Película actualizada correctamente, id: ${id}`)
                })
                .catch((error) => {
                    console.error('Error al actualizar la película', error)
                })
        }else {
            axios.post('http://localhost:3000/movies', data)
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Titulo</label>
                <Controller
                    control={control}
                    name="title"
                    render={({ field }) => <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.title?.message}</div>
            </div>

            <div className="form-group">
                <label>Año</label>
                <Controller
                    control={control}
                    name="year"
                    render={({ field }) => <input type="number" className={`form-control ${errors.year ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.year?.message}</div>
            </div>

            <div className="form-group">
                <label>Director</label>
                <Controller
                    control={control}
                    name="director"
                    render={({ field }) => <input type="text" className={`form-control ${errors.director ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.director?.message}</div>
            </div>

            <div className="form-group">
                <label>Duration</label>
                <Controller
                    control={control}
                    name="duration"
                    render={({ field }) => <input type="number" className={`form-control ${errors.duration ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.duration?.message}</div>
            </div>

            <div className="form-group">
                <label>Poster</label>
                <Controller
                    control={control}
                    name="poster"
                    render={({ field }) => <input type="text" className={`form-control ${errors.poster ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.poster?.message}</div>
            </div>

            <div className="form-group">
                <label>Rate</label>
                <Controller
                    control={control}
                    name="rate"
                    render={({ field }) => <input type="number" className={`form-control ${errors.rate ? 'is-invalid' : ''}`} {...field} />}
                />
                <div className="invalid-feedback">{errors.rate?.message}</div>
            </div>

            <div className="form-group">
                <label>Genre</label>
                <Controller
                    control={control}
                    name="genre"
                    render={({ field }) => (
                        <select className={`form-control form-select ${errors.genre ? 'is-invalid' : ''}`} {...field}>
                            <option value="">Seleccione un genero</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Animation">Animation</option>
                            <option value="Biography">Biography</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Crime">Crime</option>
                            <option value="Documentary">Documentary</option>
                            <option value="Drama">Drama</option>
                            <option value="Family">Family</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="History">History</option>
                            <option value="Horror">Horror</option>
                            <option value="Musical">Musical</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Romance">Romance</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Superhero">Superhero</option>
                            <option value="Thriller">Thriller</option>
                            <option value="War">War</option>
                            <option value="Western">Western</option>
                        </select>
                    )}
                />
                <div className="invalid-feedback">{errors.genre?.message}</div>
            </div>

            <br />
            <button type="submit" className="btn btn-success">{id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default MoviesForm;