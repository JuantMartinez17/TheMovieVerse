const zod = require('zod')

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be an string',
    required_error: 'Movie title is required'
  }),
  year: zod.number({
    invalid_type_error: 'Movie year must be an number',
    required_error: 'Movie year is required'
  }).int().min(1880).max(2025),
  director: zod.string({
    invalid_type_error: 'Movie director must be an string',
    required_error: 'Movie director is required'
  }),
  duration: zod.number({
    invalid_type_error: 'Movie duration must be an number',
    required_error: 'Movie duration is required'
  }).int().positive(),
  poster: zod.string({
    invalid_type_error: 'Movie poster must be an string',
    required_error: 'Movie poster is required'
  }).url(),
  genre: zod.array(
    zod.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Western']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  ),
  rate: zod.number().min(0).max(10)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

module.exports = {
  validateMovie
}
