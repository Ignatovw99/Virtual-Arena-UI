import EventsCatalog from "../../components/EventsCatalog";
import { useUserContext } from "../../contexts/UserContext";

const UserEvents = () => {
    const { user } = useUserContext();

    return (
        <div>
            <h1 style={{ fontSize: "30px", fontWeight: 600, paddingTop: "40px", color: "black" }}>
                My Events
            </h1>
            <EventsCatalog userId={user.id} />
        </div>
    );

};

export default UserEvents;
