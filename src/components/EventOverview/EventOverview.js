import styles from "./EventOverview.module.css";

const EventOverview = () => {
    return (
        <div className={styles["overview-wrapper"]}>
            <div className={styles["overview-container"]}>
                <div className={styles["event-image-container"]}>
                    <img
                        className={styles["event-image"]}
                        src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg"
                        alt="Event's title"
                    />
                </div>
                <div className={styles["overview-content-container"]}>
                    <p className={styles.topic}>
                        Topic - Lifestyle and Hobbies
                    </p>
                    <div className={styles["organizer-container"]}>
                        <img
                            className={styles["organizer-image"]}
                            src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                            alt="Event's organizer"
                        />
                        <p className={styles["organizer-name"]}>
                            Organizer - John Smith
                        </p>
                    </div>
                    <p className={`${styles.status} ${styles.ongoing}`}>
                        Ongoing
                    </p>
                    <p className={styles["start-date-time"]}>
                        Start: 28.01.2024, 20:30
                    </p>
                    <p className={styles["participants-count"]}>
                        Participants: 176
                    </p>
                    <p className={styles.description}>
                        Lorem ipsum lit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, atque laborum! Autem, possimus veritatis sunt necessitatibus rerum accusantium sit, quam placeat, labore dolorem sapiente excepturi quibusdam quis non odit neque.    Archintur quibusdam explicabo hic sit.
                    </p>
                </div>
            </div>
            <div className={styles["event-buttons-container"]}>
                <button>Participate</button>
            </div>
        </div>
    );
};

export default EventOverview;
