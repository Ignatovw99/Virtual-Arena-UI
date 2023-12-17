import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer>
            <div className={styles["footer-column"]}>
                <div className={styles["logo-container"]}>
                    <a
                        className={styles["logo-link"]}
                        href="/"
                    >
                        <img
                            className={styles["logo-image"]}
                            src="/virtual-arena-logo.png"
                            alt="Virtual Arena Logo"
                        />
                    </a>
                </div>
            </div>
            <div className={styles["footer-column"]}>
                <h4>Events</h4>
                <ul>
                    <li>
                        <a href="/events">All Events</a>
                    </li>
                    <li>
                        <a href="/events">Create Event</a>
                    </li>
                    <li>
                        <a href="/events">Upcoming Events</a>
                    </li>
                    <li>
                        <a href="/events">Past Events</a>
                    </li>
                </ul>
            </div>
            <div className={styles["footer-column"]}>
                <h4>My Profile</h4>
                <ul>
                    <li>
                        <a href="/profile">Profile Details</a>
                    </li>
                    <li>
                        <a href="/profile">My Events</a>
                    </li>
                </ul>
            </div>
            <div className={styles["footer-column"]}>
                <h4>Follow us</h4>
                <div className={styles["social-links"]}>
                    <a href="/facebook">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="/twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="/instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="/linkedin">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                </div>
                <p className={styles["all-rights-reserved"]}>
                    © Virtual Arena 2023. All Rights Reserved.
                    <br />
                    Developed by Lyuboslav Ignatov.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
