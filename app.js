const express = require('express');
const app = express();
app.disable('x-powered-by');
const crypto = require('node:crypto');
const movies = require('./movies.json');

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
})

app.get('/movies', (req, res) => {
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
  const { 
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate
  } = req.body
  if (!title || !year || !director || !duration || !poster || !genre) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    year,
    director,
    duration,
    poster,
    genre,
    rate: rate ?? 0
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})