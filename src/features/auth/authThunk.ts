import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";
import { setAuthToken } from "@/api/api";
import { handleAxiosError } from "@/utils/helpers/handleAxiosError";
import type { AuthRequest, User, UpdateUserForm, ChangePasswordRequest } from "@/types/types";

type ThunkConfig = {
  rejectValue: string;
};

// ========================
// REGISTER
// ========================
export const registerUser = createAsyncThunk<User, AuthRequest, ThunkConfig>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      setAuthToken(response.token);
      const user = await authApi.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// ========================
// LOGIN
// ========================
export const loginUser = createAsyncThunk<User, AuthRequest, ThunkConfig>(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.login(data);
      setAuthToken(response.token);
      const user = await authApi.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error, "Login failed"));
    }
  }
);

// ========================
// FETCH CURRENT USER
// ========================
export const fetchUser = createAsyncThunk<User, void, ThunkConfig>(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authApi.getCurrentUser();
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// ========================
// UPDATE USER
// ========================
export const updateUserThunk = createAsyncThunk<User, UpdateUserForm, ThunkConfig>(
  "auth/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      return await authApi.updateUser(formData);
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// ========================
// CHANGE PASSWORD
// ========================
export const changePasswordThunk = createAsyncThunk<{ message: string }, ChangePasswordRequest, ThunkConfig>(
  "auth/changePassword",
  async (request, { rejectWithValue }) => {
    try {
      return await authApi.changePassword(request);
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

// ========================
// LOGOUT
// ========================
// export const logoutUser = createAsyncThunk<void, void, ThunkConfig>(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await authApi.logout();
//       setAuthToken(null);
//     } catch (error) {
//       return rejectWithValue(handleAxiosError(error));
//     }
//   }
// );

export const logoutUser = createAsyncThunk<void, void, ThunkConfig>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      setAuthToken(null);
    } catch (error) {
      setAuthToken(null); // всё равно очищаем токен
      return rejectWithValue(handleAxiosError(error));
    }
  }
);

