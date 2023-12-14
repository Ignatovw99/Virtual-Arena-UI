import { executeWithConnectedClient } from "../../utils/websocket";

const useQuestionWebSocket = (client) => {

    const subscribeForEventQuestion = (eventId, handleQuestion) => {
        const subscribeForEventQuestionHandler = () => {
            client.subscribe(`/topic/events/${eventId}/questions`, (questionFrame) => {
                const question = JSON.parse(questionFrame.body);
                handleQuestion(question);
            });
        };
        
        executeWithConnectedClient(client, subscribeForEventQuestionHandler);
    };

    const sendQuestion = (eventId, content) => {
        executeWithConnectedClient(client, () => {
            client.send(`/app/events/${eventId}/questions`, {}, content);
        });
    };

    return {
        subscribeForEventQuestion,
        sendQuestion
    };
};

export default useQuestionWebSocket;
