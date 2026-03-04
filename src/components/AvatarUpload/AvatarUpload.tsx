import React, { useRef } from "react";
import { Button } from "@/components/common/Button/Button";
import { CameraIcon } from "@/components/common/icons";

type Props = {
  preview?: string | null;                 // URL для превью аватара
  onChange?: (file: File | null) => void; // Колбек для передачи файла родителю
};

export const AvatarUpload: React.FC<Props> = ({ preview, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Открывает окно выбора файла
  const handleClick = () => {
    inputRef.current?.click();
  };

  // Выбор файла
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange?.(file); // передаем файл родителю
  };

  return (
    <div className="avatar-upload">
      {/* Превью аватара */}
      <div className="avatar-upload__image-wrapper" onClick={handleClick}>
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="avatar-upload__image"
            style={{ cursor: "pointer" }}
          />
        ) : (
          <div
            className="avatar-upload__placeholder"
            style={{
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#eee",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            Нет фото
          </div>
        )}
      </div>

      {/* Кнопка для выбора/замены фото */}
      <Button
        type="button"
        className="avatar-upload__button btn--update-photo"
        onClick={handleClick}
        icon={<CameraIcon size={24} />}
        iconPosition="left"
      >
        {preview ? "Изменить фото" : "Загрузить фото"}
      </Button>

      {/* Скрытый input для выбора файла */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        hidden
        onChange={handleChange}
      />
    </div>
  );
};

