import styles from "./EventItem.module.css";

const EventItem = () => {
    return (
        <div className={styles.event}>
            <img
                className={styles.image}
                src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg"
                alt="Event's title"
            />
            <div className={styles["event-info-container"]}>
                <p className={`${styles.title} ${styles["text-truncation"]}`}>
                    Master peetingMaster peeting dasd d saaef sadsd sa sa das sa das as
                </p>
                <div className={styles["organizer-container"]}>
                    <img
                        className={styles["organizer-image"]}
                        src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                        alt="Event's organizer"
                    />
                    <p className={`${styles["organizer-name"]} ${styles["text-truncation"]}`}>
                        By John Smith dsas
                    </p>
                </div>
                <div className={styles["event-metadata-container"]}>
                    <p className={`${styles.topic} ${styles["text-truncation"]}`}>
                        Lifestyle and Hobbies
                    </p>
                    <p className={styles["start-date-time"]}>
                        Start: 28.01.2024, 20:30
                    </p>
                </div>
                <div className={styles["description-container"]}>
                    <p className={`${styles.description} ${styles["text-truncation"]}`}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam magni consectetur asperiores eum laboriosam consequuntur enim nostrum quaerat sed! Necessitatibus voluptatem atque repudiandae tempora adipisci, numquam modi sit hic voluptates?</p>
                </div>
            </div>
        </div>
    );
};

export default EventItem;
