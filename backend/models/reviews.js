import { Review, User, Movie } from '../database/config.js'
import p from 'picocolors'

export class ReviewsModel{

    static async getAll(){
        const reviews = await Review.findAll()
        return reviews
    }

    static async getById({ id }){
        try {
            const reviewDetail = await Review.findByPk(id)
            if (reviewDetail === null){
                return {
                    error: { code: 404, message: 'Review not found' },
                    reviewDetail: null
                }
            } else {
                return { error: null, reviewDetail }
            }
        }catch (error) {
            console.error(p.red('Error getting review by id: ', error))
        }
        return { error: null, reviewDetail }
    }

    static async getByMovieId(movieId){
        try {
            const reviews = await Review.findAll({
                where: { movieId },
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Movie,
                        attributes: ['title', 'genre']
                    }
                ]
            })
            return reviews
        }catch (error){
            console.error(p.red(`Error fetching reviews by movie: ${error.message}`))
            throw error
        }
    }

    static async getByUserId(userId) {
        try {
            const reviews = await Review.findAll({
                where: { userId },
                include:[
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Movie,
                        attributes: ['title', 'genre']
                    }
                ]
            })
            return reviews
        }catch (error){
            console.error(p.red(`Error fetching reviews by user: ${error.message}`))
            throw error
        }
    }

    static async create({ input }) {
        console.log(input)
        try {
            const review = await Review.create(input)
            if (review){
                return { error: null, review }
            }
            return { error: { code: 500, message: 'error creating the review' }, review: null }
        }catch (error){
            console.error(p.red(`Error creating review: ${error.message}`))
            throw error
        }
    }

    static async update (id, input){
        try {
            const reviewId = Number(id)
            const review = await Review.findByPk(reviewId)
            if (!review){
                return { error: { code: 404, message: 'Review not found' }, review: null }
            }
            await review.update(input)
            const updatedReview = await Review.findByPk(reviewId)
            return { error: null, review: updatedReview }
        }catch (error){
            console.error('Error updating review:', error)
            throw error
        }
    }

    static async delete (id) {
        try {
            const review = await Review.findByPk(id)
            if(!review) {
                return { error: 'Review not found' }
            }
            await review.destroy()
            return { error: null }
        }catch(error) {
            console.error(p.red('Error deleting review: ', error))
            return { error: error.message }
        }
    }
}