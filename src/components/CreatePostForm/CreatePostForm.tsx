import { useState, useMemo, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { createNewPost } from "@/features/posts/postsThunk";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/common/Button/Button";
import { UniversalInput } from "@/components/common/Input/UniversalInput";
import { TextareaInput } from "@/components/common/Textarea/Textarea";
import { StarIcon, ArrowLeftIcon, UploadIcon, CrossIcon } from "@/components/common/icons";
import { postSchema, type PostFormValues } from "@/utils/validators/postSchema";

import "@/components/CreatePostForm/CreatePostForm.scss";

export const CreatePostForm = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const methods = useForm<PostFormValues>({
    mode: "onBlur",
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      country: "",
      city: "",
      photo: null,
    },
  });

  const { handleSubmit, reset } = methods;

  // 🔹 preview URL для выбранного фото
  const previewUrl = useMemo(() => {
    if (!selectedFile) return undefined;
    return URL.createObjectURL(selectedFile);
  }, [selectedFile]);

  // 🔹 освобождаем URL при размонтировании
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleRemoveFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
  };

  const onSubmit: SubmitHandler<PostFormValues> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("country", data.country || "");
    formData.append("city", data.city || "");
    if (selectedFile) formData.append("photo", selectedFile);

    try {
      // 🔹 отправляем форму и получаем объект нового поста
      const newPost = await dispatch(createNewPost(formData)).unwrap();

      // 🔹 переход на страницу созданного поста
      navigate(`/posts/${newPost.id}`);
    } catch (err) {
      console.error("Ошибка создания поста:", err);
      alert("Не удалось создать пост");
    }

    reset();
    handleRemoveFile();
  };

  return (
    <FormProvider {...methods}>
      <form
        className="create-post-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="create-post-form__container">
          <h2 className="create-post-form__title">
            Добавление истории о путешествии
          </h2>
          {/* 🔹 Инпут для фото */}
          <div className="create-post-form__file">
            <input
              id="post-photo"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="create-post-form__file-input"
            />

            <label
              htmlFor="post-photo"
              className="create-post-form__file-button"
            >
              <span className="create-post-form__file-icon">
                <UploadIcon size={14} />
              </span>
              <span className="create-post-form__file-text">
                Загрузите ваше фото
              </span>
            </label>
          </div>

          {previewUrl && (
            <div className="create-post-form__photo-preview">
              <img className="create-post-form__image" src={previewUrl} alt="Превью" />
              <Button className="create-post-form__btn-clear btn--clear" type="button" onClick={handleRemoveFile}>
                <CrossIcon/>
              </Button>
            </div>
          )}
       

        <div className="create-post-form__inputs">
          <UniversalInput
            name="title"
            label="Заголовок"
            labelIcon={<StarIcon />}
            placeholder="Введите заголовок"
            autoFocus
          />
          <div className="create-post-form__country-city">
            <UniversalInput
              name="country"
              label="Страна"
              labelIcon={<StarIcon />}
              placeholder="Введите страну"
            />
            <UniversalInput
              name="city"
              label="Город"
              labelIcon={<StarIcon />}
              placeholder="Введите город"
            />
          </div>
          <label
            className="create-post-form__textaria-label"
            htmlFor="description"
          >
            Описание
          </label>
          <TextareaInput
            name="description"
            placeholder="Введите текст поста"
            rows={6}
            maxLength={2000}
          />
        </div>

        <div className="create-post-form__buttons">
          {/* 🔹 Кнопка назад */}
          <Link to="/" className="create-post-form__link">
            <span className="create-post-form__link-arrow">
              <ArrowLeftIcon />
            </span>
            <span className="create-post-form__link-text">Назад</span>
          </Link>

          {/* 🔹 Кнопка создания */}
          <Button type="submit" className="btn--register" disabled={loading}>
            {loading ? "Создание..." : "Создать"}
          </Button>
        </div>
         </div>
      </form>
    </FormProvider>
  );
};

