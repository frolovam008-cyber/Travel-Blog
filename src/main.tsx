import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 🔹 импорт React Query
import App from "./App";
import "./styles/_index.scss";

// 🔹 создаём QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}> {/* 🔹 обёртка для React Query */}
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);