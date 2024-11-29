import { MovieModel } from "../models/movie.js"
import p from 'picocolors'

export class MoviesController {
  static async getAll (req, res) {
    try {
      let { genre } = req.query
      let movies
      if (genre) {
        genre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
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
      const movie = await MovieModel.getById({ id })
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
      console.log(req.body.genre)
      req.body.genre = req.body.genre.charAt(0).toUpperCase() + req.body.genre.slice(1).toLowerCase();
      console.log(req.body.genre)
      console.log('Request body: ', req.body)
      const newMovie = await MovieModel.create(req.body)
      res.status(201).json(newMovie)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const input = req.body;
      const { error, movie } = await MovieModel.update(id, input);
      if (error) {
        return res.status(error.code || 500).json({ message: error.message });
      }
      res.status(200).json(movie);
    } catch (error) {
      console.error('Error in controller:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async delete (req, res) {
    try {
      const { id } = req.params
      const deleted = await MovieModel.delete({ where: { id } })
      if (!deleted) {
        return res.status(404).json({ message: '404 Movie not found' })
      }
      res.json({ message: 'Movie deleted' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
