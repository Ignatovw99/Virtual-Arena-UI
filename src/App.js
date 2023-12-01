import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import EventsCatalog from "./components/EventsCatalog";
import Event from "./components/Event";

import { UserProvider } from "./contexts/UserContext";

import styles from "./App.module.css";

function App() {
    return (
        <UserProvider>
            <Header />
            <div className={styles["app-body"]}>
                <Banner />
                <EventsCatalog />
                <Event />
            </div>
            <Footer />
        </UserProvider>
    );
}

export default App;
