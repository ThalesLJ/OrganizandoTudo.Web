import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Auth from "../context/Auth";

const PrivateApp = () => {
    const location = useLocation();
    const { pathname } = location;
    const returnToLogin = !Auth.isTokenValid && !pathname.includes('/Note/');

    return (returnToLogin ? <Navigate to="/" /> : <Outlet></Outlet>)
}

export default PrivateApp;