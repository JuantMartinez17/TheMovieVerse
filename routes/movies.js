import { Router } from 'express'
import { readJSON } from '../utils.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { randomUUID } from 'node:crypto'
const movies = readJSON('./movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  }
  res.status(404).json({ message: '404 Movie not found' })
})

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    res.status(404).json({ message: '404 Movie not found' })
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.status(200).json(updateMovie)
})

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: '404 Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})
