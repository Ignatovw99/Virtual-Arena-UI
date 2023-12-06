import styles from "./DropdownField.module.css";

const DropdownField = ({
    name,
    label,
    value,
    options,
    onChange
}) => {
    const selectedValue = value || "";

    return (
        <div className={styles["dropdown-container"]}>
            <label htmlFor={name}>
                {label}
            </label>
            <select
                name={name}
                id={name}
                value={selectedValue}
                onChange={onChange}
            >
                <option disabled={true} value="">
                    Select an option
                </option>
                {options.map(option =>
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                )}
            </select>
        </div>
    );
};

export default DropdownField;
