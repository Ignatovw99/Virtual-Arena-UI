import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { useUserContext } from "../contexts/UserContext";

const PrivateRoute = ({
    children
}) => {
    const { isAuthenticated } = useUserContext();
    const { loginWithRedirect } = useAuth0();

    if (!isAuthenticated) {
        loginWithRedirect();
        return <Navigate to={"/"} replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;
