import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { useUserContext } from '../../contexts/UserContext';

import { formatDate } from '../../utils';

import styles from "./Post.module.css";

const Post = ({
    content,
    sender,
    timestamp,
    likes,
    likePost
}) => {
    const { user } = useUserContext();

    const isLikedByUser = likes.some(like => like.userId === user.id);

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
                        {isLikedByUser ?
                            <FontAwesomeIcon
                                icon={fasThumbsUp}
                                className={styles["liked-button"]}
                            /> :
                            <FontAwesomeIcon
                                icon={farThumbsUp}
                                className={styles["like-button"]}
                                onClick={likePost}
                            />
                        }
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
