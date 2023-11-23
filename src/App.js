import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import EventsCatalog from "./components/EventsCatalog";
import Event from "./components/Event";

import styles from "./App.module.css";

function App() {
    return (
        <div>
            <Header />
            <div className={styles["app-body"]}>
                <Banner />
                <EventsCatalog />
                <Event />
            </div>
            <Footer />
        </div>
    );
}

export default App;
