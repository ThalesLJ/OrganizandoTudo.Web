import { Navigate, Outlet } from "react-router-dom";
import Auth from "../services/Auth";
import TokenValidator from "../services/TokenValidator";
import { Observer } from "mobx-react-lite";

const Authorized = () => {
    TokenValidator();

    return (
        Auth.isTokenValid()
            ? <Observer>
                {() => (
                    <Outlet></Outlet>
                )}
            </Observer>
            : <Observer>
                {() => (
                    <Navigate to="/" />
                )}
            </Observer>
    )
}

export default Authorized;