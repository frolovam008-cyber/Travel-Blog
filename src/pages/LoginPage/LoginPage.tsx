import React from "react";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import "@/pages/LoginPage/LoginPage.scss";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <LoginForm onRegisterClick={() => navigate("/register")} />
    </div>
  );
};

export default LoginPage;