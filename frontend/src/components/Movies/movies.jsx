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
            <h2>Peliculas</h2>
            <button className="btn btn-success mb-3" onClick={() => setIsFormOpen(true)}>
                Agregar pelicula
            </button>

            {isFormOpen && (
                <MoviesForm 
                    id={currentMovieId} 
                    handleCloseModal={handleCloseForm} 
                    movie={movieToEdit} 
                    handleUpdateMovie={handleUpdateMovie}
                />
            )}

            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Director</th>
                        <th>Duration</th>
                        <th>Poster</th>
                        <th>Genre</th>
                        <th>Rate</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.movieId}>
                            <td>{movie.title}</td>
                            <td>{movie.year}</td>
                            <td>{movie.director}</td>
                            <td>{movie.duration}</td>
                            <td>{movie.poster}</td>
                            <td>{movie.genre}</td>
                            <td>{movie.rate}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(movie.movieId)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(movie.movieId)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Movies