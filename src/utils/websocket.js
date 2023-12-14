export const executeWithConnectedClient = (client, actionHandler) => {
    if (!(client && client.connected)) {
        return;
    }
    actionHandler();
};
