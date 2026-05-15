import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import { theme } from "./styles/theme.ts";
import { ThemeProvider } from "@emotion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { ThemeProvider as CustomThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <CustomThemeProvider>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </CustomThemeProvider>,
);
