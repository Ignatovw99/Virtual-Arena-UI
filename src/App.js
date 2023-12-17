import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";

import styles from "./App.module.css";

function App() {
    return (
        <>
            <Header />
            <div className={styles["app-body"]}>
                <AppRoutes />
            </div>
            <Footer />
        </>
    );
}

export default App;
