import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Auth from "../context/Auth";

const PublicApp = () => {
    const location = useLocation();
    const { pathname } = location;
    const returnToNotes = Auth.isTokenValid && !pathname.includes('/Note/');

    return (returnToNotes ? <Navigate to="/Notes" /> : <Outlet></Outlet>)
}

export default PublicApp;