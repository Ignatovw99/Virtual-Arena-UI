import styles from "./Banner.module.css";

const Banner = () => {
    return (
        <section className={styles["banner-container"]}>
            <div className={styles["text-container"]}>
                <h1 className={styles.title}>
                    Virtual Arena - Step into a World of Virtual Connection
                </h1>
                <h3 className={styles.slogan}>
                    Connect, Engage, Unleash the Virtual Experience
                </h3>
            </div>
            <div className={styles["logo-wrapper"]}>
                <div className={styles["logo-container"]}>
                    <img
                        className={styles.logo}
                        src="virtual-arena-logo.png"
                        alt="Virtual Arena Logo"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;
