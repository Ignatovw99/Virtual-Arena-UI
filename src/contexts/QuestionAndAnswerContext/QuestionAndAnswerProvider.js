import { useState, useEffect } from "react";

import QuestionAndAnswerContext from "./QuestionAndAnswerContext";

import useQuestionStateManager from "./hooks/useQuestionStateManager";
import { useEventContext } from "../EventContext";

const QuestionAndAnswerProvider = ({
    children
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        questions,
        initializeQuestionState,
        likeQuestion
    } = useQuestionStateManager();

    const { loading: eventLoading } = useEventContext();

    useEffect(() => {
        setupQuestionAndAnswerContextProvider();

        // eslint-disable-next-line
    }, [eventLoading]);

    const setupQuestionAndAnswerContextProvider = async () => {
        if (eventLoading) {
            return;
        }
        // TODO: do not subscribe if the user is not participant in the event TODO:
        try {
            initializeQuestionState();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <QuestionAndAnswerContext.Provider value={{
            questions,
            loading,
            error,
            likeQuestion
        }}>
            {children}
        </QuestionAndAnswerContext.Provider>
    );
};

export default QuestionAndAnswerProvider;
