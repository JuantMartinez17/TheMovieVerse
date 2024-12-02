import { UsersModel } from '../models/user.js';
import { validateUser, validatePartialUser } from '../schemas/users.js'
import p from 'picocolors';

export class UsersController{
    static async getAll(req, res) {
        try{
            const users = await UsersModel.getAll()
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
            const { id } = req.params;
            const userId = Number(id);
          
            const { error, user } = await UsersModel.getById({ id: userId });
          
            if (error) {
            return res.status(error.code).json({ message: error.message });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(p.red(`Error fetching user: ${error.message}`));
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async create (req, res) {
        const validation = validateUser(req.body)
        if (!validation.success) {
            return res.status(400).json({ error: 'Invalid user data. Zod validation failed' })
        }
        try {
            const { error, user } = await UsersModel.create({ input: validation.data })
            if (error) {
                return res.status(error.code).json({ message: error.message })
            }
            res.status(201).json(user)
        } catch (error) {
            console.error(p.red(`Error creating user: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async update (req, res) {
        const validation = validatePartialUser(req.body)
        if (!validation) {
            return res.status(400).json({ error: 'Invalid user update data' })
        }
        try { 
            const { id } = req.params
            const { error } = await UsersModel.update({ id, input: validation.data })
            if (error) {
                return res.status(500).json({ message: error.message })
            }
            const user = await UsersModel.getById({ id })
            res.status(200).json(user)
        }catch (error) {
            console.error(p.red(`Error updating user: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async delete (req, res) {
        try {
            const { id } = req.params
            const userId = Number(id)
            const { error } = await UsersModel.delete({ userId })
            if (error) {
                return res.status(404).json({ error: 'User not found' })
            }
            res.status(200).json({ message: 'User deleted succesfully' })
        }catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async login(req, res) {
        const validation = validatePartialUser(req.body);
        if (!validation.success) {
            console.log('Validation failed:', validation.error);
            return res.status(400).json({ error: 'Invalid login data' });
        }
        try {
            const { error, token, user } = await UsersModel.login({ credentials: validation.data });
            if (error) {
                console.log('Model error:', error);
                return res.status(error.code).json({ error: error.message });
            }
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000,
            }).status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.userId,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error(`Error logging in: ${error.message}`);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req, res) {
        res.clearCookie('access_token').status(200).json({ message: 'Logout successful' });
    }
}