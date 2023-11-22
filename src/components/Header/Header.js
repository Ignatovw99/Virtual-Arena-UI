import styles from "./Header.module.css";

const Header = () => {
    return (
        <header>
            <div className={styles["logo-container"]}>
                <a
                    className={styles["logo-link"]}
                    href="/"
                >
                    <img
                        className={styles["logo-image"]}
                        src="virtual-arena-logo.png"
                        alt="Virtual Arena Logo"
                    />
                </a>
            </div>
            <nav>
                <ul className={styles["navigation-links"]}>
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <li>
                        <a href="/my-events">My Events</a>
                    </li>
                    <li>
                        <a href="/event-create">Create Event</a>
                    </li>
                </ul>
            </nav>
            <div className={styles["profile-container"]}>
                <img
                    className={styles["profile-image"]}
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Profile"
                />
                <div className={styles["profile-details"]}>
                    <p className={styles["profile-name"]}>
                        Lyuboslav Ignatov
                    </p>
                    <div className={styles["profile-actions-container"]}>
                        <a
                            className={styles["profile-link"]}
                            href="/my-profile"
                        >
                            My Profile
                        </a>
                        <a
                            className={styles.logout}
                            href="/my-profile"
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
