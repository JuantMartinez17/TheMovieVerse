import React, { useEffect, useState } from "react"
import MoviesForm from './moviesForm'

const Movies = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [currentMovieId, setCurrentMovieId] = useState(null)
    const [movieToEdit, setMovieToEdit] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://localhost:3000/movies', {
                    method: "GET"
                })
                if (!response.ok) {
                    throw new Error('Error al cargar películas')
                }
                const data = await response.json()
                setMovies(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchMovies()
    }, [])

    const handleEdit = (movieId) => {
        const movie = movies.find((movie) => movie.movieId === movieId)
        setMovieToEdit(movie)
        setCurrentMovieId(movieId)
        setIsFormOpen(true)
    }

    const handleDelete = async (movieId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
            try {
                const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                    method: "DELETE"
                })
                if (!response.ok) {
                    throw new Error('Error al eliminar la película')
                }
                setMovies(movies.filter((movie) => movie.movieId !== movieId))
            } catch (error) {
                setError(error.message)
            }
        }
    }

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setCurrentMovieId(null)
        setMovieToEdit(null)
    }

    const handleUpdateMovie = (updatedMovie) => {
        setMovies((prevMovies) => 
            prevMovies.map((movie) => 
                movie.movieId === updatedMovie.movieId ? updatedMovie : movie
            )
        );
    }

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error al cargar películas</p>

    return (
        <div className="container mt-4">
    <h2>Películas</h2>
    <button className="btn btn-success mb-3" onClick={() => setIsFormOpen(true)}>
        Agregar película
    </button>

    {isFormOpen && (
        <MoviesForm
            id={currentMovieId}
            handleCloseModal={handleCloseForm}
            movie={movieToEdit}
            handleUpdateMovie={handleUpdateMovie}
        />
    )}

    <table className="table table-striped table-bordered text-center align-middle">
        <thead className="table-dark">
            <tr>
                <th>Título</th>
                <th>Año</th>
                <th>Director</th>
                <th>Duración</th>
                <th>Póster</th>
                <th>Género</th>
                <th>Calificación</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {movies.map((movie) => (
                <tr key={movie.movieId}>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.director}</td>
                    <td>{movie.duration} min</td>
                    <td>
                        {movie.poster ? (
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="img-thumbnail"
                                style={{ maxWidth: '100px', height: 'auto' }}
                            />
                        ) : (
                            <span>No disponible</span>
                        )}
                    </td>
                    <td>{movie.genre}</td>
                    <td>{movie.rate}/10</td>
                    <td>
                        <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEdit(movie.movieId)}
                        >
                            Editar
                        </button>
                        <button style={{ margin: '15px' }}
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(movie.movieId)}
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    )
}

export default Movies