import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import useUserApi from "../../hooks/useUserApi";

const useAuthenticatedUserApi = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, isLoading: isAuthLoading, getIdTokenClaims } = useAuth0();
    const { getUserProfile, createUserProfile } = useUserApi({
        excludeLoading: true,
        excludeError: true
    });

    useEffect(() => {
        if (isAuthLoading) {
            return;
        }

        if (isAuthenticated) {
            loadAuthenticatedUserProfile();
        }

        setLoading(false);
        // eslint-disable-next-line
    }, [isAuthLoading, isAuthenticated]);


    const loadAuthenticatedUserProfile = async () => {
        try {
            const userProfile = await getUserProfile();
            setUser(userProfile);
        } catch {
            const idTokenClaims = await getIdTokenClaims();
            const createdUser = await createUserProfile(idTokenClaims);
            setUser(createdUser);
        }
    };

    return { user, loading };
};

export default useAuthenticatedUserApi;
