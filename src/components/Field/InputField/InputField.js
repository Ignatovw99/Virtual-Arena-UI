import styles from "./InputField.module.css";

const InputField = ({
    name,
    label,
    value,
    onChange,
    type = "text",
    autoComplete = "off"
}) => {
    const inputValue = value || "";
    
    return (
        <div className={styles["input-container"]}>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={inputValue}
                onChange={onChange}
                autoComplete={autoComplete}
            />
        </div>
    );
};

export default InputField;
