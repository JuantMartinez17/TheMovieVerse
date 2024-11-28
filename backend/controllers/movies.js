import { MovieModel } from "../models/movie.js"
import p from 'picocolors'
//TODO: Implement the controller using new MovieModel
export class MoviesController {
  static async getAll (req, res) {
    try {
      let { genre } = req.query
      let movies
      if (genre) {
        genre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
        console.log(genre)
        movies = await MovieModel.getAll({ genre });
      } else {
        movies = await MovieModel.getAll();
      }
      if (!movies || movies.length === 0) {
        return res.status(404).json({ error: 'Movies not found' });
      }
      res.status(200).json(movies)
    } catch (error) {
      console.error(p.red(`Error fetching movies: ${error.message}`))
      res.status(500).json({ message: 'Internal server error' })
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params
      const movie = await Movie.findByPk(id)
      if (movie) {
        return res.json(movie)
      }
      res.status(404).json({ message: '404 Movie not found' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async create (req, res) {
    try {
      const newMovie = await Movie.create(req.body)
      res.status(201).json(newMovie)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update (req, res) {
    try {
      const { id } = req.params
      const [updated] = await Movie.update(req.body, { where: { id } })
      if (!updated) {
        return res.status(404).json({ message: '404 Movie not found' })
      }
      const updatedMovie = await Movie.findByPk(id)
      res.status(200).json(updatedMovie)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const deleted = await Movie.destroy({ where: { id } })
      if (!deleted) {
        return res.status(404).json({ message: '404 Movie not found' })
      }
      res.json({ message: 'Movie deleted' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
