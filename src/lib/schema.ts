import * as v from "valibot"

export const habitsSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1, 'Title is required'), v.maxLength(100, 'Title must be less than 100 characters')),
  description: v.optional(v.pipe(v.string(), v.maxLength(500, 'Description must be less than 500 characters')))
})

