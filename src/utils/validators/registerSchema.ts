import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email обязателен")
      .email("Некорректный email"),

    password: z
      .string()
      .min(1, "Пароль обязателен")
      .min(6, "Минимум 6 символов")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d).+$/,
        "Пароль должен содержать буквы и цифры"
      ),

    confirmPassword: z
      .string()
      .min(1, "Подтверждение обязательно"),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Пароли не совпадают",
    }
  );

export type RegisterSchema = z.infer<typeof registerSchema>;
