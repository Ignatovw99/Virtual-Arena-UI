import { NavLink } from "react-router-dom";

import LogoutButton from "../../LogoutButton";

import styles from "./HeaderProfile.module.css";

const HeaderProfile = ({
    user
}) => {
    return (
        <div className={styles["profile-container"]}>
            <img
                className={styles["profile-image"]}
                src={user.profilePicture}
                alt={user.fullName}
            />
            <div className={styles["profile-details"]}>
                <p className={styles["profile-name"]}>
                    {user.fullName}
                </p>
                <div className={styles["profile-actions-container"]}>
                    <NavLink
                        to="/profile"
                        className={styles["profile-link"]}
                    >
                        My Profile
                    </NavLink>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export default HeaderProfile;
