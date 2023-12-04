import { useState } from "react";

import Form from "../Form";
import { InputField, ImageField, TextareaField } from "../Field";
import LoadingSpinner from "../LoadingSpinner";
import { SuccessAlert, ErrorAlert } from "../Alert";
import { useUserContext } from "../../contexts/UserContext";
import { useAlert } from "../../hooks/useAlert";
import useUserApi from "../../hooks/useUserApi";

import { createEmptyFile, normalizeValue } from "../../utils/request";

import {
    UPDATE_USER_FORM_TITLE,
    UPDATE_USER_SUBMIT_BUTTON,
    EMAIL_FIELD_LABEL,
    EMAIL_FIELD_NAME,
    FULL_NAME_FIELD_LABEL,
    FULL_NAME_FIELD_NAME,
    PHONE_NUMBER_FIELD_LABEL,
    PHONE_NUMBER_NAME_FIELD_NAME,
    PROFILE_PICTURE_FIELD_LABEL,
    PROFILE_PICTURE_FIELD_NAME,
    BIO_FIELD_LABEL,
    BIO_FIELD_NAME,
} from "./constants";

const UpdateUserProfile = () => {
    const { user: authenticatedUser } = useUserContext();
    const [user, setUser] = useState({ ...authenticatedUser });
    const [pictureFile, setPictureFile] = useState(null);
    const { updateUserProfile, loading } = useUserApi({
        includeLoading: true
    });
    const { alert, showAlert } = useAlert();

    const updateUserHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        Object.entries(user)
            .map(([property, value]) => [property, normalizeValue(value)])
            .filter(([property, value]) => value)
            .forEach(([property, value]) => formData.append(property, value));

        const pictureToSent = pictureFile || user.profilePicture ?
            pictureFile :
            createEmptyFile();

        formData.append("pictureFile", pictureToSent);

        try {
            await updateUserProfile(formData);
            showAlert(SuccessAlert, "User updated successfully");
        } catch (errorResponse) {
            showAlert(ErrorAlert, errorResponse.message);
        }
    };

    const changeUserValueHandler = (event) => {
        const inputField = event.target;
        if (!inputField) {
            return;
        }

        setUser(state => ({
            ...state,
            [inputField.name]: inputField.value
        }));
    };

    const uploadProfilePicture = (file) => {
        setPictureFile(file);
    };

    const clearProfilePicture = () => {
        setPictureFile(null);
        setUser(state => ({
            ...state,
            profilePicture: null
        }));
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {alert}
            <Form
                title={UPDATE_USER_FORM_TITLE}
                submitValue={UPDATE_USER_SUBMIT_BUTTON}
                submitAction={updateUserHandler}
            >
                <InputField
                    name={EMAIL_FIELD_NAME}
                    label={EMAIL_FIELD_LABEL}
                    value={user.email}
                    onChange={changeUserValueHandler}
                />
                <ImageField
                    name={PROFILE_PICTURE_FIELD_NAME}
                    label={PROFILE_PICTURE_FIELD_LABEL}
                    source={user.profilePicture}
                    handleImageUpload={uploadProfilePicture}
                    handleImageClear={clearProfilePicture}
                />
                <InputField
                    name={FULL_NAME_FIELD_NAME}
                    label={FULL_NAME_FIELD_LABEL}
                    value={user.fullName}
                    onChange={changeUserValueHandler}
                />
                <InputField
                    name={PHONE_NUMBER_NAME_FIELD_NAME}
                    label={PHONE_NUMBER_FIELD_LABEL}
                    value={user.phoneNumber}
                    onChange={changeUserValueHandler}
                />
                <TextareaField
                    name={BIO_FIELD_NAME}
                    label={BIO_FIELD_LABEL}
                    value={user.bio}
                    onChange={changeUserValueHandler}
                />
            </Form>
        </>
    );
};

export default UpdateUserProfile;
