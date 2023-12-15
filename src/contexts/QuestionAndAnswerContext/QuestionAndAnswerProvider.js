import { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import QuestionAndAnswerContext from "./QuestionAndAnswerContext";

import useQuestionApi from "../../hooks/api/useQuestionApi";
import useUserApi from "../../hooks/api/useUserApi";
import useQuestionLikeApi from "../../hooks/api/useQuestionLikeApi";
import useQuestionWebSocket from "../../hooks/websocket/useQuestionWebSocket";

import { useEventContext } from "../EventContext";
import { useWebSocketConnectionContext } from "../WebSocketConnectionContext";

import { QUESTIONS_ACTION_TYPE, questionsReducer } from "./questionsReducer";

const QuestionAndAnswerProvider = ({
    children
}) => {
    const [questions, dispatchQuestions] = useReducer(questionsReducer, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { eventId } = useParams();
    const { participants } = useEventContext();

    const { getEventQuestions } = useQuestionApi();
    const { getUserProfileById } = useUserApi();
    const { getQuestionLikes } = useQuestionLikeApi();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventQuestion, subscribeForQuestionLike } = useQuestionWebSocket(webSocketClient);

    useEffect(() => {
        setupQuestionAndAnswerContextProvider();

        // eslint-disable-next-line
    }, []);

    const setupQuestionAndAnswerContextProvider = async () => {
        try {
            const eventQuestions = await getEventQuestions(eventId);
            const questionsData = await Promise.all(
                eventQuestions.map(fetchQuestionDetailedData)
            );
            initializeQuestions(questionsData);

            subscribeForEventQuestion(eventId, handleNewQuestion);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchQuestionDetailedData = async (question) => {
        const likes = await getQuestionLikes(question.eventId, question.id);
        return createDetailedQuestion(question, likes);
    };

    const createDetailedQuestion = async (question, likes) => {
        const sender = await getSenderData(question.senderId);
        subscribeForQuestionLike(question.eventId, question.id, likeQuestion)
        return {
            ...question,
            sender,
            likes
        };
    };

    const getSenderData = (senderId) => {
        const sender = participants.find(participant => participant.id === senderId);
        if (sender) {
            return sender;
        }
        return getUserProfileById(senderId);
    };

    const initializeQuestions = (questions) => {
        dispatchQuestions({
            type: QUESTIONS_ACTION_TYPE.initializeQuestions,
            payload: questions
        });
    };

    const addQuestion = async (question) => {
        dispatchQuestions({
            type: QUESTIONS_ACTION_TYPE.addQuestion,
            payload: question
        });
    };

    const likeQuestion = async (like) => {
        dispatchQuestions({
            type: QUESTIONS_ACTION_TYPE.likeQuestion,
            payload: like
        });
    };

    const handleNewQuestion = async (question) => {
        const newQuestion = await createDetailedQuestion(question, []);
        addQuestion(newQuestion);
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
