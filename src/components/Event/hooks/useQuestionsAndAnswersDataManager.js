import { useState, useReducer, useEffect } from "react";

import useQuestionApi from "../../../hooks/useQuestionApi";
import useUserApi from "../../../hooks/useUserApi";
import useQuestionLikeApi from "../../../hooks/useQuestionLikeApi";
import useQuestionWebSocket from "../../../hooks/websocket/useQuestionWebSocket";

import { useEventContext } from "../../../contexts/EventContext";
import { useWebSocketConnectionContext } from "../../../contexts/WebSocketConnectionContext";

const QUESTIONS_ACTION_TYPE = {
    initializeQuestions: "INITIALIZE_QUESTIONS",
    addQuestion: "ADD_QUESTION",
};

const QUESTIONS_REDUCER_HANDLERS = {
    INITIALIZE_QUESTIONS: (state, action) => [...action.payload],
    ADD_QUESTION: (state, action) => [action.payload, ...state]
};

const questionsReducer = (state, action) => {
    const questionsReducerHandler = QUESTIONS_REDUCER_HANDLERS[action.type];
    if (!questionsReducerHandler) {
        return state;
    }
    return questionsReducerHandler(state, action);
};

const useQuestionsAndAnswersDataManager = () => {
    const [questions, dispatchQuestions] = useReducer(questionsReducer, []);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { participants } = useEventContext();

    const { getEventQuestions } = useQuestionApi();
    const { getUserProfileById } = useUserApi();
    const { getQuestionLikes } = useQuestionLikeApi();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventQuestion } = useQuestionWebSocket(webSocketClient);

    useEffect(() => {
        setupQuestionsAndAnswersDataManager();

        // eslint-disable-next-line
    }, []);

    const setupQuestionsAndAnswersDataManager = async () => {
        try {
            const eventQuestions = await getEventQuestions(7);
            const questionsData = await Promise.all(
                eventQuestions.map(fetchQuestionDetailedData)
            );
            initializeQuestions(questionsData);

            subscribeForEventQuestion(7, handleNewQuestion);
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

    const handleNewQuestion = async (question) => {
        const newQuestion = createDetailedQuestion(question, []);
        addQuestion(newQuestion);
    };

    const createDetailedQuestion = async (question, likes) => {
        const sender = await getSenderData(question.senderId);
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

    return { questions, loading, error };
};

export default useQuestionsAndAnswersDataManager;
