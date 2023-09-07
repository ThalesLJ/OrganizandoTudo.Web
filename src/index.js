import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import App from "./pages/controllers/App.js";
import CreateAccount from "./pages/controllers/CreateAccount.js";
import Login from "./pages/controllers/Login.js";
import ForgotPassword from "./pages/controllers/ForgotPassword.js";
import ChangePassword from "./pages/controllers/ChangePassword.js";
import Notes from "./pages/controllers/Notes.js";
import Account from "./pages/controllers/Account.js";
import Settings from "./pages/controllers/Settings.js";

import ErrorPage from "./pages/controllers/ErrorPage.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Account />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "create",
        element: <CreateAccount />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "change",
        element: <ChangePassword />,
      },
    ]
  },
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Notes />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);