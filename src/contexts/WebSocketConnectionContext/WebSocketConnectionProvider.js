import { useState, useEffect, useRef } from "react";

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useAuth0 } from "@auth0/auth0-react";

import WebSocketConnectionContext from "./WebSocketConnectionContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ErrorAlert } from "../../components/Alert";
import { useAlert } from "../../hooks/useAlert";

const WS_SERVER_URL = process.env.REACT_APP_WEBSOCKET_SERVER_URL;
const WS_AUTHORIZATION_HEADER = "X-Authorization";
const WS_CONNECTION_INTERRUPTED = "WebSocket connection interrupted";

const WebSocketConnectionProvider = ({
    children
}) => {
    const webSocketClientRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();
    const { alert, showAlert } = useAlert();

    useEffect(() => {
        connectToWebSocketServer();

        return () => {
            const webSocketClient = webSocketClientRef.current;
            if (webSocketClient) {
                webSocketClient.disconnect();
            }
        }

        // eslint-disable-next-line
    }, []);

    const connectToWebSocketServer = async () => {
        const accessToken = await getAccessToken();

        const webSocket = new SockJS(WS_SERVER_URL);
        const stompClient = Stomp.over(webSocket);

        stompClient.connect({ [WS_AUTHORIZATION_HEADER]: accessToken },
            () => handleSuccessfulConnection(stompClient),
            handleConnectionError);

        return stompClient;
    };

    const getAccessToken = async () => {
        try {
            return await getAccessTokenSilently();
        } catch (error) {
            return "";
        }
    };

    const handleSuccessfulConnection = (stompClient) => {
        webSocketClientRef.current = stompClient;
        setLoading(false);
    };

    const handleConnectionError = (error) => {
        showAlert(ErrorAlert, WS_CONNECTION_INTERRUPTED);
        setLoading(false);
    };

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <WebSocketConnectionContext.Provider value={{
            webSocketClient: webSocketClientRef.current
        }}>
            {alert}
            {children}
        </WebSocketConnectionContext.Provider>
    );
};

export default WebSocketConnectionProvider;
