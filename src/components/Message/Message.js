import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

import styles from "./Message.module.css";

const Message = () => {
    return (
        <div className={styles["message-container-wrapper"]}>
            <img
                className={styles["sender-image"]}
                src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*"
                alt="Sender"
            />
            <div className={styles["message-container"]}>
                <div className={styles["sender-container"]}>
                    <p className={styles["sender"]}>
                        John Terry
                    </p>
                    <div className={styles["message-actions-container"]}>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className={styles["like-button"]}
                        />
                        <p className={styles.time}>
                            4:58 PM
                        </p>
                    </div>
                </div>
                <p className={styles.content}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
                    blanditiis voluptate sit sed ut magni omnis et, expedita est tenetur
                    ratione, ducimus tempore consequatur sapiente saepe illo deserunt autem
                    dicta.
                </p>
            </div>
        </div>
    );
};

export default Message;
