import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import UserProfile from "./pages/UserProfile";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import UserEvents from "./pages/UserEvents/UserEvents";
import OrganizeEvent from "./pages/OrganizeEvent/OrganizeEvent";
import { EventOverviewWithData } from "./pages/EventOverview";
import { QuestionAnswerSectionWithData } from "./pages/QuestionAnswerSection";

import EventLayout from "./layouts/EventLayout";
import PrivateRoute from "./security/PrivateRoute";
import EventParticipantChecker from "./security/EventParticipantChecker";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile-update" element={<UpdateUserProfile />} />
                <Route path="/my-events" element={<UserEvents />} />
                <Route path="/events-organize" element={<OrganizeEvent />} />
                <Route path="/events/:eventId" element={<EventLayout />}>
                    <Route index element={<EventOverviewWithData />} />
                    <Route path="questions-and-answers" element={
                        <EventParticipantChecker
                            redirect={true}
                        >
                            <QuestionAnswerSectionWithData />
                        </EventParticipantChecker>
                    } />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
