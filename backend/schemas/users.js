import zod from 'zod'

const userSchema = zod.object({
    username: zod.string({
        invalid_type_error: 'User username must be an string',
        required_error: 'User username is required'
    }),
    email: zod.string({
        invalid_type_error: 'User email must be an string',
        required_error: 'User email is required'
    }).email({
        message: 'Invalid email format'
    }),
    password: zod.string({
        invalid_type_error: 'User password must be an string',
        required_error: 'User password is required'
    }),
    role: zod.string({
        invalid_type_error: 'User role must be an string',
        required_error: 'User role is required'
    }).optional()
})

export function validateUser (object) {
    return userSchema.safeParse(object)
}

export function validatePartialUser (object) {
    return userSchema.partial().safeParse(object)
}