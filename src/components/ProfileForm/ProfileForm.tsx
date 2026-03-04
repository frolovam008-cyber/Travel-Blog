import { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { updateUserThunk, changePasswordThunk } from "@/features/auth/authThunk";
import type { RootState } from "@/store/store";

import { Button } from "@/components/common/Button/Button";
import { UniversalInput } from "@/components/common/Input/UniversalInput";
import { AvatarUpload } from "@/components/AvatarUpload/AvatarUpload";
import { StarIcon, CrossIcon } from "@/components/common/icons";
import { TextareaInput } from "@/components/common/Textarea/Textarea";
import defaultAvatar from "@/assets/images/default-img.jpg";

import { profileSchema, type ProfileFormValues } from "@/utils/validators/profileSchema";

import "@/components/ProfileForm/ProfileForm.scss";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  // Локальное превью аватара
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPhotoRemoved, setIsPhotoRemoved] = useState(false);

  const previewUrl = useMemo(() => {
    if (!selectedFile) return null;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  // Очистка URL при размонтировании
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const methods = useForm<ProfileFormValues>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      city: "",
      country: "",
      bio: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  // Сброс формы при загрузке пользователя
  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name,
        city: user.city,
        country: user.country,
        bio: user.bio,
        password: "",
        confirmPassword: "",
      });

      // Асинхронно сбрасываем локальный аватар
      setTimeout(() => {
        setSelectedFile(null);
        setIsPhotoRemoved(false);
      }, 0);
    }
  }, [user, reset]);

  // Отправка формы
  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    // Отправляем только текстовые данные на сервер
    const updateData = {
      full_name: data.full_name,
      city: data.city,
      country: data.country,
      bio: data.bio,
    };

    await dispatch(updateUserThunk(updateData)).unwrap();

    // Если есть пароль, меняем
    if (data.password?.trim()) {
      await dispatch(changePasswordThunk({ password: data.password })).unwrap();
    }

    // Очистка пароля
    setValue("password", "");
    setValue("confirmPassword", "");

    alert("Профиль успешно обновлён ✅");
  };

  // Локальное превью аватара
  const avatarSrc = previewUrl || defaultAvatar;

  return (
    <FormProvider {...methods}>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ---------------- Avatar ---------------- */}
        <div className="profile-form__photo">
          <AvatarUpload
            preview={avatarSrc}
            onChange={(file) => {
              setSelectedFile(file);
              setIsPhotoRemoved(false);
            }}
          />
          {(selectedFile && !isPhotoRemoved) && (
            <Button
              type="button"
              className="profile-form__btn-clear btn--clear"
              onClick={() => {
                setSelectedFile(null);
                setIsPhotoRemoved(true);
              }}
            >
              <CrossIcon />
            </Button>
          )}
        </div>

        {/* ---------------- Inputs ---------------- */}
        <div className="profile-form__container">
          <h2 className="profile-form__title">Редактирование профиля</h2>

          <div className="profile-form__inputs">
            <UniversalInput
              name="full_name"
              label="Имя"
              labelIcon={<StarIcon />}
              placeholder="Введите имя"
              autoFocus
            />
            <UniversalInput
              name="city"
              label="Город"
              labelIcon={<StarIcon />}
              placeholder="Введите город"
            />
            <UniversalInput
              name="country"
              label="Страна"
              labelIcon={<StarIcon />}
              placeholder="Введите страну"
            />
            <label htmlFor="bio">О себе</label>
            <TextareaInput
              name="bio"
              placeholder="Расскажите о себе"
              rows={4}
            />
            <h2 className="profile-form__password-title">Смена пароля</h2>
            <div className="profile-form__password">
              <UniversalInput
                name="password"
                label="Новый пароль"
                labelIcon={<StarIcon />}
                type="password"
                placeholder="Введите новый пароль"
              />
              <UniversalInput
                name="confirmPassword"
                label="Подтвердите пароль"
                labelIcon={<StarIcon />}
                type="password"
                placeholder="Подтвердите пароль"
              />
            </div>
          </div>

          {/* ---------------- Submit ---------------- */}
          <div className="profile-form__buttons">
            <Button type="submit" className="btn--register" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

