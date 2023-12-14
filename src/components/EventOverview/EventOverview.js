import LoadingSpinner from "../LoadingSpinner";
import { ErrorAlert, SuccessAlert } from "../Alert";

import { useAlertOnce } from "../../hooks/useAlert";
import { useEventContext } from "../../contexts/EventContext";
import useEventParticipantsApi from "../../hooks/api/useEventParticipantsApi";

import { formatDate } from "../../utils";
import { getEventCategoryLabel, getEventImageUrl } from "../../utils/event";

import styles from "./EventOverview.module.css";

import { EVENT_SIGN_UP_SUCCESSFUL } from "./constants";

const EventOverview = ({
    event,
    loading,
    error
}) => {
    const { participants } = useEventContext();
    const {
        signUpForEvent,
        loading: loadingEventSignUp,
        alert,
        showAlert
    } = useEventParticipantsApi({ includeLoading: true, includeAlert: true });
    const {
        alert: errorAlert,
        showAlert: showErrorAlert
    } = useAlertOnce();


    if (loading || loadingEventSignUp) {
        return <LoadingSpinner />;
    }

    if (error) {
        showErrorAlert(ErrorAlert, error);
    }

    const handleSignUpForEvent = (e) => {
        e.preventDefault();

        signUpForEvent(event.id)
            .then(() => showAlert(SuccessAlert, EVENT_SIGN_UP_SUCCESSFUL))
            .catch(error => showAlert(ErrorAlert, error.message));
    };

    const organizer = event.organizer;

    return (
        <>
            {errorAlert}
            {alert}
            <div className={styles["overview-wrapper"]}>
                <div className={styles["overview-container"]}>
                    <div className={styles["event-image-container"]}>
                        <img
                            className={styles["event-image"]}
                            src={getEventImageUrl(event.imageUrl)}
                            alt={event.title}
                        />
                    </div>
                    <div className={styles["overview-content-container"]}>
                        <p className={styles.topic}>
                            Category <br /> {getEventCategoryLabel(event.category)}
                        </p>
                        <div className={styles["organizer-container"]}>
                            <img
                                className={styles["organizer-image"]}
                                src={organizer && organizer.profilePicture}
                                alt={organizer && organizer.fullName}
                            />
                            <p className={styles["organizer-name"]}>
                                Organizer - {organizer && organizer.fullName}
                            </p>
                        </div>
                        <p className={`${styles.status} ${styles.ongoing}`}>
                            Ongoing
                        </p>
                        <p className={styles["start-date-time"]}>
                            Start: {formatDate(event.startDateTime, "DD.MM.YYYY, HH:mm")}
                        </p>
                        <p className={styles["participants-count"]}>
                            Participants: {participants.length}
                        </p>
                        <p className={styles.description}>
                            {event.description}
                        </p>
                    </div>
                </div>
                <div className={styles["event-buttons-container"]}>
                    <button onClick={handleSignUpForEvent}>
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

const withEventData = (WrapperComponent) => {
    return (props) => {
        const { event, loading, error } = useEventContext();

        return (
            <WrapperComponent
                event={event}
                error={error}
                loading={loading}
                {...props}
            />
        );
    };
};

export const EventOverviewWithData = withEventData(EventOverview);

export default EventOverview;
