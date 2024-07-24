import "./styles.css";
import { Navigate, Outlet } from 'react-router-dom';
import { Observer } from "mobx-react-lite";
import Auth from "../../services/Auth";

export default function EntryApp() {
  return (
    Auth.isTokenValid()
      ? <>
        <Observer>
          {() => (
            <Navigate to="/notes" />
          )}
        </Observer>
      </>
      : <><Outlet></Outlet></>
  )
}
