import * as z from "zod";

export const KnitValidation = z.object({
    knit: z.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
    accountId: z.string(),
})

export const CommentValidation = z.object({
    knit: z.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
})