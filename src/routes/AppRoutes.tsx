import { Routes, Route } from "react-router-dom";

// Layout
import { AppLayout } from "@/components/layout/AppLayout.tsx";

// Страницы
import { Home } from "@/pages/Home/Home";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage/RegisterPage";
import { PostPage } from "@/pages/PostPage/PostPage";
import { CreatePostPage } from "@/pages/CreatePostPage/CreatePostPage";
import { AddCommentPage } from "@/pages/AddCommentPage/AddCommentPage";
import { ProfileUpdatePage } from "@/pages/ProfileUpdatePage/ProfileUpdatePage";
import { UserProfilePage } from "@/pages/UserProfilePage/UserProfilePage";

// PrivateRoute
import { PrivateRoute } from "@/routes/PrivetRoutes";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      {/* Главная — публичная */}
      <Route index element={<Home />} />

      {/* Публичные страницы */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      {/* Просмотр постов — публично */}
      <Route path="posts/:id" element={<PostPage />} />

      {/* Приватные страницы */}
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="profile/update"
        element={
          <PrivateRoute>
            <ProfileUpdatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="posts/create"
        element={
          <PrivateRoute>
            <CreatePostPage />
          </PrivateRoute>
        }
      />
      <Route
        path="posts/:id/comment"
        element={
          <PrivateRoute>
            <AddCommentPage />
          </PrivateRoute>
        }
      />
    </Route>
  </Routes>
);
