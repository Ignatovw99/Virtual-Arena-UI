import { NavLink } from "react-router-dom";

import LoginButton from "../LoginButton";
import HeaderProfile from "./HeaderProfile";

import { useUserContext } from "../../contexts/UserContext";

import styles from "./Header.module.css";

const Header = () => {
    const { user, isAuthenticated } = useUserContext();

    return (
        <header>
            <div className={styles["logo-container"]}>
                <NavLink
                    to="/"
                    className={styles["logo-link"]}
                >
                    <img
                        className={styles["logo-image"]}
                        src="/virtual-arena-logo.png"
                        alt="Virtual Arena Logo"
                    />
                </NavLink>
            </div>
            <nav>
                <ul className={styles["navigation-links"]}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? styles.selected : ""}
                        >
                            Events
                        </NavLink>
                    </li>
                    {isAuthenticated &&
                        <>
                            <li>
                                <NavLink
                                    to="/my-events"
                                    className={({ isActive }) => isActive ? styles.selected : ""}
                                >
                                    My Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events-organize"
                                    className={({ isActive }) => isActive ? styles.selected : ""}
                                >
                                    Organize Event
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </nav>
            {isAuthenticated ?
                <HeaderProfile user={user} /> :
                <LoginButton />
            }
        </header>
    );
};

export default Header;
