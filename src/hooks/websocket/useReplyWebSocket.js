import { executeWithConnectedClient } from "../../utils/websocket";

const useReplyWebSocket = (client) => {

    const subscribeForQuestionReply = (eventId, questionId, handleReply) => {
        const subscribeForQuestionReplyHandler = () => {
            return client.subscribe(`/topic/events/${eventId}/questions/${questionId}/replies`, (replyFrame) => {
                const reply = JSON.parse(replyFrame.body);
                handleReply(reply);
            });
        };
        
        return executeWithConnectedClient(client, subscribeForQuestionReplyHandler);
    };

    const sendReply = (eventId, questionId, content) => {
        executeWithConnectedClient(client, () => {
            client.send(`/app/events/${eventId}/questions/${questionId}/replies`, {}, content);
        });
    };

    return {
        subscribeForQuestionReply,
        sendReply
    };
};

export default useReplyWebSocket;