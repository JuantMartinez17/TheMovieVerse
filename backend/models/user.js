import { User } from '../database/config.js'

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
}