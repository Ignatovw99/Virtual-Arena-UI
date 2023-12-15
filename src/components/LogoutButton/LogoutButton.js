import { useAuth0 } from "@auth0/auth0-react";

import styles from "./LogoutButton.module.css";

const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => logout({ logoutParams: { returnTo: window.location.origin } });

    return (
        <button
            className={styles.logout}
            onClick={handleLogout}
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
