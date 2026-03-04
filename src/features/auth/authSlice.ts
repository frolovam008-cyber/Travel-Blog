
import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/types";
import { loginUser, registerUser, logoutUser, fetchUser, updateUserThunk, changePasswordThunk } from "./authThunk";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuth: !!localStorage.getItem("token"),
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Login failed";
    });

    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Registration failed";
    });

    // LOGOUT
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuth = false;
      state.loading = false;
      state.error = null;
    });

    // FETCH CURRENT USER
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    // builder.addCase(fetchUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload ?? null;
    // });
    builder.addCase(fetchUser.rejected, (state, action) => {
  state.loading = false;
  state.user = null;
  state.isAuth = false;   // <-- важно
  state.error = action.payload ?? null;
});

    // UPDATE USER
    builder.addCase(updateUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; // 🔥 Header обновится сразу
      });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });

    // CHANGE PASSWORD
    builder.addCase(changePasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePasswordThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changePasswordThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });
  },
});

export default authSlice.reducer;


