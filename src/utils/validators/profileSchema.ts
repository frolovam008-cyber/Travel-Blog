import { z } from "zod";

export const profileSchema = z
  .object({
    full_name: z.string().min(1, "Введите имя"),
    city: z.string().optional(),
    country: z.string().optional(),
    bio: z.string().optional(),

    password: z.string(), // ← НЕ optional
    confirmPassword: z.string(), // ← НЕ optional
  })
  .refine(
    (data) => {
      if (!data.password) return true; // если пусто — игнорируем
      if (data.password.length < 6) return false;
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Пароли не совпадают или меньше 6 символов",
    }
  );

export type ProfileFormValues = z.infer<typeof profileSchema>;