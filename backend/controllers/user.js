import { UsersModel } from '../models/users.js';
import { validateUser, validatePartialUser } from '../schemas/users.js'
import p from 'picocolors';

export class UsersController{
    static async getAll(req, res) {
        try{
            users = await UsersModel.getAll()
            if (!users || users.length === 0) {
                return res.status(404).json({ error: 'Users not found' });
            }
            res.status(200).json(users)
        }catch (error) {
            console.error(p.red(`Error fetching users: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params
            const userId = Number(id)
            const user = await UsersModel.getById({ userId })
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user)
        } catch (error) {
            console.error(p.red(`Error fetching user: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }
    static async create (req, res) {
        
    }
}