import useReplyApi from "../../../hooks/api/useReplyApi";

import { useEventContext } from "../../EventContext";

import { QUESTIONS_ACTION_TYPE } from "../questionsReducer";

const useReplyStateManager = (dispatchQuestions) => {
    const { getQuestionReplies } = useReplyApi();

    const { getSenderData } = useEventContext();

    const fetchQuestionReplies = async (question) => {
        const questionReplies = await getQuestionReplies(question.eventId, question.id);
        return Promise.all(questionReplies.map(fetchReplyData));
    };

    const fetchReplyData = async (reply) => {
        const likes = [];
        return createReply(reply, likes);
    };

    const createReply = async (reply, likes = []) => {
        const sender = await getSenderData(reply.senderId);
        return {
            ...reply,
            likes,
            sender
        };
    };

    const handleNewReply = async (reply) => {
        const newReply = await createReply(reply);
        addQuestionReply(newReply);
    };

    const addQuestionReply = async (reply) => {
        dispatchQuestions({
            type: QUESTIONS_ACTION_TYPE.addReply,
            payload: reply
        });
    };

    return {
        fetchQuestionReplies,
        handleNewReply
    };
};

export default useReplyStateManager;
