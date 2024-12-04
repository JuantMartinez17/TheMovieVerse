import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { moviesRouter } from './routes/movies.js'
import { usersRouter } from './routes/users.js'
import { reviewsRouter } from './routes/reviews.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(corsMiddleware())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/movies', moviesRouter)
app.use('/users', usersRouter)
app.use('/reviews', reviewsRouter)

const PORT = process.env.PORT || 3000

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
