import { User } from '../database/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import p from 'picocolors'

export class UsersModel{
    static async getAll() {
        const users = await User.findAll()
        return { users }
    }
    static async getById({ id }) {
        try {
          const userId = Number(id);
          const userDetail = await User.findByPk(userId);
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

    static async update ({ id, input }) {
        const user = await User.findByPk(id)
        if (!user) {
            return { error: { code: 404, message: 'User not found' } }
        }
        if (input.password) {
            input.password = await bcrypt.hash(input.password, 10)
        }
        await user.update(input)
        return { error: null }
    }

    static async delete ({ userId }) {
        const user = await User.findByPk(userId)
        console.log('User:', user);
        if (!user) {
            return { error: { code: 404, message: 'User not found' } }
        }
        await user.destroy()
        return { error: null }
    }

    /*static async login ({ credentials }) {
        try {
            const { email, password } = credentials
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return { error: { code: 401, message: 'Invalid credentials' } }
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return { error: { code: 401, message: 'Invalid credentials' } }
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return { error: null, token }
        }catch (error) {
            console.error(p.red('Error during login', error))
            return { error: { code: 500, message: 'Internal server error '}}
        }
    }*/
        static async login({ credentials }) {
            try {
                const { email, password } = credentials;
        
                // Verificar si el usuario existe
                const user = await User.findOne({ where: { email } });
                if (!user) {
                    console.log('User not found');
                    return { error: { code: 401, message: 'Invalid credentials' } };
                }
        
                // Comparar la contraseña
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    console.log('Password mismatch');
                    return { error: { code: 401, message: 'Invalid credentials' } };
                }
        
                // Generar token JWT
                if (!process.env.JWT_SECRET) {
                    console.error('JWT_SECRET is not defined');
                    throw new Error('JWT_SECRET is not defined');
                }
        
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log('Token generated successfully');
                return { error: null, token };
            } catch (error) {
                console.error('Error during login:', error.message);
                return { error: { code: 500, message: 'Internal server error' } };
            }
        }
}