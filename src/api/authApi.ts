
import { api } from "./api";
import type { AuthRequest, AuthResponse, User, UpdateUserForm, ChangePasswordRequest } from "@/types/types";

export const authApi = {
  // ========================
  // LOGIN / REGISTER / LOGOUT
  // ========================
  login: async (data: AuthRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/api/login", data);
    return res.data; // { token }
  },

  register: async (data: AuthRequest): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/api/register", data);
    return res.data; // { token }
  },

  logout: async (): Promise<void> => {
    await api.post("/api/logout");
  },

  // ========================
  // USER PROFILE
  // ========================

  // Получить текущего пользователя
  getCurrentUser: async (): Promise<User> => {
    const { data } = await api.get<User>("/api/user");
    return data;
  },

  // Обновить профиль (FormData, поддержка фото)
  updateUser: async (form: UpdateUserForm): Promise<User> => {
    const formData = new FormData();

    formData.append("full_name", form.full_name ?? "");
    formData.append("city", form.city ?? "");
    formData.append("country", form.country ?? "");
    formData.append("bio", form.bio ?? "");

    if (form.photo) {
      formData.append("photo", form.photo);
    }

    const { data } = await api.post<User>("/api/user", formData);

    return data;
  },

  // Изменить пароль
  changePassword: async (request: ChangePasswordRequest): Promise<{ message: string }> => {
    const { data } = await api.patch<{ message: string }>("/api/user/password", request);
    return data;
  },
};



