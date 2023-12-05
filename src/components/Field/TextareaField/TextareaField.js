import styles from "./TextareaField.module.css";

export const TextareaField = ({
    name,
    label,
    value,
    onChange
}) => {
    const textareaValue = value || "";

    return (
        <div className={styles["input-container"]}>
            <label htmlFor={name}>{label}</label>
            <textarea
                name={name}
                id={name}
                value={textareaValue}
                onChange={onChange}
            />
        </div>
    );
};

export default TextareaField;
