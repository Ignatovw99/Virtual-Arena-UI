import styles from "./Form.module.css";

const Form = ({
    title,
    submitValue,
    submitAction,
    children
}) => {
    return (
        <section className={styles.form}>
            <p>{title}</p>
            <form onSubmit={submitAction}>
                {children}
                <div>
                    <button type="submit">
                        {submitValue}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
