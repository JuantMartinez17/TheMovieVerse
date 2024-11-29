import { Review, User, Movie } from '../database/config.js'
import p from 'picocolors'
export class ReviewsModel{

    static async getAll(){
        const reviews = await Review.findAll()
        return reviews
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
}