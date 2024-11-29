import { User } from '../database/config.js'
import bcrypt from 'bcrypt'

export class UsersModel{
    static async getAll() {
        const users = await User.findAll()
        return { users }
    }
    static async getById({ id }) {
        try {
          const userId = Number(id);
          const userDetail = await User.findByPk(userId);
          console.log('User id:', id);
          
          if (!userDetail) {
           return { error: { code: 404, message: 'User not found' }, user: null };
          }
          
          return { error: null, user: userDetail };
        } catch (error) {
          console.error('Error getting user by id:', error);
          return { error: { code: 500, message: 'Internal server error' }, user: null };
        }
    }
    
    static async create ({ input }) {
        const emailExists = await User.findOne({ where: { email: input.email } })
        if (emailExists) {
            return { error: { code: 400, message: 'Email already exists' }, user: null }
        }
        const usernameExists = await User.findOne({ where: { username: input.username } })
        if (usernameExists) {
            return { error: { code: 400, message: 'Username already exists' }, user: null }
        }
        const passwordHash = await bcrypt.hash(input.password, 10)
        const user = await User.create({ ...input, password: passwordHash })
        return { error: null, user }
    }
}