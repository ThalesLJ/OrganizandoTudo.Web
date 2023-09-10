import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import App from "./pages//App.js";
import Login from "./pages//Login.js";
import ForgotPassword from "./pages//ForgotPassword.js";
import ChangePassword from "./pages//ChangePassword.js";
import Notes from "./pages//Notes.js";
import Main from "./pages//Main.js";
import Settings from "./pages//Settings.js";
import ErrorPage from "./pages//ErrorPage.js";

const router = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="login" />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "change",
        element: <ChangePassword />,
      },
      {
        path: "app",
        element: <App />,
        children: [
          {
            path: "",
            element: <Navigate to="notes" />,
          },
          {
            path: "notes",
            element: <Notes />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
