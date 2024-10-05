import { useState } from "react";
import useUserSession from "../hooks/useLoadUserSession";

interface UserSessionProps {}

const UserSession: React.FC<UserSessionProps> = ({}) => {
    const [isSessionLoadScheduled, setSessionLoadScheduled] = useState(false);
    const { loadUserSession, createBackendUserSession } = useUserSession();

    const userSession1 = loadUserSession();
    let userSessionId2;
    if (userSession1.userId == 'anon' && !isSessionLoadScheduled) {
        createBackendUserSession();
        setSessionLoadScheduled(prev => prev ? prev : !prev)
        userSessionId2 = loadUserSession();
    }
    const userSession = userSession1 || userSessionId2;

    return (
        <div style={{ marginLeft: "0px" }}>
            you: @
            <pre style={{ display: "inline", padding: "2px", margin: "0" }}>
                {userSession.userName}
            </pre>
        </div>
    );
};

export default UserSession;
