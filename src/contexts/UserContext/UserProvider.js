import UserContext from "./UserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import useAuthenticatedUserApi from "./hooks/useAuthenticatedUserApi";

const UserProvider = ({
    children
}) => {
    const { user, isAuthenticated, setUser, loading, alert } = useAuthenticatedUserApi();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <UserContext.Provider value={{
            user: isAuthenticated ? user : null,
            isAuthenticated,
            updateUser: (user) => setUser(user)
        }}>
            {alert}
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
