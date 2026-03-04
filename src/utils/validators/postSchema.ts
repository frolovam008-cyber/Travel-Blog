
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Введите заголовок"),
  description: z.string().min(1, "Введите описание"),
  country: z.string().optional(),
  city: z.string().optional(),
  photo: z.any().optional(),
});

export type PostFormValues = z.infer<typeof postSchema>;