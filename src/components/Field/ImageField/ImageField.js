import { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';

import styles from "./ImageField.module.css";

const ImageField = ({
    name,
    label,
    source,
    handleImageUpload,
    handleImageClear
}) => {
    const [image, setImage] = useState({
        content: source,
        name: source
    });
    const fileInputRef = useRef(null);

    const selectImage = (event) => {
        event.preventDefault();

        if (!fileInputRef.current) {
            return;
        }
        fileInputRef.current.click();
    };

    const clearImage = (event) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.files = new DataTransfer().files;
        }
        setImage(null);
        handleImageClear();
    };

    const uploadImage = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            const imageContent = e.target.result;
            setImage({
                name: selectedFile.name,
                content: imageContent
            });
            handleImageUpload(selectedFile);
        };

        fileReader.readAsDataURL(selectedFile);
    };

    const imageAreaContent = image && image.content ?
        <img src={image.content} alt="" /> :
        (<>
            <FontAwesomeIcon
                icon={faCloudUpload}
                className={styles["upload-cloud-icon"]}
            />
            <h3>Upload Image</h3>
        </>);

    return (
        <div>
            <label>{label}</label>
            <div className={styles["image-container"]}>
                <input
                    type="file"
                    id={name}
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={uploadImage}
                    hidden
                />
                <div
                    className={`${styles["image-area"]} ${image && image.content && styles.active}`}
                    data-image={image && image.name}
                >
                    {imageAreaContent}
                </div>
                <div className={styles["image-buttons-container"]}>
                    <button
                        className={styles["image-button"]}
                        onClick={selectImage}
                    >
                        Select Image
                    </button>
                    {image && image.content &&
                        <button
                            className={`${styles["image-button"]} ${styles["clear-image-button"]}`}
                            onClick={clearImage}
                        >
                            Clear
                        </button>}
                </div>
            </div>
        </div>
    );
};

export default ImageField;
