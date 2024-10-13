import { useContext, useEffect, useState } from "react";
import useUserSession from "../hooks/useLoadUserSession";
import { BotTalkContext } from "../components/BotTalkContext";

interface UserSessionProps {}

const UserSession: React.FC<UserSessionProps> = () => {
    const [userSessionId, setUserSessionId] = useState('');
    const [userSessionName, setUserSessionName] = useState('');
    const { loadUserSession, createUserSession, validateUserSession } = useUserSession();
    const { switchBotTalk: switchConversation } = useContext(BotTalkContext);

    useEffect(() => {
        const handleSession = async () => {
            console.log("loading user session");    
            let userSession = loadUserSession();
            if(userSession && userSession.userId){
                const isValidSession = await validateUserSession(userSession.userId);
                if(!isValidSession){
                    window.location.reload();
                    return;
                }
            }
            else{
                await createUserSession();
                userSession = loadUserSession();
            }
            setUserSessionId(userSession?.userId || 'anon');
            setUserSessionName(userSession?.userName || "ioio");
        }
        handleSession();
    },[]);

    const handleButtonClick = () => {
        switchConversation("https://n8n.orose.gold/webhook/4a0882d1-da22-402c-886e-729a01cf0ccd/users/" + userSessionId);
    };

    return (
        <div style={{ marginLeft: "5%" }}>
            you are <a onClick={handleButtonClick}>@
            <span style={{ padding: "2px" }}>
                {userSessionName}
            </span></a>
        </div>
    );
};

export default UserSession;
