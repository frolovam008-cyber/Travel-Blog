import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";


export const AppLayout: React.FC = () => {
  const location = useLocation();
  const variant = location.pathname === "/" ? "home" : "inner";

  return (
    <>
      <Header variant={variant} />

      <div className="container">
        <main className="main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};