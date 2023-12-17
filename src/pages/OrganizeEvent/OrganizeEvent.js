import { useState } from "react";

import Form from "../../components/Form";
import { InputField, ImageField, TextareaField, DropdownField } from "../../components/Field";
import LoadingSpinner from "../../components/LoadingSpinner";
import { SuccessAlert, ErrorAlert } from "../../components/Alert";

import useEventApi from "../../hooks/api/useEventApi";
import useNavigateAfterShowingAlert from "../../hooks/useNavigateAfterShowingAlert";

import { changeStateValueHandler, createFormData } from "../../utils/request";

import {
    ORGANIZE_EVENT_FORM_TITLE,
    ORGANIZE_EVENT_SUBMIT_BUTTON,
    TITLE_FIELD_NAME,
    TITLE_FIELD_LABEL,
    IMAGE_FIELD_NAME,
    IMAGE_FIELD_LABEL,
    DESCRIPTION_FIELD_NAME,
    DESCRIPTION_FIELD_LABEL,
    START_DATE_TIME_FIELD_NAME,
    START_DATE_TIME_FIELD_LABEL,
    CATEGORY_FIELD_NAME,
    CATEGORY_FIELD_LABEL,
    EVENT_ORGANIZED_SUCCESSFULLY
} from "./constants";
import { EVENT_CATEGORY_OPTIONS } from "../../constants/common";

const CATEGORY_DROPDOWN_OPTIONS = Object.entries(EVENT_CATEGORY_OPTIONS)
    .map(([value, label]) => ({ label, value }));

const OrganizeEvent = () => {
    const [event, setEvent] = useState({
        title: "",
        description: "",
        startDateTime: "",
        category: "",
        imageFile: null
    });
    const { createEvent, loading, alert, showAlert } = useEventApi({
        includeLoading: true,
        includeAlert: true
    });
    const navigateAfterShowingAlert = useNavigateAfterShowingAlert(alert);

    const organizeEventHandler = async (e) => {
        e.preventDefault();
        const eventFormData = createFormData(event);

        try {
            const event = await createEvent(eventFormData);
            showAlert(SuccessAlert, EVENT_ORGANIZED_SUCCESSFULLY);
            navigateAfterShowingAlert(`/events/${event.id}`);
        } catch (errorResponse) {
            showAlert(ErrorAlert, errorResponse.message);
        }
    };

    const changeEventValueHandler = (e) => changeStateValueHandler(e, setEvent);

    const uploadEventImage = (file) => {
        setEvent(state => ({
            ...state,
            imageFile: file
        }));
    };

    const clearEventImage = () => {
        setEvent(state => ({
            ...state,
            imageFile: null
        }));
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            {alert}
            <Form
                title={ORGANIZE_EVENT_FORM_TITLE}
                submitValue={ORGANIZE_EVENT_SUBMIT_BUTTON}
                submitAction={organizeEventHandler}
            >
                <InputField
                    name={TITLE_FIELD_NAME}
                    label={TITLE_FIELD_LABEL}
                    value={event.title}
                    onChange={changeEventValueHandler}
                />
                <ImageField
                    name={IMAGE_FIELD_NAME}
                    label={IMAGE_FIELD_LABEL}
                    handleImageUpload={uploadEventImage}
                    handleImageClear={clearEventImage}
                />
                <TextareaField
                    name={DESCRIPTION_FIELD_NAME}
                    label={DESCRIPTION_FIELD_LABEL}
                    value={event.description}
                    onChange={changeEventValueHandler}
                />
                <InputField
                    name={START_DATE_TIME_FIELD_NAME}
                    label={START_DATE_TIME_FIELD_LABEL}
                    type="datetime-local"
                    value={event.startDateTime}
                    onChange={changeEventValueHandler}
                />
                <DropdownField
                    name={CATEGORY_FIELD_NAME}
                    label={CATEGORY_FIELD_LABEL}
                    value={event.category}
                    options={CATEGORY_DROPDOWN_OPTIONS}
                    onChange={changeEventValueHandler}
                />
            </Form>
        </>
    );
};

export default OrganizeEvent;
