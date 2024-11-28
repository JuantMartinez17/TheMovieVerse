import { Movie } from '../database/config.js'
import p from 'picocolors'

export class MovieModel {
  static async getAll({ genre } = {}) {
    console.log('genre:', genre)
    const query = genre ? { where: { genre } } : {}
    const movies = await Movie.findAll(query)
    return { movies }
  }

  static async getById({ id }) {
    try {
      const movieDetail = await Movie.findByPk(id)
      if (movieDetail === null) {
        return {
          error: { code: 404, message: 'Movie not found' },
          movieDetail: null,
        }
      } else {
        return { error: null, movieDetail }
      }
    }catch (error) {
      console.error(p.red('Error getting movie by id: ', error));
    }
    return { error: null, movieDetail }
  }

  static async create ({ input }) {
    const newMovie = await Movie.create(input)
    return newMovie
  }

  static async delete ({ id }) {
    const movie = await Movie.findByPk(id)
    try {
      const movie = await Movie.findOne({ where: { id } });
      if(!movie) {
        return { error: 'Movie not found' }
      }
      await movie.destroy()
      return { error: null }
    }catch(error) {
      console.error(p.red('Error deleting movie: ', error))
      return { error: error.message }
    }
  }

  static async update ({ id, input }) {
    try {
      const movie = await findByPk(id)
      if (movie === null) {
        return { error:{ code: 404, message: 'Movie not found' }, movie}
      }else {
        await movie.update(input)
        return { error: null, movie }
      }
    }catch (error) {
      console.error(p.red('Error updating movie: ', error))
    }
  }
}