import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import EventsCatalog from "./components/EventsCatalog";
import Event from "./components/Event";

import { UserProvider } from "./contexts/UserContext";

import styles from "./App.module.css";
import UpdateUserProfile from "./components/UpdateUserProfile";
import OrganizeEvent from "./components/OrganizeEvent/OrganizeEvent";
import { WebSocketConnectionProvider } from "./contexts/WebSocketConnectionContext";
import { EventContextProvider } from "./contexts/EventContext";

function App() {
    return (
        <UserProvider>
            <Header />
            <div className={styles["app-body"]}>
                <Banner />
                <EventsCatalog />
                <UpdateUserProfile />
                <OrganizeEvent />
                <WebSocketConnectionProvider>
                    <EventContextProvider>
                        <Event />
                    </EventContextProvider>
                </WebSocketConnectionProvider>
            </div>
            <Footer />
        </UserProvider>
    );
}

export default App;
