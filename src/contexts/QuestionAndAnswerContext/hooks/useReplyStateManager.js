import useReplyApi from "../../../hooks/api/useReplyApi";

import { useEventContext } from "../../EventContext";

const useReplyStateManager = () => {
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

    return { fetchQuestionReplies };
};

export default useReplyStateManager;
