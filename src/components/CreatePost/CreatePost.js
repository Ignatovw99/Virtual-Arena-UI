import { useUserContext } from "../../contexts/UserContext";

import styles from "./CreatePost.module.css";

const CreatePost = ({
    buttonLabel
}) => {
    const { user } = useUserContext();

    return (
        <div className={styles["post-container-wrapper"]}>
            <img
                className={styles["sender-image"]}
                src={user.profilePicture}
                alt={user.fullName}
            />
            <div className={styles["post-container"]}>
                <div className={styles["sender-container"]}>
                    <p className={styles["sender"]}>
                        {user.fullName}
                    </p>
                </div>
                <form className={styles["post-form"]}>
                    <textarea
                        className={styles["textarea-content"]}
                        name="content"
                        id="content"
                    />
                    <button className={styles["post-button"]}>
                        {buttonLabel}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
