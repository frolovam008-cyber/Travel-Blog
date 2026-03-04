import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { useNavigate } from "react-router-dom";

import { loginUser } from "@/features/auth/authThunk";
import type { RootState } from "@/store/store";

import { Button } from "@/components/common/Button/Button";
import { UniversalInput } from "@/components/common/Input/UniversalInput";

import { loginSchema } from "@/utils/validators/loginSchema";
import type { LoginSchema } from "@/utils/validators/loginSchema";

import "./LoginForm.scss";
import {StarIcon } from "@/components/common/icons";

export const LoginForm: React.FC<{
  onRegisterClick?: () => void;
}> = ({ onRegisterClick }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      console.log("Register error:", error);
    }
  }, [error]);

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();

      reset();
      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="login-form__container">
          <h2 className="login-form__title">Вход в профиль</h2>
<div className="login-form__inputs">
          <UniversalInput
            name="email"
            label="Логин"
            labelIcon ={<StarIcon/>}
            type="email"
            placeholder="Email"
            autoFocus
          />

          <UniversalInput
            name="password"
            label="Пароль"
            labelIcon ={<StarIcon/>}
            type="password"
            placeholder="Пароль"
          />
          </div>
          <div className="login-form__buttons">
            <Button
              type="button"
              className="btn--to-register"
              onClick={onRegisterClick}
            >
              Зарегистрироваться
            </Button>
            <Button type="submit" className="btn--submit" disabled={loading}>
              {loading ? "Загрузка..." : "Войти"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
