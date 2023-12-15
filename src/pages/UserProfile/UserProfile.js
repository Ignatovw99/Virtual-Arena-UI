import { useUserContext } from "../../contexts/UserContext";

import styles from "./UserProfile.module.css"

const UserProfile = () => {
    const { user, isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return;
    }

    return (
        <section className={styles["user-profile-section"]}>
            <div className={styles["left-container"]}>
                <img
                    className={styles["user-picture"]}
                    src={user.profilePicture}
                    alt={user.fullName}
                />
                <h4>
                    {user.fullName}
                </h4>
            </div>
            <div className={styles["right-container"]}>
                <div className={styles["profile-section"]}>
                    <h3 className={styles["profile-section-title"]}>
                        Information
                    </h3>
                    <div className={styles["info-data-container"]}>
                        <div className={styles["info-data"]}>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div className={styles["info-data"]}>
                            <h4>Phone</h4>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div className={styles["info-data"]}>
                            <h4>Joined On</h4>
                            <p>{user.createdAt}</p>
                        </div>
                    </div>
                </div>

                <div className={styles["profile-section"]}>
                    <h3 className={styles["profile-section-title"]}>
                        Bio
                    </h3>
                    <p className={styles.bio}>
                        {user.bio}
                    </p>
                </div>

                <div className={styles["profile-section"]}>
                    <h3 className={styles["profile-section-title"]}>
                        Taskbar
                    </h3>
                    <div className={styles["action-buttons"]}>
                        <button>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
