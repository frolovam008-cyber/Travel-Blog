import React, { useState, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import { Button } from "@/components/common/Button/Button";
import { EyeOpenIcon, EyeClosedIcon } from "@/components/common/icons/index";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";

import "@/components/common/Input/UniversalInput.scss";

interface UniversalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  labelIcon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const UniversalInput: React.FC<UniversalInputProps> = ({
  name,
  label,
  labelIcon,
  type = "text",
  iconLeft,
  iconRight,
  placeholder,
  disabled,
  autoFocus,
  ...rest
}) => {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { isPassword, showPassword, inputType, handlers } =
    usePasswordToggle(type);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const filled = Boolean(field.value);
        const classes = clsx("universal-input", {
          "is-focused": focused,
          "is-filled": filled,
          "is-error": !!fieldState.error,
          "is-disabled": disabled,
        });

        return (
          <div className={classes}>
            {/* Лейбл сверху */}
            {label && (
              <label htmlFor={name} className="universal-input__label">
                {labelIcon && (
                  <span className="universal-input__icon">{labelIcon}</span>
                )}
                <span className="universal-input__text">{label}</span>
              </label>
            )}

            <div
              className="universal-input__wrapper"
              ref={wrapperRef}
              onClick={() => {
                const inputEl = wrapperRef.current?.querySelector(
                  "input",
                ) as HTMLInputElement;
                inputEl?.focus();
              }}
            >
              {iconLeft && (
                <span className="universal-input__icon-left">{iconLeft}</span>
              )}

              <input
                id={name}
                className="universal-input__field"
                {...field}
                {...rest}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                autoFocus={autoFocus}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setFocused(false);
                  field.onBlur();
                }}
              />

              {isPassword && filled && (
                <Button
                  type="button"
                  className="btn--eye universal-input__eye"
                  icon={showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  iconPosition="center"
                  title="Показать пароль"
                  tabIndex={-1}
                  {...handlers}
                />
              )}

              {iconRight && (
                <span className="universal-input__icon-right">{iconRight}</span>
              )}
            </div>

            {fieldState.error && (
              <span className="universal-input__error" role="alert">
                {fieldState.error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};
