import React from "react";
import { RegisterForm } from "@/components/RegisterForm/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="register-page">
  <RegisterForm/>
    </div>
  );
};

export default RegisterPage;