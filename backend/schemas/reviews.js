import zod from 'zod'

const reviewsSchema = zod.object({
    rating: zod.number({
        invalid_type_error: 'Rating must be a number',
    }).min(1).max(5),
    comment: zod.string({
        invalid_type_error: 'Comment must be a string',
    }),
})

export function validateReview(object) {
    return reviewsSchema.safeParse(object)
}

export function validatePartialReview(object) {
    return reviewsSchema.partial().safeParse(object)
}