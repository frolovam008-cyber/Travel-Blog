import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { useNavigate } from "react-router-dom";

import { registerUser } from "@/features/auth/authThunk";
import type { RootState } from "@/store/store";

import { Button } from "@/components/common/Button/Button";
import { UniversalInput } from "@/components/common/Input/UniversalInput";

import { registerSchema } from "@/utils/validators/registerSchema";
import type { RegisterSchema } from "@/utils/validators/registerSchema";

import { StarIcon } from "@/components/common/icons";

import "@/components/RegisterForm/RegisterForm.scss"; 

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      console.log("Register error:", error);
    }
  }, [error]);

  const methods = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      reset();
      navigate("/login"); 
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="register-form__container">
          <h2 className="register-form__title">Регистрация</h2>

          <div className="register-form__inputs">
            <UniversalInput
              name="email"
              label="Email"
              labelIcon={<StarIcon />}
              type="email"
              placeholder="Email"
              autoFocus
            />
<div className="register-form__password">
            <UniversalInput
              name="password"
              label="Пароль"
              labelIcon={<StarIcon />}
              type="password"
              placeholder="Пароль"
            />

            <UniversalInput
              name="confirmPassword"
              label="Повторите пароль"
              labelIcon={<StarIcon />}
              type="password"
              placeholder="Повторите пароль"
            />

            </div>
          </div>

          <div className="register-form__buttons">
            <Button type="submit" className="btn--register" disabled={loading}>
              {loading ? "Загрузка..." : "Зарегистрироваться"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};