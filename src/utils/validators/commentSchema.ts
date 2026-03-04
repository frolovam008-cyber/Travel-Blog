
import { z } from "zod";

export const commentSchema = z.object({
  full_name: z.string().min(1, "Напишите имя"),
  comment: z.string().min(1, "Добавьте текст отзыва"),
});



export type CommentFormValues = z.infer<typeof commentSchema>;