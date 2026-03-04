import React from "react";
import { useParams, Link } from "react-router-dom";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppSelectorDispatch";
import { addPostComment } from "@/features/posts/postsThunk";
import { UniversalInput } from "@/components/common/Input/UniversalInput";
import { TextareaInput } from "@/components/common/Textarea/Textarea";
import { Button } from "@/components/common/Button/Button";
import { StarIcon, ArrowLeftIcon } from "@/components/common/icons";
import {commentSchema, type CommentFormValues } from "@/utils/validators/commentSchema";

import "@/components/CreateCommentForm/CreateCommentForm.scss"

export const CreateCommentForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.posts);
  const { id: postId } = useParams<{ id: string }>();

  const methods = useForm<CommentFormValues>({
    mode: "onBlur",
    resolver: zodResolver(commentSchema),
    defaultValues: {
      full_name: "",
      comment: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    if (!postId) return alert("Не указан пост для комментария");

    try {
      await dispatch(addPostComment({ postId, comment: data })).unwrap();
      alert("Комментарий создан ✅");
      reset(); // очищаем форму
    } catch (error) {
      console.error(error);
      alert("Ошибка при создании комментария ❌");
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="create-comment-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="create-comment-form__container">
          <h2 className="create-comment-form__title">Добавление отзыва</h2>

          <div className="create-comment-form__inputs">
            <UniversalInput
              name="full_name"
              label="Ваше имя"
              labelIcon={<StarIcon />}
              placeholder="Ваше имя"
              autoFocus
            />

            <label htmlFor="comment">Отзыв</label>
            <TextareaInput
              name="comment"
              placeholder="Введите комментарий"
              rows={6}
              maxLength={2000}
             
            />
          </div>

          <div className="post-details__buttons">
            <Link className="post-details__link" to={`/posts/${postId}`}>
              <span className="post-details__link-arrow">
                <ArrowLeftIcon />
              </span>
              <span className="post-details__link-text">Назад</span>
            </Link>

            <Button type="submit" className="btn--register" disabled={loading}>
              {loading ? "Создание..." : "Создать"}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};