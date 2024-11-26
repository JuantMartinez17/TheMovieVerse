const express = require('express')
const app = express()
app.disable('x-powered-by')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) {
    res.json(movie)
  }
  res.status(404).json({ message: '404 Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
