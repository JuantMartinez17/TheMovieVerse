import { ReviewsModel } from "../models/reviews.js"
import { validateReview, validatePartialReview } from "../schemas/reviews.js"
import p from 'picocolors'
export class ReviewsController {
    static async getAll(req, res) {
        try{
            const reviews = await ReviewsModel.getAll()
            if (!reviews || reviews.length === 0){
                return { error: 'No reviews found' }
            }
            res.status(200).json(reviews)
        }catch (error){
            console.error(p.red(`Error fetching reviews: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params
            const review = await ReviewsModel.getById({ id })
            if (review){
                return res.json(review)
            }
            res.status(404).json({ message: '404 Review not found' })
        }catch (error){
            res.status(500).json({ error: error.message })
        }
    }

    static async getByMovieId(req, res) {
        const { movieId } = req.params;
        try {
          const reviews = await ReviewsModel.getByMovieId(movieId);
    
          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this movie' });
          }
    
          res.status(200).json(reviews);
        } catch (error) {
          console.error(`Error fetching reviews by movie: ${error.message}`);
          res.status(500).json({ message: 'Internal server error' });
        }
      }

    static async getByUserId(req, res) {
        const { userId } = req.params;
        try {
          const reviews = await ReviewsModel.getByUserId(userId);
    
          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this user' });
          }
    
          res.status(200).json(reviews);
        } catch (error) {
          console.error(`Error fetching reviews by user: ${error.message}`);
          res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async create(req, res) {
        console.log(req.body)
        const validation = validateReview(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: 'Invalid review data. Zod validation failed' })
        }
        try {
            const { error, review } = await ReviewsModel.create({ input: validation.data })
            if (error) {
                return res.status(error.code).json({ message: error.message })
            }
            res.status(201).json(review)
        }catch (error) {
            console.error(p.red(`Error creating review: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            const input = req.body
            const validation = validatePartialReview(input)
            if (!validation.success){
                return res.status(400).json({ error: 'Invalid review data. Zod validation failed' })
            }
            const { error, review } = await ReviewsModel.update(id, validation.data)
            if (error) {
                return res.status(500).json({ message: error.message })
            }
            res.status(200).json(review)
        }catch (error) {
            console.error('Error in review controller:', error.message)
            res.status(500).json({ message: 'Internal server error' }) 
        }
}

    static async delete(req, res) {
        try {
            const { id } = req.params
            const deleted = await ReviewsModel.delete(id)
            if (!deleted){
                return res.status(404).json({ message: '404 Review not found' })
            }
            res.json({ message: 'Review deleted' })
        }catch (error){
            console.error('Error deleting review:', error.message)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}