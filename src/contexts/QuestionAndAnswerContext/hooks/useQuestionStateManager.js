import { useReducer } from "react";
import { useParams } from "react-router-dom";

import useReplyStateManager from "./useReplyStateManager";
import useQuestionApi from "../../../hooks/api/useQuestionApi";
import useQuestionLikeApi from "../../../hooks/api/useQuestionLikeApi";
import useQuestionWebSocket from "../../../hooks/websocket/useQuestionWebSocket";
import useReplyWebSocket from "../../../hooks/websocket/useReplyWebSocket";

import { useEventContext } from "../../EventContext";
import { useWebSocketConnectionContext } from "../../WebSocketConnectionContext";

import { QUESTIONS_ACTION_TYPE, questionsReducer } from "../questionsReducer";

const useQuestionStateManager = () => {
    const [questions, dispatchQuestions] = useReducer(questionsReducer, []);

    const { fetchQuestionReplies, handleNewReply } = useReplyStateManager(dispatchQuestions);

    const { eventId } = useParams();

    const { getSenderData } = useEventContext();

    const { getEventQuestions } = useQuestionApi();
    const { getQuestionLikes } = useQuestionLikeApi();

    const { webSocketClient } = useWebSocketConnectionContext();
    const { subscribeForEventQuestion, subscribeForQuestionLike } = useQuestionWebSocket(webSocketClient);
    const { subscribeForQuestionReply } = useReplyWebSocket(webSocketClient);

    const initializeQuestionState = async () => {
        const eventQuestions = await getEventQuestions(eventId);
        const questionsData = await Promise.all(
            eventQuestions.map(fetchQuestionData)
        );
        initializeQuestions(questionsData);
        subscribeForEventQuestion(eventId, handleNewQuestion);
    };

    const fetchQuestionData = async (question) => {
        const likes = await getQuestionLikes(question.eventId, question.id);
        const replies = await fetchQuestionReplies(question);
        
        return createQuestion(question, likes, replies);
    };

    const createQuestion = async (question, likes = [], replies = []) => {
        const sender = await getSenderData(question.senderId);

        subscribeForQuestionLike(question.eventId, question.id, likeQuestion);
        subscribeForQuestionReply(question.eventId, question.id, handleNewReply);

        return {
            ...question,
            sender,
            likes,
            replies
        };
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
        const newQuestion = await createQuestion(question);
        addQuestion(newQuestion);
    };

    return {
        questions,
        initializeQuestionState,
        likeQuestion
    };
};

export default useQuestionStateManager;
