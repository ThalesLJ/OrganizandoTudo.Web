import "../../index.css";
import { Navigate, Outlet } from 'react-router-dom';
import { Observer } from "mobx-react-lite";
import Auth from "../../context/Auth";

export default function EntryApp() {
  const shouldRedirect = Auth.isTokenValid();

  return (
    shouldRedirect
      ? <>
        <Observer>
          {() => (
            <Navigate to="/Notes" />
          )}
        </Observer>
      </>
      : <><Outlet></Outlet></>
  )
}
