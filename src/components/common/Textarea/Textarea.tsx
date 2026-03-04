import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import "@/components/common/Textarea/Textarea.scss";

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  maxLength?: number;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  name,
  iconLeft,
  iconRight,
  placeholder,
  disabled,
  autoFocus,
  rows = 4,
  maxLength = 600,
  ...rest
}) => {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const filled = Boolean(field.value);
        const classes = clsx("auth-input", {
          "is-focused": focused,
          "is-filled": filled,
          "is-error": !!fieldState.error,
          "is-disabled": disabled,
        });

        return (
          <div className={classes}>
            <div
              className="textarea"
              ref={wrapperRef}
              onClick={() => {
                const textareaEl = wrapperRef.current?.querySelector(
                  "textarea"
                ) as HTMLTextAreaElement;
                textareaEl?.focus();
              }}
            >
              {iconLeft && <span className="textarea__icon-left">{iconLeft}</span>}

              <textarea
                className="textarea__field"
                {...field}
                {...rest}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                rows={rows}
                maxLength={maxLength}          // лимит символов
                style={{ resize: "vertical" }} // разрешаем растягивание по вертикали
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                  field.onBlur();
                }}
              />

              {iconRight && <span className="textarea__icon-right">{iconRight}</span>}
            </div>

            {/* Ошибка валидации */}
            {fieldState.error && (
              <span className="textarea__error" role="alert">
                {fieldState.error.message}
              </span>
            )}

            {/* Счетчик символов */}
            <span className="textarea__counter">
              {field.value ? field.value.length : 0}/{maxLength}
            </span>
          </div>
        );
      }}
    />
  );
};