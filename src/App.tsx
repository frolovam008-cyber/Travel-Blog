import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./hooks/useAppSelectorDispatch";
import { fetchUser } from "@/features/auth/authThunk"
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // при монтировании приложения подгружаем данные пользователя
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
      />
    </>
  );
}

export default App;