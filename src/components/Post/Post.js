import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import { formatDate } from '../../utils';

import styles from "./Post.module.css";

const Post = ({
    content,
    sender,
    timestamp
}) => {
    return (
        <div className={styles["post-container-wrapper"]}>
            <img
                className={styles["sender-image"]}
                src={sender.profilePicture}
                alt={sender.fullName}
            />
            <div className={styles["post-container"]}>
                <div className={styles["sender-container"]}>
                    <p className={styles["sender"]}>
                        {sender.fullName}
                    </p>
                    <div className={styles["post-actions-container"]}>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className={styles["like-button"]}
                        />
                        <p className={styles.time}>
                            {formatDate(timestamp, "HH:mm:ss")}
                        </p>
                    </div>
                </div>
                <p className={styles.content}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default Post;
