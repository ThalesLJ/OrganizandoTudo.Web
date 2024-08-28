import "./styles.css";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Observer } from "mobx-react-lite";
import Auth from "../../context/Auth";

export default function EntryApp() {
  const location = useLocation();
  const { pathname } = location;
  const shouldRedirect = Auth.isTokenValid() && !pathname.includes('/Note');

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
