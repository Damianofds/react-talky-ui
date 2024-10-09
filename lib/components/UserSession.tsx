import { useContext, useEffect, useState } from "react";
import useUserSession from "../hooks/useLoadUserSession";
import { BotTalkContext } from "../components/BotTalkContext";

interface UserSessionProps {}

const UserSession: React.FC<UserSessionProps> = () => {
    const [userSessionId, setUserSessionId] = useState('');
    const [userSessionName, setUserSessionName] = useState('');
    const [isSessionInitialized, setSessionInitialized] = useState(false);
    const { loadUserSession, createBackendUserSession } = useUserSession();
    const { switchBotTalk: switchConversation } = useContext(BotTalkContext);
    
    const userSession = loadUserSession();
    if (JSON.stringify(userSession) === '{}' && !isSessionInitialized) {
        setSessionInitialized(true);
        console.log("creating session")
        createBackendUserSession();
    }

    useEffect(() => {
        console.log("loading user session")
        const userSession1 = loadUserSession();
        setUserSessionId(userSession1.userId || 'anon');
        setUserSessionName(userSession1.userName || ""+Math.random());
    },[userSessionName]);

    const handleButtonClick = () => {
        switchConversation("https://n8n.orose.gold/webhook/4a0882d1-da22-402c-886e-729a01cf0ccd/users/" + userSessionId);
    };

    return (
        <div style={{ marginLeft: "0px" }}>
            you are <a onClick={handleButtonClick}>@
            <span style={{ padding: "2px" }}>
                {userSessionName}
            </span></a>
        </div>
    );
};

export default UserSession;
