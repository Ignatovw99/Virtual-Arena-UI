import { useState } from "react";

import Form from "../../components/Form";
import { InputField, ImageField, TextareaField } from "../../components/Field";
import LoadingSpinner from "../../components/LoadingSpinner";
import { SuccessAlert, ErrorAlert } from "../../components/Alert";

import { useUserContext } from "../../contexts/UserContext";
import { useAlert } from "../../hooks/useAlert";
import useNavigateAfterShowingAlert from "../../hooks/useNavigateAfterShowingAlert";
import useUserApi from "../../hooks/api/useUserApi";

import { changeStateValueHandler, createFormData, createEmptyFile } from "../../utils/request";

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
    USER_UPDATED_SUCCESSFULLY
} from "./constants";

const UpdateUserProfile = () => {
    const { user: authenticatedUser } = useUserContext();
    const [user, setUser] = useState({ ...authenticatedUser });
    const [pictureFile, setPictureFile] = useState(null);
    const { updateUserProfile, loading } = useUserApi({
        includeLoading: true
    });
    const { alert, showAlert } = useAlert();
    const navigateAfterShowingAlert = useNavigateAfterShowingAlert(alert);

    const updateUserHandler = async (event) => {
        event.preventDefault();
        const formData = createFormData(user);

        const pictureToSent = pictureFile || user.profilePicture ?
            pictureFile :
            createEmptyFile();

        formData.append("pictureFile", pictureToSent);

        try {
            await updateUserProfile(formData);
            showAlert(SuccessAlert, USER_UPDATED_SUCCESSFULLY);
            navigateAfterShowingAlert("/profile");
        } catch (errorResponse) {
            showAlert(ErrorAlert, errorResponse.message);
        }
    };

    const changeUserValueHandler = (event) => changeStateValueHandler(event, setUser);

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
