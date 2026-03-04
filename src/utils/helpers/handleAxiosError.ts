import axios, { AxiosError } from "axios";

// Тип ошибки, которую возвращает API
interface ApiError {
  error?: string;
  message?: string;
}

export function handleAxiosError(
  error: unknown,
  fallbackMessage = "Something went wrong"
): string {
  // 1️⃣ Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    return (
      axiosError.response?.data?.error ||
      axiosError.response?.data?.message ||
      axiosError.message ||
      fallbackMessage
    );
  }

  // 2️⃣ Обычная JS ошибка
  if (error instanceof Error) {
    return error.message;
  }

  // 3️⃣ Вообще неизвестно что
  return fallbackMessage;
}
