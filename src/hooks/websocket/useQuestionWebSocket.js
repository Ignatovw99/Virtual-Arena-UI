import { executeWithConnectedClient } from "../../utils/websocket";

const useQuestionWebSocket = (client) => {

    const subscribeForEventQuestion = (eventId, handleQuestion) => {
        const subscribeForEventQuestionHandler = () => {
            return client.subscribe(`/topic/events/${eventId}/questions`, (questionFrame) => {
                const question = JSON.parse(questionFrame.body);
                handleQuestion(question);
            });
        };
        
        return executeWithConnectedClient(client, subscribeForEventQuestionHandler);
    };

    const subscribeForQuestionLike = (eventId, questionId, handleQuestionLike) => {
        const subscribeForQuestionLikeHandler = () => {
            return client.subscribe(`/topic/events/${eventId}/questions/${questionId}/likes`, (likeFrame) => {
                const like = JSON.parse(likeFrame.body);
                handleQuestionLike(like);
            });
        };
        
        return executeWithConnectedClient(client, subscribeForQuestionLikeHandler);
    };

    const sendQuestion = (eventId, content) => {
        executeWithConnectedClient(client, () => {
            client.send(`/app/events/${eventId}/questions`, {}, content);
        });
    };

    const likeQuestion = (eventId, questionId) => {
        executeWithConnectedClient(client, () => {
            client.send(`/app/events/${eventId}/questions/${questionId}/likes`);
        });
    };

    return {
        subscribeForEventQuestion,
        subscribeForQuestionLike,
        sendQuestion,
        likeQuestion
    };
};

export default useQuestionWebSocket;
